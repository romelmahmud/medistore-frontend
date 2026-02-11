"use server";

import { revalidateTags } from "@/lib/revalidateTags";
import { reviewService } from "@/services/review.service";
import { ReviewCreateType } from "@/types";

export const createReview = async (data: ReviewCreateType) => {
  const res = await reviewService.createReview(data);

  const tagToRevalidate = ["medicine-reviews"];
  revalidateTags(tagToRevalidate);
  return res;
};

export const getMedicineReviews = async (medicineId: string) => {
  const res = await reviewService.getMedicineReviews(medicineId);
  return res;
};
