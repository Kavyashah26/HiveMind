import { Router } from "express"
import authMiddleware from "../middlewares/auth"
import adminMiddleware from "../middlewares/admin";
import { createProject,addProjectMembers,deleteProject,getProjectDetails,getProjectMembers,getProjectOverView,giveRoleToProjectMembers,removeProjectMembers,updateProjectDetails } from "../controllers/project"
import { errorHandler } from "../errors/error-handler"

const projectRoutes=Router()

// userRoutes.post('/',[authMiddleware,])


// userRoutes.get('/',[authMiddleware])


projectRoutes.post('/', [authMiddleware],errorHandler(createProject))
projectRoutes.get('/:pid', [authMiddleware],errorHandler(getProjectDetails))
projectRoutes.put('/:pid', [authMiddleware,adminMiddleware],errorHandler(updateProjectDetails))   //updated project will be in request
projectRoutes.delete('/:pid', [authMiddleware,adminMiddleware],errorHandler(deleteProject))
projectRoutes.get('/overview/:pid', [authMiddleware,],errorHandler(getProjectOverView))
projectRoutes.get('/members/:pid', [authMiddleware],errorHandler(getProjectMembers))

projectRoutes.put('/addmembers/:pid', [authMiddleware,adminMiddleware],errorHandler(addProjectMembers))   
projectRoutes.put('/assignRole/:pid', [authMiddleware,adminMiddleware],errorHandler(giveRoleToProjectMembers))
projectRoutes.put('/removeMember/:pid', [authMiddleware,adminMiddleware],errorHandler(removeProjectMembers))

export default projectRoutes;