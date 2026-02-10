"use server";

import { revalidateTags } from "@/lib/revalidateTags";
import { orderService } from "@/services/order.service";
import { CreateOrderInput } from "@/types";

export const createOrder = async (data: CreateOrderInput) => {
  const res = await orderService.createOrder(data);

  const tagToRevalidate = ["medicines"];
  revalidateTags(tagToRevalidate);
  return res;
};
