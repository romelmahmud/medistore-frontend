import { env } from "@/env";
import { ReviewCreateType } from "@/types";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

// ✅ Helper to convert cookies to string header
const getCookieHeader = async () => {
  const cookieStore = await cookies();
  return cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");
};

export const createReview = async (payload: ReviewCreateType) => {
  try {
    const cookieHeader = await getCookieHeader();

    const res = await fetch(`${API_URL}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Cookie: cookieHeader },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok || data.success === false)
      return { success: false, message: data.message };

    return { success: true };
  } catch {
    return { success: false, message: "Something went wrong" };
  }
};

export const getMedicineReviews = async (medicineId: string) => {
  try {
    const cookieHeader = await getCookieHeader();

    const res = await fetch(`${API_URL}/reviews/${medicineId}`, {
      headers: { Cookie: cookieHeader },
      cache: "no-store",
      next: { tags: ["medicine-reviews"] },
    });

    const data = await res.json();
    if (!res.ok || data.success === false)
      return { data: null, error: data.message };

    return { data: data.data, error: null };
  } catch {
    return { data: null, error: "Failed to fetch reviews" };
  }
};

export const reviewService = { createReview, getMedicineReviews };
