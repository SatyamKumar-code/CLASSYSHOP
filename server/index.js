import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import connectDB from './config/connectDB.js';

const app = express();
app.use(cors());

app.use(express.json());
app.use(cookieParser());
app.use(morgan('combined'))
app.use(helmet({ 
    crossOriginResourcePolicy: false
}));

app.get("/", (req, res) => {
    res.json({
        message: "Server is running" + process.env.PORT
    })
})

connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    })
})