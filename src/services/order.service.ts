import { env } from "@/env";
import { CreateOrderInput } from "@/types";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

const createOrder = async (orderData: CreateOrderInput) => {
  try {
    const cookieStore = await cookies();

    const res = await fetch(`${API_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(orderData),
    });
    const data = await res.json();
    if (!res.ok || data.success === false) {
      return {
        data: null,
        error: {
          message: data.message || "Order not created",
        },
      };
    }

    return {
      data,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: { message: "Something went wrong" },
    };
  }
};

export const orderService = {
  createOrder,
};
