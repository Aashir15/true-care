import { setAgentSession } from "@/lib/agent-auth";

export async function POST(request) {
  try {
    const { email, password } =
      await request.json();

    if (!email || !password) {
      return Response.json(
        {
          success: false,
          message:
            "Email and password are required.",
        },
        { status: 400 },
      );
    }

    const correctEmail =
      process.env.CARLA_AGENT_EMAIL;

    const correctPassword =
      process.env.CARLA_AGENT_PASSWORD;

    if (
      email.toLowerCase().trim() !==
        correctEmail?.toLowerCase().trim() ||
      password !== correctPassword
    ) {
      return Response.json(
        {
          success: false,
          message:
            "Incorrect email or password.",
        },
        { status: 401 },
      );
    }

    await setAgentSession({
      name: "Carla",
      email: correctEmail,
      referralCode: "AG-CAR05",
    });

    return Response.json({
      success: true,
    });
  } catch (error) {
    console.error("Agent login error:", error);

    return Response.json(
      {
        success: false,
        message: "Unable to login.",
      },
      { status: 500 },
    );
  }
}