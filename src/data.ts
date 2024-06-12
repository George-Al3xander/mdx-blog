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

export const navLinks = [
  "home",
  "posts",
  "programs",
  "search",
  "about",
] as const

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

export const ogImgPropertyKeys = [
  "title",
  "date",
  "description",
  "author",
] as const

export const aboutPageMD = `
## About Us

### Welcome to Strength Chronicles

At Strength Chronicles, we are dedicated to providing powerlifters of all levels with a comprehensive resource hub filled with valuable information and tools. Our mission is to support and inspire the strength training community by offering an extensive archive of articles, training programs, and exercise guides.

### Our Mission

Our mission is to be the ultimate destination for powerlifting enthusiasts seeking knowledge, inspiration, and support. We strive to create a platform where lifters can access the best information to help them achieve their strength goals safely and effectively.

### What We Offer

- **Articles Archive:** Our articles cover a wide range of topics, including training tips, nutrition, injury prevention, mental preparation, and interviews with top athletes and coaches. We curate and organize content to ensure you have access to the most relevant and up-to-date information.

- **Training Programs Vault:** Whether you're just starting out or looking to fine-tune your regimen, our training programs cater to all levels of experience. From beginner routines to advanced cycles, we provide structured plans to help you progress and excel.

- **Exercise Library:** Our detailed exercise library includes comprehensive guides and videos on proper techniques, exercise variations, and common mistakes to avoid. This resource is designed to help you lift safely and maximize your performance.

- **Resources:** Explore in-depth reviews of powerlifting gear, book recommendations, competition rules, and other educational materials. Our resource section is your go-to for making informed decisions and staying updated with the latest in the powerlifting world.

### Our Team

Strength Chronicles is powered by a team of passionate powerlifters, coaches, and fitness enthusiasts dedicated to sharing their knowledge and experience. We believe in the power of community and are committed to supporting each other in the pursuit of strength.

### Join Our Community

We invite you to join our growing community of lifters. Whether you're here to learn, share your journey, or connect with others, Strength Chronicles is your home for all things powerlifting. Follow us on social media, join our forum, and stay updated with our latest content.

Thank you for being a part of Strength Chronicles. Together, we can achieve great strength.
`
