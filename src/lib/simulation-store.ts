import { Redis } from "@upstash/redis";
import type { SimulationAttempt } from "@/types/simulation";

const REDIS_KEY = "simulation:attempts";

// On Vercel, in-memory storage alone is unreliable: each request can land
// on a different serverless instance with its own memory, so submissions
// can appear to vanish depending on which instance handles a given
// request. When Redis credentials are present (Vercel KV / Upstash), we
// persist there instead. Without them — e.g. a participant running this
// locally with `next start`, a single long-lived process — the in-memory
// fallback is perfectly reliable, so no external service is required.
function getRedis(): Redis | null {
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

const globalStore = globalThis as typeof globalThis & {
  simulationAttempts?: SimulationAttempt[];
};

function memoryAttempts() {
  globalStore.simulationAttempts ??= [];
  return globalStore.simulationAttempts;
}

export async function listSimulationAttempts(): Promise<SimulationAttempt[]> {
  const redis = getRedis();
  if (!redis) return [...memoryAttempts()].reverse();

  const entries = await redis.lrange<SimulationAttempt>(REDIS_KEY, 0, -1);
  return entries;
}

export async function addSimulationAttempt(
  username: string,
  passwordDisplay: string,
  source: SimulationAttempt["source"],
): Promise<SimulationAttempt> {
  const attempt: SimulationAttempt = {
    id: crypto.randomUUID(),
    username,
    passwordDisplay,
    source,
    createdAt: new Date().toISOString(),
  };

  const redis = getRedis();
  if (redis) {
    // LPUSH prepends, so LRANGE 0 -1 already returns newest-first.
    await redis.lpush(REDIS_KEY, attempt);
  } else {
    memoryAttempts().push(attempt);
  }

  return attempt;
}

export async function clearSimulationAttempts(): Promise<void> {
  const redis = getRedis();
  if (redis) {
    await redis.del(REDIS_KEY);
  } else {
    memoryAttempts().length = 0;
  }
}
