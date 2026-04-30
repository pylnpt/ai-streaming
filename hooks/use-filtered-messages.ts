"use client";

import { useCallback } from "react";
import { logFilteredMessage } from "@/lib/filtered-messages-service";

export const useFilteredMessages = (userId: string) => {
  const log = useCallback(
    (
      senderUsername: string | null,
      message: string,
      filteredCategory: string,
      confidence: number
    ) =>
      logFilteredMessage(
        userId,
        senderUsername,
        message,
        filteredCategory,
        confidence
      ).catch((err) => {
        console.error("Failed to log filtered message:", err);
        return null;
      }),
    [userId]
  );

  return { log };
};
