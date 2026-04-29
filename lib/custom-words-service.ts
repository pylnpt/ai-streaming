"use server";

import { db } from "./db";
import { revalidatePath } from "next/cache";

export const getCustomWordsByUserId = async (userId: string) => {
  const words = await db.customWord.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
  return words;
};

export const getWhitelistByUserId = async (userId: string) => {
  const words = await db.customWord.findMany({
    where: {
      userId,
      type: "whitelist"
    },
    select: { word: true, caseSensitive: true },
  });
  return words;
};

export const getBlacklistByUserId = async (userId: string) => {
  const words = await db.customWord.findMany({
    where: {
      userId,
      type: "blacklist"
    },
    select: { word: true, caseSensitive: true },
  });
  return words;
};

export const addCustomWord = async (
  userId: string,
  word: string,
  type: "whitelist" | "blacklist",
  caseSensitive: boolean = false
) => {
  try {
    const newWord = await db.customWord.create({
      data: {
        userId,
        word: word.trim(),
        type,
        caseSensitive,
      },
    });
    revalidatePath(`/u/[username]/aifilter`);
    return newWord;
  } catch (error) {
    console.error("Error adding custom word:", error);
    throw new Error("Failed to add custom word");
  }
};

export const deleteCustomWord = async (wordId: string, userId: string) => {
  try {
    await db.customWord.delete({
      where: {
        id: wordId,
        userId, // Ensure user owns this word
      },
    });
    revalidatePath(`/u/[username]/aifilter`);
    return { success: true };
  } catch (error) {
    console.error("Error deleting custom word:", error);
    throw new Error("Failed to delete custom word");
  }
};

