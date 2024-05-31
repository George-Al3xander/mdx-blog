import { navLinks } from "@/data"
import Link from "next/link"
import React from "react"

const Nav = () => (
  <nav className="hidden md:inline">
    <ul className="flex gap-3">
      {navLinks.map((link) => (
        <li
          className="text-bold transition-all capitalize opacity-60 hover:opacity-100 hover:cursor-pointer"
          key={link}
        >
          <Link href={link}>{link}</Link>
        </li>
      ))}
    </ul>
  </nav>
)

export default Nav
