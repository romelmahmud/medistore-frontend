import { getCategories } from "@/actions/category.actions";
import { AddMedicineForm } from "@/components/modules/dashboard/medicine/add-medicine";
import { Roles } from "@/constants/roles";
import { requireRole } from "@/lib/require-role";
type Category = {
  id: string;
  name: string;
};

const AddMedicine = async () => {
  await requireRole([Roles.admin, Roles.seller]);
  const categories = await getCategories();

  const categoriesData: Category[] =
    categories?.data.map(({ id, name }: Category) => ({ id, name })) ?? [];

  return (
    <div>
      <AddMedicineForm categories={categoriesData} />
    </div>
  );
};

export default AddMedicine;
