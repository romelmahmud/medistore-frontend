import { getCategories } from "@/actions/category.actions";
import Link from "next/link";

const Categories = async () => {
  const categories = await getCategories();
  return (
    <div
      id="categories"
      className="flex items-center justify-center mt-12 max-w-(--breakpoint-2xl)"
    >
      <div className="w-full max-w-(--breakpoint-xl) px-6 py-10">
        <h2 className="text-pretty font-bold text-4xl tracking-[-0.03em] sm:mx-auto sm:max-w-xl sm:text-center md:text-[2.75rem] md:leading-[1.2]">
          Browse medicines by category
        </h2>
        <p className="mt-2 text-lg max-w-[60ch] mx-auto text-muted-foreground text-center sm:text-xl">
          Find the Right Medicines, Faster — from pain relief and cold remedies
          to vitamins and personal care — all sourced from trusted
          pharmaceutical suppliers.
        </p>
        <div className="mt-12 grid gap-6 sm:mt-16 sm:gap-y-8 md:grid-cols-2 lg:grid-cols-3">
          {categories?.data.map((category: any) => (
            <Link
              href={`/category/${category.id}`}
              key={category.id}
              className="border rounded-lg p-4 transition-colors hover:bg-muted"
            >
              <div className="-mx-2 flex max-w-lg items-center gap-6 rounded-lg sm:mx-0">
                <img
                  src={`/${category?.imageUrl}`}
                  alt={category.name}
                  width={80}
                  height={80}
                  className="h-20 w-20 rounded-lg object-fit"
                />

                <div className="">
                  <span className="font-semibold text-lg tracking-[-0.015em]">
                    {category.name}
                  </span>
                  <p className="mt-1 text-pretty text-muted-foreground text-sm">
                    {category.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
