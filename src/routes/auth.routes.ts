import {checkDuplicateEmail, checkRolesExist} from '../middlewares/verifySignUp.js'
import {signin, signup} from '../controllers/auth.controller.js'
import {NextFunction, Request, Response, Express} from "express";

const authRoutes = function(app: Express) {
    app.use(function(req: Request, res: Response, next: NextFunction) {
        res.header("Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept");
        next();
    });

    app.post("/api/auth/signup",
        [checkDuplicateEmail,
        checkRolesExist],
        signup)

    app.post("/api/auth/signin", signin);
}

export {authRoutes}