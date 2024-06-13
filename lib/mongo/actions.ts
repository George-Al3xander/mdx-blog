"use server"
import { MongoService, Post, Program } from "@/mylib/mongo"
import { TPost } from "@/types/types"
import { MongoComboService } from "@/mylib/mongo/services/mongo.combo.service"
const postService = new MongoService<TPost>(Post)
const programService = new MongoService<any>(Program)
const postsWithPrograms = new MongoComboService<TPost>(
  Post,
  "posts",
  "programs",
)

export const getPosts = async (
  page: string | number,
  searchQuery?: string,
): Promise<TPost[]> => await postService.findAll(page, searchQuery)

export const getPrograms = async (
  page: string | number,
  searchQuery?: string,
): Promise<TPost[]> => await programService.findAll(page, searchQuery)

export const getPostCount = async (): Promise<number> =>
  await postService.getCount()

export const getPostById = async (id: string): Promise<TPost | null> =>
  await postService.findById(id)

export const getPostsWithPrograms = async (page: string | number) =>
  await postsWithPrograms.getCollections(page)

export const getPostsProgramsCount = async () =>
  await postsWithPrograms.getCount()
