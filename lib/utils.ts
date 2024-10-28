import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const stringToColor = (str: string) => {
  let hash = 0;
  for(let i=0; i< str.length; i++) {
    hash = str.charCodeAt(1) + ((hash << 5) - hash);
  }

  let color = "#";
  for (let i=0; i < 3; i++) {
    const val = (hash >> (i *8)) & 0xFF;
    color += ("00" + val.toString(16)).substring(-2);
  }

  return color;
}
