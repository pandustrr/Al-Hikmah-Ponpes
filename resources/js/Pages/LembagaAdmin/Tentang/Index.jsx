import React from 'react';
import LembagaAdminLayout from '@/Layouts/Lembaga/LembagaAdminLayout';

export default function Index({ lembaga, ...props }) {
    return (
        <LembagaAdminLayout title="Tentang Sekolah" lembaga={lembaga}>
            <div className="max-w-7xl mx-auto py-4 px-4">
                <div className="mb-8">
                    <h2 className="text-xs font-black uppercase tracking-[0.3em] text-brand-accent mb-2">Admin Panel {lembaga?.slug?.toUpperCase()}</h2>
                    <h1 className="text-3xl font-black uppercase tracking-tighter">Profil Sekolah</h1>
                </div>
                <div className="bg-white border border-slate-200 p-8 text-center text-brand-accent uppercase text-xs font-bold tracking-widest rounded-[0.25rem] shadow-sm">
                    Halaman Kelola Profil untuk {lembaga?.nama} akan muncul di sini.
                </div>
            </div>
        </LembagaAdminLayout>
    );
}
