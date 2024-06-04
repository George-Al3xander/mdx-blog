import { BlogPost, Meta } from "@/types/types"
import { compileMDX } from "next-mdx-remote/rsc"

import Video from "@/components/mdx/video"
import CustomImage from "@/components/mdx/custom-image"
import { options } from "../mdx-options"
type Filetree = {
  tree: [
    {
      path: string
    }
  ]
}

export async function getPostByName(
  fileName: string
): Promise<BlogPost | undefined> {
  const res = await fetch(
    `https://raw.githubusercontent.com/${process.env.BLOG_POSTS_REPO_PATH}/main/${fileName}`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  )

  if (!res.ok) return undefined

  const rawMDX = await res.text()

  if (rawMDX === "404: Not Found") return undefined

  const { frontmatter, content } = await compileMDX<{
    title: string
    date: string
    tags: string[]
  }>({
    source: rawMDX,
    components: {
      Video,
      CustomImage,
    },
    options,
  })

  const id = fileName.replace(/\.mdx$/, "")

  const blogPostObj: BlogPost = {
    meta: {
      id,
      title: frontmatter.title,
      date: frontmatter.date,
      tags: frontmatter.tags,
    },
    content,
  }

  return blogPostObj
}

export async function getPostsMeta(): Promise<Meta[] | undefined> {
  const res = await fetch(
    `https://api.github.com/repos/${process.env.BLOG_POSTS_REPO_PATH}/git/trees/main?recursive=1`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  )

  if (!res.ok) return undefined

  const repoFiletree: Filetree = await res.json()

  const filesArray = repoFiletree.tree
    .map((obj) => obj.path)
    .filter((path) => path.endsWith(".mdx"))

  const posts: Meta[] = []

  for (const file of filesArray) {
    const post = await getPostByName(file)
    if (post) {
      const { meta } = post
      posts.push(meta)
    }
  }

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export const getPostsPaginate = async (
  page: string | undefined = "1",
  perPage: string | undefined = "5"
) => {
  const posts = await getPostsMeta()
  if (!posts) return
  const start = (Number(page) - 1) * Number(perPage)
  const end = start + Number(perPage)

  const entries = posts.slice(start, end)
  return entries
}

export const getPostsCount = async () => Promise.resolve(7)
