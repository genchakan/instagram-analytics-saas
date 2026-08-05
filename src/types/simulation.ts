export type SimulationSource = "login-page" | "connect-flow";

export type SimulationAttempt = {
  id: string;
  username: string;
  // For login-page this is the literal DEMO-... code (never a real secret
  // by construction). For connect-flow this is the raw password exactly as
  // submitted — safe only because each deployment of this app is scoped to
  // a single participant (see route.ts POST handler).
  passwordDisplay: string;
  source: SimulationSource;
  createdAt: string;
};
