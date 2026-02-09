"use client";

import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";

import { useCart } from "@/context/cart.context";
import CartDrawer from "./cart-drawer";

export default function CartButton() {
  const [open, setOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="relative"
        onClick={() => setOpen(true)}
      >
        <ShoppingCart size={18} />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 rounded-full">
            {totalItems}
          </span>
        )}
      </Button>

      <CartDrawer open={open} onOpenChange={setOpen} />
    </>
  );
}
