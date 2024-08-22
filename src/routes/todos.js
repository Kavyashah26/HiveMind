import { Router } from "express"
import authMiddleware from "../middlewares/auth"
import adminMiddleware from "../middlewares/admin";
import {  getUsersTodos,markCompleted,markWaiting,getAllProjectTodos,createTodo} from "../controllers/todo"
import { errorHandler } from "../errors/error-handler"
const todoRoutes=Router()

// userRoutes.post('/',[authMiddleware,])


// userRoutes.get('/',[authMiddleware])


todoRoutes.get('/:pId',[authMiddleware],errorHandler(getUsersTodos))
todoRoutes.put('/updateByAdmin/:pid', [authMiddleware,adminMiddleware],errorHandler(markCompleted))
todoRoutes.put('/updateByMember/:pid', [authMiddleware],errorHandler(markWaiting))
todoRoutes.get('/:pId', [authMiddleware],errorHandler(getAllProjectTodos))
todoRoutes.post('/:pId', [authMiddleware,adminMiddleware],errorHandler(createTodo))


export default todoRoutes;