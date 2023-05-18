import * as jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import {Document, Model} from "mongoose"
import authConfig from "../config/auth.config.js"
import * as db from "../models/index.js"
import {IUser, IRole, Role} from "../models/index.js";
import {Request, Response} from "express";
import {getUserToken} from "../services/auth.service.js";
import {ErrorMessage} from "../interfaces/errorMessage.interface.js";


const signup = (req: Request, res: Response) => {
    console.log("hi")
    Role.findOne({
        name: "user"
    }).exec().then((role: IRole | null) => {
        const user = new db.User({
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            roles: [role]
        });
        user.save().then(user =>
            getUserToken(req.body.email, req.body.password).then(authObject => {
                res.status(200).send(authObject);
            }).catch((err: any) => {
                res.status(500).send();
            })
        ).catch((err: any) => {
            console.error(err)
                res.status(500).send();
        });
    })
};

const signin = (req: Request, res: Response) => {
    getUserToken(req.body.email, req.body.password).then(authObject => {
        res.status(200).send(authObject)
    }).catch((err: ErrorMessage) => {
        if (err.message == "User not found" || err.message == "Invalid password") {
            res.status(401).send("User not found");
        } else {
            return res.status(500).send();
        }
    })
}


export {signup, signin}