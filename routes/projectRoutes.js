import express from 'express';
import { createProject } from '../controllers/projectController.js';
// import { validateProjectData } from '../middlewares/validateProject.js';

const router = express.Router();

// Route to handle creating a new project
router.post('/', createProject);

export default router;