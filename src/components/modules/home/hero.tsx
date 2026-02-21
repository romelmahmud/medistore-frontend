import { LinkButton } from "@/components/ui/link-button";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-16 px-6 py-16">
      <div className="max-w-3xl text-center">
        <h1 className="mt-6 font-bold text-4xl tracking-tighter sm:text-5xl md:text-6xl md:leading-[1] lg:text-7xl">
          Your Trusted Online Pharmacy for Everyday Healthcare
        </h1>
        <p className="mt-6 text-foreground/80 md:text-lg max-">
          MediStore makes it easy to find and order genuine over-the-counter
          medicines and healthcare essentials. Enjoy secure checkout, fast
          delivery, and reliable service — all from the comfort of your home.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <LinkButton
            href="/medicines"
            className="rounded-md outline cursor-pointer"
            size="lg"
          >
            Shop Medicines
          </LinkButton>
        </div>
      </div>
      <div className="flex items-center justify-center w-full max-w-(--breakpoint-xl) rounded-xl ">
        <Image
          src="/hero.png"
          alt="hero"
          width={1000}
          height={1000}
          className="rounded-xl"
        />
      </div>
    </div>
  );
}
