import mongoose from 'mongoose';
import File from '../models/file.model';
import fs from 'fs';

import dotenv from 'dotenv';

dotenv.config();
mongoose.connect(process.env.MONGODB_URI as string)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));


const MALICIOUS_KEYWORDS = [
    'rm -rf', 'eval(', 'bitcoin',
    'malicious', 'virus', 'payload'
];

export async function processScanJob({ fileId, path }: {
    fileId: string;
    path: string;
}): Promise<void> {
    try {
        await File.findByIdAndUpdate(fileId, {
            status: 'scanning',
            scannedAt: null,
            result: null
        });

        await new Promise(resolve =>
            setTimeout(resolve, 5000)
        );

        let content = '';
        try {
            content = fs.readFileSync(path, 'utf-8');
        } catch (err) {
            console.error('Error reading file:', err);
        }

        const isInfected = MALICIOUS_KEYWORDS.some(keyword =>
            content.toLowerCase().includes(keyword.toLowerCase())
        );

        await File.findByIdAndUpdate(fileId, {
            status: 'scanned',
            result: isInfected ? 'infected' : 'clean',
            scannedAt: new Date()
        });

        console.log(`Scan completed for ${fileId} - ${isInfected ? 'INFECTED' : 'CLEAN'}`);
    } catch (error) {
        console.error(`Failed processing ${fileId}:`, error);
        throw error;
    }
}