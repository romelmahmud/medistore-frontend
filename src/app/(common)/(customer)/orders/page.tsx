import { getCustomerOrders } from "@/actions/order.actions";
import { getUser } from "@/actions/user.actions";
import OrderTable from "@/components/modules/order/order-table";
import { Roles } from "@/constants/roles";
import { requireRole } from "@/lib/require-role";
export const dynamic = "force-dynamic";

const CustomerOrdersPage = async ({
  params,
}: {
  params: Promise<{ customerId: string }>;
}) => {
  await requireRole([Roles.customer]);
  const data = await getUser();

  const { data: orders } = await getCustomerOrders(data.id);

  return (
    <div className="max-w-7xl mx-auto px-4 mt-6">
      <h1 className="text-3xl font-semibold mb-6">My Orders</h1>

      {orders?.data.length === 0 ? (
        <div className="text-center text-muted-foreground">
          You haven’t placed any orders yet.
        </div>
      ) : (
        <div className="border rounded-md overflow-hidden">
          <OrderTable orders={orders?.data} />
        </div>
      )}
    </div>
  );
};

export default CustomerOrdersPage;
