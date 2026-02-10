"use client";

import { useForm } from "@tanstack/react-form";
import { z } from "zod";

import CheckoutOrderSummary from "@/components/modules/order/checkoutOrderSummary";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const checkoutSchema = z.object({
  shippingAddress: z.string().min(10, "Address must be at least 10 characters"),
  paymentMethod: z.enum(["COD"]),
});

const CheckoutPage = () => {
  const form = useForm({
    defaultValues: {
      shippingAddress: "",
      paymentMethod: "COD",
    },
    validators: {
      onSubmit: checkoutSchema,
    },
    onSubmit: async ({ value }) => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");

      const payload = {
        shippingAddress: value.shippingAddress,
        paymentMethod: value.paymentMethod,
        items: cart.map((item: any) => ({
          medicineId: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
      };

      console.log("ORDER PAYLOAD 👉", payload);

      // TODO: POST to backend
      // await api.post("/orders", payload);

      // Clear cart after success
      // localStorage.removeItem("cart");
    },
  });

  return (
    <div className="max-w-2xl mx-auto py-10 flex flex-col gap-8 ">
      <CheckoutOrderSummary />
      <Card>
        <CardHeader>
          <CardTitle>Checkout</CardTitle>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="space-y-6"
          >
            {/* Shipping Address */}
            <form.Field name="shippingAddress">
              {(field) => (
                <div className="space-y-2">
                  <Label>Delivery Address</Label>
                  <Textarea
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Enter full delivery address"
                  />
                  {field.state.meta.errors && (
                    <p className="text-sm text-red-500">
                      {Array.isArray(field.state.meta.errors)
                        ? field.state.meta.errors
                            .map((err) => err?.message)
                            .join(", ")
                        : String(field.state.meta.errors)}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            {/* Payment Method */}
            <form.Field name="paymentMethod">
              {(field) => (
                <div className="space-y-2">
                  <Label>Payment Method</Label>
                  <Select
                    value={field.state.value}
                    onValueChange={field.handleChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="COD">Cash on Delivery</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </form.Field>

            <Button type="submit" className="w-full">
              Place Order
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CheckoutPage;
