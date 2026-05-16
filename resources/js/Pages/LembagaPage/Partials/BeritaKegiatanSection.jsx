import React from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { Link } from '@inertiajs/react';

export default function BeritaKegiatanSection({ beritas = [], prestasi = [] }) {
    const items = beritas.length > 0 ? beritas : prestasi.slice(0, 4);

    return (
        <section className="py-20 md:py-28 bg-white">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="flex items-end justify-between mb-12">
                    <div>
                        <h2 className="text-[10px] font-bold text-brand-primary uppercase tracking-[0.4em] mb-4">Galeri Unit</h2>
                        <h3 className="text-3xl md:text-4xl font-serif font-semibold text-slate-900 tracking-tight">Berita & <span className="text-brand-primary">Kegiatan Unit</span></h3>
                    </div>
                    <Link href="/berita" className="text-[9px] font-bold text-slate-400 hover:text-brand-primary uppercase tracking-widest flex items-center gap-2">
                        Selengkapnya <ArrowRightIcon className="h-3 w-3" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {items.map((p, i) => (
                        <div key={i} className="group flex flex-col h-full border border-slate-100 p-4 hover:shadow-xl transition-all">
                            <div className="aspect-video overflow-hidden mb-6 relative grayscale group-hover:grayscale-0 transition-all duration-700">
                                <img 
                                    src={p.image_url || `https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600&sig=${p.id}`} 
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
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
                    {items.length === 0 && (
                        <div className="col-span-full py-12 text-center text-slate-400 text-xs uppercase tracking-widest font-bold">
                            Belum ada berita atau kegiatan untuk unit ini.
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
