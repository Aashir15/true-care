import { getAgentSession } from "@/lib/agent-auth";
import { redirect } from "next/navigation";

export default async function AgentProtectedLayout({
  children,
}) {
  const agent = await getAgentSession();

  if (!agent) {
    redirect("/agent/login");
  }

  return children;
}