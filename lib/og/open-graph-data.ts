import { Metadata } from "next"
import { TPostVariant } from "@/types/types"
import { websiteName } from "@/data"
import { getPostById } from "@/mylib/mongo/actions"

export const ogImgPropertyKeys = [
  "title",
  "date",
  "description",
  "author",
] as const

const pagesMetaData = {
  all: {
    title: "Explore All Posts",
    description:
      "Discover our comprehensive collection of powerlifting content, including articles and training programs, to enhance your strength journey.",
  },
  articles: {
    title: "Articles",
    description:
      "Dive into expert articles covering training tips, nutrition advice, and more to help you excel in your powerlifting journey.",
  },
  programs: {
    title: "Training Programs",
    description:
      "Find structured powerlifting programs designed to boost your strength and performance, tailored for all experience levels.",
  },
}

export async function genPageMetadata({
  params: { slug = ["all"] },
}: {
  params: { slug?: string[] }
}): Promise<Metadata> {
  const [postType] = slug as [TPostVariant & "all"]

  if (slug.length == 1) {
    const { title } = pagesMetaData[postType]
    const { description } = pagesMetaData[postType]
    const ogSearchParams = new URLSearchParams()

    ogSearchParams.set("title", title)
    ogSearchParams.set("description", description)

    return {
      title: `${postType == "all" ? "Posts" : postType} | ${websiteName}`,
      description,
      authors: { name: "George V." },
      openGraph: {
        title,
        description,
        type: "article",
        url: `posts${postType == "all" ? "" : `${slug}`}`,
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
  const id = slug[1]
  const post = await getPostById(postType, id)

  if (!post) return {}
  const { title, description, author } = post
  const ogSearchParams = new URLSearchParams()
  ogSearchParams.set("postType", postType)
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
