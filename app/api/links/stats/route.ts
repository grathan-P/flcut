import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const totalLinks = await prisma.link.count();

  const totalClicks = await prisma.link.aggregate({
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

  const expiredLinks = await prisma.link.count({
    where: {
      expiresAt: {
        lt: new Date(),
      },
    },
  });

  const activePercentage =
    totalLinks > 0
      ? Number(
          (
            (activeLinks / totalLinks) *
            100
          ).toFixed(1)
        )
      : 0;

  const expiredPercentage =
    totalLinks > 0
      ? Number(
          (
            (expiredLinks / totalLinks) *
            100
          ).toFixed(1)
        )
      : 0;

  return NextResponse.json({
    totalLinks,

    totalClicks:
      totalClicks._sum.clickCount ?? 0,

    activeLinks,
    expiredLinks,

    activePercentage,
    expiredPercentage,
  });
}