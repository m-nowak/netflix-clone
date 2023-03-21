import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Something went wrong: ${error}` },
      { status: 500 }
    );
  }
}
