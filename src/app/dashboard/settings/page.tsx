"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useAppState } from "@/lib/app-state";
import { updateSession } from "@/services/auth";

export default function SettingsPage() {
  const router = useRouter();
  const { user, setUser, signOut } = useAppState();
  const [fullName, setFullName] = useState(user?.fullName ?? "");
  const [notifyActivity, setNotifyActivity] = useState(true);
  const [notifyReports, setNotifyReports] = useState(true);
  const [saved, setSaved] = useState(false);

  if (!user) return null;

  function handleSave() {
    const updated = updateSession({ fullName });
    if (updated) setUser(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function handleSignOut() {
    signOut();
    router.push("/");
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <h1 className="text-xl font-semibold text-text-primary sm:text-2xl">Settings</h1>

      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="fullName">Full name</Label>
            <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email">Email</Label>
            <div className="flex items-center gap-2">
              <Input id="email" value={user.email} disabled className="flex-1" />
              {!user.emailVerified && <Badge variant="warning">Unverified</Badge>}
            </div>
          </div>
          <div>
            <Button onClick={handleSave}>{saved ? "Saved" : "Save changes"}</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-center gap-2.5">
            <Checkbox id="notify-activity" checked={notifyActivity} onCheckedChange={(c) => setNotifyActivity(c === true)} />
            <Label htmlFor="notify-activity" className="font-normal text-text-secondary">
              Email me about new activity signals
            </Label>
          </div>
          <div className="flex items-center gap-2.5">
            <Checkbox id="notify-reports" checked={notifyReports} onCheckedChange={(c) => setNotifyReports(c === true)} />
            <Label htmlFor="notify-reports" className="font-normal text-text-secondary">
              Email me when a weekly report is ready
            </Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <Button variant="secondary" onClick={handleSignOut} className="w-full sm:w-auto">
            Sign out
          </Button>
          <Button variant="danger" disabled className="w-full sm:w-auto">
            Delete account
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
