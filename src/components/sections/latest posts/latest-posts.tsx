import React, { Fragment } from "react"

import PostCard from "./post-card"
import { Button } from "@/ui/button"

import Link from "next/link"
import { getPosts } from "@/lib/mongo/actions"
import { TPost } from "@/types/types"

const LatestPosts = async () => {
  const posts: TPost[] = await getPosts("articles", 1)

  return (
    <section className="mb-10">
      <div className="flex flex-col gap-6 text-center">
        <h3 className="text-5xl font-extrabold capitalize md:text-7xl">
          Latest posts
        </h3>
        <hr className="h-4" />
        {!posts || posts.length == 0 ? (
          <p className="mt-10 text-center">Nothing to see here yet.</p>
        ) : (
          <>
            <ul className="flex flex-col gap-4">
              {posts.map((post, index) => {
                const isLast = Boolean(index == posts.length - 1)
                return (
                  <Fragment key={post.id + "-fragment"}>
                    <PostCard key={post.id} isLast={isLast} post={post} />
                    {!isLast && <hr key={post.id + "hr"} className="h-4" />}
                  </Fragment>
                )
              })}
            </ul>
            <Button asChild>
              <Link href={"/posts"}>View all →</Link>
            </Button>
          </>
        )}
      </div>
    </section>
  )
}

export default LatestPosts
