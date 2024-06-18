import { ButtonProps } from "@/components/ui/button"
import { Document } from "mongoose"

export type ThemeVariant = "light" | "dark" | "system"

export type HeroData = {
  title: string
  description: string
  subtitle?: string
  buttons: ButtonProps[]
}

export type PageParamsProps = {
  pathname: string
  params?: {
    num?: string
  }
  searchParams?: {
    page?: string
    searchQuery?: string
  }
}

export type SerializeOptions = {
  /**
   * Pass-through variables for use in the MDX content
   */
  scope?: Record<string, unknown>
  /**
   * These options are passed to the MDX compiler.
   * See [the MDX docs.](https://github.com/mdx-js/mdx/blob/master/packages/mdx/index.js).
   */
  mdxOptions?: Omit<any, "outputFormat" | "providerImportSource"> & {
    useDynamicImport?: boolean
  }
  /**
   * Indicate whether or not frontmatter should be parsed out of the MDX. Defaults to false
   */
  parseFrontmatter?: boolean
}

export type SortFilter = {
  [key: string]: "asc" | "desc"
}

export type TPost = Document & {
  _id: string
  title: string
  description: string
  content: string
  date: string
  tags: string[]
  author: string
  originalSource?: {
    title: string
    href: string
  }
}

export type TProgram = TPost & {
  type: "strength" | "hypertrophy" | "mixed"
  file?: string
}

export type TPostVariant = "articles" | "programs"
