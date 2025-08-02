import multer from 'multer';
import path from 'path';
import { Request } from 'express';

const storage = multer.diskStorage({
    destination: (_req: Request, _file, cb) => {
        cb(null, '../uploads/');
    },
    filename: (_req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (_req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowedTypes = ['.pdf', '.docx', '.jpg', '.png'];
    const extname = path.extname(file.originalname).toLowerCase();

    if (allowedTypes.includes(extname)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only PDF, DOCX, JPG, and PNG files are allowed.'));
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

export default upload;