import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
const { searchParams } = new URL(req.url);
const range = searchParams.get("range") || "7d";

let days = 7;

let groupBy: "hour" | "day" | "week" | "month" = "day";

switch (range) {
  case "1d":
    days = 1;
    groupBy = "hour";
    break;

  case "7d":
    days = 7;
    groupBy = "day";
    break;

  case "14d":
    days = 14;
    groupBy = "day";
    break;

  case "30d":
    days = 30;
    groupBy = "day";
    break;

  case "180d":
    days = 180;
    groupBy = "week";
    break;

  case "365d":
    days = 365;
    groupBy = "month";
    break;
}

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

const startDate = new Date();

startDate.setHours(0, 0, 0, 0);

startDate.setDate(
  startDate.getDate() - (days - 1)
);

// query clicks in the last 7 days
const clicks = await prisma.click.findMany({
  where: {
    clickedAt: {
      gte: startDate,
    },
  },
  select: {
    clickedAt: true,
  },
});


// Hourly Aggregation
const chartMap = new Map<string, number>();

if (groupBy === "hour") {
  for (let h = 0; h < 24; h++) {
    chartMap.set(`${h}:00`, 0);
  }

  clicks.forEach((click) => {
    const hour =
      new Date(click.clickedAt).getHours();

    const key = `${hour}:00`;

    chartMap.set(
      key,
      (chartMap.get(key) || 0) + 1
    );
  });
}

// Daily Aggregation
if (groupBy === "day") {
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();

    d.setDate(d.getDate() - i);

    const key = d.toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
      }
    );

    chartMap.set(key, 0);
  }

  clicks.forEach((click) => {
    const key =
      new Date(click.clickedAt)
        .toLocaleDateString(
          "en-IN",
          {
            day: "numeric",
            month: "short",
          }
        );

    chartMap.set(
      key,
      (chartMap.get(key) || 0) + 1
    );
  });
}

// Weekly Aggregation
if (groupBy === "week") {

  for (let i = 25; i >= 0; i--) {

    const d = new Date();

    d.setDate(d.getDate() - (i * 7));

    const month =
      d.toLocaleDateString("en-IN", {
        month: "short",
      });

    const weekInMonth =
      Math.ceil(d.getDate() / 7);

    const key =
      `${month} W${weekInMonth}`;

    chartMap.set(key, 0);
  }

  clicks.forEach((click) => {

    const d =
      new Date(click.clickedAt);

    const month =
      d.toLocaleDateString("en-IN", {
        month: "short",
      });

    const weekInMonth =
      Math.ceil(d.getDate() / 7);

    const key =
      `${month} W${weekInMonth}`;

    chartMap.set(
      key,
      (chartMap.get(key) || 0) + 1
    );
  });
}

// Monthly Aggregation
if (groupBy === "month") {

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  months.forEach((month) => {
    chartMap.set(month, 0);
  });

  clicks.forEach((click) => {

    const month =
      months[
        new Date(click.clickedAt)
          .getMonth()
      ];

    chartMap.set(
      month,
      (chartMap.get(month) || 0) + 1
    );
  });
}

//Convert To Chart Data
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

const currentPeriodClicks =
  await prisma.click.count({
    where: {
      clickedAt: {
        gte: startDate,
      },
    },
  });

  const previousStartDate = new Date();
previousStartDate.setDate(
  previousStartDate.getDate() - (days * 2)
);

const previousEndDate = new Date();
previousEndDate.setDate(
  previousEndDate.getDate() - days
);

const previousPeriodClicks =
  await prisma.click.count({
    where: {
      clickedAt: {
        gte: previousStartDate,
        lt: previousEndDate,
      },
    },
  });

  let clickGrowth = 0;

if (previousPeriodClicks > 0) {
  clickGrowth =
    (
      (
        currentPeriodClicks -
        previousPeriodClicks
      ) /
      previousPeriodClicks
    ) * 100;
}

clickGrowth =
  Number(clickGrowth.toFixed(1));

  

  const activePercentage =
  totalLinks > 0
    ? Math.round(
        (activeLinks / totalLinks) * 100
      )
    : 0;

  return NextResponse.json({
    totalLinks,
    totalClicks:
      clickStats._sum.clickCount ?? 0,
    activeLinks,
     recentLinks,
      chartData,
      newLinksThisWeek,
       clickGrowth,
       activePercentage,
  });
}