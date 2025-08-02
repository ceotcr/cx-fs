'use client';

import { clsx } from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
    const pathname = usePathname();

    return (
        <nav className="bg-white border-b border-gray-200">
            <div className="max-w-6xl mx-auto px-8 py-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-bold text-gray-900">File Scanner</h1>
                    <div className="flex gap-4">
                        <Link
                            href="/upload"
                            className={clsx(
                                'px-4 py-2 rounded-lg font-medium transition-colors',
                                pathname === '/upload'
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                            )}
                        >
                            Upload
                        </Link>
                        <Link
                            href="/"
                            className={clsx(
                                'px-4 py-2 rounded-lg font-medium transition-colors',
                                pathname === '/'
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                            )}
                        >
                            Dashboard
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}