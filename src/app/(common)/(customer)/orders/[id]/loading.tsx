import { Skeleton } from "@/components/ui/skeleton";

export default function OrderDetailsLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 mt-6 space-y-6">
      <Skeleton className="h-8 w-48" />

      <div className="grid md:grid-cols-3 gap-6">
        <Skeleton className="h-64 w-full" />

        <div className="md:col-span-2 space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}
