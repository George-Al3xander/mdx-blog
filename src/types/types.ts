import { ButtonProps } from "@/components/ui/button"
import { Document } from "mongoose"

export type ThemeVariant = "light" | "dark" | "system"

export type HeroData = {
  title: string
  description: string
  subtitle?: string
  buttons: ButtonProps[]
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

export type MultiPageProps = {
  params: {
    slug?: string[]
  }
  searchParams?:
    | {
        page?: string | undefined
        searchQuery?: string | undefined
        sortBy?: string | undefined
      }
    | undefined
}
