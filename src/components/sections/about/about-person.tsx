import { aboutPageInfo } from "@/data"
import { Avatar, AvatarImage, AvatarFallback } from "@/ui/avatar"
import React from "react"
import Image from "next/image"
const {
  person: {
    title,
    name,
    img: { src, alt },
  },
} = aboutPageInfo

const AboutPerson = () => {
  return (
    <aside className="flex flex-col gap-2 text-center">
      <Avatar className="w-48 h-48 mx-auto">
        <AvatarImage asChild src={src}>
          <Image
            className="object-cover"
            src={src}
            alt={alt}
            width={500}
            height={500}
          />
        </AvatarImage>

        <AvatarFallback className="text-bold">{alt}</AvatarFallback>
      </Avatar>
      <h1 className="font-bold text-2xl">{name}</h1>
      <h3 className="capitalize font-semibold opacity-60">{title}</h3>
    </aside>
  )
}

export default AboutPerson
