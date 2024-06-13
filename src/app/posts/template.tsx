"use client"
import React, { ReactNode } from "react"
import TemplateNav from "@/components/post/template/template-nav"
import SearchInput from "@/components/search input/search-input"
import { usePathname, useSearchParams } from "next/navigation"
import { Button } from "@/ui/button"
import { Eraser } from "lucide-react"

function PostsTemplate({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get("searchQuery")
  const currentPath = pathname.split("/")[2] || "all"
  if (pathname.split("/").length > 3) {
    return <>{children}</>
  }
  return (
    <section className="mx-auto w-responsive-lg py-10">
      <h3 className="mb-20 text-4xl font-bold">What are you looking for?</h3>
      <TemplateNav currentPath={currentPath} />
      <SearchInput />
      <div className="mb-6 mt-16 flex items-center justify-between text-2xl">
        <h2 className="font-semibold capitalize">
          {searchQuery
            ? `Search results for "${searchQuery.split("-").join(" ")}" in the ${currentPath}`
            : currentPath}
        </h2>
      </div>

      {children}
    </section>
  )
}

export default PostsTemplate
