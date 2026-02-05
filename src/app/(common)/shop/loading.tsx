import { CardSkeleton } from "@/components/ui/card-skeleton";

const ShopLoading = () => {
  return (
    <div className="grid-cols-2 grid gap-4 md:grid-cols-3 lg:grid-cols-5">
      {Array.from({ length: 8 }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
};

export default ShopLoading;
