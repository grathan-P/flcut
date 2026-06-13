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

  const now = new Date();

  // CHECK GO LIVE
  if (
    link.goLiveAt &&
    now < link.goLiveAt
  ) {
    return (
      <h1>
        Link is not active yet
      </h1>
    );
  }

  // CHECK EXPIRY
  if (
    link.expiresAt &&
    now > link.expiresAt
  ) {
    return (
      <h1>
        Link has expired
      </h1>
    );
  }

  // INCREMENT CLICKS
  await prisma.link.update({
    where: {
      shortCode,
    },
    data: {
      clickCount: {
        increment: 1,
      },
    },
  });

  redirect(link.originalUrl);
}