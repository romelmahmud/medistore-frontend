import { env } from "@/env";
import { ReviewCreateType } from "@/types";

import { cookies } from "next/headers";

const API_URL = env.API_URL;

export const createReview = async (payload: ReviewCreateType) => {
  try {
    const cookieStore = cookies();

    const res = await fetch(`${API_URL}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok || data.success === false) {
      return { success: false, message: data.message };
    }

    return { success: true };
  } catch {
    return { success: false, message: "Something went wrong" };
  }
};

export const getMedicineReviews = async (medicineId: string) => {
  try {
    const cookieStore = cookies();

    const res = await fetch(`${API_URL}/reviews/${medicineId}`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
      next: {
        tags: ["medicine-reviews"],
      },
    });

    const data = await res.json();

    if (!res.ok || data.success === false) {
      return { data: null, error: data.message };
    }

    return { data: data.data, error: null };
  } catch (error) {
    return { data: null, error: "Failed to fetch reviews" };
  }
};
export const reviewService = {
  createReview,
  getMedicineReviews,
};
