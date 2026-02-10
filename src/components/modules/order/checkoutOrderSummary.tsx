"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/cart.context";

export default function CheckoutOrderSummary() {
  const { items } = useCart();

  const total = items.reduce(
    (sum: number, item: { price: number; quantity: number }) =>
      sum + item.price * item.quantity,
    0,
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between text-sm">
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-muted-foreground">
                {item.quantity} × ৳{item.price}
              </p>
            </div>

            <p className="font-medium">৳{item.quantity * item.price}</p>
          </div>
        ))}

        <Separator />

        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>৳{total}</span>
        </div>
      </CardContent>
    </Card>
  );
}
