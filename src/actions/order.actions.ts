"use server";

import { revalidateTags } from "@/lib/revalidateTags";
import { orderService } from "@/services/order.service";
import { CreateOrderInput } from "@/types";

export const createOrder = async (data: CreateOrderInput) => {
  const res = await orderService.createOrder(data);

  const tagToRevalidate = ["medicines", "orders", "customer-orders"];
  revalidateTags(tagToRevalidate);
  return res;
};
export const getAllOrders = async () => {
  const res = await orderService.getAllOrders();
  return res;
};

export const getCustomerOrders = async (customerId: string) => {
  const res = await orderService.getCustomerOrders(customerId);
  return res;
};
