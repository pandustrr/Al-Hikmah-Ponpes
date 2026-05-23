import React from 'react';
import { Link } from '@inertiajs/react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import NewsCard from '@/Pages/IndukPage/Berita/NewsCard';

export default function BeritaKategoriBottom({ bottomNews, bottomNewsTitle, bottomNewsSlug }) {
    if (!bottomNews || bottomNews.length === 0 || !bottomNewsTitle) {
        return null;
    }

    return (
        <section className="py-24 bg-brand-secondary/30 border-b border-slate-100 reveal-section">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 reveal-element-up">
                    <div>
                        <h2 className="text-[10px] font-semibold text-brand-gold uppercase tracking-[0.4em] mb-4">
                            Kabar Pilihan
                        </h2>
                        <h3 className="text-4xl md:text-5xl font-serif font-semibold text-brand-primary tracking-tight uppercase leading-none">
                            Kategori <br /> <span className="italic text-brand-accent">{bottomNewsTitle}</span>
                        </h3>
                    </div>
                    <Link 
                        href={`/berita?kategori=${encodeURIComponent(bottomNewsSlug || '')}`} 
                        className="group text-[10px] font-semibold text-brand-accent hover:text-brand-primary uppercase tracking-[0.2em] transition-all flex items-center gap-2"
                    >
                        Lihat Semua {bottomNewsTitle}
                        <ChevronRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
                
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                    {bottomNews.slice(0, 4).map((berita, i) => (
                        <div key={berita.id} className="reveal-element-up" style={{ transitionDelay: `${i * 100}ms` }}>
                            {/* Make NewsCard background white to pop out over the light sage-gray background */}
                            <NewsCard berita={berita} className="bg-white p-2.5 sm:p-4 rounded-[0.25rem] border border-slate-200/50 shadow-sm hover:shadow-md transition-all duration-300" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
