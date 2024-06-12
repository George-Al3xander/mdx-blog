"use client"
import React, { ReactNode } from "react"
import TemplateNav from "@/components/post/template/template-nav"
import SearchInput from "@/components/search input/search-input"
import { usePathname } from "next/navigation"

function PostsTemplate({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const currentPath = pathname.split("/")[2] || "all"
  if (pathname.split("/").length > 3) {
    return <>{children}</>
  }
  return (
    <section className="mx-auto w-responsive-lg py-10">
      <h3 className="mb-20 text-4xl font-bold">What are you looking for?</h3>
      <TemplateNav currentPath={currentPath} />
      <SearchInput />
      <h2 className="mb-6 mt-16 text-2xl font-semibold capitalize">
        {currentPath}
      </h2>
      {children}
    </section>
  )
}

export default PostsTemplate
