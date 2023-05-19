import {Request, Response} from "express";
import {getWeightedIdea} from "../services/idea.service";
import * as db from "../models";
import {IIdea} from "../models";
import mongoose from "mongoose";

const allAccess = (req:Request, res:Response) => {
  res.status(200).send("Public Content.");
};

const userBoard = (req:Request, res:Response) => {
  res.status(200).send("User Content.");
};

const adminBoard = (req:Request, res:Response) => {
  res.status(200).send("Admin Content.");
};

const weightedIdea = (req:Request, res: Response) => {
  getWeightedIdea().unwind().exec().then(docs => {
    console.log(docs)
    if(docs[0]) {
          res.status(200).send(docs[0].toString())
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

export {allAccess, userBoard, adminBoard, weightedIdea, newIdea}