import { Skeleton } from "@/components/ui/skeleton";

export default function HomeLoading() {
  return (
    <div className="w-full mx-auto mb-4 space-y-16">
      {/* Hero Skeleton */}
      <section className="py-16 text-center space-y-6">
        <Skeleton className="h-10 w-3/4 mx-auto" />
        <Skeleton className="h-6 w-1/2 mx-auto" />
        <Skeleton className="h-10 w-40 mx-auto" />
      </section>

      {/* Categories Skeleton */}
      <section className="max-w-7xl mx-auto px-6 space-y-8">
        <Skeleton className="h-8 w-64 mx-auto" />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-lg" />
          ))}
        </div>
      </section>

      {/* Medicines Section Skeleton */}
      <section className="max-w-7xl mx-auto px-6 space-y-8">
        <Skeleton className="h-8 w-72 mx-auto" />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="aspect-square w-full rounded-lg" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-8 w-full" />
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Skeleton */}
      <section className="max-w-4xl mx-auto px-6 space-y-4">
        <Skeleton className="h-8 w-48 mx-auto" />
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </section>

      {/* Testimonials Skeleton */}
      <section className="max-w-7xl mx-auto px-6 space-y-8">
        <Skeleton className="h-8 w-56 mx-auto" />
        <div className="grid md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-40 rounded-lg" />
          ))}
        </div>
      </section>
    </div>
  );
}
