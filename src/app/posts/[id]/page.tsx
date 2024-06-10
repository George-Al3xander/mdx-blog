import React from "react"

import { notFound } from "next/navigation"
import DateComp from "@/components/post-date"

import { Metadata } from "next"
import { ogImgPropertyKeys, websiteName } from "@/data"
import { getPostById } from "@/mylib/mongo/actions"
import { Markdown } from "@/components/markdown"
import Link from "next/link"
import TagsList from "@/components/tags/tags-list"

import PostHeader from "@/components/post/post-header"

export async function generateMetadata({
  params,
}: {
  params: { id: string }
}): Promise<Metadata> {
  const { id } = params
  const post = await getPostById(id)

  if (!post) return {}
  const { title, description, author } = post
  const ogSearchParams = new URLSearchParams()

  for (const key of ogImgPropertyKeys) {
    ogSearchParams.set(key, post[key])
  }

  return {
    title: `${title} | ${websiteName}`,
    description,
    authors: { name: author },
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
  const post = await getPostById(id)

  if (!post) notFound()
  const { content, tags } = post

  return (
    <section className="prose mx-auto w-responsive py-10 dark:prose-invert">
      <PostHeader post={post} />
      <hr className="h-4" />
      <article>
        <Markdown>{content}</Markdown>
      </article>
      <hr className="h-4" />

      <div className="prose-ul:p-0">
        <h4>Tags: </h4>
        <TagsList tags={tags} />
      </div>
    </section>
  )
}

export default DynamicPage
