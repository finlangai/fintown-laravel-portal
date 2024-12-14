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

export function formatNumberWithCommas(number: number): string {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function formatDateToYmd(dateString: string) {
  const date = new Date(dateString);
  let year = String(date.getFullYear());
  let month = String(date.getMonth());
  let day = String(date.getDate());

  if (String(month).length == 1) {
    month = "0" + month;
  }
  if (String(day).length == 1) {
    day = "0" + day;
  }

  return `${year}-${month}-${day}`;
}
