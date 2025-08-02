'use client';

import { useState, useCallback, useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { clsx } from 'clsx';
import { FiUpload, FiFile } from 'react-icons/fi';
import { uploadFile } from '@/lib/api/upload';
import UploadProgress from './UploadProgress';
import { toast } from 'react-toastify';

interface FileUploadProps {
    onUploadSuccess: () => void;
}

export default function FileUpload({ onUploadSuccess }: FileUploadProps) {
    const [isDragOver, setIsDragOver] = useState(false);
    const [uploadProgress, setUploadProgress] = useState<number | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const queryClient = useQueryClient();

    const uploadMutation = useMutation({
        mutationFn: uploadFile,
        onSuccess: () => {
            setUploadProgress(100);
            setTimeout(() => {
                setUploadProgress(null);
                queryClient.invalidateQueries({ queryKey: ['files'] });
                onUploadSuccess();
            }, 1000);
        },
        onError: (error) => {
            toast.error(error.message);
            setUploadProgress(null);
        }
    });

    const handleFile = useCallback((file: File) => {
        setUploadProgress(0);
        if (file.type !== 'application/pdf' && !file.name.endsWith('.docx') && !file.name.endsWith('.jpg') && !file.name.endsWith('.png')) {
            toast.error('Invalid file type. Only PDF, DOCX, JPG, and PNG files are allowed.');
            setUploadProgress(null);
            return;
        }
        const interval = setInterval(() => {
            setUploadProgress(prev => {
                if (prev === null) return null;
                if (prev >= 90) return prev;
                return prev + Math.random() * 10;
            });
        }, 200);

        uploadMutation.mutate(file, {
            onSettled: () => {
                clearInterval(interval);
            }
        });
    }, [uploadMutation]);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);

        const files = Array.from(e.dataTransfer.files);
        if (files.length > 0) {
            handleFile(files[0]);
        }
    }, [handleFile]);

    const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            handleFile(files[0]);
        }
    }, [handleFile]);

    if (uploadProgress !== null) {
        return <UploadProgress uploadProgress={uploadProgress} />;
    }

    return (
        <div className="max-w-2xl mx-auto p-8">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload File</h1>
                <p className="text-gray-600">Upload a file for security scanning</p>
            </div>

            <div
                onDrop={handleDrop}
                onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                onDragLeave={() => setIsDragOver(false)}
                onClick={() => fileInputRef.current?.click()}
                className={clsx(
                    'relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all',
                    isDragOver
                        ? 'border-blue-400 bg-blue-50'
                        : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                )}
            >
                <div className="w-16 h-16 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                    <FiUpload className="w-8 h-8 text-gray-600" />
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Drop your file here, or click to browse
                </h3>

                <p className="text-gray-600 mb-6">
                    Support for all file types
                </p>

                <button className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                    <FiFile className="w-4 h-4 mr-2" />
                    Choose File
                </button>
            </div>

            <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,.jpg,.png"
                onChange={handleFileSelect}
                className="hidden"
            />
        </div>
    );
}