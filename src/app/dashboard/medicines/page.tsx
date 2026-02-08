import { medicineService } from "@/services/medicine.service";
import Link from "next/link";

const SellerMedicinesPage = async () => {
  const { data: medicineData }: any = await medicineService.getMedicines();
  return (
    <div>
      <Link
        href="/dashboard/medicines/add-medicine"
        className="btn btn-outline border rounded-md py-2 px-4"
      >
        Add Medicine
      </Link>
    </div>
  );
};

export default SellerMedicinesPage;
