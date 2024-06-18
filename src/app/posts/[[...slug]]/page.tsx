import React from "react"
import { notFound, redirect } from "next/navigation"
import {
  getPostCount,
  getPosts as getArticles,
  getPostsProgramsCount,
  getPostsWithPrograms,
} from "@/mylib/mongo/actions"
import { changePageParam } from "@/mylib/utils"
import { PER_PAGE } from "@/data"
import { TPostVariant } from "@/types/types"
import PostsWithPagination from "@/components/posts-with-pagination"
import PostById from "@/components/post-by-id"

import { genPageMetadata } from "@/mylib/og/open-graph-data"

const getTotalCount = async (
  postType: TPostVariant & "all",
  searchQuery?: string,
): Promise<number> => {
  if (postType === "all") {
    return await getPostsProgramsCount()
  } else {
    return await getPostCount(postType, searchQuery)
  }
}

const getPosts = async (
  postType: TPostVariant & "all",
  page: string | number,
  searchQuery?: string,
) => {
  let posts: any[] = []
  if (postType === "all") {
    posts = await getPostsWithPrograms(page, searchQuery)
  } else {
    posts = await getArticles(postType, page, searchQuery)
  }
  return posts
}

type PostProps = {
  params: {
    slug?: string[]
  }
  searchParams?:
    | {
        page?: string | undefined
        searchQuery?: string | undefined
      }
    | undefined
}
const allowedPostTypes = ["all", "articles", "programs"]

export const generateMetadata = genPageMetadata

async function MultiPage({
  params: { slug = ["all"] },
  searchParams = { page: "1" },
}: PostProps) {
  const [postType] = slug as [TPostVariant & "all"]
  const page = searchParams.page || "1"
  const { searchQuery } = searchParams
  if (!allowedPostTypes.includes(postType)) {
    return notFound()
  }
  const totalCount = await getTotalCount(postType, searchQuery)
  const pagesCount = Math.ceil(totalCount / PER_PAGE)

  const pathname = `/posts/${postType === "all" ? "" : postType}`

  if (Number(page) > pagesCount) {
    return redirect(
      `${pathname}?${changePageParam(searchParams as string, pagesCount)}`,
    )
  } else if (Number(page) < 1 || !Number(page)) {
    return redirect(`${pathname}?${changePageParam(searchParams as string, 1)}`)
  }

  if (slug.length > 1) {
    const id = slug[1]
    return <PostById id={id} postType={postType} />
  }
  const posts = await getPosts(postType, page, searchQuery)
  return (
    <PostsWithPagination
      paginationOpts={{ page, totalCount, pathname }}
      posts={posts}
    />
  )
}

export default MultiPage
