import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const items = await prisma.menuItem.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(items);
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const items = await req.json();
  await Promise.all(
    items.map((item: { id: string; label: string; href: string; order: number; visible: boolean }) =>
      prisma.menuItem.update({
        where: { id: item.id },
        data: { label: item.label, href: item.href, order: item.order, visible: item.visible },
      })
    )
  );
  return NextResponse.json({ success: true });
}
