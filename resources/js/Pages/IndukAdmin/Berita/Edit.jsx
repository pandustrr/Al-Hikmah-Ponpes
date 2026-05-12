import React from 'react';
import IndukAdminLayout from '@/Layouts/Induk/IndukAdminLayout';
import BeritaForm from './Partials/BeritaForm';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Link } from '@inertiajs/react';

export default function Edit({ berita, categories, lembagas }) {
    return (
        <IndukAdminLayout title="Edit Berita">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="mb-10">
                    <Link 
                        href={route('admin.berita.index')}
                        className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-brand-primary transition-colors mb-6"
                    >
                        <ArrowLeftIcon className="h-3 w-3" />
                        Kembali ke Daftar
                    </Link>
                    <h2 className="text-xs font-black uppercase tracking-[0.3em] text-brand-accent mb-2">Editor Berita</h2>
                    <h1 className="text-4xl font-black uppercase tracking-tighter text-slate-900 leading-none">Edit Berita: <span className="text-brand-primary line-clamp-1">{berita.judul}</span></h1>
                </div>

                <BeritaForm berita={berita} categories={categories} lembagas={lembagas} submitLabel="Simpan Perubahan" />
            </div>
        </IndukAdminLayout>
    );
}
