import { getCategoryById } from "@/actions/category.actions";
import { CreateCategoryForm } from "@/components/modules/dashboard/categories/add-category-form";

const EditCategoryPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const category = await getCategoryById(id);

  const mode = "edit";

  return (
    <div>
      <CreateCategoryForm mode={mode} data={category.data.data} />
    </div>
  );
};

export default EditCategoryPage;
