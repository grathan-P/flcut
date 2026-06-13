import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } =
    new URL(req.url);

  const page = Number(
    searchParams.get("page") || 1
  );

  const limit = 5;

  const skip =
    (page - 1) * limit;

  const totalLinks =
    await prisma.link.count();

  const links =
    await prisma.link.findMany({
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: limit,
    });

  return NextResponse.json({
    links,
    totalLinks,
    currentPage: page,
    totalPages: Math.ceil(
      totalLinks / limit
    ),
  });
}