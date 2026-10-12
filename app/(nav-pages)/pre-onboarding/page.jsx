import { Suspense } from "react";
import PreOnboardingClient from "./PreOnboardingClient";

export default function PreOnboardingPage() {
  return (
    <Suspense fallback={null}>
      <PreOnboardingClient />
    </Suspense>
  );
}