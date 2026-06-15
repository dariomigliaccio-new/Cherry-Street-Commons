import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  return !!session;
}

export async function GET() {
  const sections = await prisma.section.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(sections);
}

export async function PUT(req: NextRequest) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const { id, ...data } = body;
  const section = await prisma.section.update({ where: { id }, data });
  return NextResponse.json(section);
}
