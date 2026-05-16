import React from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { Link } from '@inertiajs/react';

export default function StickyNewsHighlight({ stickyBerita }) {
    if (!stickyBerita) return null;
    return (
        <section className="pt-20 md:pt-28 bg-[#FBFBF9]">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="bg-brand-primary text-white overflow-hidden rounded-[0.25rem] shadow-2xl flex flex-col md:flex-row border border-white/10">
                    <div className="md:w-1/2 aspect-video md:aspect-auto relative overflow-hidden">
                        <img 
                            src={stickyBerita.image_url || 'https://images.unsplash.com/photo-1523050853063-bd8012fec21b?auto=format&fit=crop&q=80&w=1000'} 
                            className="w-full h-full object-cover" 
                            alt={stickyBerita.judul} 
                        />
                        <div className="absolute top-6 left-6 bg-brand-secondary text-brand-primary text-[8px] font-black uppercase tracking-[0.3em] px-4 py-2 shadow-lg">
                            Pengumuman Utama
                        </div>
                    </div>
                    <div className="md:w-1/2 p-6 md:p-16 flex flex-col justify-center">
                        <div className="text-brand-secondary text-[9px] font-bold uppercase tracking-[0.4em] mb-4">Penting & Terbaru</div>
                        <h2 className="text-2xl md:text-4xl font-serif font-semibold tracking-tight mb-6 leading-tight">
                            {stickyBerita.judul}
                        </h2>
                        <p className="text-white/60 text-xs md:text-sm leading-relaxed mb-10 line-clamp-3">
                            {stickyBerita.ringkasan || stickyBerita.konten.substring(0, 200) + '...'}
                        </p>
                        <Link 
                            href={`/berita/${stickyBerita.slug}`}
                            className="inline-flex items-center gap-3 text-brand-secondary text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors group"
                        >
                            Baca Selengkapnya <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
