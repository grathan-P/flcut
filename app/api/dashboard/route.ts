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

  return NextResponse.json({
    totalLinks,
    totalClicks:
      clickStats._sum.clickCount ?? 0,
    activeLinks,
     recentLinks,
  });
}