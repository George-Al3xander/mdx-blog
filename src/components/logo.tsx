import Link from "next/link"
import React from "react"

import { websiteIcon, websiteName } from "@/data"
const Logo = () => {
  return (
    <Link className="flex items-center gap-2" href={"/"}>
      {websiteIcon}
      <h1 className="hidden text-xl font-bold md:inline">{websiteName}</h1>
      <h1 className="text-xl font-bold md:hidden">
        {websiteName.split(" ").map((word) => word[0].toUpperCase())}
      </h1>
    </Link>
  )
}

export default Logo
