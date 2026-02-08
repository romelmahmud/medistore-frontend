"use client";
import { deleteMedicine } from "@/actions/medicine.actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LinkButton } from "@/components/ui/link-button";

import { MoreHorizontalIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function MedicineActions({
  medicineId,
}: {
  medicineId: string;
}) {
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    const toastId = toast.loading("Deleting medicine...");
    try {
      const res = await deleteMedicine(medicineId);
      toast.success("Medicine deleted successfully", { id: toastId });
    } catch (error) {
      toast.error("Failed to delete", { id: toastId });
    }

    setOpen(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8">
            <MoreHorizontalIcon />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <LinkButton
            href={`/dashboard/medicines/edit-medicine/${medicineId}`}
            variant="ghost"
            className="w-full justify-start p-0 pl-2 cursor-pointer"
          >
            Edit
          </LinkButton>

          <DropdownMenuItem
            className="cursor-pointer"
            variant="destructive"
            onClick={() => setOpen(true)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Confirmation Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <p>
            Are you sure you want to delete this medicine? This action cannot be
            undone.
          </p>
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
