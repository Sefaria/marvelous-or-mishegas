import {Request} from "express"
import {Types} from "mongoose"

export interface IAuthRequest extends Request {
    userId: Types.ObjectId
}