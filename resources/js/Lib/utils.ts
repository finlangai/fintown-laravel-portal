import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toSnakeCase(str: string) {
  return str
    .toLowerCase()
    .replace(/[\s\W-]+/g, "_")
    .replace(/^_+|_+$/g, "");
}
