"use client";

import { useForm } from "@tanstack/react-form";
import { z } from "zod";

import { createOrder } from "@/actions/order.actions";
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
import { useCart } from "@/context/cart.context";
import { userService } from "@/services/user.service";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const checkoutSchema = z.object({
  shippingAddress: z.string().min(10, "Address must be at least 10 characters"),
  paymentMethod: z.enum(["COD"]),
});

const CheckoutPage = () => {
  const router = useRouter();
  const { clearCart } = useCart();
  const form = useForm({
    defaultValues: {
      shippingAddress: "",
      paymentMethod: "COD",
    },
    validators: {
      onSubmit: checkoutSchema,
    },
    onSubmit: async ({ value }) => {
      const { data } = await userService.getSession();
      const userId = data.user.id;
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");

      const orderData = {
        userId,
        shippingAddress: value.shippingAddress,
        paymentMethod: value.paymentMethod,
        items: cart.map((item: any) => ({
          medicineId: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
      };

      console.log("ORDER data:", orderData);

      const toastId = toast.loading("Creating Order....");

      try {
        const res = await createOrder(orderData);
        if (res.error) {
          toast.error("Failed to Create Order", { id: toastId });
          return;
        }
        toast.success("Order creation successful");
        localStorage.removeItem("cart");
        clearCart();
        router.push("/orders");
      } catch (error) {}
      toast.error("Failed to Create Order", { id: toastId });
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

            <Button type="submit" className="w-full cursor-pointer">
              Place Order
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CheckoutPage;
