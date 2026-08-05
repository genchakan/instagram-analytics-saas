import type { ConnectedAccount } from "@/types/account";
import type { VisitorInsight } from "@/types/visitor";
import type { ActivityEvent, DailyActivityPoint, InterestBreakdown, MetricSummary } from "@/types/analytics";

/**
 * All data in this file is synthetic demo/mock data used to populate the
 * prototype dashboard. It never represents a real Instagram account or
 * real visitor activity. See docs/DEMO-MODE.md.
 */

/**
 * Deterministic, anonymous placeholder headshot for demo profiles —
 * never a real person tied to the seeded username. pravatar.cc serves
 * royalty-free stock headshots and returns the same image for the same
 * `u` seed, keeping demo screenshots stable across runs.
 */
function demoAvatarUrl(seed: string): string {
  return `https://i.pravatar.cc/150?u=${encodeURIComponent(seed)}`;
}

export const DEMO_ACCOUNT: ConnectedAccount = {
  id: "acc_demo_1",
  userId: "user_demo",
  platform: "instagram",
  username: "studio.aurora",
  displayName: "Studio Aurora",
  avatarUrl: demoAvatarUrl("studio.aurora"),
  connectionStatus: "connected",
  connectedAt: "2026-07-27T09:12:00Z",
  lastSyncAt: "2026-08-02T21:40:00Z",
  providerType: "mock",
  followerCount: 18420,
  isDemo: true,
};

/**
 * Translated: call getDemoMetrics(t) / getDemoActivityEvents(t) with the
 * current locale's `t` function rather than importing static arrays,
 * since this module has no hook access.
 */
export function getDemoMetrics(t: (key: string) => string): MetricSummary[] {
  return [
    { id: "recent-visitors", label: t("demo.metricPeopleViewed"), value: "342", change: 6.4, changeLabel: t("demo.vsLastWeek"), trend: "up" },
    { id: "profile-views", label: t("demo.metricTotalViews"), value: "2,840", change: 18.2, changeLabel: t("demo.vsLastWeek"), trend: "up" },
    { id: "peak-hour", label: t("demo.metricPeakHours"), value: "21–23", changeLabel: t("demo.mostVisitsAtNight") },
  ];
}

function buildActivitySeries(days: number): DailyActivityPoint[] {
  const base = new Date("2026-08-02T00:00:00Z");
  const points: DailyActivityPoint[] = [];
  const seed = [420, 460, 380, 510, 610, 590, 640, 700, 660, 720, 690, 745, 780, 760, 800, 830, 810, 860, 900, 880, 920, 950, 930, 970, 1010, 990, 1030, 1060, 1040, 1080];
  for (let i = days - 1; i >= 0; i -= 1) {
    const date = new Date(base);
    date.setUTCDate(base.getUTCDate() - i);
    const idx = seed.length - 1 - i;
    const profileViews = seed[Math.max(0, idx)] ?? 400;
    points.push({
      date: date.toISOString().slice(0, 10),
      profileViews,
      visitors: Math.round(profileViews * 0.27),
      engagement: Math.round(profileViews * 0.14),
    });
  }
  return points;
}

export const DEMO_ACTIVITY_SERIES_7D: DailyActivityPoint[] = buildActivitySeries(7);
export const DEMO_ACTIVITY_SERIES_30D: DailyActivityPoint[] = buildActivitySeries(30);

export const DEMO_INTEREST_BREAKDOWN: InterestBreakdown = {
  veryHigh: 22,
  high: 41,
  medium: 28,
  lowData: 9,
};

interface DemoVisitorSeed {
  username: string;
  displayName: string;
  interestScore: number;
  status: VisitorInsight["status"];
  visitFrequency: VisitorInsight["visitFrequency"];
  lastActivityAt: string;
  firstDetectedAt: string;
  locked: boolean;
}

