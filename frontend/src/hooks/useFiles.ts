'use client';

import { useQuery } from '@tanstack/react-query';
import { getFiles } from '@/lib/api';
import { FilesResponse } from '@/lib/types';

export const useFiles = (params?: Record<string, string | number>) => {
    return useQuery<FilesResponse>({
        queryKey: ['files', params],
        queryFn: () => getFiles(params),
        refetchInterval: 3000,
    });
};