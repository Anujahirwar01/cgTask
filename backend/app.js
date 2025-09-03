import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import connectDB from './db/db.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { createLead, getAllLeads } from './controllers/lead.controller.js';
const app = express();

connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/leads', getAllLeads);

app.post('/', createLead);

export default app;