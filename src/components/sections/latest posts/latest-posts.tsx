import React, { Fragment } from "react"
import { getPostsMeta, getPostsPaginate } from "../../../../lib/posts"
import PostCard from "./post-card"
import { Button } from "@/ui/button"

import Link from "next/link"

const LatestPosts = async () => {
  const posts = await getPostsPaginate()

  return (
    <section className="mb-10">
      <div className="flex gap-6 flex-col text-center">
        <h3 className="text-5xl md:text-7xl font-extrabold capitalize">
          Latest posts
        </h3>
        <hr className="h-4" />
        {!posts || posts.length == 0 ? (
          <p className="mt-10 text-center">Nothing to see here yet.</p>
        ) : (
          <>
            <ul className="flex flex-col gap-4">
              {posts.map((post, index) => {
                const isLast = index == posts.length - 1
                return (
                  <Fragment key={post.id + "-fragment"}>
                    <PostCard isLast={isLast} key={post.id} {...post} />
                    {!isLast && <hr key={post.id + "hr"} className="h-4" />}
                  </Fragment>
                )
              })}
            </ul>
            <Button asChild>
              <Link href={"/blog"}>View all →</Link>
            </Button>
          </>
        )}
      </div>
    </section>
  )
}

export default LatestPosts
