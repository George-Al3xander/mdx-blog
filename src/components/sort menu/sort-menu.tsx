import React from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select"
import useSortBy from "@/hooks/useSortBy"
import { cn } from "@/lib/utils"
function SortMenu() {
  const { sortOptions, checkIfCurrent, ...options } = useSortBy()
  return (
    <Select {...options}>
      <SelectTrigger className="my-4 ml-auto w-[50%] capitalize sm:w-[100px]">
        sort by
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel className="p-1 text-sm uppercase opacity-60">
            sort by
          </SelectLabel>

          {sortOptions.map(({ title, value }) => (
            <SelectItem
              className={cn("my-2", {
                "pointer-events-none opacity-60": checkIfCurrent(value),
              })}
              key={value}
              value={value}
            >
              {title}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default SortMenu
