"use server";

import { revalidateTags } from "@/lib/revalidateTags";
import { orderService } from "@/services/order.service";
import { CreateOrderInput } from "@/types";
import { OrderStatus } from "@/types/order.type";

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

export const updateOrderStatus = async (
  orderId: string,
  status: OrderStatus,
) => {
  const res = await orderService.updateOrderStatus(orderId, status);
  const tagToRevalidate = ["orders", "customer-orders", "order-by-id"];
  revalidateTags(tagToRevalidate);
  return res;
};
