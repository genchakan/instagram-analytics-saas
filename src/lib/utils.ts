import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRelativeTime(iso: string): string {
  const date = new Date(iso);
  const now = new Date("2026-08-02T22:00:00Z");
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.round(diffMs / 60000);

  if (diffMin < 1) return "just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHours = Math.round(diffMin / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.round(diffHours / 24);
  if (diffDays < 7) return `${diffDays}d ago`;
  const diffWeeks = Math.round(diffDays / 7);
  return `${diffWeeks}w ago`;
}

/**
 * Formats a timestamp as "Weekday, HH:MM" in 24-hour time, e.g. "Sunday, 21:10".
 * Used for visitor "last seen" detail where the day and exact hour matter.
 */
export function formatVisitTimestamp(iso: string): string {
  const date = new Date(iso);
  const weekday = date.toLocaleDateString(undefined, { weekday: "long" });
  const time = date.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit", hour12: false });
  return `${weekday}, ${time}`;
}

export function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return `${parts[0]![0]}${parts[parts.length - 1]![0]}`.toUpperCase();
}

const AVATAR_GRADIENTS = [
  "from-violet-500 to-blue-500",
  "from-fuchsia-500 to-violet-500",
  "from-blue-500 to-cyan-400",
  "from-violet-500 to-fuchsia-500",
  "from-indigo-500 to-violet-500",
];

export function avatarGradient(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return AVATAR_GRADIENTS[hash % AVATAR_GRADIENTS.length]!;
}

/**
 * Masks a locked visitor's username for display, e.g. "markomixer" -> "ma*****er".
 * Keeps the first/last two characters so the row still reads as a real
 * handle, without ever revealing enough to identify or search for it.
 */
export function maskUsername(username: string): string {
  if (username.length <= 4) {
    return `${username.slice(0, 1)}${"*".repeat(Math.max(username.length - 1, 1))}`;
  }
  const start = username.slice(0, 2);
  const end = username.slice(-2);
  const maskLength = Math.min(username.length - 4, 5);
  return `${start}${"*".repeat(maskLength)}${end}`;
}
