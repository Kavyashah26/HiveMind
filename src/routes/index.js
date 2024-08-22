import {Router} from "express"
import userRoutes from "./users";
import todoRoutes from "./todos";

const rootRoutes=Router();

rootRoutes.use('/users',userRoutes)
rootRoutes.use('/todos',todoRoutes)
rootRoutes.use('/project')
rootRoutes.use('/resources')

export default rootRoutes