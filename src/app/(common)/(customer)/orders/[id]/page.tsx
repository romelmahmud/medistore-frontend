import { getOrderById } from "@/actions/order.actions";
import { OrderItemsTable } from "@/components/modules/order/order-items-table";
import { OrderSummary } from "@/components/modules/order/order-summary";
import { notFound } from "next/navigation";

const CustomerSingleOrderPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const res = await getOrderById(id);
  console.log(res.data.data.items);
  if (!res) {
    notFound();
  }

  return (
    <div>
      {" "}
      <div className="max-w-6xl mx-auto px-4 mt-6 space-y-6">
        <h1 className="text-3xl font-semibold">Order Details</h1>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Left */}
          <div className="md:col-span-1">
            <OrderSummary order={res.data.data} />
          </div>

          {/* Right */}
          <div className="md:col-span-2 border rounded-md">
            <OrderItemsTable items={res.data.data.items} />

            <div className="flex justify-end p-4 border-t font-semibold">
              Total: ৳{res.data.data.totalAmount}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerSingleOrderPage;
