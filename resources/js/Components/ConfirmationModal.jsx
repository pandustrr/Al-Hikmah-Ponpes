import React from 'react';
import { 
    ExclamationTriangleIcon, 
    QuestionMarkCircleIcon,
    TrashIcon
} from '@heroicons/react/24/outline';

export default function ConfirmationModal({
    show = false,
    title = 'Konfirmasi Tindakan',
    message = 'Apakah Anda yakin ingin melakukan tindakan ini? Tindakan ini tidak dapat dibatalkan.',
    type = 'danger', // 'danger' | 'warning' | 'info'
    confirmText = 'Ya, Lanjutkan',
    cancelText = 'Batal',
    onConfirm,
    onCancel,
    processing = false
}) {
    if (!show) return null;

    const styles = {
        danger: {
            icon: TrashIcon,
            iconBg: 'bg-rose-50 border-rose-100 text-rose-600',
            buttonColor: 'bg-rose-600 hover:bg-rose-700 shadow-rose-600/10 focus:ring-rose-500',
            titleColor: 'text-rose-900'
        },
        warning: {
            icon: ExclamationTriangleIcon,
            iconBg: 'bg-amber-50 border-amber-100 text-amber-600',
            buttonColor: 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/10 focus:ring-amber-500',
            titleColor: 'text-amber-950'
        },
        info: {
            icon: QuestionMarkCircleIcon,
            iconBg: 'bg-brand-primary/5 border-brand-primary/10 text-brand-primary',
            buttonColor: 'bg-brand-primary hover:bg-slate-900 shadow-brand-primary/10 focus:ring-brand-primary',
            titleColor: 'text-slate-900'
        }
    };

    const currentStyle = styles[type] || styles.danger;
    const Icon = currentStyle.icon;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Backdrop Blur */}
            <div 
                onClick={onCancel}
                className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity duration-300"
            ></div>

            {/* Modal Body */}
            <div className="relative bg-white border border-slate-200 rounded-[0.25rem] max-w-md w-full shadow-2xl p-6 overflow-hidden transform transition-all duration-300 scale-100 font-sans space-y-6">
                <div className="flex gap-4 items-start">
                    <div className={`p-3 rounded-[0.25rem] border ${currentStyle.iconBg} shrink-0`}>
                        <Icon className="h-6 w-6" />
                    </div>
                    <div className="space-y-2 flex-grow">
                        <h3 className={`text-base font-bold uppercase tracking-wider ${currentStyle.titleColor}`}>
                            {title}
                        </h3>
                        <p className="text-xs text-slate-500 leading-relaxed">
                            {message}
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
                    <button
                        type="button"
                        disabled={processing}
                        onClick={onCancel}
                        className="py-3 px-6 text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-slate-800 bg-slate-50 hover:bg-slate-100 rounded-[0.25rem] border border-slate-200 transition-all focus:outline-none"
                    >
                        {cancelText}
                    </button>
                    <button
                        type="button"
                        disabled={processing}
                        onClick={onConfirm}
                        className={`py-3 px-6 text-[10px] font-bold uppercase tracking-widest text-white rounded-[0.25rem] transition-all focus:outline-none focus:ring-1 focus:ring-offset-2 ${currentStyle.buttonColor}`}
                    >
                        {processing ? 'Sedang Memproses...' : confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}
