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
   // const project = await Project.findById(projectId);
    const project = await Project.findByIdAndUpdate(projectId,   // updated code views increment
      { $inc:{views: 1} },
      { new: true }
    );
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADDED CONTROLLER FOR POPULAR PROJECTS
export const getMostPopularProjects = async (req,res) => {
  try{ 
    const popularProjects = await Project.find().sort({views: -1}).limit(3)
    res.status(200).json(popularProjects); 
    console.log(popularProjects)
  }catch(error){
    res.status(500).json({ message: error.message})
  }
}

export const createProject = async (req, res) => {
  try {
    const { title, description, materials, category, username } = req.body;
    let steps = req.body.steps;
    let coverImageUrl = "";

    if (!title || !description || !materials || !category || !username) {
      return res.status(400).json({ message: "All fields are required, including username" });
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
      username,
      steps: projectSteps,
    });

    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const updatedData = req.body;

    const updatedProject = await Project.findByIdAndUpdate(projectId, updatedData, { new: true });

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const project = await Project.findByIdAndDelete(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};