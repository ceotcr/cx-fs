import express from 'express';
import { uploadFile } from '../controllers/upload.controller';
import upload from '../utils/storage';

const router = express.Router();

router.post('/upload', upload.single('file'), uploadFile);

export default router;