import { themesVariants } from "@/data"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu"
import { Button } from "../ui/button"
import { Sun, Moon } from "lucide-react"
import React from "react"

const ThemeSwitchMenu = () => {
  return (
    <DropdownMenu>
      <Button variant="ghost" size="icon" asChild>
        <DropdownMenuTrigger>
          <Sun className="h-4 w-4" />
        </DropdownMenuTrigger>
      </Button>
      <DropdownMenuContent>
        <DropdownMenuLabel>Theme variants</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {themesVariants.map((variant) => (
          <DropdownMenuItem key={variant}>{variant}</DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ThemeSwitchMenu
