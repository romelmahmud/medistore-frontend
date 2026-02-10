export type CreateOrderInput = {
  userId: string;
  shippingAddress: string;
  items: {
    medicineId: string;
    quantity: number;
  }[];
};
