import React from 'react';
import { Link } from '@inertiajs/react';

export default function NewsCard({ berita, variant = 'vertical', className = '' }) {
    const formattedDate = berita.created_at 
        ? new Date(berita.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) 
        : '';

    if (variant === 'featured') {
        return (
            <Link 
                href={`/berita/${berita.slug}`} 
                className={`group block relative overflow-hidden bg-slate-900 aspect-[16/9] md:aspect-[21/9] ${className}`}
            >
                <img
                    src={berita.image_url || "https://images.unsplash.com/photo-1504711432869-5d39a110fdd7?auto=format&fit=crop&q=80&w=1200"}
                    alt={berita.judul}
                    className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="bg-brand-primary text-white text-[10px] font-semibold uppercase tracking-[0.2em] px-3 py-1">
                            UTAMA
                        </span>
                        <span className="text-white/70 text-[10px] font-semibold uppercase tracking-widest">
                            {formattedDate}
                        </span>
                    </div>
                    <h2 className="text-2xl md:text-4xl font-serif font-semibold text-white leading-tight group-hover:text-brand-secondary transition-colors line-clamp-2 mb-4">
                        {berita.judul}
                    </h2>
                    <p className="text-white/80 text-sm md:text-base line-clamp-2 max-w-2xl hidden md:block">
                        {berita.konten}
                    </p>
                </div>
            </Link>
        );
    }

    if (variant === 'horizontal') {
        return (
            <Link 
                href={`/berita/${berita.slug}`} 
                className={`group flex gap-4 py-4 border-b border-sage-light last:border-0 ${className}`}
            >
                <div className="w-32 h-20 md:w-48 md:h-28 flex-shrink-0 overflow-hidden bg-brand-secondary">
                    <img
                        src={berita.image_url || "https://images.unsplash.com/photo-1585829365234-781fcd04c838?auto=format&fit=crop&q=80&w=400"}
                        alt={berita.judul}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                </div>
                <div className="flex-grow">
                    <div className="text-[10px] font-semibold text-brand-accent uppercase tracking-widest mb-1">
                        {berita.category?.name || 'Berita'}
                    </div>
                    <h3 className="text-base font-semibold text-brand-primary leading-tight group-hover:text-brand-accent transition-colors line-clamp-2 mb-2">
                        {berita.judul}
                    </h3>
                    <div className="text-[10px] font-medium text-brand-accent uppercase tracking-widest">
                        {formattedDate}
                    </div>
                </div>
            </Link>
        );
    }

    if (variant === 'sidebar') {
        return (
            <Link 
                href={`/berita/${berita.slug}`} 
                className={`group flex gap-3 py-3 border-b border-sage-light last:border-0 ${className}`}
            >
                <div className="w-16 h-16 flex-shrink-0 overflow-hidden bg-brand-secondary">
                    <img
                        src={berita.image_url || "https://images.unsplash.com/photo-1585829365234-781fcd04c838?auto=format&fit=crop&q=80&w=200"}
                        alt={berita.judul}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                </div>
                <div>
                    <h3 className="text-xs font-semibold text-brand-primary leading-tight group-hover:text-brand-accent transition-colors line-clamp-2">
                        {berita.judul}
                    </h3>
                    <div className="text-[9px] font-medium text-brand-accent mt-1 uppercase">
                        {formattedDate}
                    </div>
                </div>
            </Link>
        );
    }

    // Default Vertical (current style but polished)
    return (
        <Link 
            href={`/berita/${berita.slug}`} 
            className={`group block bg-white ${className}`}
        >
            <div className="aspect-video overflow-hidden bg-brand-secondary mb-4">
                <img
                    src={berita.image_url || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600"}
                    alt={berita.judul}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
            </div>
            <div className="text-[10px] font-semibold text-brand-accent uppercase tracking-widest mb-2">
                {berita.category?.name || 'Berita'}
            </div>
            <h3 className="text-lg font-semibold text-brand-primary leading-tight group-hover:text-brand-accent transition-colors line-clamp-2 mb-2">
                {berita.judul}
            </h3>
            <div className="text-[10px] font-medium text-brand-accent uppercase tracking-widest">
                {formattedDate}
            </div>
        </Link>
    );
}
