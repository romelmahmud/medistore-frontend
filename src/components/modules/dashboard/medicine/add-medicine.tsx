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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as z from "zod";

import { createMedicine, updateMedicine } from "@/actions/medicine.actions";
import ImageUpload from "@/components/ui/image-upload";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Category = {
  id: string;
  name: string;
};
export const formSchema = z.object({
  name: z.string().min(2, "Medicine name is required"),
  description: z.string().min(10, "Description is too short"),
  price: z.number().min(1, "Price must be greater than 0"),
  stock: z.number().min(0, "Stock cannot be negative"),
  dosage: z.string().min(1, "Medicine dosage is required"),
  categoryId: z.string().min(1, "Category is required"),
  manufacturer: z.string().min(2, "Manufacturer is required"),
  imageUrl: z.string().url("ImageUrl required"),
  status: z.enum(["ACTIVE", "INACTIVE"]),
});

export function AddMedicineForm({ categories, data, mode }: any) {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      name: data?.name || "",
      description: data?.description || "",
      price: data?.price || 0,
      stock: data?.stock || 0,
      dosage: data?.dosage || "",
      categoryId: data?.categoryId || "",
      manufacturer: data?.manufacturer || "",
      imageUrl: data?.imageUrl || "",
      status:
        data?.isActive === true
          ? "ACTIVE"
          : data?.isActive === false
            ? "INACTIVE"
            : "ACTIVE",
    },

    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const medicineData = {
        name: value.name,
        description: value.description,
        price: value.price,
        stock: value.stock,
        dosage: value.dosage,
        categoryId: value.categoryId,
        manufacturer: value.manufacturer,
        imageUrl: value.imageUrl,
        isActive: value.status === "ACTIVE" ? true : false,
      };

      const toastId = toast.loading(
        mode ? "Updating medicine..." : "Adding medicine",
      );
      try {
        let res;
        if (mode === "edit") {
          res = await updateMedicine(data.id, medicineData);
        } else {
          res = await createMedicine(medicineData);
        }

        if (res.error) {
          toast.error(
            mode ? "Failed to Update medicine..." : "Failed to Add medicine",
            { id: toastId },
          );

          return;
        }
        router.push("/dashboard/medicines");
        toast.success(
          mode
            ? "Medicine updated successfully"
            : "Medicine added successfully",
          { id: toastId },
        );
        if (!mode) {
          form.reset();
        }
      } catch (error) {
        toast.error(
          mode ? "Failed to Update medicine..." : "Failed to Add medicine",
          { id: toastId },
        );
      }
    },
  });
  const getButtonLabel = () => {
    if (form.state.isSubmitting) {
      return mode === "edit" ? "Updating..." : "Saving...";
    }
    return mode === "edit" ? "Update Medicine" : "Add Medicine";
  };

  return (
    <Card className="max-w-5xl mx-auto mt-5">
      <CardHeader>
        <CardTitle>{mode ? "Edit medicine" : "Add medicine"}</CardTitle>
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
                  <FieldLabel>Medicine Name</FieldLabel>
                  <Input
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>

            <FieldGroup className="flex flex-column md:flex-row">
              {/* Price */}
              <form.Field name="price">
                {(field) => (
                  <Field>
                    <FieldLabel>Price (৳)</FieldLabel>
                    <Input
                      type="number"
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              </form.Field>

              {/* Stock */}
              <form.Field name="stock">
                {(field) => (
                  <Field>
                    <FieldLabel>Stock</FieldLabel>
                    <Input
                      type="number"
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              </form.Field>
              {/* Stock */}
              <form.Field name="dosage">
                {(field) => (
                  <Field>
                    <FieldLabel>Dosage</FieldLabel>
                    <Input
                      type="text"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              </form.Field>
            </FieldGroup>
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
            {/* Category */}
            <form.Field name="categoryId">
              {(field) => (
                <Field>
                  <FieldLabel>Category</FieldLabel>
                  <Select
                    value={field.state.value}
                    onValueChange={field.handleChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat: Category) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>
            {/* Manufacturer */}
            <form.Field name="manufacturer">
              {(field) => (
                <Field>
                  <FieldLabel>Manufacturer</FieldLabel>
                  <Input
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
            {/* Status */}
            <form.Field name="status">
              {(field) => (
                <Field>
                  <FieldLabel>Status</FieldLabel>
                  <Select
                    value={field.state.value}
                    onValueChange={field.handleChange}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ACTIVE">Active</SelectItem>
                      <SelectItem value="INACTIVE">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>
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
