import { LinkButton } from "@/components/ui/link-button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EditableOrderStatus } from "./order-status-edit";

export default function AdminOrderTable({ orders }: { orders: any[] }) {
  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-end pr-4">Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-mono text-sm">
              #{order.id.slice(0, 8)}
            </TableCell>

            <TableCell>৳{order.totalAmount}</TableCell>

            <TableCell>
              <EditableOrderStatus order={order} />
            </TableCell>

            <TableCell>
              {new Date(order.createdAt).toLocaleDateString()}
            </TableCell>

            <TableCell className="text-center">
              <div className="flex justify-end">
                <LinkButton href={`/orders/${order.id}`} variant="outline">
                  View Details
                </LinkButton>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
