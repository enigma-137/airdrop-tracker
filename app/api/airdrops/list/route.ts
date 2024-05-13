import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(req: NextRequest) {
  try {
    const airdrops = await prisma.airdrop.findMany();
    return NextResponse.json(airdrops, { status: 200 });
  } catch (error) {
    console.error("Error fetching airdrops:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
