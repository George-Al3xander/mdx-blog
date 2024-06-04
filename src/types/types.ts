import { ButtonProps } from "@/components/ui/button"
import { JSXElementConstructor, ReactElement } from "react"

export type Meta = {
  id: string
  title: string
  date: string
  tags: string[]
  description?: string
}

export type BlogPost = {
  meta: Meta
  content: ReactElement<any, string | JSXElementConstructor<any>>
}

export type ThemeVariant = "light" | "dark" | "system"

export type HeroData = {
  title: string
  description: string
  buttons: ButtonProps[]
}

export type PageParamsProps = {
  params?: {
    num?: string
  }
  searchParams?: {
    page?: string
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
