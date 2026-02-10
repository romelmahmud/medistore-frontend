"use server";

import { revalidateTags } from "@/lib/revalidateTags";
import { orderService } from "@/services/order.service";
import { CreateOrderInput } from "@/types";

export const createOrder = async (data: CreateOrderInput) => {
  const res = await orderService.createOrder(data);

  const tagToRevalidate = [
    "medicines",
    "orders",
    "customer-orders",
    "order-by-id",
  ];
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

export const getOrderById = async (orderId: string) => {
  const res = await orderService.getOrderById(orderId);
  return res;
};
