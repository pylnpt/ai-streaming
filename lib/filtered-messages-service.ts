"use server";

import { db } from "./db";
import { revalidatePath } from "next/cache";

export const logFilteredMessage = async (
  userId: string,
  senderUsername: string | null,
  message: string,
  filteredCategory: string,
  confidence: number
) => {
  try {
    const log = await db.filteredMessage.create({
      data: {
        userId,
        senderUsername,
        message,
        filteredCategory,
        confidence,
      },
    });
    return log;
  } catch (error) {
    console.error("Error logging filtered message:", error);
    // Don't throw - logging shouldn't break the main flow
    return null;
  }
};

export const getFilteredMessagesByUserId = async (
  userId: string,
  limit: number = 100
) => {
  const messages = await db.filteredMessage.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
  return messages;
};

export const restoreFilteredMessage = async (messageId: string, userId: string) => {
  try {
    const updated = await db.filteredMessage.update({
      where: {
        id: messageId,
        userId, // Ensure user owns this
      },
      data: {
        wasRestored: true,
      },
    });
    revalidatePath(`/u/[username]/aifilter/logs`);
    return updated;
  } catch (error) {
    console.error("Error restoring message:", error);
    throw new Error("Failed to restore message");
  }
};

export const getFilterStatistics = async (userId: string, days: number = 7) => {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const messages = await db.filteredMessage.findMany({
    where: {
      userId,
      createdAt: {
        gte: startDate,
      },
    },
    select: {
      filteredCategory: true,
      createdAt: true,
    },
  });

  // Count by category
  const categoryCount: Record<string, number> = {};
  messages.forEach((msg) => {
    categoryCount[msg.filteredCategory] = (categoryCount[msg.filteredCategory] || 0) + 1;
  });

  // Count by day
  const dailyCount: Record<string, number> = {};
  messages.forEach((msg) => {
    const dateKey = msg.createdAt.toISOString().split("T")[0];
    dailyCount[dateKey] = (dailyCount[dateKey] || 0) + 1;
  });

  return {
    totalFiltered: messages.length,
    categoryCount,
    dailyCount,
  };
};
