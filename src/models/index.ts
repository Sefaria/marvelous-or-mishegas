import User, {IUser} from "./user.model.js"
import Role, {IRole} from "./role.model.js"
import Idea, {IIdea} from "./idea.model.js"

// const mongoose = mongoose;
// const user = user
// db.role = role

const ROLES = ["user", "admin"]

export {User, Role, Idea, ROLES, IIdea, IRole, IUser}