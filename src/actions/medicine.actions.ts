"use server";

import { medicineService } from "@/services/medicine.service";
import { MedicineAddType } from "@/types";
import { revalidateTag } from "next/cache";

export const createMedicine = async (data: MedicineAddType) => {
  const res = await medicineService.createMedicine(data);
  revalidateTag("medicines", "max");
  return res;
};
