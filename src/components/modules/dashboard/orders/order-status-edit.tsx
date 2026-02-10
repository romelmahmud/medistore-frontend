"use client";

import { updateOrderStatus } from "@/actions/order.actions";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ORDER_STATUSES, OrderStatus } from "@/types/order.type";

import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// Badge mapping for visual
const statusVariantMap: Record<
  OrderStatus,
  "default" | "secondary" | "destructive" | "outline"
> = {
  PLACED: "secondary",
  PROCESSING: "default",
  SHIPPED: "outline",
  DELIVERED: "default",
  CANCELLED: "destructive",
};

// Status badge with optional spinner
function OrderStatusBadge({
  status,
  loading,
}: {
  status: OrderStatus;
  loading?: boolean;
}) {
  return (
    <div className="flex items-center gap-1">
      <span
        className={`inline-flex px-2 py-1 rounded-md text-sm font-medium
        ${statusVariantMap[status] === "secondary" ? "bg-secondary text-secondary-foreground border border-blue-500" : ""}
        ${statusVariantMap[status] === "default" ? "bg-default text-default-foreground border border-yellow-500" : ""}
        ${statusVariantMap[status] === "destructive" ? "bg-destructive text-destructive-foreground" : ""}
        ${statusVariantMap[status] === "outline" ? "border border-green-500" : ""}
      `}
      >
        {status}
      </span>
      {loading && (
        <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
      )}
    </div>
  );
}

// Editable status per row
export function EditableOrderStatus({ order }: { order: any }) {
  const [status, setStatus] = useState<OrderStatus>(order.status);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);

    try {
      const res = await updateOrderStatus(order.id, status);

      toast.success("Order status updated!");
      setEditing(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update order status");
      setStatus(order.status);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {editing ? (
        <>
          <Select
            value={status}
            onValueChange={(v) => setStatus(v as OrderStatus)}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ORDER_STATUSES.map((s) => (
                <SelectItem key={s} value={s}>
                  <OrderStatusBadge status={s} />
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            size="sm"
            onClick={handleSave}
            disabled={loading || status === order.status}
          >
            Save
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setStatus(order.status);
              setEditing(false);
            }}
          >
            Cancel
          </Button>
        </>
      ) : (
        <div className="flex items-center gap-2">
          <OrderStatusBadge status={status} loading={loading} />
          <Button
            size="sm"
            variant="outline"
            onClick={() => setEditing(true)}
            disabled={loading}
          >
            Edit
          </Button>
        </div>
      )}
    </div>
  );
}
