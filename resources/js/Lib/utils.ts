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

export function capitalizeFirstChar(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
export function getQueryParams(): { [key: string]: string } {
  const queryParams: { [key: string]: string } = {};
  const url = new URL(window.location.href);
  url.searchParams.forEach((value, key) => {
    queryParams[key] = value;
  });
  return queryParams;
}
