import React from 'react';
import { Link, Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

export default function Error({ status }) {
    const title = {
        503: '503: Service Unavailable',
        500: '500: Server Error',
        404: '404: Page Not Found',
        403: '403: Forbidden',
    }[status];

    const description = {
        503: 'Maaf, kami sedang melakukan pemeliharaan rutin. Silakan kembali lagi nanti.',
        500: 'Ups, terjadi kesalahan pada server kami. Tim IT sedang menanganinya.',
        404: 'Maaf, halaman yang Anda cari tidak ditemukan atau telah dipindahkan.',
        403: 'Maaf, Anda tidak memiliki akses untuk membuka halaman ini.',
    }[status];

    return (
        <PublicLayout isAuth={true} title={title}>
            <div className="text-center">
                <div className="mb-6 flex justify-center">
                    <div className="text-6xl font-black text-brand-primary opacity-20 tracking-tighter">
                        {status}
                    </div>
                </div>
                
                <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-4">
                    {title}
                </h1>
                
                <p className="text-slate-500 text-sm leading-relaxed mb-8">
                    {description}
                </p>

                <Link 
                    href="/" 
                    className="inline-flex items-center gap-2 bg-brand-primary text-white px-8 py-3 text-[10px] font-black uppercase tracking-[0.2em] rounded-[0.25rem] hover:bg-slate-900 transition-all shadow-lg shadow-brand-primary/20"
                >
                    ← Kembali ke Beranda
                </Link>
            </div>
        </PublicLayout>
    );
}
