import mongoose from 'mongoose';

const stepSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  images: [{ type: String }] 
});

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  coverImage: { type: String, default: '' },
  materials: { type: String, default: '' },
  category: { type: String, required: true},
  steps: [stepSchema],
  username: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  views: { type: Number, default: 0 } // Added for views
});


const Project = mongoose.model('Project', ProjectSchema);

export default Project;