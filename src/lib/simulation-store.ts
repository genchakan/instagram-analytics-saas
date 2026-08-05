import type { SimulationAttempt } from "@/types/simulation";

const globalStore = globalThis as typeof globalThis & {
  simulationAttempts?: SimulationAttempt[];
};

function attempts() {
  globalStore.simulationAttempts ??= [];
  return globalStore.simulationAttempts;
}

export function listSimulationAttempts(): SimulationAttempt[] {
  return [...attempts()].reverse();
}

export function addSimulationAttempt(
  username: string,
  demoPassword: string,
  source: SimulationAttempt["source"],
): SimulationAttempt {
  const attempt: SimulationAttempt = {
    id: crypto.randomUUID(),
    username,
    demoPassword,
    source,
    createdAt: new Date().toISOString(),
  };

  attempts().push(attempt);
  return attempt;
}

export function clearSimulationAttempts() {
  attempts().length = 0;
}
