import OgTemplate from "@/components/og-template";
import {
    getLocalFont,
    OG_IMAGE_CONSTS,
    pagesMetaData,
} from "@/lib/og/open-graph-data";
import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = OG_IMAGE_CONSTS.size;
export const contentType = OG_IMAGE_CONSTS.contentType;
export const alt = pagesMetaData.articles.title;

export default async function Image() {
    const font = await getLocalFont();

    return new ImageResponse(<OgTemplate {...pagesMetaData.articles} />, {
        ...size,
        fonts: [font],
    });
}
