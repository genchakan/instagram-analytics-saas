const NAMESPACE = "wm_ig_saas";

export function readStorage<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(`${NAMESPACE}:${key}`);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export function writeStorage<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(`${NAMESPACE}:${key}`, JSON.stringify(value));
}

export function clearStorage(key: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(`${NAMESPACE}:${key}`);
}
