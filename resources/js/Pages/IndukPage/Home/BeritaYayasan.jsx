import React from 'react';
import { Link } from '@inertiajs/react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import NewsCard from '@/Pages/IndukPage/Berita/NewsCard';

export default function BeritaYayasan({ beritaTerbaru }) {
    return (
        <section className="py-24 bg-white border-b border-slate-100 reveal-section">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 reveal-element-up">
                    <div>
                        <h2 className="text-[10px] font-semibold text-brand-gold uppercase tracking-[0.4em] mb-4">Warta Yayasan</h2>
                        <h3 className="text-4xl md:text-5xl font-serif font-semibold text-brand-primary tracking-tight uppercase leading-none">
                            Informasi <br /> <span className="italic text-brand-accent">Terbaru</span>
                        </h3>
                    </div>
                    <Link href="/berita" className="group text-[10px] font-semibold text-brand-accent hover:text-brand-primary uppercase tracking-[0.2em] transition-all flex items-center gap-2">
                        Lihat Semua Berita 
                        <ChevronRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {beritaTerbaru.slice(0, 4).map((berita, i) => (
                        <div key={berita.id} className="reveal-element-up" style={{ transitionDelay: `${i * 100}ms` }}>
                            <NewsCard berita={berita} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}



