import { Skeleton } from "@/components/ui/skeleton";

export function MedicineTableSkeletonRows({ rows = 10 }: { rows?: number }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, row) => (
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
    </>
  );
}
