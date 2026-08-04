"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { VisitorRow } from "./visitor-row";
import { DEMO_VISITORS } from "@/data/demo-dashboard";

export function VisitorsPreviewCard() {
  const visitors = DEMO_VISITORS.slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent visitors</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2.5">
        {visitors.map((visitor) => (
          <VisitorRow key={visitor.id} visitor={visitor} />
        ))}
      </CardContent>
      <CardFooter>
        <Button variant="secondary" asChild className="w-full">
          <Link href="/dashboard/visitors">Unlock All Visitors</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
