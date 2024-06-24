import mongoose from 'mongoose';


const stepSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  images: { type: [String]}                       // ??? changed  { type: [String]}  from  [{ type: String }] 
});


  const projectSchema = new mongoose.Schema({
    
    title: { type: String, required: true },
    description: { type: String, required: true },
    coverImage: { type: String, default: '', required: true },
    materials: { type: [String], default: '', required: true},
    steps: [stepSchema],

  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

const Project = mongoose.model('Project', projectSchema);

export default Project;