import { NextRequest, NextResponse } from "next/server"
import { ImageResponse } from "next/og"
import { socialMediaLinks, websiteName } from "@/data"
import DateComp, { formatDate } from "@/components/post-date"
export const runtime = "edge"

const interBold = fetch(
  new URL("../../../../assets/fonts/Inter-Bold.ttf", import.meta.url)
).then((res) => res.arrayBuffer())

export async function GET(req: NextRequest) {
  try {
    const fontBold = await interBold

    const { searchParams } = req.nextUrl
    const title = searchParams.get("title")
    const date = searchParams.get("date")

    if (!title) {
      throw new Error("no title provided")
    }
    if (!date) {
      throw new Error("no date provided")
    }
    const heading = title.length > 140 ? `${title.substring(0, 140)}...` : title

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
              className="lucide lucide-notebook-pen"
            >
              <path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4" />
              <path d="M2 6h4" />
              <path d="M2 10h4" />
              <path d="M2 14h4" />
              <path d="M2 18h4" />
              <path d="M18.4 2.6a2.17 2.17 0 0 1 3 3L16 11l-4 1 1-4Z" />
            </svg>
            <p tw="ml-2 font-bold text-2xl">{websiteName}</p>
          </div>
          <div tw="flex flex-col flex-1 py-10">
            <div tw="flex text-xl uppercase font-bold tracking-tight font-normal">
              BLOG POST
            </div>
            <div tw="flex text-[80px] font-bold text-[50px]">{heading}</div>
            <div tw="opacity-60 text-xl">{formatDate(date)}</div>
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
      }
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
