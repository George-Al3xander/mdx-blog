import React from "react"

import { socialMediaData } from "@/data"
import { Button } from "../ui/button"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className="flex flex-col gap-2 items-center justify-center p-8">
      <ul className="flex gap-2">
        {socialMediaData.map(({ link, Icon }) => (
          <li
            className="transition-all  hover:-translate-y-1 hover:cursor-pointer"
            key={link}
          >
            <Link target="_blank" href={link}>
              <Icon className="h-6 w-6" />
            </Link>
          </li>
        ))}
      </ul>
      <small>&copy; {new Date().getFullYear()} George Valuiskyi</small>
    </footer>
  )
}

export default Footer
