"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { MedicineTableSkeletonRows } from "../medicine/medicine-table-skeleton";
import UserTable from "./user-table";

export default function UserTableWrapper({ userData }: { userData: any[] }) {
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

  return <UserTable userData={userData} />;
}
