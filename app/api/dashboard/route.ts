import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const totalLinks = await prisma.link.count();

  const clickStats = await prisma.link.aggregate({
    _sum: {
      clickCount: true,
    },
  });

  const activeLinks = await prisma.link.count({
    where: {
      OR: [
        { expiresAt: null },
        {
          expiresAt: {
            gt: new Date(),
          },
        },
      ],
    },
  });

  const recentLinks = await prisma.link.findMany({
  orderBy: {
    createdAt: "desc",
  },
  take: 5,
});

const last7Days = new Date();
last7Days.setDate(last7Days.getDate() - 6);

// query clicks in the last 7 days
const clicks = await prisma.click.findMany({
  where: {
    clickedAt: {
      gte: last7Days,
    },
  },
  select: {
    clickedAt: true,
  },
});

// group by day
const chartMap = new Map<string, number>();

for (let i = 6; i >= 0; i--) {
  const d = new Date();
  d.setDate(d.getDate() - i);

  const key = d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });

  chartMap.set(key, 0);
}

clicks.forEach((click) => {
  const key = new Date(click.clickedAt)
    .toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    });

  chartMap.set(
    key,
    (chartMap.get(key) || 0) + 1
  );
});

// convert to chart format
const chartData = Array.from(
  chartMap.entries()
).map(([date, clicks]) => ({
  date,
  clicks,
}));

const weekAgo = new Date();
weekAgo.setDate(weekAgo.getDate() - 7);

const newLinksThisWeek = await prisma.link.count({
  where: {
    createdAt: {
      gte: weekAgo,
    },
  },
});

  return NextResponse.json({
    totalLinks,
    totalClicks:
      clickStats._sum.clickCount ?? 0,
    activeLinks,
     recentLinks,
      chartData,
    newLinksThisWeek,
  });
}