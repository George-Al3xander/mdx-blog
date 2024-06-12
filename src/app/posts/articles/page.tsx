import { PageParamsProps } from "@/types/types"
import React from "react"

import BlogPagination from "@/components/sections/blog/blog-pagination"
import { redirect } from "next/navigation"
import BlogPosts from "@/components/sections/blog/blog-posts"
import { getPostCount } from "@/mylib/mongo/actions"
import SearchInput from "@/components/search input/search-input"
import { PER_PAGE } from "@/data"

const BlogMainPage = async ({
  searchParams = { page: "1", searchQuery: "" },
}: PageParamsProps) => {
  const page = searchParams.page || "1"
  const searchQuery = searchParams.searchQuery || ""
  const totalCount = await getPostCount()
  const pagesCount = Math.floor(totalCount / PER_PAGE) + 1

  if (Number(page) > pagesCount) {
    return redirect(`/blog?page=${pagesCount}`)
  } else if (Number(page) < 1 || !Number(page)) {
    return redirect(`/blog?page=1`)
  }

  return (
    <>
      {totalCount > 0 ? (
        <>
          <BlogPosts page={page} searchQuery={searchQuery} />
          {pagesCount > 1 && (
            <BlogPagination totalCount={totalCount} page={page} />
          )}
        </>
      ) : (
        <p className="mt-10 text-center">Nothing to see here yet.</p>
      )}
    </>
  )
  // return (
  //   <section className="mx-auto w-responsive py-10">
  //     <h3 className="py-6 text-3xl font-extrabold capitalize md:text-5xl">
  //       Explore Articles
  //     </h3>
  //     <p className="text-xl font-semibold opacity-60">
  //       Discover valuable insights and tips to enhance your strength training
  //       journey with our extensive collection of powerlifting articles.
  //     </p>
  //     <hr className="my-4 h-8" />
  //     <SearchInput />
  //     {totalCount > 0 ? (
  //       <BlogPosts page={page} searchQuery={searchQuery} />
  //     ) : (
  //       <p className="mt-10 text-center">Nothing to see here yet.</p>
  //     )}
  //     {pagesCount > 1 && <BlogPagination totalCount={totalCount} page={page} />}
  //   </section>
  //)
}

export default BlogMainPage
