"use client"
import { navLinks } from "@/data"
import { cn } from "@/shadcn-lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"
import { checkNavRouteIfCurrent } from "@/lib/utils"

const Nav = () => {
  const pathname = usePathname()

  return (
    <nav className="mx-auto hidden md:inline">
      <ul className="flex gap-20">
        {navLinks.map((link) => {
          const isMainSection = checkNavRouteIfCurrent({ link, pathname })
          return (
            <li key={link}>
              <Link
                className={cn(
                  "text-bold uppercase opacity-60 transition-all hover:cursor-pointer hover:opacity-100",
                  {
                    "opacity-100": isMainSection,
                  },
                )}
                href={"/" + `${link === "home" ? "" : link}`}
              >
                {link}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Nav
