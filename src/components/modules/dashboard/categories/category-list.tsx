"use client";

import { deleteCategory } from "@/actions/category.actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LinkButton } from "@/components/ui/link-button";
import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

export interface Category {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
}

interface CategoryListProps {
  categories: Category[];
}

export default function CategoryList({ categories }: CategoryListProps) {
  if (!categories?.length) {
    return (
      <div className="text-center text-muted-foreground py-12">
        No categories found
      </div>
    );
  }

  const onDelete = async (categoryId: string) => {
    const toastId = toast.loading("Deleting category...");
    try {
      const res = await deleteCategory(categoryId);
      if (res.data.success !== true) {
        toast.error("Category deletion error", { id: toastId });
        return;
      }
      toast.success("Category deleted successfully", { id: toastId });
    } catch (error) {
      toast.error("Something happened", { id: toastId });
    }
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {categories.map((category) => (
        <Card key={category.id} className="relative">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-3">
              {category.imageUrl ? (
                <Image
                  src={category.imageUrl}
                  alt={category.name}
                  width={40}
                  height={40}
                  className="rounded-md object-cover"
                />
              ) : (
                <div className="h-10 w-10 rounded-md bg-muted" />
              )}
              <span>{category.name}</span>
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground line-clamp-2">
              {category.description?.slice(0, 100) || "No description provided"}
              .
            </p>

            <div className="flex justify-end gap-2 items-center">
              {/* Edit */}

              <LinkButton
                href={`/dashboard/categories/edit-category/${category.id}`}
                variant="outline"
                className="cursor-pointer p-0"
              >
                <Pencil className="h-2 w-2 mr-1" />
                Edit
              </LinkButton>

              {/* Delete */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border border-destructive cursor-pointer text-destructive hover:text-white hover:bg-destructive"
                  >
                    <Trash2 className="h-2 w-2 mr-1" />
                    Delete
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete category?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      the category.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => onDelete(category.id)}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
