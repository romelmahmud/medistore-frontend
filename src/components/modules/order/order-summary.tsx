import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderStatusBadge } from "./order-status-badge";

export function OrderSummary({ order }: { order: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Order ID</span>
          <span className="font-mono">#{order.id.slice(0, 8)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Status</span>
          <OrderStatusBadge status={order.status} />
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Payment</span>
          <span>{order.paymentMethod}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Placed On</span>
          <span>{new Date(order.createdAt).toLocaleDateString()}</span>
        </div>

        <div>
          <p className="text-muted-foreground mb-1">Shipping Address</p>
          <p className="text-sm">{order.shippingAddress}</p>
        </div>
      </CardContent>
    </Card>
  );
}
