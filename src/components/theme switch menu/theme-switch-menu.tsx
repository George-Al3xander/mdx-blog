"use client"
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
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"
const ThemeSwitchMenu = () => {
  const { setTheme, theme } = useTheme()

  return (
    <DropdownMenu>
      <Button variant="ghost" size="icon" asChild>
        <DropdownMenuTrigger>
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle Theme</span>
        </DropdownMenuTrigger>
      </Button>
      <DropdownMenuContent className="capitalize">
        <DropdownMenuLabel>Theme variants</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {themesVariants.map((variant) => (
          <DropdownMenuItem
            className={cn("cursor-pointer", {
              "opacity-60 pointer-events-none cursor-not-allowed":
                theme === variant,
            })}
            onClick={() => setTheme(variant)}
            key={variant}
          >
            {variant}
            {theme === variant && <Check className="h-4 w-4 ml-2" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ThemeSwitchMenu
