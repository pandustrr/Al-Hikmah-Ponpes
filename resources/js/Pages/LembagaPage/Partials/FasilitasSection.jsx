import React from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { Link } from '@inertiajs/react';

export default function FasilitasSection({ lembaga, fasilitas = [] }) {
    if (!fasilitas || fasilitas.length === 0) return null;

    return (
        <section className="py-24 bg-slate-50 border-y border-slate-100">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                    <div className="max-w-2xl">
                        <h2 className="text-brand-primary text-[10px] font-bold uppercase tracking-[0.4em] mb-4">Infrastruktur & Sarana</h2>
                        <h3 className="text-3xl md:text-5xl font-serif font-semibold text-slate-900 tracking-tight leading-none uppercase">
                            Fasilitas <span className="text-brand-primary">Unggulan</span>
                        </h3>
                        <p className="mt-6 text-slate-500 text-sm md:text-base leading-relaxed">
                            Kami menyediakan lingkungan belajar yang aman dan lengkap untuk menunjang tumbuh kembang santri secara optimal di <span className="font-bold text-slate-700">{lembaga.nama}</span>.
                        </p>
                    </div>
                    <Link href="/fasilitas" className="group flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-brand-primary transition-colors">
                        Lihat Semua Fasilitas <ChevronRightIcon className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {fasilitas.map((f, i) => (
                        <div key={f.id} className="group bg-white border border-slate-200 rounded-[0.25rem] overflow-hidden hover:shadow-2xl hover:shadow-brand-primary/5 transition-all duration-500">
                            <div className="aspect-[4/3] overflow-hidden relative">
                                <img 
                                    src={f.image_url || `https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600&sig=${i}`} 
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                                    alt={f.nama} 
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-brand-primary/90 backdrop-blur-sm text-white text-[8px] font-bold uppercase tracking-widest px-3 py-1.5 shadow-lg">
                                        {f.kategori || 'Fasilitas Unit'}
                                    </span>
                                </div>
                            </div>
                            <div className="p-8">
                                <h4 className="text-lg font-bold text-slate-900 uppercase tracking-tight mb-3 group-hover:text-brand-primary transition-colors">{f.nama}</h4>
                                <p className="text-slate-500 text-xs leading-relaxed line-clamp-3 italic">
                                    "{f.deskripsi}"
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
