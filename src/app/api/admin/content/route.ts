import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const content = await prisma.siteContent.findMany();
  const map: Record<string, string> = {};
  content.forEach((c) => (map[c.key] = c.value));
  return NextResponse.json(map);
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body: Record<string, string> = await req.json();
  const updates = await Promise.all(
    Object.entries(body).map(([key, value]) =>
      prisma.siteContent.upsert({
        where: { key },
        update: { value },
        create: { key, value, type: "text" },
      })
    )
  );
  return NextResponse.json(updates);
}
