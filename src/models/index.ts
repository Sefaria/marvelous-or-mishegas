import mongoose from "mongoose"
import User from "./user.model.js"
import Role from "./role.model.js"
mongoose.Promise = global.Promise

// const mongoose = mongoose;
// const user = user
// db.role = role

const ROLES = ["user", "admin"]

export {mongoose, User, Role, ROLES}