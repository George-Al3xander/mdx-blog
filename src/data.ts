import { Dumbbell, Newspaper } from "lucide-react"
import { HeroData, ThemeVariant } from "./types/types"
import Link from "next/link"
import React from "react"

export const websiteName = "Strength Chronicles"
export const websiteIcon = React.createElement(Dumbbell)
export const websiteDescription =
  "Strength Chronicles is your ultimate powerlifting archive, offering a comprehensive collection of articles and training programs to enhance your strength journey."
export const navLinks = ["home", "posts", "about"] as const

export const themesVariants: ThemeVariant[] = ["light", "dark", "system"]

export const heroData: HeroData = {
  title: "Welcome to Strength Chronicles",
  subtitle: "Your Ultimate Powerlifting Resource",
  description:
    "Explore a comprehensive archive of powerlifting articles, training programs, and exercise guides. From beginners to elite athletes, find the expert knowledge and tools you need to enhance your strength training journey.",
  buttons: [
    {
      children: React.createElement(
        Link,
        {
          href: "/posts",
        },
        React.createElement(Newspaper, { className: "h-4 w-4 mr-2" }),
        "Articles",
      ),
    },
    {
      children: React.createElement(
        Link,
        {
          href: "/programs",
        },
        React.createElement(Dumbbell, { className: "h-4 w-4 mr-2" }),
        "Programs",
      ),
      variant: "outline",
    },
  ],
}

export const PER_PAGE = 6

export const sortOptions: { value: string; title: string }[] = [
  { title: "Date created(newest first)", value: "date-desc" },
  { title: "Date created(oldest first)", value: "date-asc" },
]
