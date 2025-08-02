'use client';

import { FilesResponse } from '@/lib/types/files';

interface PaginationProps {
    meta: FilesResponse['meta'];
    page: number;
    setPage: (page: number) => void;
}

export default function Pagination({ meta, page, setPage }: PaginationProps) {
    return (
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-600">
                Showing {((meta.page - 1) * meta.limit) + 1} to {Math.min(meta.page * meta.limit, meta.total)} of {meta.total} files
            </div>
            <div className="flex gap-2">
                <button
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={meta.page <= 1}
                    className="px-3 py-1 text-sm border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                    Previous
                </button>
                <button
                    onClick={() => setPage(page + 1)}
                    disabled={meta.page >= meta.totalPages}
                    className="px-3 py-1 text-sm border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}