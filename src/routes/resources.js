import { Router } from "express"
// import authMiddleware from "../middlewares/auth"
// import adminMiddleware from "../middlewares/admin";
// import { errorHandler } from "../errors/error-handler"
import { createResource, deleteResource, updateResource } from "../controllers/resource.js";
import authMiddleware from "../middlewares/auth.js";

const resourcesRoutes=Router()

// userRoutes.post('/',[authMiddleware,])


// userRoutes.get('/',[authMiddleware])

resourcesRoutes.post('/',[authMiddleware], (createResource))
// resourcesRoutes.post('/', [authMiddleware,adminMiddleware],errorHandler(createResource))
resourcesRoutes.put('/:rid',[authMiddleware], (updateResource))   // updated resource will be in request 
// resourcesRoutes.put('/:pid', [authMiddleware,adminMiddleware],errorHandler(updateResource))
resourcesRoutes.delete('/:rid', [authMiddleware],(deleteResource))
// resourcesRoutes.delete('/:rid', [authMiddleware,adminMiddleware],errorHandler(deleteResource))


export default resourcesRoutes;