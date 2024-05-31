import React, { Fragment } from "react"
import { getPostsMeta } from "../../../../lib/posts"
import PostCard from "./post-card"

const LatestPosts = async () => {
  const posts = await getPostsMeta()

  if (!posts || posts.length == 0) {
    return <p className="mt-10 text-center">Nothing to see here yet.</p>
  }

  return (
    <section className="mb-10">
      <div className="flex gap-6 flex-col text-center">
        <h3 className="text-5xl md:text-7xl font-extrabold capitalize">
          Latest posts
        </h3>
        <hr className="h-4" />
        <ul className="flex flex-col gap-4">
          {posts.map((post) => (
            <Fragment key={post.id + "-fragment"}>
              <PostCard key={post.id} {...post} />
              <hr key={post.id + "hr"} className="h-4" />
            </Fragment>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default LatestPosts
