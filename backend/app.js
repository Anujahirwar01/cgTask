import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import connectDB from './db/db.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app = express();

connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Hello World!');
}
);
export default app;