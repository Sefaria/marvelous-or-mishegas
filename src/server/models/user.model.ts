import mongoose, {Types} from "mongoose"
import {IIdea, IRole} from "./index";

interface IUser {
    _id: Types.ObjectId
    email: string,
    password: string,
    roles: IRole[],
    upVotes: Types.ObjectId[] | IIdea[],
    downVotes: Types.ObjectId[] | IIdea[]
}


const User = mongoose.model<IUser>(
    "User",
    new mongoose.Schema<IUser>({
        email: String,
        password: String,
        roles: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Role"
            }
        ],
        upVotes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Idea"
            }
        ],
        downVotes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Idea"
            }
        ]
    })
)

export default User
export {IUser}