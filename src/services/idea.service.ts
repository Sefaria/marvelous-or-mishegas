import {Idea} from "../models/index.js"
import {Aggregate} from "mongoose";

const getWeightedIdea: () => Aggregate<Array<any>> = () => {
    const randNumber = Math.random();
    if (randNumber < .2) { // give it something weighted 1
        return Idea.aggregate(
            [
                {$match: {weight: 1}},
                {$sample: {size: 1}}
            ]
        );
    } else { // give it something weighted 2 -- one of our *featured* ideas
        return Idea.aggregate(
            [
                {$match: {weight: 2}},
                {$sample: {size: 1}}
            ]
        );
    }
}

export {getWeightedIdea}