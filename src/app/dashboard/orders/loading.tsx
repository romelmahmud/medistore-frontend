import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardOrdersLoading() {
  return (
    <div className="max-w-7xl  px-4 mt-6 space-y-4 ml-5">
      <Skeleton className="h-8 w-40" />

      <div className="border rounded-md">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex justify-between px-4 py-4 border-b">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-24" />
          </div>
        ))}
      </div>
    </div>
  );
}
