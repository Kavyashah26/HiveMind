import { Router } from "express"
import authMiddleware from "../middlewares/auth"
import adminMiddleware from "../middlewares/admin";
import {  } from "../controllers/project"
import { errorHandler } from "../errors/error-handler"

const projectRoutes=Router()

// userRoutes.post('/',[authMiddleware,])


// userRoutes.get('/',[authMiddleware])



export default projectRoutes;