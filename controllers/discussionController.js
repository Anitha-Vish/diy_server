import Discussion from '../models/discussionModel.js';

// Create a new discussion
export const createDiscussion = async (req, res) => {
  try {
    const discussion = new Discussion(req.body);
    const savedDiscussion = await discussion.save();
    res.status(201).json(savedDiscussion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all discussions
export const getDiscussions = async (req, res) => {
  try {
    const discussions = await Discussion.find();
    res.status(200).json(discussions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a discussion
export const updateDiscussion = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedDiscussion = await Discussion.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedDiscussion) {
      return res.status(404).json({ message: 'Discussion not found' });
    }
    res.status(200).json(updatedDiscussion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a discussion
export const deleteDiscussion = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedDiscussion = await Discussion.findByIdAndDelete(id);
    if (!deletedDiscussion) {
      return res.status(404).json({ message: 'Discussion not found' });
    }
    res.status(200).json({ message: 'Discussion deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
