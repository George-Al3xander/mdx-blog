import React from "react"

import { socialMediaData, websiteName } from "@/data"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center gap-2 p-8">
      {/* <ul className="flex gap-2">
        {socialMediaData.map(({ link, Icon }) => (
          <li
            className="transition-all hover:-translate-y-1 hover:cursor-pointer"
            key={link}
          >
            <Link target="_blank" href={link}>
              <Icon className="h-6 w-6" />
            </Link>
          </li>
        ))}
      </ul> */}
      <small>&copy; {new Date().getFullYear()} {websiteName}</small>
    </footer>
  )
}

export default Footer
