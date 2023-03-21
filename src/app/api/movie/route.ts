import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: Request) {
  const res = await request.json();
  const { movieId, thumb, userId }: any = res.body;
  try {
    const inTheList = await prisma.movie.findMany({
      where: {
        userId: userId,
        movieId: movieId,
      },
    });
    if (inTheList && inTheList.length > 0) {
      const deleteMovies = await prisma.movie.deleteMany({
        where: {
          userId: userId,
          movieId: movieId,
        },
      });
      return NextResponse.json({ message: "Removed" }, { status: 200 });
    } else {
      const result = await prisma.movie.create({
        data: {
          movieId,
          userId,
          thumb,
        },
      });

      return NextResponse.json(result, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: `Something went wrong: ${error}` },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const id = request.url.split("=")[1];

  try {
    const list = await prisma.movie.findMany({
      where: {
        userId: id,
      },
    });
    return NextResponse.json(list, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Something went wrong: ${error}` },
      { status: 500 }
    );
  }
}
