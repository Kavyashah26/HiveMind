import {Router} from "express"

const rootRoutes=Router();

rootRoutes.use('/users')
rootRoutes.use('/todos')
rootRoutes.use('/project')
rootRoutes.use('/resources')

export default rootRoutes