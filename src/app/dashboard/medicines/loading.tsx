import { Skeleton } from "@/components/ui/skeleton";

export default function MedicineLoading() {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pr-5 max-w-7xl mx-auto">
        <Skeleton className="h-9 w-40" />
        <Skeleton className="h-10 w-36 rounded-md" />
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 border p-4 rounded-md">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}

          {/* Action buttons */}
          <div className="flex gap-2 col-span-2 md:col-span-1">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto max-w-7xl mx-auto mt-12 border rounded-md">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              {[
                "Name",
                "Price",
                "Stock",
                "Manufacturer",
                "Category",
                "Status",
                "Actions",
              ].map((_, i) => (
                <th key={i} className="px-4 py-3">
                  <Skeleton className="h-4 w-24" />
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {Array.from({ length: 10 }).map((_, row) => (
              <tr key={row} className="border-b">
                <td className="px-4 py-4">
                  <Skeleton className="h-4 w-40" />
                </td>
                <td className="px-4 py-4">
                  <Skeleton className="h-4 w-16" />
                </td>
                <td className="px-4 py-4">
                  <Skeleton className="h-4 w-14" />
                </td>
                <td className="px-4 py-4">
                  <Skeleton className="h-4 w-28" />
                </td>
                <td className="px-4 py-4">
                  <Skeleton className="h-4 w-28" />
                </td>
                <td className="px-4 py-4">
                  <Skeleton className="h-4 w-20" />
                </td>
                <td className="px-4 py-4 text-right">
                  <Skeleton className="h-8 w-8 rounded-md ml-auto" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="max-w-7xl mx-auto mt-4 flex items-center justify-between px-2">
        <Skeleton className="h-4 w-56" />
        <div className="flex items-center gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-9 w-9 rounded-md" />
          ))}
        </div>
      </div>
    </div>
  );
}
