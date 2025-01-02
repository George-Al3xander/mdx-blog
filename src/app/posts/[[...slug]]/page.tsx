import React from "react"
import { getPublications, protectMultiPage } from "@/lib/utils"
import { MultiPageProps } from "@/types/types"
import PostsWithPagination from "@/components/post/posts-with-pagination"
import PostById from "@/components/post/post-by-id"
import { genPageMetadata } from "@/lib/og/open-graph-data"

export const revalidate = 86400

export const generateMetadata = genPageMetadata

async function MultiPage(props: MultiPageProps) {
  const {
    pathname,
    postType,
    pageNumber,
    allPublicationsCount,
    searchQuery,
    sortBy,
    slug,
  } = await protectMultiPage(props)

  if (slug.length > 1) return <PostById id={slug[1]} postType={postType} />

  const posts = await getPublications(postType, pageNumber, searchQuery, sortBy)
  return (
    <PostsWithPagination
      paginationOpts={{
        page: pageNumber,
        totalCount: allPublicationsCount,
        pathname,
      }}
      posts={posts}
    />
  )
}

export default MultiPage
