import { FileData, FilesResponse } from '@/lib/types/files';

const API_BASE_URL = 'http://localhost:5000';

interface FetchFilesParams {
    page?: number;
    limit?: number;
    status?: 'pending' | 'scanning' | 'scanned';
    result?: 'clean' | 'infected';
}

export const fetchFiles = async ({
    page = 1,
    limit = 10,
    status,
    result
}: FetchFilesParams = {}): Promise<FilesResponse> => {
    const url = new URL(`${API_BASE_URL}/files`);
    url.searchParams.append('page', page.toString());
    url.searchParams.append('limit', limit.toString());

    if (status) url.searchParams.append('status', status);
    if (result) url.searchParams.append('result', result);

    const response = await fetch(url.toString());

    if (!response.ok) {
        throw new Error('Failed to fetch files');
    }

    return response.json();
};