import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinaryConfig.js';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'projects',
    format: async (req, file) => {
      const mimeTypes = {
        'image/jpeg': 'jpg',
        'image/png': 'png',
        'image/gif': 'gif',
        'video/mp4': 'mp4',
        'video/mpeg': 'mpeg'
      };
      return mimeTypes[file.mimetype] || 'jpg'; 
    },
    public_id: (req, file) => file.originalname,
  },
});

const parser = multer({ storage: storage });

export default parser;
