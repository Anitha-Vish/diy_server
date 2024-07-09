import express from "express";
import parser from "../db/multerConfig.js";
import { getMostPopularProjects,updateProject , getProjects, getProjectById, createProject, deleteProject } from "../controllers/projectController.js";


const router = express.Router();

// Route for popular projects
 router.get("/popular", getMostPopularProjects)  // needst to go before dynamic router

router.get("/", getProjects);
router.get("/:projectId", getProjectById);

router.post("/create-project", parser.any(), createProject);
// Route for updating project
router.put("/:projectId", updateProject); 

router.delete("/:projectId", deleteProject);


export default router;

