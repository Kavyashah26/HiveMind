import {Router} from "express"
import userRoutes from "./users";
import todoRoutes from "./todos";
import projectRoutes from "./project";

const rootRoutes=Router();

rootRoutes.use('/users',userRoutes)
rootRoutes.use('/todos',todoRoutes)
rootRoutes.use('/project',projectRoutes)
rootRoutes.use('/resources',resourcesRoutes)

export default rootRoutes