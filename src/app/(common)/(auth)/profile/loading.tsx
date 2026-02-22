import { Skeleton } from "@/components/ui/skeleton";

const ProfileLoading = () => {
  return (
    <div className="mx-auto px-6 py-12 space-y-8 animate-pulse">
      {/* Header */}
      <div className="flex justify-start">
        <div className="flex flex-col items-start gap-4 mb-6">
          <Skeleton className="h-28 w-28 rounded-full" />
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-5 w-full max-w-xs" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileLoading;
