import Project from "../models/projectModel.js";
import cloudinary from "../db/cloudinaryConfig.js";


export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const { projectId } = req.params;
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const createProject = async (req, res) => {
  try {
    const { title, description, materials, category } = req.body;
    let steps = req.body.steps;
    let coverImageUrl = "";

    if (!title || !description || !materials || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (req.files && req.files.length > 0) {
      const coverImageFile = req.files.find((file) => file.fieldname === "coverImage");
      if (coverImageFile) {
        const result = await cloudinary.uploader.upload(coverImageFile.path);
        coverImageUrl = result.secure_url;
      }
    }

    if (typeof steps === "string") {
      steps = JSON.parse(steps);
    }

    const projectSteps = steps.map((step, index) => {
      const stepImages = req.files
        .filter((file) => file.fieldname.startsWith(`steps[${index}][images]`))
        .map((file) => file.path);
      return { ...step, images: stepImages };
    });

    const newProject = new Project({
      title,
      description,
      coverImage: coverImageUrl,
      materials,
      category, 
      steps: projectSteps,
    });

    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
