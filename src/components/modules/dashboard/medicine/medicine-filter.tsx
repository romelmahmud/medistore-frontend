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
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

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
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });

    params.set("page", "1"); // reset page on filter

    router.push(`?${params.toString()}`);
  };

  const resetFilters = () => {
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
  };

  return (
    <div
      className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 border p-4
    rounded-md"
    >
      {/* Search */}
      <Input
        placeholder="Search medicine..."
        value={filters.search}
        onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
      />

      {/* Category */}
      <Select
        value={filters.category}
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
        placeholder="Min Price"
        value={filters.minPrice}
        onChange={(e) =>
          setFilters((f) => ({ ...f, minPrice: e.target.value }))
        }
      />

      {/* Max Price */}
      <Input
        type="number"
        placeholder="Max Price"
        value={filters.maxPrice}
        onChange={(e) =>
          setFilters((f) => ({ ...f, maxPrice: e.target.value }))
        }
      />

      {/* Status */}
      <Select
        value={filters.isActive}
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
        <Button onClick={applyFilters}>Apply</Button>
        <Button variant="outline" onClick={resetFilters}>
          Reset
        </Button>
      </div>
    </div>
  );
}
