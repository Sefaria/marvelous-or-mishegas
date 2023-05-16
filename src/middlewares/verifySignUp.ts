import * as db from '../models/index.js'
import {IUser} from '../models/user.model'
import {Request, Response, NextFunction} from "express";


const checkDuplicateEmail = (req: Request, res: Response, next: NextFunction) => {
    db.User.findOne({
        email: req
    }).exec().then((doc: IUser | null)  => {
            console.log(doc)
            if (doc) {
                res.status(400).send({
                    message: 'Email already in use'
                });
                return;
            }
            next();
        },
        (err: any) => {
            res.status(500).send({message: err});
            return;
        }
    );
}

const checkRolesExist = (req: Request, res: Response, next: NextFunction) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!db.ROLES.includes(req.body.roles[i])) {
                res.status(400).send({
                    message: `Failed! Role ${req.body.roles[i]} does not exist`
                });
                return;
            }
        }
    }
    next()
}


export {checkRolesExist, checkDuplicateEmail}