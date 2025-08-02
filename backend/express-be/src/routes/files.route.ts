import express from 'express';
import { getFiles } from '../controllers/files.controller';

const filesRouter = express.Router();

filesRouter.get('/files', getFiles);

export default filesRouter;