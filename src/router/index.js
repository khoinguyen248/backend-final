import { Router } from "express";
import userRouter from "./user.js";

const Root = Router()

Root.use('/user', userRouter )
export default Root