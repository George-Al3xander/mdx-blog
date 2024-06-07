import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeSlug from "rehype-slug"
//import rehypePrettyCode from "rehype-pretty-code"
import gfm from "remark-gfm"
import MarkdownNPM from "react-markdown"

export const rehypePlugins: any[] = [
  rehypeSlug,

  gfm,
  //   [rehypePrettyCode, { theme: "github-dark" }],
  [
    rehypeAutolinkHeadings,
    {
      behavior: "wrap",
    },
  ],
]

export const Markdown = (props: { children: string | null | undefined }) => (
  <MarkdownNPM rehypePlugins={rehypePlugins} {...props} />
)
