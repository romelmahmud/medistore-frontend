// components/order-status-badge.tsx

import { Badge } from "@/components/ui/badge";

const statusMap: Record<string, string> = {
  PLACED: "bg-blue-500",
  PROCESSING: "bg-yellow-500",
  SHIPPED: "bg-purple-500",
  DELIVERED: "bg-green-600",
  CANCELLED: "bg-red-500",
};

export function OrderStatusBadge({ status }: { status: string }) {
  return <Badge className={`${statusMap[status]} text-white`}>{status}</Badge>;
}
