"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

type ActionType = "apply" | "reset" | null;
interface MedicineFiltersProps {
  categories: { id: string; name: string }[];
  manufacturers: string[];
}

export default function MedicineFilters({
  categories,
  manufacturers,
}: MedicineFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [activeAction, setActiveAction] = useState<ActionType>(null);

  const [filters, setFilters] = useState({
    search: searchParams.get("search") ?? "",
    category: searchParams.get("category") ?? "",
    manufacturer: searchParams.get("manufacturer") ?? "",
    minPrice: searchParams.get("minPrice") ?? "",
    maxPrice: searchParams.get("maxPrice") ?? "",
    isActive: searchParams.get("isActive") ?? "",
    sortBy: searchParams.get("sortBy") ?? "createdAt",
    sortOrder: searchParams.get("sortOrder") ?? "desc",
  });

  const applyFilters = () => {
    setActiveAction("apply");
    startTransition(() => {
      const params = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.set(key, value);
      });

      params.set("page", "1");
      router.push(`?${params.toString()}`);
    });
  };
  const resetFilters = () => {
    setActiveAction("reset");
    startTransition(() => {
      setFilters({
        search: "",
        category: "",
        manufacturer: "",
        minPrice: "",
        maxPrice: "",
        isActive: "",
        sortBy: "createdAt",
        sortOrder: "desc",
      });

      router.push("/dashboard/medicines");
    });
  };
  useEffect(() => {
    if (!isPending) {
      setActiveAction(null);
    }
  }, [isPending]);

  return (
    <div
      className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 border p-4
    rounded-md"
    >
      {/* Search */}
      <Input
        disabled={isPending}
        placeholder="Search medicine..."
        value={filters.search}
        onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
      />

      {/* Category */}
      <Select
        value={filters.category}
        disabled={isPending}
        onValueChange={(value) =>
          setFilters((f) => ({ ...f, category: value }))
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((c) => (
            <SelectItem key={c.id} value={c.name}>
              {c.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Manufacturer */}
      <Select
        value={filters.manufacturer}
        disabled={isPending}
        onValueChange={(value) =>
          setFilters((f) => ({ ...f, manufacturer: value }))
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Manufacturer" />
        </SelectTrigger>
        <SelectContent>
          {manufacturers.map((m) => (
            <SelectItem key={m} value={m}>
              {m}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Min Price */}
      <Input
        type="number"
        disabled={isPending}
        placeholder="Min Price"
        value={filters.minPrice}
        onChange={(e) =>
          setFilters((f) => ({ ...f, minPrice: e.target.value }))
        }
      />

      {/* Max Price */}
      <Input
        type="number"
        disabled={isPending}
        placeholder="Max Price"
        value={filters.maxPrice}
        onChange={(e) =>
          setFilters((f) => ({ ...f, maxPrice: e.target.value }))
        }
      />

      {/* Status */}
      <Select
        value={filters.isActive}
        disabled={isPending}
        onValueChange={(value) =>
          setFilters((f) => ({ ...f, isActive: value }))
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="true">Active</SelectItem>
          <SelectItem value="false">Inactive</SelectItem>
        </SelectContent>
      </Select>

      {/* Sort By */}
      <Select
        value={filters.sortBy}
        disabled={isPending}
        onValueChange={(value) => setFilters((f) => ({ ...f, sortBy: value }))}
      >
        <SelectTrigger>
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="createdAt">Created At</SelectItem>
          <SelectItem value="price">Price</SelectItem>
          <SelectItem value="stock">Stock</SelectItem>
        </SelectContent>
      </Select>

      {/* Sort Order */}
      <Select
        value={filters.sortOrder}
        disabled={isPending}
        onValueChange={(value) =>
          setFilters((f) => ({ ...f, sortOrder: value }))
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Order" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="asc">Ascending</SelectItem>
          <SelectItem value="desc">Descending</SelectItem>
        </SelectContent>
      </Select>

      {/* Actions */}
      <div className="flex gap-2">
        <Button onClick={applyFilters} disabled={isPending}>
          {isPending && activeAction === "apply" && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          Apply
        </Button>

        <Button variant="outline" onClick={resetFilters} disabled={isPending}>
          {isPending && activeAction === "reset" && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          Reset
        </Button>
      </div>
    </div>
  );
}
