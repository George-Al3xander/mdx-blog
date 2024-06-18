import mongoose from "mongoose"
import { postSchemaBlueprint } from "./utils"

const Schema = mongoose.Schema

export const programSchema = new Schema(
  Object.assign(
    {
      type: {
        type: String,
        enum: ["strength", "hypertrophy", "mixed"],
        default: "strength",
      },
      file: {
        type: String,
        required: false,
      },
    },
    postSchemaBlueprint,
  ),
  {
    timestamps: true,
  },
)

export default mongoose.models!.Program
  ? mongoose.models!.Program
  : mongoose.model("Program", programSchema)
