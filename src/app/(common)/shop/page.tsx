import { getCategories } from "@/actions/category.actions";
import MedicineFilters from "@/components/modules/dashboard/medicine/medicine-filter";
import { MedicineCard } from "@/components/modules/shop/medicine-card";
import PaginationControls from "@/components/ui/pagination-controls";
import { medicineService } from "@/services/medicine.service";

const ShopPage = async ({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) => {
  const params = await searchParams;
  const { data: medicineData, meta }: any = await medicineService.getMedicines({
    ...params,
  });
  const manufacturers = Array.from(
    new Set(medicineData?.map((medicine: any) => medicine.manufacturer)),
  ) as string[];

  const categories = await getCategories();

  const pagination = meta || {
    limit: 12,
    page: 1,
    total: 0,
    totalPage: 1,
  };

  return (
    <div>
      <div className=" max-w-7xl mx-auto mb-4 mt-4">
        <MedicineFilters
          categories={categories?.data}
          manufacturers={manufacturers}
          pageRoute="/shop"
        />
      </div>
      <div className="grid-cols-2 grid gap-4 md:grid-cols-3 lg:grid-cols-4 mt-8">
        {medicineData.map((item: any) => (
          <MedicineCard key={item.id} medicine={item} />
        ))}
      </div>
      <div className=" max-w-7xl mx-auto">
        <PaginationControls meta={pagination} />
      </div>
    </div>
  );
};

export default ShopPage;
