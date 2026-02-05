import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function MedicineDetailsSkeleton() {
  return (
    <div className="container py-10">
      <div className="grid md:grid-cols-2 gap-10">
        {/* Image skeleton */}
        <Card>
          <CardContent className="p-6">
            <Skeleton className="w-full h-[420px] rounded-xl" />
          </CardContent>
        </Card>

        {/* Content skeleton */}
        <div className="space-y-4">
          {/* Title */}
          <Skeleton className="h-8 w-3/4" />

          {/* Category link */}
          <Skeleton className="h-4 w-40" />

          {/* Description */}
          <div className="space-y-2 mt-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>

          {/* Price */}
          <Skeleton className="h-6 w-32 mt-4" />

          {/* Manufacturer */}
          <Skeleton className="h-4 w-56" />

          {/* Stock */}
          <Skeleton className="h-4 w-32" />

          {/* Add to cart button */}
          <Skeleton className="h-12 w-40 rounded-md mt-6" />
        </div>
      </div>
    </div>
  );
}
