import Link from "next/link"
import React from "react"
import { BookOpen } from "lucide-react"
const Logo = () => {
  return (
    <Link className="flex gap-2  items-center" href={"/"}>
      <BookOpen />
      <h1 className="font-bold text-xl">MDX Blog</h1>
    </Link>
  )
}

export default Logo
