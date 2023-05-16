import * as jwt from "jsonwebtoken"
import authConfig from "../config/auth.config.js"
import * as db from "../models/index.js"
import {IRole} from "../models/role.model.js";
import {IUser} from "../models/user.model.js";
import {NextFunction, Request, Response} from "express";
import {IAuthRequest} from "../requestTypes";

const User = db.User
const Role = db.Role
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    let token: string = <string>req.headers['x-access-token'];
    if (!token) {
        return res.status(403).send({message: "no token"});
    }
    jwt.verify(token, authConfig.secret, (err: any, decoded: any) => {
        if (err) {
            return res.status(401).send({message: "Unauthorized"});
        }
        req.headers.userId = decoded.id;
        next();
    });
}

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    next();
    User.findById(req.headers.userId).exec().then(
        (user: IUser | null) => {
            Role.find({
                _id: {$in: user!.roles}
            }, (err: any, roles: IRole[]) => {
                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name === "admin") {
                        next();
                        return;
                    }
                }
                res.status(403).send({message: "Require admin"});
                return;
            })
        }, (err: any) => {
            if (err) {
                res.status(500).send({message: err});
                return;
            }
        }
    )
}

export { verifyToken, isAdmin }