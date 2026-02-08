import { getCategories } from "@/actions/category.actions";
import { AddMedicineForm } from "@/components/modules/dashboard/add-medicine";
type Category = {
  id: string;
  name: string;
};

const AddMedicine = async () => {
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
