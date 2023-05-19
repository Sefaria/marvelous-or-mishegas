import {Request, Response} from "express";
import {getWeightedIdea} from "../services/idea.service";
import * as db from "../models";
import {IIdea} from "../models";
import mongoose, {Types} from "mongoose";

const allAccess = (req: Request, res: Response) => {
    res.status(200).send("Public Content.");
};

const userBoard = (req: Request, res: Response) => {
    res.status(200).send("User Content.");
};

const adminBoard = (req: Request, res: Response) => {
    res.status(200).send("Admin Content.");
};

const weightedIdea = (req: Request, res: Response) => {
    getWeightedIdea().unwind().exec().then(docs => {
        console.log(docs)
        if (docs[0]) {
            res.status(200).send(JSON.stringify(docs[0]))
        } else {
            res.status(500).send()
        }
    })
}

const newIdea = (req: Request, res: Response) => {
    const idea: IIdea = {
        ideaText: req.body.ideaText, // TODO: Sanitize + Validate!
        weight: 1,
        creator: new mongoose.Types.ObjectId(<string>req.headers.userId),
        dateCreated: new Date(),
        upVotes: 0,
        downVotes: 0,
        notes: "",
        views: 0,
    }
    const ideaModel = new db.Idea(idea);
    ideaModel.save().then((doc: IIdea) => {
        res.send({message: "Successfully added idea", idea: doc});
    }).catch((err: any) => {
        console.error(err);
        res.status(500).send();
    })
}

const vote = (req: Request, res: Response) => {
    console.log(req);
    console.log(new mongoose.Types.ObjectId(req.body.ideaId))
    db.Idea.findOne({_id: new mongoose.Types.ObjectId(req.body.ideaId)})
        .then(doc => {
            if (doc) {
                const updateObject = {
                    upVotes: req.body.vote == "up" ? doc.upVotes + 1 : doc.upVotes,
                    downVotes: req.body.vote == "down" ? doc.downVotes + 1 : doc.downVotes
                }

            db.Idea.findOneAndUpdate({_id: doc._id}, updateObject).then(() =>
                            res.status(200).send({message: "Successfully added idea", idea: doc})
            ).catch( e =>
                res.status(500).send()
            )
            }
        }).catch(doc => {
            res.status(500).send()
    })


}

export {allAccess, userBoard, adminBoard, weightedIdea, newIdea, vote}