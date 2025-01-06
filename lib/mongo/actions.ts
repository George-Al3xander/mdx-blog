"use server";
import { MongoComboService, MongoService, Post, Program } from "@/lib/mongo";
import { TPost, TProgram } from "@/types/types";

const articleService = new MongoService<TPost>(Post);
const programService = new MongoService<TProgram>(Program);

const allPublicationsService = new MongoComboService<TPost>({
    source: "articles",
    target: "programs",
});

export const getArticles = articleService.getAll.bind(articleService);
export const getArticleByID = articleService.getById.bind(articleService);
export const getArticlesCount = articleService.getCount.bind(articleService);

export const getPrograms = programService.getAll.bind(programService);
export const getProgramByID = programService.getById.bind(programService);
export const getProgramsCount = programService.getCount.bind(programService);

export const getPublications =
    allPublicationsService.getItems.bind(programService);
export const getPublicationsCount = allPublicationsService.getCount.bind(
    allPublicationsService,
);
