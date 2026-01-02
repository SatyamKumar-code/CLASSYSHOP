import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import connectDB from './config/connectDB.js';
import userRouter from './router/user.route.js';
import categoryRouter from './router/category.route.js';
import productRouter from './router/product.route.js';
import cartRouter from './router/cart.route.js';
import mylistRouter from './router/mylist.route.js';
import addressRouter from './router/address.route.js';

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
});

app.use("/api/user", userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/mylist", mylistRouter);
app.use("/api/address", addressRouter);

  
connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    })
})