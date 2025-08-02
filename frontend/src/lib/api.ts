import axios from 'axios';
import { FilesResponse } from './types';

const api = axios.create({
    baseURL: 'http://localhost:5000'
});

export const getFiles = async (
    params?: Record<string, string | number>
): Promise<FilesResponse> => {
    const response = await api.get<FilesResponse>('/files', { params });
    return response.data;
};

export default api;