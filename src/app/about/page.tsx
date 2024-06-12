import React from "react"
import Image from "next/image"

import StoryGridSection from "@/components/sections/about/grid/story-grid-section"

const AboutPage = () => {
  return (
    <section>
      <div className="last-article relative my-0 mt-10 flex h-[calc(100vh-5rem)] overflow-hidden py-4 text-center">
        <span className="-mx-auto absolute inset-y-0 -z-10 h-full w-full opacity-70 blur-sm">
          <Image
            width={1920}
            className={"max-w-[50rem] md:max-w-full md:object-cover"}
            height={1280}
            src={"/assets/img/bg_about_page.jpg"}
            alt={"Hero section background"}
          />
        </span>
        <div className="z-10 mx-auto flex w-responsive-lg flex-col items-center justify-center gap-4">
          <h2 className="text-4xl font-extrabold md:text-7xl">
            Unlock the Power of Knowledge
          </h2>
        </div>
      </div>
      <div className="mx-auto w-responsive-lg">
        <StoryGridSection />
      </div>
    </section>
  )
}

export default AboutPage
