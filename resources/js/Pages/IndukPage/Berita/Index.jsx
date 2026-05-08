import React, { useState } from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Link, router } from '@inertiajs/react';

export default function Index({ berita, currentCategory, categories }) {
    // Combine "Semua Berita" with dynamic categories from DB
    const allCategories = [
        { slug: '', name: 'Semua Berita' },
        ...categories
    ];

    const handleFilter = (slug) => {
        router.get('/berita', slug ? { kategori: slug } : {}, {
            preserveState: true,
            replace: true,
        });
    };

    return (
        <PublicLayout title="Berita">
            {/* Hero */}
            <div className="bg-brand-secondary border-b border-sage-light">
                <div className="max-w-7xl mx-auto px-4 py-16 text-center">
                    <h2 className="text-xs font-bold text-brand-accent uppercase tracking-[0.3em] mb-3">Terkini dari Yayasan</h2>
                    <h1 className="text-4xl md:text-5xl font-black text-brand-primary tracking-tighter mb-4 uppercase">Berita & Informasi</h1>
                    <div className="h-1 w-16 bg-brand-primary mx-auto mb-4"></div>
                    <p className="text-brand-accent max-w-xl mx-auto">Ikuti perkembangan terbaru seputar kegiatan, prestasi, dan pengumuman dari YPDS Al-Hikmah.</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Filter */}
                <div className="flex flex-wrap gap-2 justify-center mb-12">
                    {allCategories.map(cat => (
                        <button
                            key={cat.slug}
                            onClick={() => handleFilter(cat.slug)}
                            className={`px-5 py-2 text-xs font-bold uppercase tracking-widest transition-all rounded-[0.25rem] border ${(currentCategory || '') === cat.slug ? 'bg-brand-primary text-white border-brand-primary' : 'bg-white text-brand-accent border-sage-light hover:border-brand-accent'}`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                {berita.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {berita.map((b, i) => (
                            <Link key={b.id} href={`/berita/${b.slug}`} className="card-clean group bg-white block">
                                <div className="aspect-video bg-brand-secondary overflow-hidden relative">
                                    <img
                                        src={b.image_url || `https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600&sig=${b.id}`}
                                        alt={b.judul}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&q=80&w=600"; }}
                                    />
                                    {i === 0 && (
                                        <div className="absolute top-3 left-3 bg-brand-primary text-white text-[9px] font-black uppercase tracking-widest px-3 py-1">
                                            Terbaru
                                        </div>
                                    )}
                                </div>
                                <div className="p-6">
                                    <div className="text-[10px] font-bold text-brand-accent uppercase tracking-widest mb-2">
                                        {b.created_at ? new Date(b.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}
                                    </div>
                                    <h3 className="text-lg font-black text-brand-primary mb-3 group-hover:text-brand-accent transition-colors leading-tight line-clamp-2">
                                        {b.judul}
                                    </h3>
                                    <p className="text-brand-accent text-sm line-clamp-2 leading-relaxed mb-4">{b.konten}</p>
                                    <span className="text-[9px] font-black text-brand-primary hover:text-brand-accent uppercase tracking-widest transition-colors">
                                        Baca Selengkapnya →
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24 bg-white border border-dashed border-sage-light rounded-[0.25rem]">
                        <p className="text-brand-accent/50 font-medium uppercase tracking-widest">Belum ada berita</p>
                    </div>
                )}
            </div>
        </PublicLayout>
    );
}


