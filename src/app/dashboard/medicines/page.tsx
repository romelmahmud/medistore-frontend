import { getCategories } from "@/actions/category.actions";
import MedicineFilters from "@/components/modules/dashboard/medicine/medicine-filter";
import MedicineTableWrapper from "@/components/modules/dashboard/medicine/medicine-table-wrapper";
import PaginationControls from "@/components/ui/pagination-controls";
import { medicineService } from "@/services/medicine.service";
import Link from "next/link";

const MedicinePage = async ({
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
    limit: 10,
    page: 1,
    total: 0,
    totalPages: 1,
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-4 pr-5 max-w-7xl mx-auto">
        <h1 className="text-3xl font-semibold">Medicine</h1>
        <Link
          href="/dashboard/medicines/add-medicine"
          className="btn btn-outline border rounded-md py-2 px-4"
        >
          Add Medicine
        </Link>
      </div>
      <div className=" max-w-7xl mx-auto">
        <MedicineFilters
          categories={categories?.data}
          manufacturers={manufacturers}
        />
      </div>

      <div className="overflow-x-auto max-w-7xl mx-auto mt-12 border rounded-md">
        <MedicineTableWrapper medicineData={medicineData} />
      </div>
      <div className=" max-w-7xl mx-auto">
        <PaginationControls meta={pagination} />
      </div>
    </div>
  );
};

export default MedicinePage;
