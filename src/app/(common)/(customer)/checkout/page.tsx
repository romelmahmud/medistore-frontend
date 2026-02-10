import CheckoutForm from "@/components/modules/order/checkoutForm";
import CheckoutOrderSummary from "@/components/modules/order/checkoutOrderSummary";

const CheckoutPage = async () => {
  return (
    <div className="max-w-2xl mx-auto py-10 flex flex-col gap-8 ">
      <CheckoutOrderSummary />
      <CheckoutForm />
    </div>
  );
};

export default CheckoutPage;
