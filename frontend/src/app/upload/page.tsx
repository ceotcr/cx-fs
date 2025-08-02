'use client';

import FileUpload from '@/components/upload/FileUpload';
import { useRouter } from 'next/navigation';

export default function UploadPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gray-50">
            <FileUpload onUploadSuccess={() => router.push('/')} />
        </div>
    );
}