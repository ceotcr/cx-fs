'use client';

import { useState } from 'react';
import { FilesResponse } from '@/lib/types/files';
import StatusIndicator from './StatusIndicator';
import ResultIndicator from './ResultIndicator';
import { formatDate } from '@/lib/utils/date';
import { FiFile, FiFilter, FiX } from 'react-icons/fi';
import Pagination from './Pagination';

interface FileTableProps {
    files: FilesResponse['data'];
    meta?: FilesResponse['meta'];
    page: number;
    setPage: (page: number) => void;
    statusFilter?: 'pending' | 'scanning' | 'scanned';
    resultFilter?: 'clean' | 'infected';
    onFilterChange: (filter: { status?: 'pending' | 'scanning' | 'scanned'; result?: 'clean' | 'infected' }) => void;
}

export default function FileTable({
    files,
    meta,
    page,
    setPage,
    statusFilter,
    resultFilter,
    onFilterChange
}: FileTableProps) {
    const [showFilters, setShowFilters] = useState(false);

    const handleStatusFilter = (status: 'pending' | 'scanning' | 'scanned') => {
        onFilterChange({ status: status === statusFilter ? undefined : status });
    };

    const handleResultFilter = (result: 'clean' | 'infected') => {
        onFilterChange({ result: result === resultFilter ? undefined : result });
    };

    const clearFilters = () => {
        onFilterChange({ status: undefined, result: undefined });
    };

    return (
        <div className="bg-white w-full h-[calc(100vh-15rem)] max-lg:max-w-[calc(100vw-4rem)] rounded-2xl shadow-sm border border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                    >
                        <FiFilter className="w-4 h-4" />
                        Filters
                    </button>
                    {(statusFilter || resultFilter) && (
                        <button
                            onClick={clearFilters}
                            className="flex items-center gap-1 px-2 py-1 text-xs text-gray-500 hover:text-gray-700"
                        >
                            <FiX className="w-3 h-3" />
                            Clear filters
                        </button>
                    )}
                </div>
            </div>

            {showFilters && (
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                    <div className="flex flex-wrap gap-4">
                        <div className="border-r border-r-slate-400 pr-4 mr-4">
                            <h4 className="text-xs font-semibold text-gray-500 mb-2">STATUS</h4>
                            <div className="flex gap-2">
                                {(['pending', 'scanning', 'scanned'] as Array<'pending' | 'scanning' | 'scanned'>).map((status) => (
                                    <button
                                        key={status}
                                        onClick={() => handleStatusFilter(status)}
                                        className={`px-3 py-1 text-xs rounded-full ${statusFilter === status
                                            ? 'bg-blue-100 text-blue-800'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {status.charAt(0).toUpperCase() + status.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="text-xs font-semibold text-gray-500 mb-2">RESULT</h4>
                            <div className="flex gap-2">
                                {(['clean', 'infected'] as Array<'clean' | 'infected'>).map((result) => (
                                    <button
                                        key={result}
                                        onClick={() => handleResultFilter(result)}
                                        className={`px-3 py-1 text-xs rounded-full ${resultFilter === result
                                            ? 'bg-blue-100 text-blue-800'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {result.charAt(0).toUpperCase() + result.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {
                files.length === 0 ? (

                    <div className="text-center py-12 bg-white rounded-2xl border border-gray-200 min-w-full w-full">
                        <FiFile className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            {statusFilter || resultFilter
                                ? 'No files match your filters'
                                : 'No files uploaded'}
                        </h3>
                        <p className="text-gray-600">
                            {statusFilter || resultFilter
                                ? 'Try adjusting your filters'
                                : 'Upload your first file to get started'}
                        </p>
                    </div>) :
                    <div className="overflow-auto w-full  flex-1">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
                                <tr>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Filename</th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Status</th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Result</th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Uploaded</th>
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Scanned</th>
                                </tr>
                            </thead>
                            <tbody>
                                {files.map((file) => (
                                    <tr key={file._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                                    <FiFile className="w-4 h-4 text-blue-600" />
                                                </div>
                                                <span className="font-medium text-gray-900">{file.filename}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <StatusIndicator status={file.status} />
                                        </td>
                                        <td className="px-6 py-4">
                                            <ResultIndicator result={file.result} />
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {formatDate(file.uploadedAt)}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {file.scannedAt ? formatDate(file.scannedAt) : '-'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>}

            {meta && meta.totalPages > 1 && (
                <div className="border-t border-gray-200">
                    <Pagination meta={meta} page={page} setPage={setPage} />
                </div>
            )}
        </div>
    );
}