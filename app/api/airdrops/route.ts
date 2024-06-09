import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { validationSchema } from "../../validationSchema";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const validation = validationSchema.safeParse(body);

  const user = currentUser()

  if(!user){
return NextResponse.json(("Authentication needed"), {status: 401})
  }

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const newAirdrop = await prisma.airdrop.create({
    data: {
      title: body.title,
      chain: body.chain,
      url: body.url,
      description: body.description,
      userId: body.userId
    },
  });

  return NextResponse.json(newAirdrop, { status: 201 });
}
