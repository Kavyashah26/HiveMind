import { Router } from "express"
import authMiddleware from "../middlewares/auth"
import adminMiddleware from "../middlewares/admin";
// import {  } from "../controllers/resource"
import { errorHandler } from "../errors/error-handler"
import { createResource, deleteResource, updateResource } from "../controllers/resource";

const resourcesRoutes=Router()

// userRoutes.post('/',[authMiddleware,])


// userRoutes.get('/',[authMiddleware])

todoRoutes.post('/', [authMiddleware,adminMiddleware],errorHandler(createResource))
todoRoutes.put('/:pid', [authMiddleware,adminMiddleware],errorHandler(updateResource))   // updated resource will be in request 
todoRoutes.delete('/:rid', [authMiddleware,adminMiddleware],errorHandler(deleteResource))


export default resourcesRoutes;