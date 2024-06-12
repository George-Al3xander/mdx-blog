import Link from "next/link"
import React from "react"
import { badgeVariants } from "@/ui/badge"
import { slug } from "github-slugger"

const TagsList = ({ tags }: { tags: string[] }) => {
  return (
    <ul className="flex flex-wrap gap-2 prose-a:text-white prose-a:no-underline prose-li:list-none dark:prose-a:text-black">
      {tags.map((tag) => (
        <li key={tag}>
          <Link
            className={badgeVariants({
              variant: "default",
              className: "capitalize",
            })}
            href={`/posts?searchQuery=${slug(tag)}`}
          >
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default TagsList
