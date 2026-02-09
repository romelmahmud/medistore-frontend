import { getCategories } from "@/actions/category.actions";
import CategoryList from "@/components/modules/dashboard/categories/category-list";
import { LinkButton } from "@/components/ui/link-button";

const AdminCategoriesPage = async () => {
  const categories = await getCategories();
  return (
    <div>
      <div className="flex items-center justify-between mb-4 pr-5 max-w-7xl mx-auto mt-5">
        <h1 className="text-3xl font-semibold">Categories</h1>
        <LinkButton
          href="/dashboard/categories/create-category"
          variant="outline"
          className="cursor-pointer"
        >
          Create Category
        </LinkButton>
      </div>

      <div className=" max-w-7xl mx-auto mt-12 ">
        <CategoryList categories={categories?.data} />
      </div>
    </div>
  );
};

export default AdminCategoriesPage;
