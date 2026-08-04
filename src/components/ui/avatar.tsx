"use client";

import { useState } from "react";
import { cn, avatarGradient, initials } from "@/lib/utils";

interface AvatarProps {
  name: string;
  src?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const SIZE_MAP = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-14 w-14 text-base",
};

function Avatar({ name, src, size = "md", className }: AvatarProps) {
  const [errored, setErrored] = useState(false);

  if (src && !errored) {
    return (
      <img
        src={src}
        alt=""
        aria-hidden="true"
        onError={() => setErrored(true)}
        className={cn("shrink-0 rounded-full object-cover", SIZE_MAP[size], className)}
      />
    );
  }

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br font-semibold text-white",
        avatarGradient(name),
        SIZE_MAP[size],
        className,
      )}
      aria-hidden="true"
    >
      {initials(name)}
    </div>
  );
}

export { Avatar };
