import express from "express";
import { signup } from "../controller/signup";

const router = express.Router();

router.post('/auth/signup', signup)

export default router;
 