const VISITOR_SEEDS: DemoVisitorSeed[] = [
  { username: "mira.codes", displayName: "Mira K.", interestScore: 92, status: "active-now", visitFrequency: "daily", lastActivityAt: "2026-08-02T21:10:00Z", firstDetectedAt: "2026-06-14T10:00:00Z", locked: false },
  { username: "novaline.studio", displayName: "Novaline Studio", interestScore: 87, status: "recently-active", visitFrequency: "weekly", lastActivityAt: "2026-08-02T18:42:00Z", firstDetectedAt: "2026-05-02T08:20:00Z", locked: true },
  { username: "ferateknik", displayName: "Fer Ateknik", interestScore: 81, status: "returning-visitor", visitFrequency: "weekly", lastActivityAt: "2026-08-02T16:05:00Z", firstDetectedAt: "2026-04-19T14:00:00Z", locked: true },
  { username: "camillewrites", displayName: "Camille Rousseau", interestScore: 74, status: "recently-active", visitFrequency: "occasional", lastActivityAt: "2026-08-01T22:30:00Z", firstDetectedAt: "2026-07-01T09:00:00Z", locked: true },
  { username: "dev.otto", displayName: "Otto Berger", interestScore: 68, status: "new-signal", visitFrequency: "one-time", lastActivityAt: "2026-08-01T11:15:00Z", firstDetectedAt: "2026-08-01T11:15:00Z", locked: true },
  { username: "lunaperez.art", displayName: "Luna Perez", interestScore: 61, status: "returning-visitor", visitFrequency: "weekly", lastActivityAt: "2026-07-31T19:48:00Z", firstDetectedAt: "2026-03-11T10:00:00Z", locked: true },
  { username: "kwstudio", displayName: "KW Studio", interestScore: 55, status: "recently-active", visitFrequency: "occasional", lastActivityAt: "2026-07-31T09:02:00Z", firstDetectedAt: "2026-06-20T10:00:00Z", locked: true },
  { username: "theo.marchetti", displayName: "Theo Marchetti", interestScore: 44, status: "new-signal", visitFrequency: "one-time", lastActivityAt: "2026-07-30T15:22:00Z", firstDetectedAt: "2026-07-30T15:22:00Z", locked: true },
];

export const DEMO_VISITORS: VisitorInsight[] = VISITOR_SEEDS.map((seed, index) => ({
  id: `visitor_demo_${index + 1}`,
  accountId: DEMO_ACCOUNT.id,
  username: seed.username,
  displayName: seed.displayName,
  avatarUrl: demoAvatarUrl(seed.username),
  interestScore: seed.interestScore,
  lastActivityAt: seed.lastActivityAt,
  firstDetectedAt: seed.firstDetectedAt,
  visitFrequency: seed.visitFrequency,
  status: seed.status,
  isLocked: seed.locked,
  isDemo: true,
  notes: null,
  timeline: [
    { id: `${index}-t1`, label: "Viewed profile activity", timestamp: seed.lastActivityAt },
    { id: `${index}-t2`, label: "Left an engagement signal", timestamp: seed.firstDetectedAt },
  ],
}));

export function getDemoActivityEvents(t: (key: string, vars?: Record<string, string | number>) => string): ActivityEvent[] {
  return [
    { id: "evt_1", accountId: DEMO_ACCOUNT.id, type: "profile-activity", title: t("demo.evt1Title"), description: t("demo.evt1Desc"), timestamp: "2026-08-02T21:10:00Z", metadata: { count: 24 }, isDemo: true },
    { id: "evt_2", accountId: DEMO_ACCOUNT.id, type: "engagement-signal", title: t("demo.evt2Title"), description: t("demo.evt2Desc"), timestamp: "2026-08-02T18:42:00Z", metadata: null, isDemo: true },
    { id: "evt_3", accountId: DEMO_ACCOUNT.id, type: "returning-visitor", title: t("demo.evt3Title"), description: t("demo.evt3Desc"), timestamp: "2026-08-02T16:05:00Z", metadata: null, isDemo: true },
    { id: "evt_4", accountId: DEMO_ACCOUNT.id, type: "report-generated", title: t("demo.evt4Title"), description: t("demo.evt4Desc"), timestamp: "2026-08-01T09:00:00Z", metadata: null, isDemo: true },
    { id: "evt_5", accountId: DEMO_ACCOUNT.id, type: "profile-activity", title: t("demo.evt5Title"), description: t("demo.evt5Desc"), timestamp: "2026-07-31T20:15:00Z", metadata: { count: 11 }, isDemo: true },
  ];
}

export const DEMO_SETUP_STEPS = [
  { id: "account", label: "Create your account", complete: true },
  { id: "learn", label: "Learn how the dashboard works", complete: false },
  { id: "connect", label: "Connect Instagram", complete: false },
  { id: "report", label: "View your first report", complete: false },
] as const;
