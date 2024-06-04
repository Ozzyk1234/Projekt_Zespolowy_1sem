//localhost:3000/api/kitchen/countUser/1

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

const GET = async (req, { params }) => {
  const idKitchen = await parseInt(params.kitchenId, 10);
  try {
    const countUsersInKitchen = await prisma.userInKitchen.count({
      where: {
        idKitchen: idKitchen,
      },
    });

    return NextResponse.json({ count: countUsersInKitchen });
  } catch (error) {
    console.error("Błąd:", error);
    return NextResponse.json(
      { message: "Wystąpił błąd podczas pobierania danych z bazy." },
      { status: 500 }
    );
  }
};
export { GET };
