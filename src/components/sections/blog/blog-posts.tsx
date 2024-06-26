import React, { Fragment } from "react"
import PostCard from "../latest posts/post-card"
import { getPostsPaginate } from "../../../../lib/posts"

const BlogPosts = async ({ page }: { page: string }) => {
  const posts = await getPostsPaginate(page)

  if (!posts || posts.length == 0) {
    return <p className="mt-10 text-center">Nothing to see here yet.</p>
  }
  return (
    <ul className="flex flex-col gap-4">
      {posts.map((post) => (
        <Fragment key={post.id + "-fragment"}>
          <PostCard key={post.id} {...post} />
          <hr key={post.id + "hr"} className="h-4" />
        </Fragment>
      ))}
    </ul>
  )
}

export default BlogPosts
