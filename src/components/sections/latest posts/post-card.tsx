import DateComp from "@/components/post-date"
import TagsList from "@/components/tags/tags-list"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { TPost, TProgram } from "@/types/types"
import { Calendar, CornerRightUp } from "lucide-react"
import Link from "next/link"
import React from "react"

const PostCard = ({
  post,
  isLast = false,
}: { post: TPost | TProgram } & { isLast?: boolean }) => {
  const { title, description, _id, date, author, tags } = post
  const isProgram = Boolean("type" in post)

  return (
    <li
      className={cn("item flex flex-col gap-3 text-left", {
        "last-article pointer-events-none": isLast,
      })}
    >
      <h4
        className={cn("text-sm capitalize text-blue-500", {
          "text-orange-500": isProgram,
        })}
      >
        {isProgram ? "training program" : "article"}
      </h4>
      <Link
        className={"self-start transition-all hover:opacity-60"}
        href={`/posts/${isProgram ? "programs" : "articles"}/${_id}`}
      >
        <h3 className="text-2xl font-bold">{title}</h3>
      </Link>
      <TagsList tags={tags} />
      <p className="opacity-60">
        {description ? description : "There is no description for this post"}
      </p>
      <ul className="flex flex-wrap justify-between gap-4 font-semibold">
        <li className="flex items-center justify-center">
          <p className="flex items-center justify-center gap-1">
            <Calendar className="h-5 w-5" />
            <span className="sr-only">Published: </span>
            <DateComp date={date} />
          </p>

          <p className="italic">
            <span className="sr-only">Written: </span>
            <span>, by {author}</span>
          </p>
        </li>

        <Button
          className="ml-auto hover:cursor-pointer"
          variant={"link"}
          asChild
        >
          <li>
            <Link
              className={"flex gap-2"}
              href={`/posts/${isProgram ? "programs" : "articles"}/${_id}`}
            >
              Read more <CornerRightUp className="h-4 w-4" />
            </Link>
          </li>
        </Button>
      </ul>
    </li>
  )
}

export default PostCard
