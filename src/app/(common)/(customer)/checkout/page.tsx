import CheckoutForm from "@/components/modules/order/checkoutForm";
import CheckoutOrderSummary from "@/components/modules/order/checkoutOrderSummary";
import { Roles } from "@/constants/roles";
import { requireRole } from "@/lib/require-role";
export const dynamic = "force-dynamic";
const CheckoutPage = async () => {
  await requireRole([Roles.customer]);
  return (
    <div className="max-w-2xl mx-auto py-10 flex flex-col gap-8 ">
      <CheckoutOrderSummary />
      <CheckoutForm />
    </div>
  );
};

export default CheckoutPage;
