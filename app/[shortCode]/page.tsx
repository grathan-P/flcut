import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ shortCode: string }>;
}) {
  const { shortCode } = await params;

  const link = await prisma.link.findUnique({
    where: {
      shortCode,
    },
  });

  if (!link) {
    return <h1>Link Not Found</h1>;
  }

  redirect(link.originalUrl);
}