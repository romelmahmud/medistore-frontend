"use server";

import { medicineService } from "@/services/medicine.service";
import { MedicineAddType } from "@/types";
import { MedicineUpdateType } from "@/types/medicine.type";
import { revalidateTag } from "next/cache";

export const createMedicine = async (data: MedicineAddType) => {
  const res = await medicineService.createMedicine(data);
  revalidateTag("medicines", "max");
  return res;
};

export const getMedicineById = async (id: string) => {
  const res = await medicineService.getMedicineById(id);
  return res;
};

export const updateMedicine = async (
  id: string,
  medicineData: MedicineUpdateType,
) => {
  const res = await medicineService.updateMedicine(id, medicineData);
  revalidateTag("medicines", "max");
  return res;
};
export const deleteMedicine = async (id: string) => {
  const res = await medicineService.deleteMedicine(id);
  revalidateTag("medicines", "max");
  return res;
};
