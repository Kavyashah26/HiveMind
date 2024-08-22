import { Router } from "express"
import authMiddleware from "../middlewares/auth"
import adminMiddleware from "../middlewares/admin";
import {  } from "../controllers/todos"

const todoRoutes=Router()

// userRoutes.post('/',[authMiddleware,])


// userRoutes.get('/',[authMiddleware])


todoRoutes.get('/:pId',[authMiddleware],errorHandler(getUsersTodos))
todoRoutes.put('/updateByAdmin/:pid', [authMiddleware,adminMiddleware],errorHandler(MarkCompleted))
todoRoutes.put('/updateByMember/:pid', [authMiddleware],errorHandler(MarkWaiting))
todoRoutes.get('/:pId', [authMiddleware],errorHandler(getAllProjectTodos))
todoRoutes.post('/:pId', [authMiddleware,adminMiddleware],errorHandler(createTodo))


export default todoRoutes;