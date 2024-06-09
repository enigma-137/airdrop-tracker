// app/api/users/add/route.ts

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';

export async function POST(req: NextRequest) {
  const { id, email, name, clerkId } = await req.json();

  try {
    const user = await prisma.user.upsert({
      where: { clerkId },
      update: {
        email,
        name,
      },
      create: {
        id,
        clerkId,
        email,
        name,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
  }
}
