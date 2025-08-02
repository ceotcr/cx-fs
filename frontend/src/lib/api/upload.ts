import { FileData } from '@/lib/types/files';

const API_BASE_URL = 'http://localhost:5000';

export const uploadFile = async (file: File): Promise<FileData> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/api/upload`, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error('Upload failed');
    }

    return response.json();
};