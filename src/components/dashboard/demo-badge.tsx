import { FlaskConical } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function DemoBadge({ className, label = "Demo dataset" }: { className?: string; label?: string }) {
  return (
    <Badge variant="demo" className={cn(className)}>
      <FlaskConical className="h-3 w-3" aria-hidden="true" />
      {label}
    </Badge>
  );
}
