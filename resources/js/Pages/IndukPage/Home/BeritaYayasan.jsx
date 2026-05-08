import React from 'react';
import { Link } from '@inertiajs/react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

export default function BeritaYayasan({ beritaTerbaru }) {
    const fallbackImgs = [
        'https://images.unsplash.com/photo-1544717305-996b815c338c?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=800',
    ];

    return (
        <section className="py-24 bg-white border-b border-brand-light reveal-section">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16 reveal-element-up">
                    <h2 className="text-xs font-bold text-brand-accent uppercase tracking-[0.3em] mb-4">Warta Lembaga</h2>
                    <h3 className="text-4xl font-black text-brand-primary tracking-tighter uppercase mb-6">Berita Yayasan</h3>
                    <div className="h-1 w-20 bg-brand-primary mx-auto"></div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-8">
                    {beritaTerbaru.map((berita, i) => (
                        <Link key={berita.id} href={`/berita/${berita.slug}`} className="group card-clean flex flex-col reveal-element-up" style={{ transitionDelay: `${i * 100}ms` }}>
                            <div className="aspect-[16/10] bg-brand-secondary overflow-hidden rounded-t-[0.25rem]">
                                <img
                                    src={berita.image_url || fallbackImgs[i % fallbackImgs.length]}
                                    alt={berita.judul}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    onError={(e) => { e.target.onerror = null; e.target.src = fallbackImgs[i % fallbackImgs.length]; }}
                                />
                            </div>
                            <div className="p-3 md:p-6 border-x border-b border-brand-secondary group-hover:border-brand-primary transition-colors flex-grow rounded-b-[0.25rem]">
                                <div className="text-[8px] md:text-[10px] font-black text-brand-accent mb-1 md:mb-2 uppercase tracking-widest">{new Date(berita.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                                <h3 className="text-[11px] md:text-base font-black text-brand-primary mb-2 group-hover:text-brand-accent transition-colors leading-tight uppercase tracking-tighter line-clamp-2">{berita.judul}</h3>
                                <p className="hidden md:block text-brand-accent text-sm line-clamp-2 mb-4 leading-relaxed">{berita.konten}</p>
                                <div className="text-brand-primary text-[8px] md:text-[10px] font-black uppercase tracking-widest inline-flex items-center">
                                    Baca Selengkapnya
                                    <ChevronRightIcon className="h-3 w-3 md:h-4 md:w-4 ml-1 group-hover:translate-x-1 transition-transform stroke-[3px]" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}


