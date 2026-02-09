import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { AddToCartButton } from "./add-to-cart-button";

export function MedicineCard({ medicine }: any) {
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0  rounded rounded-5">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <img
        src={medicine.imageUrl}
        alt="Event cover"
        className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
      />
      <CardHeader>
        {/* <CardAction>
          <Badge variant="secondary">Featured</Badge>
        </CardAction> */}
        <CardTitle>{medicine.name}</CardTitle>
        <p className="text-sm text-gray-300">{medicine.category.name}</p>
        <CardDescription className="text-green-600 text-md font-semibold">
          ৳ {medicine.price}
        </CardDescription>
        <Link
          href={`/shop/${medicine.id}`}
          className="underline text-sm hover:text-primary"
        >
          View details
        </Link>
      </CardHeader>
      <CardFooter>
        <AddToCartButton medicine={medicine} />
      </CardFooter>
    </Card>
  );
}
