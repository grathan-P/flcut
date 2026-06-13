import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

function generateShortCode(length = 6) {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  let result = "";

  for (let i = 0; i < length; i++) {
    result += chars.charAt(
      Math.floor(Math.random() * chars.length)
    );
  }

  return result;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    let {
  originalUrl,
  customAlias,
  goLiveAt,
  expiresAt,
} = body;

if (
  !originalUrl.startsWith("http://") &&
  !originalUrl.startsWith("https://")
) {
  originalUrl = `https://${originalUrl}`;
}

//validate URL
try {
  new URL(originalUrl);
} catch {
  return NextResponse.json(
    { error: "Invalid URL" },
    { status: 400 }
  );
}

    const shortCode = customAlias?.trim() || generateShortCode();

    const existing = await prisma.link.findUnique({
  where: {
    shortCode,
  },
});

if (existing) {
  return NextResponse.json(
    {
      error: "Alias already exists",
    },
    {
      status: 400,
    }
  );
}

    const link = await prisma.link.create({
      data: {
  originalUrl,
  shortCode,
  customAlias: customAlias || null,

  goLiveAt: goLiveAt
    ? new Date(goLiveAt)
    : null,

  expiresAt: expiresAt
    ? new Date(expiresAt)
    : null,
},
    });

    return NextResponse.json(link);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create link" },
      { status: 500 }
    );
  }
}