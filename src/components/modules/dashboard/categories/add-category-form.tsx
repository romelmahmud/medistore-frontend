"use client";

import { useForm } from "@tanstack/react-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import * as z from "zod";

import ImageUpload from "@/components/ui/image-upload";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const formSchema = z.object({
  name: z.string().min(2, "Medicine name is required"),
  description: z.string().min(10, "Description is too short"),

  imageUrl: z.string().url("ImageUrl required"),
});

export function CreateCategoryForm({ data, mode }: any) {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      name: data?.name || "",
      description: data?.description || "",

      imageUrl: data?.imageUrl || "",
    },

    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const categoryData = {
        name: value.name,
        description: value.description,

        imageUrl: value.imageUrl,
      };

      const toastId = toast.loading(
        mode ? "Updating category..." : "Adding category",
      );
      // try {
      //   let res;
      //   if (mode === "edit") {
      //     res = await updateMedicine(data.id, medicineData);
      //   } else {
      //     res = await createMedicine(medicineData);
      //   }

      //   if (res.error) {
      //     toast.error(
      //       mode ? "Failed to Update category..." : "Failed to Add category",
      //       { id: toastId },
      //     );

      //     return;
      //   }
      //   router.push("/dashboard/categories");
      //   toast.success(
      //     mode
      //       ? "Category updated successfully"
      //       : "Category added successfully",
      //     { id: toastId },
      //   );
      //   if (!mode) {
      //     form.reset();
      //   }
      // } catch (error) {
      //   toast.error(
      //     mode ? "Failed to Update category..." : "Failed to Add category",
      //     { id: toastId },
      //   );
      // }
    },
  });
  const getButtonLabel = () => {
    if (form.state.isSubmitting) {
      return mode === "edit" ? "Updating..." : "Saving...";
    }
    return mode === "edit" ? "Update Category" : "Create Category";
  };

  return (
    <Card className="max-w-5xl mx-auto mt-5">
      <CardHeader>
        <CardTitle>{mode ? "Edit Category" : "Create Category"}</CardTitle>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-6"
        >
          <FieldGroup>
            {/* Name */}
            <form.Field name="name">
              {(field) => (
                <Field>
                  <FieldLabel>Category Name</FieldLabel>
                  <Input
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>

            {/* Description */}
            <form.Field name="description">
              {(field) => (
                <Field>
                  <FieldLabel>Description</FieldLabel>
                  <Textarea
                    rows={6}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>
          </FieldGroup>

          <FieldGroup className="flex flex-column md:flex-row">
            <ImageUpload form={form} />
          </FieldGroup>

          <Button
            type="submit"
            disabled={!form.state.canSubmit || form.state.isSubmitting}
            className="w-full md:w-1/2 cursor-pointer"
          >
            {getButtonLabel()}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
