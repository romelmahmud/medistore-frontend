import { Skeleton } from "@/components/ui/skeleton";

export default function UserLoading() {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pr-5 max-w-7xl mx-auto">
        <Skeleton className="h-9 w-40" />
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
