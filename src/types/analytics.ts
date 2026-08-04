export type ActivityEventType =
  | "profile-activity"
  | "engagement-signal"
  | "returning-visitor"
  | "report-generated";

export interface ActivityEvent {
  id: string;
  accountId: string;
  type: ActivityEventType;
  title: string;
  description: string;
  timestamp: string;
  metadata: Record<string, string | number> | null;
  isDemo: boolean;
}

export interface DailyActivityPoint {
  date: string;
  profileViews: number;
  visitors: number;
  engagement: number;
}

export interface InterestBreakdown {
  veryHigh: number;
  high: number;
  medium: number;
  lowData: number;
}

export interface MetricSummary {
  id: string;
  label: string;
  value: string;
  changeLabel: string;
  change?: number;
  trend?: "up" | "down" | "flat";
}
