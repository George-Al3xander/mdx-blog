import React from "react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/ui/sheet"
import { Button } from "../ui/button"
import { Menu } from "lucide-react"
import Logo from "../logo"
import { HEADER_LAYOUT_BREAKPOINT, navLinks, socialMediaLinks } from "@/data"
import Link from "next/link"

const MenuItem = ({
  href,
  title,
  newTab = false,
}: {
  href: string
  title: string
  newTab?: boolean
}) => (
  <li className="text-bold capitalize transition-all  hover:translate-x-2 hover:cursor-pointer">
    <Link target={newTab ? "_blank" : "_self"} href={href}>
      {title}
    </Link>
  </li>
)

const MobileMenu = () => (
  <aside className={`sm:hidden`}>
    <Sheet>
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
          <ul className="flex flex-col gap-2 items-start">
            {navLinks.map((link) => (
              <MenuItem key={link} href={link} title={link} />
            ))}
            {socialMediaLinks.map(({ title, link }) => (
              <MenuItem newTab key={title} href={link} title={title} />
            ))}
          </ul>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  </aside>
)

export default MobileMenu
