import { ButtonProps } from "@/components/ui/button"

export type Meta = {
  id: string
  title: string
  date: string
  tags: string[]
  description?: string
}

export type BlogPost = {
  meta: Meta
}

export type ThemeVariant = "light" | "dark" | "system"

export type HeroData = {
  title: string
  description: string
  buttons: ButtonProps[]
}
