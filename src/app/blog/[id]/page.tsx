import React from "react"
import { getPostByName } from "../../../../lib/posts"
import { notFound } from "next/navigation"
import DateComp from "@/components/post-date"

const DynamicPage = async ({ params: { id } }: { params: { id: string } }) => {
  const post = await getPostByName(`${id}.mdx`)

  if (!post) notFound()
  const { meta, content } = post

  const { title, date, description } = meta
  return (
    <section className="w-responsive mx-auto py-10 prose dark:prose-invert">
      <h1>{title}</h1>
      {description && <p>{description}</p>}
      <DateComp date={date} />
      <hr className="h-4" />

      <article>{content}</article>
    </section>
  )
}

export default DynamicPage
