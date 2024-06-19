import React from "react"
import { TPostVariant } from "@/types/types"
import { getPostById } from "@/lib/mongo/actions"
import { notFound } from "next/navigation"
import PostHeader from "@/components/post/post-header"
import { Markdown } from "@/components/markdown"
import TagsList from "@/components/tags/tags-list"

async function PostById({
  id,
  postType,
}: {
  id: string
  postType: TPostVariant
}) {
  const post = await getPostById(postType, id)

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

export default PostById
