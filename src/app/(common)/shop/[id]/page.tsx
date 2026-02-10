import { AddToCartButton } from "@/components/modules/shop/add-to-cart-button";
import Reviews from "@/components/modules/shop/reviews";
import { Card, CardContent } from "@/components/ui/card";
import { medicineService } from "@/services/medicine.service";
import { CartItemType } from "@/types";
import Image from "next/image";
import Link from "next/link";

const MedicineDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const medicineData = await medicineService.getMedicineById(id);
  const medicine = medicineData?.data;
  const cartData: CartItemType = {
    id: medicine.id,
    name: medicine.name,
    price: medicine.price,
    stock: medicine.stock,
    quantity: 1,
    imageUrl: medicine.imageUrl,
  };
  return (
    <>
      <div className="container py-8">
        <div className="grid md:grid-cols-2 gap-10">
          <Card className="">
            <CardContent className="p-4">
              <Image
                src={medicine?.imageUrl}
                alt={medicine?.name}
                width={600}
                height={600}
                className="rounded-md"
              />
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h1 className="text-3xl font-bold mb-2">{medicine?.name}</h1>
            <Link
              className="text-sm hover:underline underline-offset-2"
              href={`/category/${medicine?.category?.id}`}
            >
              {medicine?.category?.name}
            </Link>
            <p className="text-muted-foreground mt-3">
              {medicine?.description}
            </p>
            <p className="text-sm">Dosage: {medicine?.dosage}</p>
            <p className="text-xl font-semibold">৳ {medicine?.price}</p>

            <p className="text-sm">Manufacturer: {medicine?.manufacturer}</p>

            <p className="text-sm">Stock: {medicine?.stock}</p>

            <AddToCartButton medicine={cartData} />
          </div>
        </div>
      </div>
      <div className="container border px-5 py-2 rounded-md">
        <Reviews />
      </div>
    </>
  );
};

export default MedicineDetailsPage;
