import { MedicineCard } from "@/components/modules/shop/medicine-card";
import { medicineService } from "@/services/medicine.service";

const ShopPage = async () => {
  const { data: medicineData }: any = await medicineService.getMedicines(
    {},
    {
      cache: "no-store",
    },
  );
  return (
    <div className="grid-cols-2 grid gap-4 md:grid-cols-3 lg:grid-cols-5">
      {medicineData.map((item: any) => (
        <MedicineCard key={item.id} medicine={item} />
      ))}
    </div>
  );
};

export default ShopPage;
