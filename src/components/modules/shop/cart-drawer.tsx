"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCart } from "@/context/cart.context";

import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const { items, updateQuantity, removeItem, totalItems, totalPrice } =
    useCart();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:w-[400px] p-2">
        <SheetHeader>
          <SheetTitle>My Cart ({totalItems})</SheetTitle>
        </SheetHeader>

        {/* Cart Items */}
        <div className="mt-6 space-y-4">
          {items.length === 0 && (
            <p className="text-sm text-muted-foreground">Your cart is empty</p>
          )}

          {items.map((item) => (
            <div key={item.id} className="flex gap-3 border rounded-md p-3">
              {item.imageUrl && (
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={60}
                  height={60}
                  className="rounded object-cover"
                />
              )}

              <div className="flex-1">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-muted-foreground">৳{item.price}</p>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2 mt-2">
                  <Button
                    size="icon"
                    variant="outline"
                    className="cursor-pointer"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <Minus size={14} />
                  </Button>

                  <span className="w-6 text-center">{item.quantity}</span>

                  <Button
                    size="icon"
                    variant="outline"
                    className="cursor-pointer"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus size={14} />
                  </Button>

                  <Button
                    size="icon"
                    variant="ghost"
                    className="cursor-pointer"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 size={16} className="text-red-500" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t mt-6 pt-4 space-y-3">
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>৳{totalPrice}</span>
            </div>

            <Button className="w-full cursor-pointer">Checkout</Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
