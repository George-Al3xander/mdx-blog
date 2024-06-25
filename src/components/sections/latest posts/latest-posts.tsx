import React, { Fragment, Suspense } from "react"

import PostCard from "./post-card"
import { Button } from "@/ui/button"

import Link from "next/link"
import { getPosts } from "@/lib/mongo/actions"
import { TPost } from "@/types/types"
import { Skeleton } from "@/ui/skeleton"
import { CornerRightUp } from "lucide-react"
import { cn } from "@/lib/utils"

const PostListSkeleton = () => {
  const posts = []
  const tags = []

  for (let i = 0; i < 3; i++) {
    tags.push(<Skeleton className="h-[20px] w-[6ch] rounded-xl" />)
  }

  for (let i = 0; i < 5; i++) {
    posts.push(
      <li
        className={cn("flex flex-col space-y-3", {
          "last-article pointer-events-none": i === 4,
        })}
      >
        <Skeleton className="h-[20px] w-[8ch] rounded-xl" />
        <Skeleton className="h-[2rem] w-[60%] rounded-xl" />
        <ul className={"flex gap-2"}>{tags}</ul>
        <Skeleton className="h-[7.5rem] w-[100%] rounded-xl" />
        <ul className={"flex justify-between gap-2"}>
          <Skeleton className="h-[2] w-[40%] rounded-xl" />
          <Button
            disabled
            className="ml-auto hover:cursor-pointer"
            variant={"link"}
          >
            Read more <CornerRightUp className="h-4 w-4" />
          </Button>
        </ul>
      </li>,
    )
  }

  return (
    <>
      <ul className={"flex flex-col gap-10"}>{posts}</ul>
      <Button disabled>View all →</Button>
    </>
  )
}

const PostList = async () => {
  const posts: TPost[] = await getPosts("articles", 1)
  return !posts || posts.length == 0 ? (
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
  )
}
const LatestPosts = () => {
  return (
    <section className="mb-10">
      <div className="flex flex-col gap-6 text-center">
        <h3 className="text-5xl font-extrabold capitalize md:text-7xl">
          Latest posts
        </h3>
        <hr className="h-4" />
        <Suspense fallback={<PostListSkeleton />}>
          <PostList />
        </Suspense>
      </div>
    </section>
  )
}

export default LatestPosts
