"use server";

import { categoriesService } from "@/services/category.service ";
import { CategoryUpdateType } from "@/types";
import { revalidateTag } from "next/cache";

export const getCategories = async () => {
  const res = await categoriesService.getCategories();
  return res;
};

export const getCategoryById = async (id: string) => {
  const res = await categoriesService.getCategoryById(id);
  return res;
};

export const updateCategory = async (
  id: string,
  categoryData: CategoryUpdateType,
) => {
  const res = await categoriesService.updateCategory(id, categoryData);
  revalidateTag("categories", "max");
  return res;
};
export const createCategory = async (categoryData: CategoryUpdateType) => {
  const res = await categoriesService.createCategory(categoryData);
  revalidateTag("categories", "max");
  return res;
};

export const deleteCategory = async (id: string) => {
  const res = await categoriesService.deleteCategory(id);
  revalidateTag("categories", "max");
  return res;
};
