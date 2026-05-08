import React from 'react';
import IndukAdminLayout from '@/Layouts/Induk/IndukAdminLayout';

export default function Index(props) {
    return (
        <IndukAdminLayout title="Info PPDB">
            <div className="max-w-7xl mx-auto py-4 px-4">
                <div className="mb-8">
                    <h2 className="text-xs font-black uppercase tracking-[0.3em] text-brand-accent mb-2">Pusat Yayasan</h2>
                    <h1 className="text-3xl font-black uppercase tracking-tighter text-slate-900">Kelola Informasi PPDB</h1>
                </div>
                <div className="bg-white border border-slate-200 p-8 text-center text-slate-400 uppercase text-xs font-bold tracking-widest rounded-[0.25rem] shadow-sm">
                    Halaman CRUD Informasi PPDB Pusat akan muncul di sini.
                </div>
            </div>
        </IndukAdminLayout>
    );
}
