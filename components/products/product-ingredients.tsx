"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductIngredientsProps {
  ingredients: string[];
}

export function ProductIngredients({ ingredients }: ProductIngredientsProps) {
  const [open, setOpen] = useState(false);

  if (ingredients.length === 0) return null;

  return (
    <div className="rounded-md border border-border/60">
      <Button
        type="button"
        variant="ghost"
        className="h-auto w-full justify-between px-3 py-2 text-left font-normal"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
      >
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Full ingredient list ({ingredients.length})
        </span>
        <ChevronDown
          className={`size-4 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
        />
      </Button>
      {open && (
        <p className="border-t px-3 py-2 text-sm leading-relaxed text-muted-foreground">
          {ingredients.join(", ")}
        </p>
      )}
    </div>
  );
}
