import React from 'react';
import LembagaAdminLayout from '@/Layouts/Lembaga/LembagaAdminLayout';

export default function Dashboard({ lembaga }) {
    return (
        <LembagaAdminLayout title="Dashboard" lembaga={lembaga}>
            <div className="max-w-7xl mx-auto py-4 px-4">
                <div className="mb-8">
                    <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-accent mb-2">Selamat Datang</h2>
                    <h1 className="text-3xl font-semibold uppercase tracking-tighter">Panel Admin {lembaga?.nama}</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 border border-slate-200 rounded-[0.25rem] shadow-sm">
                        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Berita Terbit</h3>
                        <p className="text-3xl font-semibold text-slate-900">0</p>
                    </div>
                    <div className="bg-white p-6 border border-slate-200 rounded-[0.25rem] shadow-sm">
                        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Total Alumni</h3>
                        <p className="text-3xl font-semibold text-slate-900">0</p>
                    </div>
                    <div className="bg-white p-6 border border-slate-200 rounded-[0.25rem] shadow-sm">
                        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Fasilitas</h3>
                        <p className="text-3xl font-semibold text-slate-900">0</p>
                    </div>
                </div>

                <div className="mt-8 bg-indigo-50 border border-indigo-100 p-6 rounded-[0.25rem]">
                    <p className="text-indigo-900 text-sm font-medium">
                        Gunakan sidebar di sebelah kiri untuk mengelola konten khusus untuk lembaga **{lembaga?.nama}**.
                    </p>
                </div>
            </div>
        </LembagaAdminLayout>
    );
}
