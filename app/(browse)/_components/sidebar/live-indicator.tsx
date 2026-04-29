"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * LiveIndicator component that periodically refreshes the page
 * to update streaming status when webhooks are not available (localhost)
 */
export const LiveIndicator = () => {
    const router = useRouter();

    useEffect(() => {
        // Refresh every 30 seconds to check for streaming status changes
        const interval = setInterval(() => {
            router.refresh();
        }, 30000); // 30 seconds

        return () => clearInterval(interval);
    }, [router]);

    return null;
};
