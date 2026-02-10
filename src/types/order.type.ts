export type CreateOrderInput = {
  shippingAddress: string;
  items: {
    medicineId: string;
    quantity: number;
  }[];
};
