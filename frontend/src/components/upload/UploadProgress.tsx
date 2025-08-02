'use client';

import { FiRefreshCw } from 'react-icons/fi';

interface UploadProgressProps {
    uploadProgress: number;
}

export default function UploadProgress({ uploadProgress }: UploadProgressProps) {
    return (
        <div className="max-w-2xl mx-auto p-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
                        <FiRefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {uploadProgress < 100 ? 'Uploading...' : 'Scan in progress...'}
                    </h3>

                    <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                        <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress}%` }}
                        />
                    </div>

                    <p className="text-gray-600">
                        {uploadProgress < 100
                            ? `${Math.round(uploadProgress)}% uploaded`
                            : 'File uploaded successfully. Starting security scan...'
                        }
                    </p>
                </div>
            </div>
        </div>
    );
}