"use client";

import { Heart } from "lucide-react";
import { useTranslation } from "@/components/providers/locale-provider";
import { cn } from "@/lib/utils";

type AppLogoSize = "sm" | "md";

const sizeStyles: Record<
  AppLogoSize,
  { text: string; heart: string; gap: string }
> = {
  sm: { text: "text-base", heart: "size-3.5", gap: "gap-1" },
  md: { text: "text-lg", heart: "size-4", gap: "gap-1.5" },
};

export function AppLogo({
  className,
  size = "md",
}: {
  className?: string;
  size?: AppLogoSize;
}) {
  const { t } = useTranslation();
  const styles = sizeStyles[size];

  return (
    <span
      className={cn(
        "group/logo inline-flex max-w-full items-center",
        styles.gap,
        className,
      )}
    >
      <span
        className={cn(
          "font-heading font-semibold tracking-tight text-foreground",
          styles.text,
        )}
      >
        {t("brand.name")}
      </span>
      <Heart
        aria-hidden
        className={cn(
          "shrink-0 translate-y-px text-primary",
          "fill-primary/25 stroke-primary",
          "transition-[fill,transform] duration-300 ease-out",
          "motion-safe:group-hover/logo:animate-heartbeat",
          "group-hover/logo:fill-primary/45",
          styles.heart,
        )}
        strokeWidth={2.25}
      />
    </span>
  );
}
