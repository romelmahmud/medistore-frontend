import { Search, ShoppingCart, Truck } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Search & Select Medicines",
    description:
      "Browse trusted over-the-counter medicines and healthcare products. Use filters to quickly find what you need.",
  },
  {
    icon: ShoppingCart,
    title: "Add to Cart & Checkout",
    description:
      "Add products to your cart and complete your order with secure payment options, including Cash on Delivery.",
  },
  {
    icon: Truck,
    title: "Fast & Reliable Delivery",
    description:
      "Sit back and relax while we deliver your medicines safely to your doorstep with real-time order tracking.",
  },
];

const HowItWorks = () => {
  return (
    <div className=" flex flex-col items-center justify-center mt-12 max-w-(--breakpoint-2xl)">
      <div className="w-full max-w-(--breakpoint-xl) px-6 py-10">
        <h2 className="text-pretty font-bold text-4xl tracking-[-0.03em] sm:mx-auto sm:max-w-xl sm:text-center md:text-[2.75rem] md:leading-[1.2]">
          How It Works
        </h2>
        <p className="mt-2 text-lg max-w-[60ch] mx-auto text-muted-foreground text-center sm:text-xl">
          Ordering medicines from MediStore is simple, secure, and convenient.
          Follow these three easy steps to get started.
        </p>
      </div>
      <div className="mx-auto mt-4 grid max-w-(--breakpoint-lg) gap-6 px-6 lg:grid-cols-3">
        {steps.map((step) => (
          <div
            className="flex flex-col rounded-xl border px-5 py-6"
            key={step.title}
          >
            <div className="mb-4 flex h-15 w-15 items-center justify-center  bg-blue-200/10 rounded-md text-blue-800">
              <step.icon className="size-10" />
            </div>
            <span className="font-semibold text-lg">{step.title}</span>
            <p className="mt-1 text-[15px] text-foreground/80">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
