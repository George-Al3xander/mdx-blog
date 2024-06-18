"use server"
import { MongoService, Post, Program } from "@/mylib/mongo"
import { TPost, TPostVariant } from "@/types/types"
import { MongoComboService } from "@/mylib/mongo/services/mongo.combo.service"
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
): Promise<TPost[]> => {
  if (postType == "programs") {
    return await programService.findAll(page, searchQuery)
  }
  return await postService.findAll(page, searchQuery)
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
) => await postsWithPrograms.getCollections(page, searchQuery)

export const getPostsProgramsCount = async () =>
  await postsWithPrograms.getCount()
