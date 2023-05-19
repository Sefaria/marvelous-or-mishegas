import * as dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import cookieSession from 'cookie-session'
import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'
import * as db from './models'
import { ideaRoutes } from "./routes/idea.routes"
import {authRoutes} from "./routes/auth.routes"
import mongoose from "mongoose";

const PORT = parseInt(process.env.PORT!) || 8080;

const app = express();
let corsOptions = {
  origin: "http://localhost:" + PORT
};

app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    cookieSession({
        name: 'my-session',
        secret: process.env.COOKIE_SECRET,
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    })
)

app.use('/static', express.static(__dirname+'/static'));
app.get('/', (req, res) => {
    console.log(__dirname);
    res.sendFile('index.html', {root: __dirname});
});

authRoutes(app);
ideaRoutes(app);

function initial() {
    db.Role.estimatedDocumentCount().then(count => {
        if (count === 0) {
            new db.Role({
                name: "user"
            }).save().then(doc => {
                console.log(`added ${doc}`)
            }, err => {
                console.error(err)
            });
            new db.Role({
                name: "admin"
            }).save().then(doc => {
                console.log(`added ${doc}`)
            }, err => {
                console.error(err)
            });
        }
    })
}

mongoose.connect(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.DB}`)
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch((err: any) => {
    console.error("Connection error", err);
    process.exit();
  });


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log('Press Ctrl+C to quit')
})
