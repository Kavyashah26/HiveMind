import { Router } from "express"
import authMiddleware from "../middlewares/auth"
import {  } from "../controllers/users"

const userRoutes=Router()

// userRoutes.post('/',[authMiddleware,])
userRoutes.delete('/address/:id',[authMiddleware])
userRoutes.get('/address',[authMiddleware])
userRoutes.put('/', [authMiddleware,])
userRoutes.get('/:userId', [authMiddleware,getUser])


export default userRoutes;