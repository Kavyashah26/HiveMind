import { Router } from "express";
import authMiddleware from "../middlewares/auth.js";
import adminMiddleware from "../middlewares/admin.js";
import {
  createProject,
  addProjectMembers,
  deleteProject,
  getProjectDetails,
  getProjectMembers,
  getProjectOverView,
  giveRoleToProjectMembers,
  removeProjectMembers,
  updateProjectDetails,
  getAllProjectDetails,
  getProjectOfMember,
  getProjectOfAdmin,
} from "../controllers/project.js";
import { errorHandler } from "../errors/error-handler.js";

const projectRoutes = Router();

// userRoutes.post('/',[authMiddleware,])

// userRoutes.get('/',[authMiddleware])

// projectRoutes.post('/', (createProject))
projectRoutes.post("/", [authMiddleware], errorHandler(createProject));
projectRoutes.get("/all", [authMiddleware], errorHandler(getAllProjectDetails));
projectRoutes.get("/memberOf",[authMiddleware],errorHandler(getProjectOfMember));
projectRoutes.get("/adminAt",[authMiddleware],errorHandler(getProjectOfAdmin));
// projectRoutes.get('/:pid', (getProjectDetails))
projectRoutes.get(
  "/:pid",
  [authMiddleware, adminMiddleware],
  errorHandler(getProjectDetails)
);
projectRoutes.put("/:pid", updateProjectDetails); //updated project will be in request
// projectRoutes.put('/:pid', [authMiddleware,adminMiddleware],errorHandler(updateProjectDetails))
// projectRoutes.delete('/:pid', [](deleteProject))
projectRoutes.delete(
  "/:pid",
  [authMiddleware, adminMiddleware],
  errorHandler(deleteProject)
);
// projectRoutes.get('/overview/:pid', [authMiddleware],(getProjectOverView))
projectRoutes.get(
  "/overview/:pid",
  [authMiddleware],
  errorHandler(getProjectOverView)
);
// projectRoutes.get('/members/:pid',[authMiddleware,adminMiddleware],(getProjectMembers))
projectRoutes.get(
  "/members/:pid",
  [authMiddleware, adminMiddleware],
  errorHandler(getProjectMembers)
);

// projectRoutes.put('/addmembers/:pid', (addProjectMembers))
projectRoutes.put(
  "/addmembers/:pid",
  [authMiddleware, adminMiddleware],
  errorHandler(addProjectMembers)
);
// projectRoutes.put('/assignRole/:pid', (giveRoleToProjectMembers))
projectRoutes.put(
  "/assignRole/:pid",
  [authMiddleware, adminMiddleware],
  errorHandler(giveRoleToProjectMembers)
);
// projectRoutes.put('/removeMember/:pid', (removeProjectMembers))
projectRoutes.put(
  "/removeMember/:pid",
  [authMiddleware, adminMiddleware],
  errorHandler(removeProjectMembers)
);

export default projectRoutes;
