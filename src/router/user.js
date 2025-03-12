import { Router } from "express";
import userController from "../controller/user.cotroller.js";

const userRouter = Router()

userRouter.get('/teachers', userController.getData)
userRouter.get('/teacher-positions', userController.getJob)
userRouter.post('/teacher-positions', userController.addJob)
userRouter.post('/teachers', userController.createNewuser)



export default userRouter