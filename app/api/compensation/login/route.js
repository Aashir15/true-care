import { cookies } from "next/headers";

export async function POST(request) {
  try {
    const { password } = await request.json();

    if (
      !password ||
      password !== process.env.COMPENSATION_PASSWORD
    ) {
      return Response.json(
        {
          success: false,
          message: "Incorrect password.",
        },
        { status: 401 },
      );
    }

    const cookieStore = await cookies();

    cookieStore.set(
      "compensation_access",
      "allowed",
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 8,
      },
    );

    return Response.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        message: "Something went wrong.",
      },
      { status: 500 },
    );
  }
}