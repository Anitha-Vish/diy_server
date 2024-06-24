import mongoose from 'mongoose';

  const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  materials: { type: [String], required: true },
  steps: { type: [String], required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

const Project = mongoose.model('Project', projectSchema);
export default Project;