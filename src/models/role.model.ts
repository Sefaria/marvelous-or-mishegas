import mongoose, {Types} from "mongoose";

const {Schema} = mongoose;

interface IRole {
    name: string,
    _id: Types.ObjectId

}

const Role = mongoose.model<IRole>(
    "Role",
    new Schema<IRole>({
        name: String
    })
);

export default Role
export {IRole}
