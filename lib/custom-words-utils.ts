// Pure utility functions for custom words checking
// These can be used on both client and server side

export type WordTypeLiteral = "WHITELIST" | "BLACKLIST";

export const checkCustomWords = (
  message: string,
  whitelist: { word: string; caseSensitive: boolean }[],
  blacklist: { word: string; caseSensitive: boolean }[]
): { shouldFilter: boolean; matchedWord?: string; type?: WordTypeLiteral } => {
  // Check blacklist first
  for (const item of blacklist) {
    const messageToCheck = item.caseSensitive ? message : message.toLowerCase();
    const wordToCheck = item.caseSensitive ? item.word : item.word.toLowerCase();

    if (messageToCheck.includes(wordToCheck)) {
      return { shouldFilter: true, matchedWord: item.word, type: "BLACKLIST" };
    }
  }

  // Check whitelist - if message contains whitelisted word, don't filter
  for (const item of whitelist) {
    const messageToCheck = item.caseSensitive ? message : message.toLowerCase();
    const wordToCheck = item.caseSensitive ? item.word : item.word.toLowerCase();

    if (messageToCheck.includes(wordToCheck)) {
      return { shouldFilter: false, matchedWord: item.word, type: "WHITELIST" };
    }
  }

  return { shouldFilter: false };
};
