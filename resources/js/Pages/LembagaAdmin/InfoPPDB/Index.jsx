import React from 'react';
import LembagaAdminLayout from '@/Layouts/Lembaga/LembagaAdminLayout';

export default function Index({ lembaga }) {
    return (
        <LembagaAdminLayout title="Info PPDB" lembaga={lembaga}>
            <div className="max-w-7xl mx-auto py-4 px-4">
                <div className="mb-8">
                    <h2 className="text-xs font-black uppercase tracking-[0.3em] text-brand-accent mb-2">Admin {lembaga.nama}</h2>
                    <h1 className="text-3xl font-black uppercase tracking-tighter text-slate-900">Kelola Info PPDB</h1>
                </div>
                <div className="bg-white border border-slate-200 p-8 text-center text-slate-400 uppercase text-xs font-bold tracking-widest rounded-[0.25rem] shadow-sm">
                    Halaman CRUD Info PPDB {lembaga.nama} akan muncul di sini.
                </div>
            </div>
        </LembagaAdminLayout>
    );
}
