import { CreateCategoryForm } from "@/components/modules/dashboard/categories/add-category-form";
import { Roles } from "@/constants/roles";
import { requireRole } from "@/lib/require-role";

const CreateCategoryPage = async () => {
  await requireRole([Roles.admin]);
  return (
    <div>
      <CreateCategoryForm />
    </div>
  );
};

export default CreateCategoryPage;
