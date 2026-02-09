"use server";

import { categoriesService } from "@/services/category.service ";

export const getCategories = async () => {
  const res = await categoriesService.getCategories();
  return res;
};

export const getCategoryById = async (id: string) => {
  const res = await categoriesService.getCategoryById(id);
  return res;
};
