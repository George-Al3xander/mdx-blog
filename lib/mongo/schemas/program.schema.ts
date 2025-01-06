import mongoose from "mongoose";
import { postSchemaBlueprint } from "./utils";

const Schema = mongoose.Schema;

export const programSchema = new Schema(
    Object.assign(postSchemaBlueprint, {
        type: {
            type: String,
            enum: ["strength", "hypertrophy", "mixed"],
            default: "strength",
        },
        file: {
            type: String,
            required: false,
        },
    }),
    {
        timestamps: true,
    },
);

const Program =
    mongoose.models?.Program || mongoose.model("Program", programSchema);

export default Program;
