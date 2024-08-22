import { Router } from "express"
import authMiddleware from "../middlewares/auth"
import { deleteUser,getUser,updateUser} from "../controllers/user"
import { errorHandler } from "../errors/error-handler"

const userRoutes=Router()

// userRoutes.post('/',[authMiddleware,])


// userRoutes.get('/',[authMiddleware])
userRoutes.delete('/:id',[authMiddleware],errorHandler(deleteUser))
userRoutes.put('/:userId', [authMiddleware],errorHandler(updateUser))
userRoutes.get('/:userId', [authMiddleware],errorHandler(getUser))


export default userRoutes;