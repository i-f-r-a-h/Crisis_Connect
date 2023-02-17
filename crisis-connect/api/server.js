import express from 'express';
//import bodyParser, { urlencoded } from 'body-parser';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors({
    origin: 'localhost:3000',
    credentials: true,
}));

app.listen(4000)