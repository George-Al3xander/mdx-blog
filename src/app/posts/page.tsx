import { PageParamsProps } from "@/types/types"
import React from "react"

import BlogPagination from "@/components/sections/blog/blog-pagination"
import { redirect } from "next/navigation"
import BlogPosts from "@/components/sections/blog/blog-posts"
import { getPostCount } from "@/mylib/mongo/actions"

const BlogMainPage = async ({
  searchParams = { page: "1" },
}: PageParamsProps) => {
  const page = searchParams.page || "1"
  const totalCount = await getPostCount()
  const pagesCount = Math.floor(totalCount / 5) + 1

  if (Number(page) > pagesCount) {
    return redirect(`/blog?page=${pagesCount}`)
  } else if (Number(page) < 1 || !Number(page)) {
    return redirect(`/blog?page=1`)
  }

  return (
    <section className="mx-auto w-responsive py-10">
      <h3 className="py-6 text-3xl font-extrabold capitalize md:text-5xl">
        Blog
      </h3>
      <p className="text-xl font-semibold opacity-60">
        My ramblings on all things web dev.
      </p>
      <hr className="my-4 h-8" />
      {totalCount > 0 ? (
        <BlogPosts page={page} />
      ) : (
        <p className="mt-10 text-center">Nothing to see here yet.</p>
      )}
      {pagesCount > 1 && <BlogPagination totalCount={totalCount} page={page} />}
    </section>
  )
}

export default BlogMainPage
