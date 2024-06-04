import Link from "next/link"
import React from "react"
import { Button } from "@/ui/button"
import { HEADER_LAYOUT_BREAKPOINT, socialMediaData } from "@/data"

const SocialMediaLinks = () => {
  return (
    <>
      {socialMediaData.map(({ link, Icon }) => (
        <Button
          className={`hidden sm:flex`}
          key={link}
          variant="ghost"
          size="icon"
          asChild
        >
          <Link target="_blank" href={link}>
            <li>
              <Icon className="h-4 w-4" />
            </li>
          </Link>
        </Button>
      ))}
    </>
  )
}

export default SocialMediaLinks
