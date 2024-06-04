import { PageParamsProps } from "@/types/types"
import React from "react"
import { getPostsCount } from "../../../lib/posts"

import BlogPagination from "@/components/sections/blog/blog-pagination"
import { redirect } from "next/navigation"
import BlogPosts from "@/components/sections/blog/blog-posts"

const BlogMainPage = async ({
  searchParams = { page: "1" },
}: PageParamsProps) => {
  const page = searchParams.page || "1"
  const totalCount = await getPostsCount()
  const pagesCount = Math.floor(totalCount / 5) + 1

  if (Number(page) > pagesCount) {
    return redirect(`/blog?page=${pagesCount}`)
  } else if (Number(page) < 1 || !Number(page)) {
    return redirect(`/blog?page=1`)
  }

  return (
    <section className="w-responsive mx-auto py-10">
      <h3 className="text-3xl md:text-5xl font-extrabold capitalize py-6">
        Blog
      </h3>
      <p className="opacity-60 text-xl font-semibold">
        My ramblings on all things web dev.
      </p>
      <hr className="h-8 my-4" />
      {totalCount > 0 ? (
        <BlogPosts page={page} />
      ) : (
        <p className="mt-10 text-center">Nothing to see here yet.</p>
      )}
      <BlogPagination totalCount={totalCount} page={page} />
    </section>
  )
}

export default BlogMainPage
