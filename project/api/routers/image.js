import express from 'express';
import multer from 'multer';

import  add from '../controllers/image.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });


router.post('', upload.single('image'),add)

export default router;
