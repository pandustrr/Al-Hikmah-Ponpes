import React from 'react';
import { Link } from '@inertiajs/react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import NewsCard from '@/Pages/IndukPage/Berita/NewsCard';

export default function BeritaYayasan({ beritaTerbaru, settings = {} }) {
    return (
        <section className="py-24 bg-white border-b border-slate-100 reveal-section">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 reveal-element-up">
                    <div>
                        <h2 className="text-xs font-bold text-brand-gold uppercase tracking-[0.3em] mb-3">
                            {settings.warta_tagline || 'Warta Yayasan'}
                        </h2>
                        <h3 className="text-3xl md:text-4xl font-serif font-bold text-brand-primary tracking-tight uppercase leading-tight">
                            {settings.warta_title_1 || 'Informasi'} <br /> <span className="italic text-brand-accent">{settings.warta_title_2 || 'Terbaru'}</span>
                        </h3>
                    </div>
                    <Link href="/berita" className="group text-xs font-bold text-brand-accent hover:text-brand-primary uppercase tracking-[0.15em] transition-all flex items-center gap-2">
                        {settings.warta_btn_text || 'Lihat Semua Berita'}
                        <ChevronRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
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



