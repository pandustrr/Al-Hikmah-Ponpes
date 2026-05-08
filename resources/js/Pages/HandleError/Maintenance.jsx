import React from 'react';
import { Head } from '@inertiajs/react';

export default function Maintenance() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6">
            <Head title="Sistem Sedang Diperbarui" />
            
            <div className="max-w-md w-full bg-white shadow-2xl shadow-slate-200 border border-slate-100 rounded-[0.5rem] p-12 text-center relative overflow-hidden">
                {/* Decorative Element */}
                <div className="absolute top-0 left-0 w-full h-1 bg-brand-primary"></div>
                
                {/* Icon Section */}
                <div className="mb-8 flex justify-center">
                    <div className="w-20 h-20 bg-brand-secondary flex items-center justify-center rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-brand-primary animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                </div>

                <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-4 leading-tight">
                    Sistem Sedang <br /> Diperbarui
                </h1>
                
                <div className="w-12 h-1 bg-brand-primary mx-auto mb-6 opacity-30"></div>

                <p className="text-slate-500 text-sm leading-relaxed mb-10">
                    Kami sedang melakukan peningkatan sistem untuk memberikan layanan yang lebih baik. Kami akan segera kembali dalam waktu singkat.
                </p>

                <div className="bg-slate-50 border border-slate-100 rounded-[0.25rem] py-4 px-6">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-accent">
                        Mohon Tunggu Sejenak
                    </span>
                </div>
            </div>

            <p className="mt-8 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                &copy; {new Date().getFullYear()} YPDS Al-Hikmah
            </p>
        </div>
    );
}
