import { TPostVariant } from "@/types/types";

export const ogImgPropertyKeys = [
    "title",
    "date",
    "description",
    "author",
] as const;

import OgTemplate from "@/components/og-template";
import { websiteName } from "@/data";
import { getArticleByID, getProgramByID } from "@/lib/mongo/actions";
import { Metadata } from "next";
import { createElement } from "react";

export const pagesMetaData = {
    all: {
        title: "Explore All Posts",
        description:
            "Discover our comprehensive collection of powerlifting content, including articles and training programs, to enhance your strength journey.",
    },
    articles: {
        title: "Articles",
        description:
            "Dive into expert articles covering training tips, nutrition advice, and more to help you excel in your powerlifting journey.",
    },
    programs: {
        title: "Training Programs",
        description:
            "Find structured powerlifting programs designed to boost your strength and performance, tailored for all experience levels.",
    },
} as const;

export const genPageMetadata =
    (
        postType: TPostVariant,
    ): (({ params }: { params: { id: string } }) => Promise<Metadata>) =>
    async ({ params: { id } }) => {
        const post =
            (await (postType === "articles" ? getArticleByID : getProgramByID)(
                id,
            )) ||
            ({
                author: "George V.",
                date: new Date().toISOString(),
                ...pagesMetaData[postType],
            } as const);

        const { title, description, author } = post;
        const ogSearchParams = new URLSearchParams();
        ogSearchParams.set("postType", postType);
        for (const key of ogImgPropertyKeys) {
            ogSearchParams.set(key, post[key]);
        }

        return {
            title: `${title} | ${websiteName}`,
            description,
            metadataBase: new URL(process.env.HOST_URL!),
            authors: { name: author },
            openGraph: {
                title,
                description,
                type: "article",
                url: id,
                images: [
                    {
                        url: `/api/og?${ogSearchParams.toString()}`,
                        width: 1230,
                        height: 630,
                        alt: title,
                    },
                ],
            },
            twitter: {
                card: "summary_large_image",
                title,
                description,
                images: [`/api/og?${ogSearchParams.toString()}`],
            },
        };
    };

export const OG_IMAGE_CONSTS = {
    runtime: "edge",
    size: {
        width: 1200,
        height: 630,
    },
    contentType: "image/png",
};

export const getLocalFont = async () => {
    const interBold = fetch(
        new URL("public/assets/fonts/Inter-Bold.ttf", import.meta.url),
    ).then((res) => res.arrayBuffer());
    const fontBold = await interBold;

    return {
        name: "Inter",
        data: fontBold,
        style: "normal",
        weight: 700,
    } as const;
};

export const genImageResponseComp = async (
    params: {
        title: string;
        description: string;
    },
    base: string,
) => {
    const interBold = fetch(
        new URL("public/assets/fonts/Inter-Bold.ttf", base),
    ).then((res) => res.arrayBuffer());
    const fontBold = await interBold;

    return [
        createElement(OgTemplate, params),
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
    ] as const;
};
