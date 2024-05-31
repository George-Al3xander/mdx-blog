import { Github, LucideProps, Linkedin } from "lucide-react"
import { HeroData, ThemeVariant } from "./types/types"
import Link from "next/link"
import React from "react"

export const socialMediaLinks: {
  link: string
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >
  title: string
}[] = [
  {
    link: "https://github.com/George-Al3xander",
    Icon: Github,
    title: "GitHub",
  },
  {
    link: "https://github.com/George-Al3xander",
    Icon: Linkedin,
    title: "LinkedIn",
  },
]

const PORTFOLIO_LINK = "https://second-portfolio-gamma.vercel.app"

export const navLinks = ["blog", "about"] as const

export const themesVariants: ThemeVariant[] = ["light", "dark", "system"]

export const heroData: HeroData = {
  title: "Hello, I'm George",
  description:
    "Welcome to my blog template. Built using tailwind, shadcn and Nextjs 14.",
  buttons: [
    {
      children: React.createElement(
        Link,
        {
          target: "_blank",
          href: PORTFOLIO_LINK,
        },
        "Visit my portfolio"
      ),
    },
    {
      children: React.createElement(
        Link,
        {
          target: "_blank",
          href: socialMediaLinks.find(
            ({ title }) => title.toLowerCase() == "github"
          )?.link!,
        },
        "GitHub"
      ),
      variant: "outline",
    },
  ],
}
