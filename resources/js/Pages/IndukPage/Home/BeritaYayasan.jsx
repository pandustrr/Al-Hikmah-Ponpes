import React from 'react';
import { Link } from '@inertiajs/react';

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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
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
                            <div className="p-6 border-x border-b border-brand-secondary group-hover:border-brand-primary transition-colors flex-grow rounded-b-[0.25rem]">
                                <div className="text-[10px] font-black text-brand-accent mb-2 uppercase tracking-widest">{new Date(berita.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                                <h3 className="text-base font-black text-brand-primary mb-2 group-hover:text-brand-accent transition-colors leading-tight uppercase tracking-tighter">{berita.judul}</h3>
                                <p className="text-brand-accent text-sm line-clamp-2 mb-4 leading-relaxed">{berita.konten}</p>
                                <div className="text-brand-primary text-[10px] font-black uppercase tracking-widest inline-flex items-center">
                                    Baca Selengkapnya
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}


