"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart.context";
import { CartItemType } from "@/types";

export function AddToCartButton({ medicine }: { medicine: CartItemType }) {
  const { addItem } = useCart();

  return (
    <Button
      variant="outline"
      className="cursor-pointer"
      onClick={() =>
        addItem({
          id: medicine.id,
          name: medicine.name,
          price: medicine.price,
          stock: medicine.stock,
          quantity: 1,
          imageUrl: medicine.imageUrl,
        })
      }
    >
      Add to Cart
    </Button>
  );
}
