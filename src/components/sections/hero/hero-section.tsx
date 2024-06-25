import { Button } from "@/components/ui/button"
import { heroData } from "@/data"
import React from "react"
import Image from "next/image"

const { title, description, buttons, subtitle } = heroData

const HeroSection = () => (
  <section className="last-article relative mb-[10vh] mt-10 flex overflow-hidden py-4 text-center md:my-0 md:mb-[30vh] md:h-[calc(100vh-5rem)]">
    <span className="-mx-auto absolute inset-y-0 -z-10 h-full w-full opacity-70 blur-sm">
      <Image
        width={1920}
        className={"max-w-[50rem] md:max-w-full md:object-cover"}
        height={1280}
        src={"/assets/img/bg_hero.jpg"}
        alt={"Hero section background"}
      />
    </span>

    <div className="z-10 mx-auto flex w-responsive-lg flex-col items-center justify-center gap-4">
      <h2 className="text-4xl font-extrabold md:text-7xl">{title}</h2>
      {subtitle && (
        <h3 className="font-semibold italic opacity-60 md:text-2xl">
          {subtitle}
        </h3>
      )}
      <p className="font-semibold opacity-60 md:text-lg">{description}</p>
      <ul className="flex flex-col-reverse gap-4 md:flex-row">
        {buttons.map((btn, index) => (
          <li key={`hero-btn-${index}`}>
            <Button className="p-6" {...btn} asChild />
          </li>
        ))}
      </ul>
    </div>
  </section>
)

export default HeroSection
