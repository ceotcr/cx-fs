import { Request, Response } from 'express';
import File from '../models/file.model';

export const getFiles = async (req: Request, res: Response) => {
    try {
        const {
            status,
            result,
            page = '1',
            limit = '10',
        } = req.query as {
            status?: string;
            result?: string;
            page?: string;
            limit?: string;
        };

        const filter: Record<string, any> = {};
        if (status) filter.status = status;
        if (result) filter.result = result;

        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);
        const skip = (pageNumber - 1) * limitNumber;

        const files = await File.find(filter)
            .sort({ uploadedAt: -1 })
            .select('filename status result uploadedAt scannedAt')
            .skip(skip)
            .limit(limitNumber)
            .lean();

        const total = await File.countDocuments(filter);

        return res.status(200).json({
            data: files,
            meta: {
                total,
                page: pageNumber,
                limit: limitNumber,
                totalPages: Math.ceil(total / limitNumber),
            },
        });
    } catch (error) {
        console.error('Error fetching files:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
