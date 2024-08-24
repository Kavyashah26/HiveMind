import { Router } from "express"
// import authMiddleware from "../middlewares/auth"
import { deleteUser,getUser,updateUser} from "../controllers/user.js"
// import { errorHandler } from "../errors/error-handler"
// import adminMiddleware from "../middlewares/admin"

const userRoutes=Router()

// userRoutes.post('/',[authMiddleware,])


// userRoutes.get('/',[authMiddleware])
userRoutes.delete('/:userId',(deleteUser))
// userRoutes.delete('/:id',[authMiddleware],errorHandler(deleteUser))
userRoutes.put('/:userId',(updateUser))
// userRoutes.put('/:userId', [authMiddleware],errorHandler(updateUser))
userRoutes.get('/:userId',(getUser))
// userRoutes.get('/:userId', [authMiddleware,adminMiddleware],errorHandler(getUser))


export default userRoutes;