import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatSeconds(seconds: bigint): string {
  if (seconds === 0n) return "Closed";

  const minutes = seconds / 60n;
  const hours = minutes / 60n;
  const days = hours / 24n;

  const remainingHours = hours % 24n;
  const remainingMinutes = minutes % 60n;
  const remainingSeconds = seconds % 60n;

  let result = "";
  if (days > 0n) result += `${days}d `;
  if (remainingHours > 0n) result += `${remainingHours}h `;
  if (remainingMinutes > 0n) result += `${remainingMinutes}m `;
  if (remainingSeconds > 0n) result += `${remainingSeconds}s`;

  return result.trim();
}
