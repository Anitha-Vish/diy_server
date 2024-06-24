
// import jwt from "jsonwebtoken";

// export const validateProjectData = (req, res, next) => {
//   const { title, description, materials, steps } = req.body;

//   if (!title || typeof title !== 'string' || title.trim() === '') {
//     return res.status(400).json({ message: 'Title is required and should be a non-empty string.' });
//   }

//   if (!description || typeof description !== 'string' || description.trim() === '') {
//     return res.status(400).json({ message: 'Description is required and should be a non-empty string.' });
//   }

//   if (!Array.isArray(materials) || materials.length === 0 || !materials.every(item => typeof item === 'string')) {
//     return res.status(400).json({ message: 'Materials should be a non-empty array of strings.' });
//   }

//   if (!Array.isArray(steps) || steps.length === 0 || !steps.every(item => typeof item === 'string')) {
//     return res.status(400).json({ message: 'Steps should be a non-empty array of strings.' });
//   }

//   next(); // If all validations pass, move to the next middleware or route handler
// };