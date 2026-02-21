import { LinkButton } from "@/components/ui/link-button";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="flex min-h-screen mt-5 lg:mt-[5rem] justify-center max-w-(--breakpoint-2xl)">
      <div className="mx-auto grid w-full  gap-12 px-6 py-12 lg:grid-cols-2">
        <div>
          <h1 className="mt-6 max-w-[17ch] font-bold text-4xl leading-[1]! tracking-[-0.035em] md:text-5xl lg:text-[2.75rem] xl:text-[3.25rem]">
            Your Trusted Online Pharmacy for Everyday Healthcare
          </h1>
          <p className="mt-8 max-w-[60ch] text-foreground/80 sm:text-lg">
            MediStore makes it easy to find and order genuine over-the-counter
            medicines and healthcare essentials. Enjoy secure checkout, fast
            delivery, and reliable service — all from the comfort of your home.
          </p>
          <div className="mt-10 flex items-center gap-4">
            <LinkButton
              href="/shop"
              className="inline-flex h-10 items-center justify-center rounded-md px-6 py-3 text-sm font-semibold outline  cursor-pointer"
            >
              Shop Medicines
            </LinkButton>
          </div>
        </div>
        <div className=" w-full rounded-xl ">
          <Image
            className="rounded-xl"
            src="/hero.png"
            alt="hero"
            width={1000}
            height={1000}
          />
        </div>
      </div>
    </div>
  );
}
