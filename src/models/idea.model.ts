import mongoose, {Schema, Types} from "mongoose";
import {IUser} from "./index.js";

interface IIdea {
    _id?: Types.ObjectId,
    ideaText: string,
    weight: number,
    dateCreated: Date,
    views: number,
    upVotes: number,
    downVotes: number,
    notes: string,
    creator: Types.ObjectId | IUser
}

const Idea = mongoose.model<IIdea>(
    "User",
    new mongoose.Schema<IIdea>({
        ideaText: String,
        weight: Number,
        dateCreated: Date,
        views: Number,
        upVotes: Number,
        downVotes: Number,
        notes: String,
        creator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    })
)

export default Idea
export {IIdea}