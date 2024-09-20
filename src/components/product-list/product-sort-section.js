import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ProductSortSection() {
  return (
    <div className="flex flex-row items-center gap-2">
      <p className="font-outfit text-white">Sort by</p>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Default (A to Z)" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="ascending">Ascending</SelectItem>
            <SelectItem value="descending">Descending</SelectItem>
            
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
