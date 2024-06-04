import Link from "next/link"
import React from "react"
import { BookOpen } from "lucide-react"
import { websiteName } from "@/data"
const Logo = () => {
  return (
    <Link className="flex gap-2  items-center" href={"/"}>
      <BookOpen />
      <h1 className="font-bold text-xl">{websiteName}</h1>
    </Link>
  )
}

export default Logo
