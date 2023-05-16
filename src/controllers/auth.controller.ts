import * as jwt from "jsonwebtoken"
import * as bcrypt from "bcryptjs"
import {Document, Model} from "mongoose"
import authConfig from "../config/auth.config.js"
import * as db from "../models/index.js"
import {IUser} from "../models/user.model.js";
import {IAuthRequest} from "../requestTypes";
import {Request, Response} from "express";
import {Role} from "../models/index.js";
import {IRole} from "../models/role.model.js";


const signup = (req: Request, res: Response) => {
    Role.findOne({
        name: "user"
    }).exec().then((role: IRole | null) => {
        const user = new db.User({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            roles: [role]
        });
        user.save().then(user =>
            res.send({message: "Successful Registration"})
        ).catch((err: any) => {
            console.error(err)
        });
    })
};

const signin = (req: Request, res: Response) => {
    db.User.findOne({
        username: req.body.username
    }).populate("roles", "-__v")
        .exec()
        .then((user: IUser | null) => {
            if (user) {
                let validPassword = bcrypt.compareSync(
                    req.body.password,
                    user.password
                );
                if (!validPassword) {
                    return res.status(404).send({message: "User Not Found"})
                }
                let token = jwt.sign({id: user._id}, authConfig.secret, {
                    expiresIn: 86400
                });
                let authorities = [];
                for (let i = 0; i < user.roles.length; i++) {
                    authorities.push("ROLE_" + user.roles[i].name.toUpperCase())
                }
                res.status(200).send({
                    id: user._id,
                    email: user.email,
                    roles: authorities,
                    accessToken: token
                })

            } else {
                return res.status(404).send({message: "User not found"})
            }
        })
        .catch((err: any) => {
            console.error(err)
        })
}


export {signup, signin}