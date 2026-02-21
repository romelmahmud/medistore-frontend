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
    <div className=" grid min-h-1/2 mt-[6rem] items-center  max-w-(--breakpoint-6xl)">
      <div className="mx-auto mt-10 max-w-(--breakpoint-lg) px-6 sm:mt-16 lg:col-span-3">
        <h2 className="text-start font-semibold text-4xl tracking-tight sm:text-5xl">
          How It Works
        </h2>
        <p className=" mt-4 max-w-[60ch] text-start text-foreground/80 sm:text-lg">
          Ordering medicines from MediStore is simple, secure, and convenient.
          Follow these three easy steps to get started.
        </p>
      </div>
      <div className="mx-auto mt-10 grid max-w-(--breakpoint-lg) gap-6 px-6 sm:mt-16 lg:grid-cols-3">
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
