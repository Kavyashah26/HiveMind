import { Router } from "express"
import authMiddleware from "../middlewares/auth"
import adminMiddleware from "../middlewares/admin";
import {  } from "../controllers/resource"
import { errorHandler } from "../errors/error-handler"

const resourcesRoutes=Router()

// userRoutes.post('/',[authMiddleware,])


// userRoutes.get('/',[authMiddleware])



export default resourcesRoutes;