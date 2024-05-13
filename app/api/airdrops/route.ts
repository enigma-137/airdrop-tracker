


import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { validationSchema } from "../../validationSchema";


export async function POST(req: NextRequest){
 const body  = await req.json()
 const validation = validationSchema.safeParse(body)

 if(!validation.success)
    return NextResponse.json(validation.error.format(), {status: 400})

 const newAirdrop = await prisma.airdrop.create({
    data : {
        title: body.title,
        description: body.description
    }
 })
 return NextResponse.json(newAirdrop,{status: 201}) //status 201 an object was created
}