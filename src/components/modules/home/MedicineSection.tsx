import { MedicineCard } from "@/components/modules/shop/medicine-card";
import { Button } from "@/components/ui/button";
import { medicineService } from "@/services/medicine.service";
import Link from "next/link";

const MedicinesSection = async () => {
  const { data: medicineData }: any = await medicineService.getMedicines();
  const featuredMedicines = medicineData?.slice(0, 12) || [];

  return (
    <section className="py-16 mt-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center">
          <h2 className="font-semibold text-4xl tracking-tight sm:text-5xl">
            Featured Medicines
          </h2>
          <p className="mt-4 max-w-[60ch] mx-auto text-muted-foreground sm:text-lg">
            Browse our most trusted and popular medicines. Explore our
            collection and find the right medication for you.
          </p>
        </div>

        {/* Medicine Grid */}
        <div className="grid grid-cols-2 gap-4 mt-12 md:grid-cols-3 lg:grid-cols-4">
          {featuredMedicines?.map((item: any) => (
            <MedicineCard key={item.id} medicine={item} role="GUEST" />
          ))}
        </div>

        {/* Show More Button */}
        <div className="flex justify-center mt-12">
          <Link href="/shop">
            <Button size="lg" variant="outline">
              Show More Medicines
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MedicinesSection;
