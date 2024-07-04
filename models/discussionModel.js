import mongoose from 'mongoose';



// Define the discussion schema
const discussionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  username: { type: String, required: true },
  replies: [
    {
      text: { type: String, required: true },
      username: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  likes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

// Create the Discussion model
const Discussion = mongoose.model('Discussion', discussionSchema);

export default Discussion;
