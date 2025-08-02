'use client';

import { clsx } from 'clsx';
import { FiCheck, FiAlertTriangle } from 'react-icons/fi';

interface ResultIndicatorProps {
    result: 'clean' | 'infected' | null;
}

export default function ResultIndicator({ result }: ResultIndicatorProps) {
    if (!result) return <span className="text-gray-400">-</span>;

    const config = {
        clean: {
            icon: FiCheck,
            color: 'text-green-700 bg-green-50 border-green-200',
            label: 'Clean'
        },
        infected: {
            icon: FiAlertTriangle,
            color: 'text-red-700 bg-red-50 border-red-200',
            label: 'Infected'
        }
    };

    const { icon: Icon, color, label } = config[result];

    return (
        <div className={clsx('inline-flex items-center gap-1.5 px-2.5 py-1 rounded border text-sm font-medium', color)}>
            <Icon className="w-3.5 h-3.5" />
            {label}
        </div>
    );
}