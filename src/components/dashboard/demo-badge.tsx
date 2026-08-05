"use client";

import { FlaskConical } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLocale } from "@/lib/locale";
import { cn } from "@/lib/utils";

export function DemoBadge({ className, label }: { className?: string; label?: string }) {
  const { t } = useLocale();
  return (
    <Badge variant="demo" className={cn(className)}>
      <FlaskConical className="h-3 w-3" aria-hidden="true" />
      {label ?? t("dash.demoDataset")}
    </Badge>
  );
}
