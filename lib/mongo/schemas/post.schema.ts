import mongoose from "mongoose"
import { postSchemaBlueprint } from "./utils"
import { TPost } from "@/types/types"

const Schema = mongoose.Schema

export const postSchema = new Schema(postSchemaBlueprint, { timestamps: true })

export default mongoose.models!.Post
  ? mongoose.models!.Post
  : mongoose.model<TPost>("Post", postSchema)
