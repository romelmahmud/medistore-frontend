"use client";
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
import { UserReturnType } from "@/types";

import { MoreHorizontalIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function UserActions({ user }: { user: UserReturnType }) {
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    const toastId = toast.loading("Deleting user...");
    console.log("User to delete:", user);
    try {
      toast.success("User deleted successfully", { id: toastId });
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
          <DropdownMenuItem
            className="cursor-pointer"
            variant="destructive"
            onClick={() => setOpen(true)}
          >
            {user.status === "ACTIVE" ? "Ban User" : "Activate User"}
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
