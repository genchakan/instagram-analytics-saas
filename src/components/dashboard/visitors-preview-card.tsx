"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { VisitorRow } from "./visitor-row";
import { useLocale } from "@/lib/locale";
import { DEMO_VISITORS } from "@/data/demo-dashboard";

export function VisitorsPreviewCard() {
  const { t } = useLocale();
  const visitors = DEMO_VISITORS.slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("dash.whosWatching")}</CardTitle>
        <CardDescription>{t("dash.rankedBy")}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2.5">
        {visitors.map((visitor) => (
          <VisitorRow key={visitor.id} visitor={visitor} />
        ))}
      </CardContent>
      <CardFooter>
        <Button variant="secondary" asChild className="w-full">
          <Link href="/dashboard/visitors">{t("dash.unlockAllVisitors")}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
