"use server"
import { MongoService, Post, Program, MongoComboService } from "@/lib/mongo"
import { TPost, TPostVariant } from "@/types/types"

const postService = new MongoService<TPost>(Post)
const programService = new MongoService<any>(Program)
const postsWithPrograms = new MongoComboService<TPost>(
  Post,
  "posts",
  "programs",
)

export const getPosts = async (
  postType: TPostVariant,
  page: string | number,
  searchQuery?: string,
  sortFilter?: string,
): Promise<TPost[]> => {
  if (postType == "programs") {
    return await programService.findAll(page, searchQuery, sortFilter)
  }
  return await postService.findAll(page, searchQuery, sortFilter)
}

export const getPostCount = async (
  postType: TPostVariant,
  searchQuery?: string,
): Promise<number> => {
  if (postType == "programs") {
    return await programService.getCount(searchQuery)
  }
  return await postService.getCount(searchQuery)
}

export const getPostById = async (
  postType: TPostVariant,
  id: string,
): Promise<TPost | null> => {
  if (postType == "programs") {
    return await programService.findById(id)
  }

  return await postService.findById(id)
}

export const getPostsWithPrograms = async (
  page: string | number,
  searchQuery?: string,
  sortFilter?: string,
) => await postsWithPrograms.getCollections(page, searchQuery, sortFilter)

export const getPostsProgramsCount = async () =>
  await postsWithPrograms.getCount()
