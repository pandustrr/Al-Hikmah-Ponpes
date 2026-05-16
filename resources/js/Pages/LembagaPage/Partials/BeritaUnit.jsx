import React from 'react';
import { Link } from '@inertiajs/react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

export default function BeritaUnit({ beritas, prestasi }) {
    const displayItems = (beritas && beritas.length > 0 ? beritas : prestasi.slice(0, 3));
    
    return (
        <section className="py-32 bg-white">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
                    <div className="max-w-2xl">
                        <h2 className="text-brand-primary text-[10px] font-bold uppercase tracking-[0.4em] mb-4">Update Unit Pendidikan</h2>
                        <h3 className="text-4xl md:text-6xl font-serif font-semibold text-slate-900 tracking-tight leading-none uppercase">Berita & <span className="text-brand-primary">Kegiatan</span></h3>
                    </div>
                    <Link href="/berita" className="group flex items-center gap-2 text-[10px] font-bold text-brand-primary uppercase tracking-widest bg-brand-secondary px-8 py-4 rounded-full hover:bg-brand-primary hover:text-white transition-all shadow-lg shadow-brand-secondary/50">
                        Lihat Galeri Lengkap <ChevronRightIcon className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {displayItems.map((p, i) => (
                        <div key={p.id || i} className="group cursor-pointer flex flex-col gap-6 animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
                            <div className="aspect-square bg-slate-100 overflow-hidden relative rounded-[0.25rem] shadow-xl group-hover:shadow-brand-primary/10 transition-all duration-500">
                                <img 
                                    src={p.image_url || `https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=600&sig=${i}`} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                                    alt={p.judul} 
                                />
                                <div className="absolute top-3 left-3 bg-brand-primary text-white text-[7px] font-bold uppercase tracking-widest px-2 py-1 shadow-lg">
                                    Update Unit
                                </div>
                            </div>
                            <div className="flex-grow">
                                <div className="text-[8px] font-bold text-brand-secondary uppercase tracking-[0.2em] mb-2">
                                    {new Date(p.tanggal || p.created_at).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })}
                                </div>
                                <h4 className="text-base font-bold text-slate-900 uppercase tracking-tight leading-tight line-clamp-2 group-hover:text-brand-primary transition-colors">
                                    {p.judul}
                                </h4>
                            </div>
                        </div>
                    ))}
                    {displayItems.length === 0 && (
                         <div className="col-span-full py-12 text-center text-slate-400 text-xs uppercase tracking-widest font-bold">
                            Belum ada berita atau kegiatan untuk unit ini.
                         </div>
                    )}
                </div>
            </div>
        </section>
    );
}
