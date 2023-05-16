import mongoose, {Types} from "mongoose"
import {IRole} from "./role.model"

interface IUser {
    _id: Types.ObjectId
    email: string,
    password: string,
    roles: IRole[]
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
        ]
    })
)

export default User
export {IUser}