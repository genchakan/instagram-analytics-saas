export type SimulationSource = "login-page" | "connect-flow";

export type SimulationAttempt = {
  id: string;
  username: string;
  demoPassword: string;
  source: SimulationSource;
  createdAt: string;
};
