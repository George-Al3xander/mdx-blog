"use server"
import { MongoService, Post, Program } from "@/mylib/mongo"
import { TPost } from "@/types/types"
const postService = new MongoService<TPost>(Post)

export const getPosts = async (page: string | number): Promise<TPost[]> =>
  await postService.findAll(page)

export const getPostCount = async (): Promise<number> =>
  await postService.getCount()

export const getPostById = async (id: string): Promise<TPost | null> =>
  await postService.findById(id)
