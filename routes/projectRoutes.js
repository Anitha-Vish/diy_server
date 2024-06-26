import express from "express";
import parser from "../db/multerConfig.js";
import { getProjects, getProjectById, createProject } from "../controllers/projectController.js";


const router = express.Router();

router.get("/", getProjects);
router.get("/:projectId", getProjectById);

router.post("/create-project", parser.any(), createProject);

export default router;

