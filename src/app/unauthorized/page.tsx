import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-bg px-4 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-surface-1 border border-border">
        <ShieldAlert className="h-6 w-6 text-warning" aria-hidden="true" />
      </span>
      <h1 className="text-2xl font-semibold text-text-primary">You don&apos;t have access</h1>
      <p className="max-w-sm text-sm text-text-secondary">
        Log in with an account that has access to this page, or head back to the dashboard.
      </p>
      <div className="flex gap-3">
        <Button variant="secondary" asChild>
          <Link href="/login">Log in</Link>
        </Button>
        <Button asChild>
          <Link href="/dashboard">Go to dashboard</Link>
        </Button>
      </div>
    </div>
  );
}
