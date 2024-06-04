"use client"
import { navLinks } from "@/data"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

const Nav = () => {
  const pathname = usePathname()
  return (
    <nav className="hidden sm:inline">
      <ul className="flex gap-3">
        {navLinks.map((link) => (
          <li
            className={cn(
              "text-bold transition-all capitalize opacity-60 hover:opacity-100 hover:cursor-pointer",
              {
                "opacity-100": pathname === "/" + link,
              }
            )}
            key={link}
          >
            <Link href={"/" + link}>{link}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Nav
