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
          <TableHead>Address</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-mono text-sm">
              #{order.id.slice(0, 8)}
            </TableCell>

            <TableCell>৳{order.totalAmount}</TableCell>
            <TableCell>{order.shippingAddress}</TableCell>

            <TableCell>
              <EditableOrderStatus order={order} />
            </TableCell>

            <TableCell>
              {new Date(order.createdAt).toLocaleDateString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
