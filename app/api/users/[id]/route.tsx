import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import prisma from "@/prisma/client";

interface Props {
  params: {
    id: string;
  };
}

interface UserRequest {
  name: string;
  email: string;
}

export async function GET(request: NextRequest, { params: { id } }: Props) {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(id) },
  });
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  return NextResponse.json(user);
}

export const PUT = async (request: NextRequest, { params: { id } }: Props) => {
  const body: UserRequest = await request.json();
  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });
  const existingUser = await prisma.user.findUnique({
    where: { id: parseInt(id) },
  });
  if (!existingUser)
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  const updatedUser = await prisma.user.update({
    where: { id: existingUser.id },
    data: {
      name: body.name,
      email: body.email,
    },
  });
  return NextResponse.json(updatedUser, { status: 200 });
};

export const DELETE = async (
  request: NextRequest,
  { params: { id } }: Props
) => {
  const existingUser = await prisma.user.findUnique({
    where: { id: parseInt(id) },
  });
  if (!existingUser)
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  await prisma.user.delete({
    where: { id: existingUser.id },
  });
  return NextResponse.json({});
};
