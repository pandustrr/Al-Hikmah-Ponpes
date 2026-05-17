import React, { useEffect, useState } from 'react';
import { 
    CheckCircleIcon, 
    XCircleIcon, 
    ExclamationTriangleIcon, 
    InformationCircleIcon, 
    XMarkIcon 
} from '@heroicons/react/24/outline';

export default function Toast({ 
    message, 
    type = 'success', 
    show = true, 
    onClose, 
    duration = 4000 
}) {
    const [visible, setVisible] = useState(show);
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        setVisible(show);
        if (show) {
            setProgress(100);
        }
    }, [show]);

    useEffect(() => {
        if (!visible) return;

        const intervalTime = 40;
        const decrement = (intervalTime / duration) * 100;

        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev <= 0) {
                    clearInterval(progressInterval);
                    return 0;
                }
                return prev - decrement;
            });
        }, intervalTime);

        const dismissTimeout = setTimeout(() => {
            setVisible(false);
            if (onClose) onClose();
        }, duration);

        return () => {
            clearInterval(progressInterval);
            clearTimeout(dismissTimeout);
        };
    }, [visible, duration, onClose]);

    if (!visible || !message) return null;

    const styles = {
        success: {
            bg: 'bg-emerald-50 border-emerald-100',
            text: 'text-emerald-800',
            icon: CheckCircleIcon,
            iconColor: 'text-emerald-500',
            progressColor: 'bg-emerald-500'
        },
        error: {
            bg: 'bg-rose-50 border-rose-100',
            text: 'text-rose-800',
            icon: XCircleIcon,
            iconColor: 'text-rose-500',
            progressColor: 'bg-rose-500'
        },
        warning: {
            bg: 'bg-amber-50 border-amber-100',
            text: 'text-amber-800',
            icon: ExclamationTriangleIcon,
            iconColor: 'text-amber-500',
            progressColor: 'bg-amber-500'
        },
        info: {
            bg: 'bg-slate-50 border-slate-100',
            text: 'text-slate-800',
            icon: InformationCircleIcon,
            iconColor: 'text-brand-primary',
            progressColor: 'bg-brand-primary'
        }
    };

    const currentStyle = styles[type] || styles.success;
    const Icon = currentStyle.icon;

    return (
        <div className="fixed top-6 right-6 z-[9999] max-w-sm w-full bg-white border border-slate-200 rounded-[0.25rem] shadow-[0_15px_50px_-10px_rgba(0,0,0,0.15)] p-5 overflow-hidden transition-all duration-300 transform translate-y-0 opacity-100 font-sans">
            <div className={`absolute top-0 left-0 right-0 p-[1.5px] ${currentStyle.bg}`}></div>
            <div className="flex items-start gap-3">
                <div className={`${currentStyle.iconColor} shrink-0 mt-0.5`}>
                    <Icon className="h-5 w-5" />
                </div>
                <div className="flex-grow space-y-1">
                    <p className={`text-[9px] font-black uppercase tracking-widest ${currentStyle.iconColor}`}>
                        {type === 'success' ? 'Sukses' : type === 'error' ? 'Gagal' : type === 'warning' ? 'Peringatan' : 'Informasi'}
                    </p>
                    <p className={`text-xs font-semibold leading-relaxed ${currentStyle.text}`}>
                        {message}
                    </p>
                </div>
                <button 
                    onClick={() => { setVisible(false); if (onClose) onClose(); }}
                    className="text-slate-400 hover:text-slate-600 transition-colors shrink-0"
                >
                    <XMarkIcon className="h-4 w-4" />
                </button>
            </div>
            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-100/80">
                <div 
                    className={`h-full ${currentStyle.progressColor} transition-all duration-[40ms] ease-linear`}
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        </div>
    );
}
