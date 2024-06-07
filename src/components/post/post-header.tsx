import React, { ReactNode } from "react"
import { TPost } from "@/types/types"
import { estimateReadingTime } from "@/mylib/utils"
import Link from "next/link"

function PostHeader({
  post: { author, description, title, originalSource, content },
}: {
  post: TPost
}) {
  const readingTime = estimateReadingTime(content)

  const infoItems: { name: string; children: ReactNode | string }[] = [
    {
      name: "author",
      children: author,
    },
    {
      name: "reading time",
      children: `${readingTime} min${readingTime == 1 ? "" : "s"}`,
    },
  ]

  if (originalSource) {
    const { href, title } = originalSource
    infoItems.push({
      name: "original source",
      children: (
        <Link className={"opacity-60"} href={href}>
          {title}
        </Link>
      ),
    })
  }
  return (
    <div className={"flex flex-col prose-li:list-none"}>
      <h1 className={"text-8xl"}>{title}</h1>
      <div className="flex gap-4">
        <ul
          className={
            "m-0 flex basis-[40%] flex-wrap justify-between gap-4 text-sm"
          }
        >
          {infoItems.map(({ name, children }) => (
            <li className={"m-1"} key={name}>
              <h3 className={"m-0 uppercase"}>{name}</h3>
              {children}
            </li>
          ))}
        </ul>
        <p className={"m-1 basis-[60%]"}>{description}</p>
      </div>
    </div>
  )
}

export default PostHeader
