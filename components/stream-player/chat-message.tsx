"use client";

import { stringToColor } from "@/lib/utils";
import { ReceivedChatMessage } from "@livekit/components-react";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useToxicityModel } from "@/hooks/use-toxicity-model";
import { checkCustomWords } from "@/lib/custom-words-utils";
import { logFilteredMessage } from "@/lib/filtered-messages-service";

interface CustomWord {
    word: string;
    caseSensitive: boolean;
}

interface ChatMessageProps {
    data: ReceivedChatMessage & {isToxic: boolean},
    threshold: number,
    toxicityLabels: string[],
    isProfFilterEnabled: boolean,
    whitelist: CustomWord[],
    blacklist: CustomWord[],
    userId: string
};

export const ChatMessage = ({
    data,
    threshold,
    toxicityLabels,
    isProfFilterEnabled,
    whitelist,
    blacklist,
    userId
}: ChatMessageProps) => {
    const [checkedMessage, setCheckedMessage] = useState(data.message);
    const [isChecking, setIsChecking] = useState(false);
    const color = stringToColor(data.from?.name || "asderf");

    // Use the shared toxicity model hook
    const { checkToxicity, isLoading: modelLoading } = useToxicityModel(
        threshold,
        toxicityLabels
    );

    // Only check once per message
    useEffect(() => {
        // Skip if filter disabled, already checking, or already checked
        if (!isProfFilterEnabled || isChecking || checkedMessage !== data.message) {
            return;
        }

        const performCheck = async () => {
            setIsChecking(true);

            // Step 1: Check blacklist first
            const customWordCheck = checkCustomWords(data.message, whitelist, blacklist);

            if (customWordCheck.shouldFilter && customWordCheck.type === "blacklist") {
                // Blacklist match - filter immediately
                setCheckedMessage(`[Blocked: ${customWordCheck.matchedWord}]`);
                // Log the filtered message (fire and forget - don't await)
                logFilteredMessage(
                    userId,
                    data.from?.name || null,
                    data.message,
                    `blacklist:${customWordCheck.matchedWord}`,
                    1.0 // 100% confidence for blacklist
                ).catch((err) => console.error("Failed to log filtered message:", err));
                setIsChecking(false);
                return;
            }

            // Step 2: Check whitelist - if matched, skip AI filtering
            if (customWordCheck.matchedWord && customWordCheck.type === "whitelist") {
                setIsChecking(false);
                return; // Message is safe, don't filter
            }

            // Step 3: Skip if model is still loading
            if (modelLoading) {
                setIsChecking(false);
                return;
            }

            // Step 4: Run AI toxicity check
            const result = await checkToxicity(data.message);

            if (result.isToxic && result.label) {
                setCheckedMessage(`[Deleted: ${result.label}]`);
                // Log the filtered message with AI confidence
                // Get confidence from allPredictions if available
                const detailedResult = await checkToxicity(data.message, true);
                const matchedPrediction = detailedResult.allPredictions?.find(
                    p => p.label === result.label
                );
                const confidence = matchedPrediction?.probabilities[1] || 0.9;

                // Log (fire and forget - don't await)
                logFilteredMessage(
                    userId,
                    data.from?.name || null,
                    data.message,
                    result.label,
                    confidence
                ).catch((err) => console.error("Failed to log filtered message:", err));
            }

            setIsChecking(false);
        };

        performCheck();
    }, [isProfFilterEnabled, data.message, data.from?.name, modelLoading, checkToxicity, isChecking, checkedMessage, whitelist, blacklist, userId]);

    return (
        <div className="flex gap-2 p-2 rounded-md hover:bg.white/5">
            <p className="text-sm text-white/40">
                {format(data.timestamp, "HH:MM" )}
            </p>
            <div className="flex flex-wrap items-baseline gap-1 grow">
                <p className="text-sm font-semibold whitespace-nowrap">
                    <span className="truncate" style={{ color: color }}>
                        {data.from?.name}
                    </span>:
                </p>
                <p className="text-sm break-all">
                    {checkedMessage}
                </p>
            </div>
        </div>
    )
}
