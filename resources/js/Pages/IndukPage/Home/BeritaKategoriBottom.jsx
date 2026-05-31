import React from 'react';
import { Link } from '@inertiajs/react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import NewsCard from '@/Pages/IndukPage/Berita/NewsCard';

export default function BeritaKategoriBottom({ bottomNews, bottomNewsTitle, bottomNewsSlug }) {
    if (!bottomNews || bottomNews.length === 0 || !bottomNewsTitle) {
        return null;
    }

    return (
        <section className="py-16 md:py-24 bg-brand-secondary/30 border-b border-slate-100 reveal-section">
            <div className="max-w-4xl mx-auto px-4">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 gap-4 md:gap-6 reveal-element-up">
                    <div>
                        <h2 className="text-xs font-bold text-brand-gold uppercase tracking-[0.3em] mb-3">
                            Kabar Pilihan
                        </h2>
                        <h3 className="text-3xl md:text-4xl font-serif font-bold text-brand-primary tracking-tight uppercase leading-tight">
                            Kategori <br /> <span className="italic text-brand-accent">{bottomNewsTitle}</span>
                        </h3>
                    </div>
                    <Link 
                        href={`/berita?kategori=${encodeURIComponent(bottomNewsSlug || '')}`} 
                        className="group text-xs font-bold text-brand-accent hover:text-brand-primary uppercase tracking-[0.15em] transition-all flex items-center gap-2"
                    >
                        Lihat Semua {bottomNewsTitle}
                        <ChevronRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
                
                <div className="flex flex-col gap-0 bg-white rounded-[0.25rem] border border-slate-200/50 shadow-sm overflow-hidden">
                    {bottomNews.slice(0, 4).map((berita, i) => (
                        <div key={berita.id} className="reveal-element-up" style={{ transitionDelay: `${i * 80}ms` }}>
                            <NewsCard berita={berita} variant="horizontal" className="px-4 hover:bg-brand-secondary/40 transition-all duration-300" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
