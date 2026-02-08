import { getCategories } from "@/actions/category.actions";
import { getMedicineById } from "@/actions/medicine.actions";
import { AddMedicineForm } from "@/components/modules/dashboard/medicine/add-medicine";
type Category = {
  id: string;
  name: string;
};

const EditMedicinePage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const medicine = await getMedicineById(id);
  const categories = await getCategories();

  const categoriesData: Category[] =
    categories?.data.map(({ id, name }: Category) => ({ id, name })) ?? [];
  const mode = "edit";

  return (
    <div>
      <AddMedicineForm
        categories={categoriesData}
        data={medicine?.data}
        mode={mode}
      />
    </div>
  );
};

export default EditMedicinePage;
