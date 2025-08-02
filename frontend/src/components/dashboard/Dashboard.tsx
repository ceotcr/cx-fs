'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchFiles } from '@/lib/api/files';
import FileTable from './FileTable';
import { FiRefreshCw, FiArrowLeft } from 'react-icons/fi';

interface DashboardProps {
    onBack: () => void;
}

export default function Dashboard({ onBack }: DashboardProps) {
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState<{
        status?: 'pending' | 'scanning' | 'scanned';
        result?: 'clean' | 'infected';
    }>({});

    const { data, isLoading, error } = useQuery({
        queryKey: ['files', { page, limit: 10, status: filters.status, result: filters.result }],
        queryFn: () => fetchFiles({
            page,
            limit: 10,
            status: filters.status,
            result: filters.result
        }),
        refetchInterval: 5000,
    });

    const handleFilterChange = (newFilters: { status?: 'pending' | 'scanning' | 'scanned'; result?: 'clean' | 'infected' }) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
        setPage(1);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-64">
                <FiRefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <div className="text-red-600 mb-2">Error loading files</div>
                <p className="text-gray-600">Please try again later</p>
            </div>
        );
    }

    const files = data?.data || [];
    const meta = data?.meta;

    return (
        <div className="max-w-6xl mx-auto w-full p-8">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <button
                        onClick={onBack}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <FiArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                        <p className="text-gray-600">
                            {meta?.total || 0} files • Auto-refreshing every 5 seconds
                            {filters.status && ` • Status: ${filters.status}`}
                            {filters.result && ` • Result: ${filters.result}`}
                        </p>
                    </div>
                </div>
            </div>

            <FileTable
                files={files}
                meta={meta}
                page={page}
                setPage={setPage}
                statusFilter={filters.status}
                resultFilter={filters.result}
                onFilterChange={handleFilterChange}
            />
        </div>
    );
}