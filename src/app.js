import express from "express";
import cors from "cors";
import authRouter from "./router/auth";
import { connectDB } from "./config/db";
import dotenv from "dotenv"
import morgan from "morgan";

const app = express();
dotenv.config();
//middleware
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"))

//connect db
connectDB(process.env.DB_URL);

//router
app.use("/api/",authRouter);

//

export const viteNodeApp = app;