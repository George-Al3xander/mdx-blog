import React from "react"
import { Button } from "@/ui/button"
import Link from "next/link"
import PlatePic from "/public/assets/img/plate_pic.png"
import Image from "next/image"
function NotFound() {
  return (
    <section
      className={
        "mx-auto flex w-responsive flex-col justify-center gap-5 py-10 text-center"
      }
    >
      <h3
        className={
          "flex items-center justify-center gap-2 text-[100px] font-bold md:text-[250px]"
        }
      >
        <span>4</span>
        <span className={"h-[100px] w-[100px] md:h-[250px] md:w-[250px]"}>
          <Image
            src={PlatePic}
            className={"my-auto h-full w-full object-cover"}
            width="600"
            height="600"
            alt="Plate Image"
          />
        </span>
        <span>4</span>
      </h3>
      <h2 className="text-2xl font-semibold">Page not found!</h2>
      <p className={"opacity-60"}>
        Sorry, we can&apos;t find you&apos;re looking for.
      </p>
      <Button asChild>
        <Link href="/">Back to home</Link>
      </Button>
    </section>
  )
}

export default NotFound
