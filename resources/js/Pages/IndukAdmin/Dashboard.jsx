import React from 'react';
import IndukAdminLayout from '@/Layouts/Induk/IndukAdminLayout';

export default function Dashboard(props) {
    return (
        <IndukAdminLayout title="Dashboard Super Admin">
            <div className="max-w-7xl mx-auto py-4 px-4">
                <div className="mb-8">
                    <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-accent mb-2">Pusat Yayasan</h2>
                    <h1 className="text-3xl font-semibold uppercase tracking-tighter text-slate-900">Dashboard Super Admin</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white p-6 border border-slate-200 rounded-[0.25rem] shadow-sm">
                        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Total Lembaga</h3>
                        <p className="text-3xl font-semibold text-slate-900">4</p>
                    </div>
                    <div className="bg-white p-6 border border-slate-200 rounded-[0.25rem] shadow-sm">
                        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Total User</h3>
                        <p className="text-3xl font-semibold text-slate-900">5</p>
                    </div>
                    <div className="bg-white p-6 border border-slate-200 rounded-[0.25rem] shadow-sm">
                        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Berita Pusat</h3>
                        <p className="text-3xl font-semibold text-slate-900">0</p>
                    </div>
                    <div className="bg-white p-6 border border-slate-200 rounded-[0.25rem] shadow-sm">
                        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Pesan Masuk</h3>
                        <p className="text-3xl font-semibold text-slate-900">0</p>
                    </div>
                </div>

                <div className="mt-8 bg-indigo-900 p-8 rounded-[0.25rem] text-white">
                    <h4 className="text-xl font-semibold uppercase tracking-tighter mb-2">Selamat Datang di Pusat Kendali Yayasan</h4>
                    <p className="text-indigo-200 text-sm leading-relaxed max-w-2xl">
                        Di sini Anda dapat mengelola data seluruh lembaga pendidikan, mengatur berita pusat, serta memantau perkembangan seluruh unit di bawah naungan Yayasan Pondok Pesantren Al-Hikmah.
                    </p>
                </div>
            </div>
        </IndukAdminLayout>
    );
}
