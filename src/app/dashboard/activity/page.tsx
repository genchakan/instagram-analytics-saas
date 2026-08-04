import { DemoBadge } from "@/components/dashboard/demo-badge";
import { ActivityTimeline } from "@/components/dashboard/activity-timeline";
import { DEMO_ACTIVITY_EVENTS } from "@/data/demo-dashboard";

export default function ActivityPage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-text-primary sm:text-2xl">Activity</h1>
          <p className="mt-1 text-sm text-text-secondary">
            A running log of everything detected around your profile.
          </p>
        </div>
        <DemoBadge />
      </div>

      <ActivityTimeline events={DEMO_ACTIVITY_EVENTS} title="All activity" />
    </div>
  );
}
