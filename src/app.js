import express from "express";
import cors from "cors";
import authRouter from "./router/auth";
import productRouter from "./router/product"
import { connectDB } from "./config/db";
import dotenv from "dotenv"
import morgan from "morgan";

const app = express();
dotenv.config();
//middleware
app.use(express.json());
app.use(cors());
app.use(morgan("tiny")) /** log được các thông tin */ 

//connect db
connectDB(process.env.DB_URL);

//router
app.use("/api",authRouter);
app.use("/api",productRouter);

//

export const viteNodeApp = app;