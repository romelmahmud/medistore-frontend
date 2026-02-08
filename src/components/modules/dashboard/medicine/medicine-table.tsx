import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MedicineReturnType } from "@/types";
import { MoreHorizontalIcon } from "lucide-react";

export default function MedicineTable({
  medicineData,
}: {
  medicineData: MedicineReturnType[];
}) {
  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead>Manufacturer</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {medicineData.map((medicine: MedicineReturnType) => (
          <TableRow key={medicine.id}>
            <TableCell className="font-medium">{medicine.name}</TableCell>
            <TableCell>{medicine.price}</TableCell>
            <TableCell>{medicine.stock}</TableCell>
            <TableCell>{medicine.manufacturer}</TableCell>
            <TableCell>{medicine.category.name}</TableCell>
            <TableCell
              className={`${
                medicine.isActive ? "text-green-500" : "text-red-500"
              }`}
            >
              {medicine.isActive ? "Active" : "Inactive"}
            </TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="size-8">
                    <MoreHorizontalIcon />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="cursor-pointer">
                    Edit
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    className="cursor-pointer"
                    variant="destructive"
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
