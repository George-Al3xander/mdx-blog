import { NextRequest, NextResponse } from "next/server"
import { ImageResponse } from "next/og"
import { ogImgPropertyKeys, socialMediaLinks, websiteName } from "@/data"
import { formatDate } from "@/components/post-date"
import { TPost } from "@/types/types"
export const runtime = "edge"

const interBold = fetch(
  new URL("../../../../assets/fonts/Inter-Bold.ttf", import.meta.url),
).then((res) => res.arrayBuffer())

export async function GET(req: NextRequest) {
  try {
    const fontBold = await interBold
    let postObj: Partial<TPost> = {}
    const { searchParams } = req.nextUrl

    for (const key of ogImgPropertyKeys) {
      const value = searchParams.get(key)
      if (value) {
        postObj[key] = value
      } else {
        throw new Error(`no ${key} provided`)
      }
    }
    const { title, description, date, author } = postObj as {
      [K in (typeof ogImgPropertyKeys)[number]]: string
    }

    const heading = title.length > 140 ? `${title.substring(0, 140)}...` : title
    const desc =
      description.length > 350
        ? `${description.substring(0, 140)}...`
        : description

    return new ImageResponse(
      (
        <div tw="flex relative flex-col p-12 w-full h-full items-start text-black bg-white">
          <div tw="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-dumbbell"
            >
              <path d="M14.4 14.4 9.6 9.6" />
              <path d="M18.657 21.485a2 2 0 1 1-2.829-2.828l-1.767 1.768a2 2 0 1 1-2.829-2.829l6.364-6.364a2 2 0 1 1 2.829 2.829l-1.768 1.767a2 2 0 1 1 2.828 2.829z" />
              <path d="m21.5 21.5-1.4-1.4" />
              <path d="M3.9 3.9 2.5 2.5" />
              <path d="M6.404 12.768a2 2 0 1 1-2.829-2.829l1.768-1.767a2 2 0 1 1-2.828-2.829l2.828-2.828a2 2 0 1 1 2.829 2.828l1.767-1.768a2 2 0 1 1 2.829 2.829z" />
            </svg>
            <p tw="ml-2 font-bold text-2xl">{websiteName}</p>
          </div>
          <div tw="flex flex-col flex-1 py-10">
            <div tw="flex text-xl uppercase font-bold mb-4 tracking-tight font-normal">
              POST
            </div>
            <div tw="flex text-[80px] font-bold text-[50px] mb-4 ">
              {heading}
            </div>
            <div tw="mb-4 text-2xl opacity-60">{desc}</div>
            <div tw="opacity-80 text-xl flex">
              {formatDate(date)}, by {author}
            </div>
          </div>
          <div tw="flex items-center w-full justify-between">
            <div tw="flex text-xl">{process.env.HOST_URL}</div>
            <div tw="flex items-center text-xl">
              <div tw="flex ml-2">{socialMediaLinks.github}</div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Inter",
            data: fontBold,
            style: "normal",
            weight: 700,
          },
        ],
      },
    )
  } catch (error) {
    let cause: string = ""
    if (typeof error === "string") {
      cause = error.toUpperCase()
    } else if (error instanceof Error) {
      cause = error.message
    } else {
      cause = "500 status"
    }

    return new NextResponse(`Failed to generate image: ${cause}`, {
      status: 500,
    })
  }
}
