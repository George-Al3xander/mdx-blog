import {
  Github,
  Linkedin,
  Dumbbell,
  LucideProps,
  Newspaper,
} from "lucide-react"
import { HeroData, ThemeVariant } from "./types/types"
import Link from "next/link"
import React from "react"

export const websiteName = "Strength Chronicles"
export const websiteIcon = React.createElement(Dumbbell)

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

export const HEADER_LAYOUT_BREAKPOINT: "sm" | "md" | "lg" | "xl" | "2xl" = "sm"

export const aboutPageInfo = {
  person: {
    img: {
      alt: "GV",
    },
    name: "George Valuiskyi",
    title: "trainee front-end/full-stack developer",
  },
  description: `Hello, I'm George Valuiskyi, a passionate front-end and full-stack developer currently pursuing a Bachelor's degree in Computer Science at Prydniprovska State Academy of Civil Engineering and Architecture. My academic journey has provided me with a solid foundation in programming, including C, C++, OOP, and mathematical principles. This background, combined with hands-on projects, has equipped me with the skills to build robust and scalable web applications.

  I specialize in front-end development with a strong focus on React and Next.js. My expertise includes modern web technologies like JavaScript, TypeScript, HTML5, and CSS3. I am proficient in tools such as Git, MongoDB, and Visual Studio Code, which streamline development processes and enhance project efficiency.
  
  `,
} as const

export const PER_PAGE = 6

export const sortOptions: { value: string; title: string }[] = [
  { title: "Date created(newest first)", value: "date-desc" },
  { title: "Date created(oldest first)", value: "date-asc" },
]
