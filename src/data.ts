import { Github, LucideProps, Linkedin } from "lucide-react"
import { HeroData, ThemeVariant } from "./types/types"
import Link from "next/link"
import React from "react"

export const websiteName = "MDX Blog"

export const socialMediaLinks = {
  github: "https://github.com/George-Al3xander",
  linkedin: "https://github.com/George-Al3xander",
}

export const socialMediaIcons = {
  github: Github,
  linkedin: Linkedin,
}

export const socialMediaTitles = {
  github: "GitHub",
  linkedin: "LinkedIn",
}

export const socialMediaData: {
  link: string
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >
  title: string
}[] = Object.entries(socialMediaLinks).map(([key, link]) => {
  const Icon = socialMediaIcons[key as "github"]
  const title = socialMediaTitles[key as "github"]
  return { title, Icon, link }
})

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
          href: socialMediaLinks.github,
        },
        "GitHub"
      ),
      variant: "outline",
    },
  ],
}

export const HEADER_LAYOUT_BREAKPOINT: "sm" | "md" | "lg" | "xl" | "2xl" = "sm"

export const aboutPageInfo = {
  person: {
    img: {
      alt: "GV",
      src: "/assets/img/ph_1.jpg",
    },
    name: "George Valuiskyi",
    title: "trainee front-end/full-stack developer",
  },
  description: `Hello, I'm George Valuiskyi, a passionate front-end and full-stack developer currently pursuing a Bachelor's degree in Computer Science at Prydniprovska State Academy of Civil Engineering and Architecture. My academic journey has provided me with a solid foundation in programming, including C, C++, OOP, and mathematical principles. This background, combined with hands-on projects, has equipped me with the skills to build robust and scalable web applications.

  I specialize in front-end development with a strong focus on React and Next.js. My expertise includes modern web technologies like JavaScript, TypeScript, HTML5, and CSS3. I am proficient in tools such as Git, MongoDB, and Visual Studio Code, which streamline development processes and enhance project efficiency.
  
  `,
} as const
