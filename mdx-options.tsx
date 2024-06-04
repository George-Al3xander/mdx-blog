import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeSlug from "rehype-slug"
import rehypePrettyCode from "rehype-pretty-code"
import { SerializeOptions } from "@/types/types"
//import { rehypeExtendedTable } from 'rehype-extended-table';
import gfm from "remark-gfm"

export const rehypePlugins = [
  //rehypeHighlight,
  rehypeSlug,
  //rehypeExtendedTable,
  gfm,
  [rehypePrettyCode, { theme: "github-dark" }],
  [
    rehypeAutolinkHeadings,
    {
      behavior: "wrap",
    },
  ],
]

export const options: SerializeOptions = {
  parseFrontmatter: true,
  mdxOptions: {
    rehypePlugins,
  },
}
