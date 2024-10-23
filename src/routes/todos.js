import { Router } from "express";
import authMiddleware from "../middlewares/auth.js"
import adminMiddleware from "../middlewares/admin.js";
import {
  getUsersTodos,
  markCompleted,
  markWaiting,
  getAllProjectTodos,
  createTodo,
} from "../controllers/todo.js";
import { errorHandler } from "../errors/error-handler.js"
// import adminMiddleware from "../middlewares/admin"
const todoRoutes = Router();

// userRoutes.post('/',[authMiddleware,])

// userRoutes.get('/',[authMiddleware])

todoRoutes.get('/user/', [authMiddleware] ,errorHandler(getUsersTodos));
// todoRoutes.put("/updateByAdmin/:pid", markCompleted);
todoRoutes.put('/updateByAdmin/:pid', [authMiddleware,adminMiddleware],errorHandler(markCompleted))
// todoRoutes.put("/updateByMember/:pid", markWaiting);
todoRoutes.put('/updateByMember/:pid', [authMiddleware],errorHandler(markWaiting))
// todoRoutes.get("/:pid", getAllProjectTodos);
todoRoutes.get('/:pid', [authMiddleware],errorHandler(getAllProjectTodos))
// todoRoutes.post("/:pid", createTodo);
todoRoutes.post('/:pid', [authMiddleware,adminMiddleware],errorHandler(createTodo))

export default todoRoutes;
