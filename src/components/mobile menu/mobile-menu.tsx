"use client"
import React from "react"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/ui/sheet"
import { Button } from "@/ui/button"
import { Home, type LucideIcon, Menu, BookText, Info } from "lucide-react"
import Logo from "../logo"
import { navLinks } from "@/data"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { checkNavRouteIfCurrent } from "@/mylib/utils"
import { cn } from "@/lib/utils"

const icons: Record<(typeof navLinks)[number], LucideIcon> = {
  home: Home,
  posts: BookText,
  about: Info,
}

const MenuItem = ({
  href,
  title,
  newTab = false,
  onClick = () => {},
  isCurrent = false,
}: {
  href: string
  title: string
  newTab?: boolean
  onClick?: () => void
  isCurrent?: boolean
}) => {
  const Icon = icons[title as "posts"]

  return (
    <li onClick={onClick}>
      <Link
        className={cn(
          "text-bold flex items-center gap-4 border-b-2 py-4 capitalize transition-all hover:translate-x-2 hover:cursor-pointer hover:opacity-60",
          {
            "pointer-events-none translate-x-2 cursor-pointer opacity-60":
              isCurrent,
          },
        )}
        target={newTab ? "_blank" : "_self"}
        href={href}
      >
        <Icon />
        {title}
      </Link>
    </li>
  )
}

const MobileMenu = () => {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()
  const closeSheet = () => setOpen(false)
  return (
    <aside className={`md:hidden`}>
      <Sheet open={open} onOpenChange={setOpen}>
        <Button variant="outline" size="icon" asChild>
          <SheetTrigger>
            <Menu className="h-4 w-4" />
          </SheetTrigger>
        </Button>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="mb-2">
              <Logo />
            </SheetTitle>
          </SheetHeader>

          <SheetClose asChild={true}>
            <ul className="flex flex-col">
              {navLinks.map((link) => (
                <MenuItem
                  onClick={closeSheet}
                  isCurrent={checkNavRouteIfCurrent({ pathname, link })}
                  key={link}
                  href={`/${link === "home" ? "" : link}`}
                  title={link}
                />
              ))}
            </ul>
          </SheetClose>
        </SheetContent>
      </Sheet>
    </aside>
  )
}

export default MobileMenu
