import { Button } from "@/components/ui/button"
import { Meta } from "@/types/types"
import { Calendar } from "lucide-react"
import Link from "next/link"
import React from "react"

const PostCard = ({ title, description, id, date }: Meta) => {
  return (
    <li className="flex flex-col gap-2 item text-left">
      <h3 className="text-2xl  font-bold">{title}</h3>
      <p className="opacity-60">
        {description ? description : "There is no description for this post"}
      </p>
      <ul className="flex justify-between gap-4 font-semibold">
        <li className="flex items-center justify-center gap-2">
          <Calendar />
          <time dateTime={date}>{date}</time>
        </li>
        <Button className="hover:cursor-pointer" variant={"link"} asChild>
          <li>
            <Link href={`/blog/${id}`}>Read more →</Link>
          </li>
        </Button>
      </ul>
    </li>
  )
}

export default PostCard
