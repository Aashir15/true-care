"use client";

import { useEffect } from "react";

export default function ReferralTracker() {
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const referralCode = params.get("ref");

        if (!referralCode) return;

        document.cookie = [
            `agent_ref=${encodeURIComponent(referralCode)}`,
            "path=/",
            "max-age=2592000",
            "samesite=lax",
        ].join("; ");
    }, []);

    return null;
}