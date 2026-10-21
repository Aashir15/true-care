import { clearAgentSession } from "@/lib/agent-auth";
import { redirect } from "next/navigation";

export async function POST() {
  await clearAgentSession();

  redirect("/agent/login");
}