import React from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import Link from "next/link"

const links: { href: string; title: string }[] = [
  { href: "/posts", title: "all" },
  { href: "/posts/articles", title: "articles" },
  { href: "/posts/programs", title: "programs" },
]

function TemplateNav({ currentPath }: { currentPath: string }) {
  return (
    <ul className="my-6 flex flex-wrap gap-2">
      {links.map(({ href, title }) => (
        <li key={href}>
          <Link
            className={cn(
              "rounded px-6 py-[5px] text-sm capitalize transition-all hover:opacity-60",
              {
                "bg-black text-white dark:bg-white dark:text-black":
                  currentPath === title,
              },
            )}
            href={href}
          >
            {title}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default TemplateNav
