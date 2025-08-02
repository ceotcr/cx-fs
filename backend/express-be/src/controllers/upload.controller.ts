import { Request, Response } from 'express';
import File from '../models/file.model';
import { enqueueScanJob } from '../utils/queue.producer';
import path from 'path';

export const uploadFile = async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const newFile = new File({
            filename: req.file.originalname,
            path: req.file.path,
            status: 'pending'
        });

        await newFile.save();

        await enqueueScanJob({
            fileId: newFile._id as string,
            path: newFile.path
        });

        return res.status(201).json({
            fileId: newFile._id,
            filename: newFile.filename,
            path: newFile.path,
            status: newFile.status,
            uploadedAt: newFile.uploadedAt.toISOString(),
            scannedAt: newFile.scannedAt?.toISOString() || null,
            result: newFile.result || null
        });
    } catch (error) {
        console.error('Upload error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};