export type Category = {
  id: string;
  name: string;
  description: string;
};

export type MedicineReturnType = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  manufacturer: string;
  dosage: string;
  imageUrl: string;

  manufactureDate: string; // ISO string
  expireDate: string; // ISO string

  categoryId: string;
  isActive: boolean;

  createdAt: string; // ISO string
  updatedAt: string; // ISO string

  userId: string | null;

  category: Category;
};

export type GetMedicinesParams = {
  search?: string;
  manufacturer?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
};
