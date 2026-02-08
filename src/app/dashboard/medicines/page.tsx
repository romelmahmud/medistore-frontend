import MedicineTable from "@/components/modules/dashboard/medicine/medicine-table";
import { medicineService } from "@/services/medicine.service";
import Link from "next/link";

const SellerMedicinesPage = async () => {
  const { data: medicineData }: any = await medicineService.getMedicines();
  return (
    <div>
      <div className="flex items-center justify-between mb-4 pr-5 w-7xl mx-auto">
        <h1 className="text-3xl font-semibold">Medicine</h1>
        <Link
          href="/dashboard/medicines/add-medicine"
          className="btn btn-outline border rounded-md py-2 px-4"
        >
          Add Medicine
        </Link>
      </div>

      <div className="overflow-x-auto w-7xl mx-auto mt-12 border rounded-md">
        <MedicineTable medicineData={medicineData} />
      </div>
    </div>
  );
};

export default SellerMedicinesPage;
