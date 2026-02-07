"use server";

import { categoriesService } from "@/services/category.service ";

export const getCategories = async () => {
  const res = await categoriesService.getCategories();
  return res;
};
