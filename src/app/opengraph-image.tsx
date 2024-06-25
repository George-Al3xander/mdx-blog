import { ImageResponse } from "next/og"
import { websiteDescription, websiteName } from "@/data"

// Route segment config
export const runtime = "edge"

// Image metadata
export const alt = `About ${websiteName}`
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

// Image generation
export default async function Image() {
  // Font
  const interBold = fetch(
    new URL("../../assets/fonts/Inter-Bold.ttf", import.meta.url),
  ).then((res) => res.arrayBuffer())
  const fontBold = await interBold

  return new ImageResponse(
    (
      <div tw="flex relative flex-col p-12 w-full h-full items-center text-black bg-white">
        <div tw="flex flex-col justify-center flex-1 py-10">
          <div tw="flex items-center text-[80px] font-bold text-[50px] mb-4 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="65"
              height="65"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-dumbbell mr-10"
            >
              <path d="M14.4 14.4 9.6 9.6" />
              <path d="M18.657 21.485a2 2 0 1 1-2.829-2.828l-1.767 1.768a2 2 0 1 1-2.829-2.829l6.364-6.364a2 2 0 1 1 2.829 2.829l-1.768 1.767a2 2 0 1 1 2.828 2.829z" />
              <path d="m21.5 21.5-1.4-1.4" />
              <path d="M3.9 3.9 2.5 2.5" />
              <path d="M6.404 12.768a2 2 0 1 1-2.829-2.829l1.768-1.767a2 2 0 1 1-2.828-2.829l2.828-2.828a2 2 0 1 1 2.829 2.828l1.767-1.768a2 2 0 1 1 2.829 2.829z" />
            </svg>
            {websiteName}
          </div>
          <div tw="mb-4 text-2xl opacity-60">{websiteDescription}</div>
        </div>
        <div tw="flex items-center w-full justify-between">
          <div tw="flex text-xl">{process.env.HOST_URL}</div>
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
}
