"use client";
import { updateUserStatus } from "@/actions/user.actions";
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

  const message =
    user.status === "ACTIVE"
      ? " Are you sure you want to Banned this User? "
      : "You are going to Activate this User? ";

  const handleBan = async () => {
    const toastId = toast.loading(
      user.status === "ACTIVE" ? "Banning user..." : "Activating user...",
    );

    try {
      await updateUserStatus(
        user.id,
        user.status === "ACTIVE" ? "BANNED" : "ACTIVE",
      );

      toast.success(
        user.status === "ACTIVE"
          ? "User banned successfully"
          : "User activated successfully",
        { id: toastId },
      );
    } catch (error) {
      toast.error("Failed to update user status", { id: toastId });
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
            variant={user.status === "ACTIVE" ? "destructive" : "default"}
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
            <DialogTitle>
              {user.status === "ACTIVE" ? "Ban User" : "Activate User"}
            </DialogTitle>
          </DialogHeader>
          <p>{message}</p>
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              variant={user.status === "ACTIVE" ? "destructive" : "secondary"}
              onClick={handleBan}
            >
              {user.status === "ACTIVE" ? "Ban User" : "Activate User"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
