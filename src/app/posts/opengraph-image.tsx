import OgTemplate from "@/components/og-template";
import {
    getLocalFont,
    OG_IMAGE_CONSTS,
    pagesMetaData,
} from "@/lib/og/open-graph-data";
import { ImageResponse } from "next/og";

export const runtime = "edge";

const POST_TYPE = "all";
export const size = OG_IMAGE_CONSTS.size;
export const contentType = OG_IMAGE_CONSTS.contentType;
export const alt = pagesMetaData[POST_TYPE].title;

export default async function Image() {
    const font = await getLocalFont();

    return new ImageResponse(<OgTemplate {...pagesMetaData[POST_TYPE]} />, {
        ...size,
        fonts: [font],
    });
}
