import React from 'react';
import { Head } from '@inertiajs/react';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';

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
                        <Cog6ToothIcon className="h-10 w-10 text-brand-primary animate-spin" style={{ animationDuration: '3s' }} />
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
