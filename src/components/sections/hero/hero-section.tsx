import { Button } from "@/components/ui/button"
import { heroData } from "@/data"
import React from "react"

const { title, description, buttons } = heroData

const HeroSection = () => (
  <section className=" py-4 flex flex-col justify-center items-center gap-4 text-center mt-10 mb-[30vh]  md:my-0 md:h-[calc(100vh-5rem)]">
    <h2 className="text-4xl md:text-7xl font-extrabold">{title}</h2>
    <p className="text-xl  font-semibold opacity-60">{description}</p>
    <ul className="flex gap-4">
      {buttons.map((btn, index) => (
        <li key={`hero-btn-${index}`}>
          <Button className="p-6" {...btn} asChild />
        </li>
      ))}
    </ul>
  </section>
)

export default HeroSection
