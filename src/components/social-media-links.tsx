import Link from "next/link"
import React, { ReactNode } from "react"
import { Button } from "@/ui/button"
import { socialMediaLinks } from "@/data"

const SocialMediaLinks = () => {
  return (
    <>
      {socialMediaLinks.map(({ link, Icon }) => (
        <Button key={link} variant="ghost" size="icon" asChild>
          <li className="hidden md:flex">
            <Link target="_blank" href={link}>
              <Icon className="h-4 w-4" />
            </Link>
          </li>
        </Button>
      ))}
    </>
  )
}

export default SocialMediaLinks
