import express from 'express';
import {PORT, mongoURL} from './config.js';
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';
import bookRoute from './routes/bookRoute.js';
import cors from 'cors';
const app = express();
//middleware for parsing request body
app.use(express.json());
app.use(
    cors({
        origin:'http://localhost:5173',
        methods:['GET','POST','PUT','DELETE'],
        allowedHeaders:['Content-Type']
    })
);

mongoose.connect(mongoURL).then(()=>{
    console.log("Database is connected");
})
.catch((error) => {
    console.log(error);
})

app.get('/', (req, res)=>{
    return res.status(200).send("Welcome to Book store app");
});

app.use('/books', bookRoute);

app.listen(PORT, ()=>{
    console.log(`App is listening to port : ${PORT}`);
});