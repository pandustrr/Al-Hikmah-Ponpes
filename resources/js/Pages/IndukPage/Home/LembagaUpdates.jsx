import React from 'react';
import { Link } from '@inertiajs/react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default function LembagaUpdates({ lembagas }) {
    const lembagasWithNews = (lembagas || []).filter(
        (lembaga) => (lembaga.berita_terbaru || []).length > 0
    );

    if (lembagasWithNews.length === 0) return null;

    return (
        <section className="py-12 md:py-24 bg-white border-b border-brand-light reveal-section">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-10 md:mb-20 reveal-element-up">
                    <h2 className="text-xs font-semibold text-brand-accent uppercase tracking-[0.3em] mb-3">Informasi Terkini</h2>
                    <h3 className="text-3xl md:text-4xl font-semibold text-brand-primary tracking-tighter uppercase mb-5">Update Lembaga</h3>
                    <div className="h-1 w-20 bg-brand-primary mx-auto"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
                    {/* FULL WIDTH — Lembaga Updates */}
                    <div className="lg:col-span-12 space-y-12 md:space-y-20">
                        {lembagasWithNews.map((lembaga) => {
                            const beritaItems = lembaga.berita_terbaru || [];
                            const prestasiItems = lembaga.latest_prestasi || [];
                            const hasBerita = beritaItems.length > 0;
                            const hasPrestasi = prestasiItems.length > 0;

                            return (
                                <div key={lembaga.id} className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start border-l-4 border-brand-secondary pl-5 md:pl-8 reveal-element-up">
                                    <div className="lg:col-span-3">
                                        <div className="sticky top-24">
                                            <h3 className="text-6xl font-semibold text-brand-primary/5 mb-[-1.2rem] uppercase">{lembaga.slug}</h3>
                                            <h4 className="text-xl font-semibold text-brand-primary mb-4 uppercase tracking-tighter">{lembaga.nama}</h4>
                                            <Link href={`/${lembaga.slug}`} className="text-brand-accent text-xs font-semibold hover:text-brand-primary uppercase tracking-[0.15em] inline-flex items-center bg-brand-secondary px-4 py-2.5 transition-all rounded-[0.25rem] group">
                                                Kunjungi {lembaga.slug.toUpperCase()}
                                                <ArrowRightIcon className="h-3.5 w-3.5 ml-2 group-hover:translate-x-1 transition-transform" />
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="lg:col-span-9">
                                        {/* Berita Terbaru dari Lembaga */}
                                        {hasBerita ? (
                                            <div className="space-y-5">
                                                <h5 className="text-[10px] font-semibold uppercase tracking-widest text-brand-primary border-b-2 border-brand-primary pb-2 flex items-center gap-2">
                                                    <span className="w-2 h-2 bg-brand-primary rounded-full"></span>
                                                    Berita Terbaru
                                                </h5>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                                    {beritaItems.map(b => (
                                                        <Link key={b.id} href={`/berita/${b.slug}`} className="group bg-white border border-brand-secondary hover:border-brand-primary transition-all rounded-[0.25rem] overflow-hidden block">
                                                             <div className="aspect-[16/9] overflow-hidden bg-brand-secondary">
                                                                 <img
                                                                     src={b.image_url || `https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&q=80&w=400`}
                                                                     alt={b.judul}
                                                                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                                     onError={(e) => { e.target.onerror = null; e.target.src = `https://images.unsplash.com/photo-1544717305-996b815c338c?auto=format&fit=crop&q=80&w=400`; }}
                                                                 />
                                                             </div>
                                                             <div className="p-3">
                                                                 <div className="text-[8px] font-semibold text-brand-accent uppercase tracking-widest mb-1 opacity-70">
                                                                     {b.category?.name || 'Berita'}
                                                                 </div>
                                                                 <h6 className="font-semibold text-brand-primary group-hover:text-brand-accent transition-colors leading-snug text-xs sm:text-xs md:text-[12px] line-clamp-2">{b.judul}</h6>
                                                             </div>
                                                         </Link>
                                                    ))}
                                                </div>
                                                <Link href={`/berita`} className="inline-flex items-center gap-2 text-[10px] font-semibold text-brand-accent hover:text-brand-primary uppercase tracking-[0.15em] transition-all">
                                                    Lihat semua berita <ArrowRightIcon className="h-3 w-3" />
                                                </Link>
                                            </div>
                                        ) : hasPrestasi ? (
                                            /* Fallback: Tampilkan prestasi jika tidak ada berita */
                                            <div className="space-y-5">
                                                <h5 className="text-[10px] font-semibold uppercase tracking-widest text-brand-primary border-b-2 border-brand-primary pb-2 flex items-center gap-2">
                                                    <span className="w-2 h-2 bg-brand-primary rounded-full"></span>
                                                    Prestasi Terbaru
                                                 </h5>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                                    {prestasiItems.map(p => (
                                                        <div key={p.id} className="group bg-white border border-brand-secondary hover:border-brand-primary transition-all rounded-[0.25rem] overflow-hidden">
                                                            <div className="aspect-[16/9] overflow-hidden bg-brand-secondary">
                                                                <img
                                                                    src={p.image_url || `https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&q=80&w=400`}
                                                                    alt={p.judul}
                                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                                    onError={(e) => { e.target.onerror = null; e.target.src = `https://images.unsplash.com/photo-1544717305-996b815c338c?auto=format&fit=crop&q=80&w=400`; }}
                                                                />
                                                            </div>
                                                            <div className="p-3">
                                                                <h6 className="font-semibold text-brand-primary group-hover:text-brand-accent transition-colors leading-snug text-xs sm:text-xs md:text-[12px] line-clamp-2">{p.judul}</h6>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ) : (
                                            /* Empty state */
                                            <div className="py-8 text-center border border-dashed border-brand-secondary rounded-[0.25rem]">
                                                <p className="text-brand-accent text-xs italic">Belum ada berita atau update dari lembaga ini.</p>
                                                <Link href={`/${lembaga.slug}`} className="mt-3 inline-block text-[10px] font-semibold text-brand-primary hover:text-brand-accent uppercase tracking-widest transition-all">
                                                    Kunjungi Profil Lembaga →
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
