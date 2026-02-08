"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import MedicineTable from "./medicine-table";
import { MedicineTableSkeletonRows } from "./medicine-table-skeleton";

export default function MedicineTableWrapper({
  medicineData,
}: {
  medicineData: any[];
}) {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 300); // smooth UX

    return () => clearTimeout(timeout);
  }, [searchParams.toString()]);

  if (isLoading) {
    return (
      <table className="w-full">
        <tbody>
          <MedicineTableSkeletonRows />
        </tbody>
      </table>
    );
  }

  return <MedicineTable medicineData={medicineData} />;
}
