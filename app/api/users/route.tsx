// GET - getting data
// POST - creating data
// PUT - updating data

import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import prisma from "@/prisma/client";

interface UserRequest {
  name: string;
  email: string;
}

export async function GET(request: NextRequest) {
  // fetch users from db
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

export const POST = async (request: NextRequest) => {
  const body: UserRequest = await request.json();
  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });
  const existingUser = await prisma.user.findUnique({
    where: { email: body.email },
  });
  if (existingUser)
    return NextResponse.json(
      { error: "Email already exists." },
      { status: 400 }
    );
  const newUser = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
    },
  });
  return NextResponse.json(newUser, { status: 201 });
};
