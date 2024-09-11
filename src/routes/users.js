import { Router } from "express"
import authMiddleware from "../middlewares/auth.js"
import { deleteUser,getUser,updateUser} from "../controllers/user.js"
import { errorHandler } from "../errors/error-handler.js"
import adminMiddleware from "../middlewares/admin.js"

const userRoutes=Router()

// userRoutes.post('/',[authMiddleware,])


// userRoutes.get('/',[authMiddleware])
// userRoutes.delete('/:userId',(deleteUser))
userRoutes.delete('/:userId',[authMiddleware],errorHandler(deleteUser))
// userRoutes.put('/:userId',(updateUser))
userRoutes.put('/:userId', [authMiddleware],errorHandler(updateUser))
// userRoutes.get('/:userId',(getUser))
userRoutes.get('/:userId', [authMiddleware],errorHandler(getUser))


export default userRoutes;