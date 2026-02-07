import { getCategories } from "@/actions/category.actions";
import { AddMedicineServer } from "@/components/modules/seller/add-medicine";
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
      <AddMedicineServer categories={categoriesData} />
    </div>
  );
};

export default AddMedicine;
