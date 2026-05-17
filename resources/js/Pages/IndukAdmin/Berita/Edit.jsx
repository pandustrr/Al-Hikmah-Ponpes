import React from 'react';
import IndukAdminLayout from '@/Layouts/Induk/IndukAdminLayout';
import BeritaForm from './Partials/BeritaForm';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Link, Head } from '@inertiajs/react';

export default function Edit({ berita, categories, lembagas }) {
    return (
        <IndukAdminLayout title="Edit Berita">
            <Head title={`Edit Berita: ${berita.judul}`} />

            <div className="max-w-6xl mx-auto pt-6 pb-16 px-4 sm:px-6 lg:px-8">
                
                {/* Header Navigation */}
                <div className="mb-6 flex items-center justify-between">
                    <Link 
                        href={route('admin.berita.index')}
                        className="text-[10px] font-bold text-slate-400 hover:text-brand-primary uppercase tracking-widest flex items-center gap-2 transition-colors"
                    >
                        <ArrowLeftIcon className="h-3 w-3" /> Kembali ke Kelola Berita
                    </Link>
                </div>

                {/* Page Title */}
                <div className="mb-8">
                    <h2 className="text-[10px] font-bold text-brand-accent uppercase tracking-[0.4em] mb-3">Editor Berita Portal</h2>
                    <h1 className="text-4xl font-semibold text-slate-900 tracking-tighter uppercase leading-none">Edit Berita <br /><span className="text-brand-primary line-clamp-1">{berita.judul}</span></h1>
                </div>

                <div className="animate-fade-in">
                    <BeritaForm key={berita.id} berita={berita} categories={categories} lembagas={lembagas} submitLabel="Simpan Perubahan" />
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                .animate-fade-in {
                    animation: fadeIn 0.4s ease-out forwards;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}} />
        </IndukAdminLayout>
    );
}
