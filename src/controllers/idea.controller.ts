import {Request, Response} from "express";
import {getRandomIdea} from "../services/idea.service.js";


const allAccess = (req:Request, res:Response) => {
  res.status(200).send("Public Content.");
};

const userBoard = (req:Request, res:Response) => {
  res.status(200).send("User Content.");
};

const adminBoard = (req:Request, res:Response) => {
  res.status(200).send("Admin Content.");
};

const randomIdea = (req:Request, res: Response) => {
  getRandomIdea().unwind().exec().then(docs => {
    console.log(docs)
    if(docs[0]) {
          res.status(200).send(docs[0].toString())
    } else {
      res.status(500).send()
    }
  })
}

export {allAccess, userBoard, adminBoard, randomIdea}