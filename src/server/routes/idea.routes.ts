import {verifyToken, isAdmin} from "../middlewares/authJwt"
import {allAccess, userBoard, adminBoard, weightedIdea, newIdea} from "../controllers/idea.controller"
import {Express, NextFunction, Request, Response} from "express";

const ideaRoutes = function (app: Express) {
    app.use(function (req: Request, res: Response, next: NextFunction) {
        res.header("Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept");
        next();
    });

    app.get("/api/idea/random", weightedIdea);
    app.post("/api/idea/new", [verifyToken], newIdea);
    app.get("/api/test/all", allAccess);
    app.get("/api/test/user", [verifyToken], userBoard)
    app.get("/api/test/admin", [verifyToken, isAdmin], adminBoard);
    app.post("/api/idea/new", [verifyToken], newIdea);
}

export {ideaRoutes}