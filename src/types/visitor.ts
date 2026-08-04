export type VisitorStatus = "active-now" | "recently-active" | "returning-visitor" | "new-signal";

export type VisitFrequency = "daily" | "weekly" | "occasional" | "one-time";

export interface VisitorTimelineEntry {
  id: string;
  label: string;
  timestamp: string;
}

export interface VisitorInsight {
  id: string;
  accountId: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  interestScore: number;
  lastActivityAt: string;
  firstDetectedAt: string;
  visitFrequency: VisitFrequency;
  status: VisitorStatus;
  isLocked: boolean;
  isDemo: boolean;
  timeline: VisitorTimelineEntry[];
  notes: string | null;
}
