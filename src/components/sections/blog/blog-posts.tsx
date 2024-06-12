import React, { Fragment } from "react"
import PostCard from "../latest posts/post-card"
import { getPosts } from "@/mylib/mongo/actions"

const BlogPosts = async ({
  page,
  searchQuery,
}: {
  page: string
  searchQuery: string
}) => {
  const posts = await getPosts(page, searchQuery)

  if (!posts || posts.length == 0) {
    return <p className="mt-10 text-center">Nothing to see here yet.</p>
  }
  return (
    <ul
      className="grid gap-10 md:grid-cols-2" /*className="flex flex-col gap-4"*/
    >
      {posts.map((post) => (
        <Fragment key={post.id + "-fragment"}>
          <PostCard key={post.id} post={post} />
          <hr key={post.id + "hr"} className="h-4 md:hidden" />
        </Fragment>
      ))}
    </ul>
  )
}

export default BlogPosts
