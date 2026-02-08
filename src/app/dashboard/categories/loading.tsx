import { Skeleton } from "@/components/ui/skeleton";

export default function AdminCategoriesLoading() {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pr-5 max-w-7xl mx-auto mt-5">
        <Skeleton className="h-9 w-48" />
        <Skeleton className="h-10 w-36 rounded-md" />
      </div>

      {/* Category cards grid */}
      <div className="max-w-7xl mx-auto mt-12 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="border rounded-lg p-4 space-y-4">
            {/* Header */}
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-md" />
              <Skeleton className="h-5 w-32" />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2 pt-2">
              <Skeleton className="h-9 w-20 rounded-md" />
              <Skeleton className="h-9 w-20 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
