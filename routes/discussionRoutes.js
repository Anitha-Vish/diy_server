import express from 'express';
import {
  createDiscussion,
  getDiscussions,
  updateDiscussion,
  deleteDiscussion,
} from '../controllers/discussionController.js';

const router = express.Router();

router.post('/', createDiscussion);
router.get('/', getDiscussions);
router.put('/:id', updateDiscussion);
router.delete('/:id', deleteDiscussion);

export default router;
