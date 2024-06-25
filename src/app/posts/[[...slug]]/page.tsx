import React from "react"
import { notFound, redirect } from "next/navigation"
import {
  getPostCount,
  getPosts as getArticles,
  getPostsProgramsCount,
  getPostsWithPrograms,
} from "@/lib/mongo/actions"
import { changePageParam } from "@/lib/utils"
import { PER_PAGE } from "@/data"
import { TPostVariant } from "@/types/types"
import PostsWithPagination from "@/components/post/posts-with-pagination"
import PostById from "@/components/post/post-by-id"
import { genPageMetadata } from "@/lib/og/open-graph-data"

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
  sortBy?: string,
) => {
  let posts: any[] = []
  if (postType === "all") {
    posts = await getPostsWithPrograms(page, searchQuery, sortBy)
  } else {
    posts = await getArticles(postType, page, searchQuery, sortBy)
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
        sortBy?: string | undefined
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
  const { searchQuery, sortBy } = searchParams
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
  const posts = await getPosts(postType, page, searchQuery, sortBy)
  return (
    <PostsWithPagination
      paginationOpts={{ page, totalCount, pathname }}
      posts={posts}
    />
  )
}

export default MultiPage
