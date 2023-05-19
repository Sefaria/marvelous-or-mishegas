import User, {IUser} from "./user.model"
import Role, {IRole} from "./role.model"
import Idea, {IIdea} from "./idea.model"

// const mongoose = mongoose;
// const user = user
// db.role = role

const ROLES = ["user", "admin"]

export {User, Role, Idea, ROLES, IIdea, IRole, IUser}