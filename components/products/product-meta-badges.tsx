import type { Product } from "@/lib/types";
import { formatCategory } from "@/lib/format";
import { Badge } from "@/components/ui/badge";

interface ProductMetaBadgesProps {
  category: Product["category"];
  frequency: Product["frequency"];
  timeOfDay: Product["timeOfDay"];
  isSeed?: boolean;
}

export function ProductMetaBadges({
  category,
  frequency,
  timeOfDay,
  isSeed,
}: ProductMetaBadgesProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge variant="secondary" className="capitalize">
        {formatCategory(category)}
      </Badge>
      <Badge variant="outline">{frequency}</Badge>
      <Badge variant="outline">{timeOfDay}</Badge>
      {isSeed && (
        <Badge variant="outline" className="border-primary/30 text-primary">
          Default
        </Badge>
      )}
    </div>
  );
}
