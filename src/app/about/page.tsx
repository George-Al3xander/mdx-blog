import AboutPerson from "@/components/sections/about/about-person"
import { aboutPageInfo } from "@/data"
import React from "react"

const AboutPage = () => {
  return (
    <section className="w-responsive-lg mx-auto mb-10 md:mb-0  md:h-[calc(100vh-12.2rem)]">
      <h3 className="text-3xl md:text-5xl font-extrabold capitalize py-6">
        About Me
      </h3>
      <hr className="h-8 my-4" />
      <ul className="flex flex-col gap-10 md:flex-row">
        <AboutPerson />
        <p className="opacity-60 text-lg font-semibold">
          {aboutPageInfo.description}
        </p>
      </ul>
    </section>
  )
}

export default AboutPage
