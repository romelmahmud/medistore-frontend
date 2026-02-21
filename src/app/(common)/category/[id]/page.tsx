import { getMedicineByCategory } from "@/actions/medicine.actions";
import { MedicineCard } from "@/components/modules/shop/medicine-card";
import { userService } from "@/services/user.service";

const SingleCategoryPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { data } = await userService.getSession();
  const { id } = await params;
  const medicineData = await getMedicineByCategory(id);
  let userRole: string = data?.user?.role || "GUEST";
  console.log(medicineData);

  return (
    <div className=" max-w-7xl mx-auto mb-4 mt-4 max-h-screen">
      <div>
        <h1 className="text-3xl font-bold">
          <span className="text-pretty text-2xl font-normal block mb-4">
            Medicines in category:{" "}
          </span>
          {medicineData?.data[0]?.category?.name || "N/A"}
        </h1>
        <p className="">{medicineData?.data.length} medicines found</p>
      </div>
      <div className="grid-cols-2 grid gap-4 md:grid-cols-3 lg:grid-cols-4 mt-8">
        {medicineData?.data.length === 0 && (
          <p className="text-center text-gray-500 col-span-full">
            No medicines found in this category.
          </p>
        )}
        {medicineData?.data.map((item: any) => (
          <MedicineCard key={item.id} medicine={item} role={userRole} />
        ))}
      </div>
    </div>
  );
};

export default SingleCategoryPage;
