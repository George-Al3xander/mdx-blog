"use client"
import { navLinks } from "@/data"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"
import { checkNavRouteIfCurrent } from "@/mylib/utils"

const Nav = () => {
  const pathname = usePathname()

  return (
    <nav className="mx-auto hidden md:inline">
      <ul className="flex gap-20">
        {navLinks.map((link) => {
          const isMainSection = checkNavRouteIfCurrent({ link, pathname })
          return (
            <li
              className={cn(
                "text-bold uppercase opacity-60 transition-all hover:cursor-pointer hover:opacity-100",
                {
                  "opacity-100": isMainSection,
                },
              )}
              key={link}
            >
              <Link href={"/" + `${link === "home" ? "" : link}`}>{link}</Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Nav
