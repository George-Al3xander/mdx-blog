"use client"
import { navLinks } from "@/data"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

const Nav = () => {
  const pathname = usePathname()
  return (
    <nav className="mx-auto hidden md:inline">
      <ul className="flex gap-20">
        {navLinks.map((link) => {
          const href = link == "home" ? "" : link
          return (
            <li
              className={cn(
                "text-bold uppercase opacity-60 transition-all hover:cursor-pointer hover:opacity-100",
                {
                  "opacity-100": pathname === "/" + href,
                },
              )}
              key={link}
            >
              <Link href={"/" + href}>{link}</Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Nav
