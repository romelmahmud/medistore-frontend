import { env } from "@/env";
import { CreateOrderInput } from "@/types";
import { OrderStatus } from "@/types/order.type";
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

const getAllOrders = async () => {
  try {
    const cookieStore = await cookies();

    const res = await fetch(`${API_URL}/orders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      next: {
        tags: ["orders"],
      },
    });
    const data = await res.json();
    if (!res.ok || data.success === false) {
      return {
        data: null,
        error: {
          message: data.message || "Orders not found",
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

const getCustomerOrders = async (customerId: string) => {
  try {
    const cookieStore = await cookies();

    const res = await fetch(`${API_URL}/orders/customer/${customerId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      next: {
        tags: ["customer-orders"],
      },
    });
    const data = await res.json();
    if (!res.ok || data.success === false) {
      return {
        data: null,
        error: {
          message: data.message || "Orders not found",
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

const getOrderById = async (orderId: string) => {
  try {
    const cookieStore = await cookies();

    const res = await fetch(`${API_URL}/orders/${orderId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      next: {
        tags: ["order-by-id"],
      },
    });
    const data = await res.json();
    if (!res.ok || data.success === false) {
      return {
        data: null,
        error: {
          message: data.message || "Order not found",
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

const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
  try {
    const cookieStore = await cookies();

    const res = await fetch(`${API_URL}/orders/${orderId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify({ status }),
    });
    const data = await res.json();
    if (!res.ok || data.success === false) {
      return {
        data: null,
        error: {
          message: data.message || "Order status update failed",
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
  getAllOrders,
  getCustomerOrders,
  getOrderById,
  updateOrderStatus,
};
