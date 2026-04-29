"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  addCustomWord,
  deleteCustomWord,
  getCustomWordsByUserId,
} from "@/lib/custom-words-service";
import type { WordTypeLiteral } from "@/lib/custom-words-utils";

export const useCustomWords = (userId: string) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const add = (word: string, type: WordTypeLiteral, caseSensitive: boolean) =>
    new Promise<void>((resolve, reject) => {
      startTransition(async () => {
        try {
          await addCustomWord(userId, word, type, caseSensitive);
          router.refresh();
          resolve();
        } catch (err) {
          reject(err);
        }
      });
    });

  const remove = (wordId: string) =>
    new Promise<void>((resolve, reject) => {
      startTransition(async () => {
        try {
          await deleteCustomWord(wordId, userId);
          router.refresh();
          resolve();
        } catch (err) {
          reject(err);
        }
      });
    });

  const getAll = () => getCustomWordsByUserId(userId);

  return { add, remove, getAll, isPending };
};
