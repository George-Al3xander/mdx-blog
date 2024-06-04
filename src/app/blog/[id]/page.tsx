import React from "react"
import { getPostByName } from "../../../../lib/posts"
import { notFound } from "next/navigation"
import DateComp from "@/components/post-date"
import { Meta } from "@/types/types"
import { Metadata, ResolvingMetadata } from "next"
import { websiteName } from "@/data"

export async function generateMetadata({
  params,
}: {
  params: { id: string }
}): Promise<Metadata> {
  const { id } = params
  const post = await getPostByName(`${id}.mdx`)
  if (!post) return {}
  const { title, date, description } = post.meta
  const ogSearchParams = new URLSearchParams()
  ogSearchParams.set("title", title)
  ogSearchParams.set("date", date)

  return {
    title: `${title} | ${websiteName}`,
    description,
    authors: {},
    openGraph: {
      title,
      description,
      type: "article",
      url: id,
      images: [
        {
          url: `/api/og?${ogSearchParams.toString()}`,
          width: 1230,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`/api/og?${ogSearchParams.toString()}`],
    },
  }
}

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
