import OgTemplate from "@/components/og-template";
import { websiteDescription, websiteName } from "@/data";
import { ImageResponse } from "next/og";

export const alt = `About ${websiteName}`;

export const runtime = "edge";
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = "image/png";

export default async function Image() {
    const interBold = fetch(
        new URL("public/assets/fonts/Inter-Bold.ttf", import.meta.url),
    ).then((res) => res.arrayBuffer());
    const fontBold = await interBold;

    return new ImageResponse(
        <OgTemplate title={websiteName} description={websiteDescription} />,
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
    );
}
