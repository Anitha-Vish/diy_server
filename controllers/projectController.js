import Project from '../models/projectModel.js';

// Controller to create a new project
export const createProject = async (req, res) => {
  try {
    const { title, description,coverImage, materials, steps } = req.body;
    const project = new Project({
      title,
      description,
      coverImage,
      materials,
      steps
    });
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

