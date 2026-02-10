import { getAllOrders } from "@/actions/order.actions";
import AdminOrderTable from "@/components/modules/dashboard/orders/admin-order-table";

const SellerOrdersPage = async () => {
  const data = await getAllOrders();

  return (
    <div className="ml-5">
      <div className="max-w-7xl  px-4 mt-6">
        <h1 className="text-3xl font-semibold mb-6">All Orders</h1>

        {data.data.data.length === 0 ? (
          <div className="text-center text-muted-foreground">
            No Order placed yet.
          </div>
        ) : (
          <div className="border rounded-md overflow-hidden w-full">
            <AdminOrderTable orders={data.data.data} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerOrdersPage;
