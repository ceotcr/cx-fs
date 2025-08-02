export interface File {
    _id: string;
    filename: string;
    status: 'pending' | 'scanning' | 'scanned';
    result: 'clean' | 'infected' | null;
    uploadedAt: string;
    scannedAt: string | null;
}

export interface FilesResponse {
    data: File[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}