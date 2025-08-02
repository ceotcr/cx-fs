'use client';

import { clsx } from 'clsx';
import { FiCheck, FiRefreshCw, FiClock } from 'react-icons/fi';

interface StatusIndicatorProps {
    status: 'pending' | 'scanning' | 'scanned';
}

export default function StatusIndicator({ status }: StatusIndicatorProps) {
    const config = {
        pending: {
            icon: FiClock,
            color: 'text-yellow-600 bg-yellow-100',
            label: 'Pending',
            spin: false
        },
        scanning: {
            icon: FiRefreshCw,
            color: 'text-blue-600 bg-blue-100',
            label: 'Scanning',
            spin: true
        },
        scanned: {
            icon: FiCheck,
            color: 'text-green-600 bg-green-100',
            label: 'Scanned',
            spin: false
        }
    };

    const { icon: Icon, color, label } = config[status];
    const spin = config[status].spin;

    return (
        <div className={clsx('inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium', color)}>
            <Icon className={clsx('w-4 h-4', spin && 'animate-spin')} />
            {label}
        </div>
    );
}