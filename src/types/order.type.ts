export type CreateOrderInput = {
  shippingAddress: string;
  items: {
    medicineId: string;
    quantity: number;
  }[];
};

export const ORDER_STATUSES = [
  "PLACED",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];
