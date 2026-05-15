import React from 'react';
import IndukAdminLayout from '@/Layouts/Induk/IndukAdminLayout';

export default function Index(props) {
    return (
        <IndukAdminLayout title="Kelola Alumni">
            <div className="max-w-7xl mx-auto py-4 px-4">
                <div className="mb-8">
                    <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-accent mb-2">Pusat Yayasan</h2>
                    <h1 className="text-3xl font-semibold uppercase tracking-tighter text-slate-900">Kelola Alumni</h1>
                </div>
                <div className="bg-white border border-slate-200 p-8 text-center text-slate-400 uppercase text-xs font-semibold tracking-widest rounded-[0.25rem] shadow-sm">
                    Halaman CRUD Alumni Pusat akan muncul di sini.
                </div>
            </div>
        </IndukAdminLayout>
    );
}
