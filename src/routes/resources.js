import { Router } from "express"
import authMiddleware from "../middlewares/auth.js"
import adminMiddleware from "../middlewares/admin.js";
import { errorHandler } from "../errors/error-handler.js"
import { createResource, deleteResource, updateResource } from "../controllers/resource.js";
// import {authMiddleware,adminMiddleware} from "../middlewares/auth.js";

const resourcesRoutes=Router()

// userRoutes.post('/',[authMiddleware,])


// userRoutes.get('/',[authMiddleware])

// resourcesRoutes.post('/',[authMiddleware], (createResource))
resourcesRoutes.post('/', [authMiddleware,adminMiddleware],errorHandler(createResource))
// resourcesRoutes.put('/:rid',[authMiddleware], (updateResource))   // updated resource will be in request 
resourcesRoutes.put('/:rid', [authMiddleware,adminMiddleware],errorHandler(updateResource))
// resourcesRoutes.delete('/:rid', [authMiddleware],(deleteResource))
resourcesRoutes.delete('/:rid', [authMiddleware,adminMiddleware],errorHandler(deleteResource))


export default resourcesRoutes;