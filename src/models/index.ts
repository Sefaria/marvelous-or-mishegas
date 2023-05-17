import mongoose from "mongoose"
import User, {IUser} from "./user.model.js"
import Role, {IRole} from "./role.model.js"
import Idea, {IIdea} from "./idea.model.js"
mongoose.Promise = global.Promise

// const mongoose = mongoose;
// const user = user
// db.role = role

const ROLES = ["user", "admin"]

export {mongoose, User, Role, Idea, ROLES, IIdea, IRole, IUser}