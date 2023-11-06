import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";

interface Props {
  params: {
    id: number;
  };
}

interface UserRequest {
  name: string;
}

export function GET(request: NextRequest, { params: { id } }: Props) {
  // fetch data from db
  // if data not found, return 404 error
  if (id > 10)
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  return NextResponse.json({ id: 1, name: "Mosh" });
}

export const PUT = async (request: NextRequest, { params: { id } }: Props) => {
  const body: UserRequest = await request.json();
  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });
  if (id > 10)
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  return NextResponse.json({ id: 1, name: body.name }, { status: 200 });
};

export const DELETE = async (
  request: NextRequest,
  { params: { id } }: Props
) => {
  if (id > 10)
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  return NextResponse.json({});
};
