import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from '@inertiajs/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function NewsCard({ berita, variant = 'vertical', className = '', isPriority = false }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    const formattedDate = berita.created_at 
        ? new Date(berita.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) 
        : '';

    const handleClick = (e) => {
        // Izinkan klik tengah (mouse wheel click) atau Ctrl+click untuk membuka tab baru secara normal
        if (e.ctrlKey || e.metaKey || e.button === 1) return;
        e.preventDefault();
        setIsModalOpen(true);
    };

    const renderModal = () => {
        if (!isModalOpen || !mounted) return null;

        const modalContent = (
            <div 
                className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-all duration-300 animate-fade-in"
                onClick={() => setIsModalOpen(false)}
            >
                <div 
                    className="bg-white rounded-[0.5rem] shadow-2xl overflow-hidden w-full max-w-2xl h-auto md:h-[420px] flex flex-col md:flex-row relative transform transition-all duration-300 scale-100 animate-scale-up border border-slate-100"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close button */}
                    <button 
                        onClick={() => setIsModalOpen(false)}
                        className="absolute top-3 right-3 z-20 bg-slate-900/60 hover:bg-slate-900 text-white p-2 rounded-full transition-all"
                    >
                        <XMarkIcon className="w-5 h-5" />
                    </button>

                    {/* Image section */}
                    <div className="w-full md:w-1/2 h-48 md:h-full relative bg-slate-100 flex-shrink-0">
                        <img 
                            src={berita.image_url || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600"} 
                            alt={berita.judul}
                            className="w-full h-full object-cover absolute inset-0"
                        />
                    </div>

                    {/* Content section */}
                    <div className="w-full md:w-1/2 p-6 flex flex-col justify-between overflow-y-auto h-auto md:h-full">
                        <div className="space-y-4">
                            <div className="flex flex-wrap items-center gap-3 text-[10px] font-semibold text-brand-accent uppercase tracking-wider">
                                <span className="bg-brand-secondary text-brand-primary px-2.5 py-1 rounded-[0.25rem]">
                                    {berita.category?.name || 'Berita'}
                                </span>
                                <span>{formattedDate}</span>
                            </div>

                            <h3 className="text-base md:text-lg font-serif font-semibold text-brand-primary leading-tight">
                                {berita.judul}
                            </h3>

                            <p className="text-slate-600 text-[11px] md:text-xs leading-relaxed line-clamp-6 md:line-clamp-8">
                                {berita.ringkasan || berita.konten || 'Detail berita lengkap dapat diakses dengan menekan tombol Baca Selengkapnya.'}
                            </p>
                        </div>

                        <div className="flex gap-3 mt-6 pt-4 border-t border-slate-100">
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="flex-grow px-4 py-2 border border-slate-200 text-slate-600 rounded-[0.25rem] text-[10px] md:text-xs font-semibold hover:bg-slate-50 transition-all uppercase tracking-wider"
                            >
                                Tutup
                            </button>
                            <Link 
                                href={`/berita/${berita.slug}`}
                                onClick={() => setIsModalOpen(false)}
                                className="flex-grow px-4 py-2 bg-brand-primary text-white rounded-[0.25rem] text-[10px] md:text-xs font-semibold text-center hover:bg-slate-900 transition-all uppercase tracking-wider"
                            >
                                Selengkapnya
                            </Link>
                        </div>
                    </div>
                </div>
                <style dangerouslySetInnerHTML={{ __html: `
                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                    @keyframes scaleUp {
                        from { transform: scale(0.95); opacity: 0; }
                        to { transform: scale(1); opacity: 1; }
                    }
                    .animate-fade-in {
                        animation: fadeIn 0.2s ease-out forwards;
                    }
                    .animate-scale-up {
                        animation: scaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                    }
                `}} />
            </div>
        );

        return createPortal(modalContent, document.body);
    };

    if (variant === 'featured') {
        return (
            <>
                <Link 
                    href={`/berita/${berita.slug}`} 
                    onClick={handleClick}
                    className={`group block relative overflow-hidden bg-slate-900 aspect-[16/9] md:aspect-[21/9] ${className}`}
                >
                    <picture className="w-full h-full">
                        {berita.image_mobile_url && (
                            <source media="(max-w: 640px)" srcSet={berita.image_mobile_url} />
                        )}
                        <img
                            src={berita.image_url || "https://images.unsplash.com/photo-1504711432869-5d39a110fdd7?auto=format&fit=crop&q=80&w=1200"}
                            alt={`${berita.judul} - YPDS Al-Hikmah Jember`}
                            width="1200"
                            height="630"
                            loading={isPriority ? 'eager' : 'lazy'}
                            fetchPriority={isPriority ? 'high' : 'auto'}
                            className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700"
                        />
                    </picture>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-10">
                        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-4">
                            <span className="bg-brand-primary text-white text-[8px] sm:text-[10px] font-semibold uppercase tracking-[0.2em] px-2 py-0.5 sm:px-3 sm:py-1">
                                UTAMA
                            </span>
                            <span className="text-white/70 text-[8px] sm:text-[10px] font-semibold uppercase tracking-widest">
                                {formattedDate}
                            </span>
                        </div>
                        <h2 className="text-xl sm:text-2xl md:text-4xl font-serif font-semibold text-white leading-tight group-hover:text-brand-secondary transition-colors line-clamp-2 mb-2 sm:mb-4">
                            {berita.judul}
                        </h2>
                        <p className="text-white/80 text-sm md:text-base line-clamp-2 max-w-2xl hidden md:block">
                            {berita.konten}
                        </p>
                    </div>
                </Link>
                {renderModal()}
            </>
        );
    }

    if (variant === 'horizontal') {
        return (
            <>
                <Link 
                    href={`/berita/${berita.slug}`} 
                    onClick={handleClick}
                    className={`group flex gap-3 sm:gap-4 py-3 sm:py-4 border-b border-sage-light last:border-0 ${className}`}
                >
                    <div className="w-24 h-16 sm:w-32 sm:h-20 md:w-48 md:h-28 flex-shrink-0 overflow-hidden bg-brand-secondary rounded-[0.1rem]">
                        <img
                            src={berita.image_url || "https://images.unsplash.com/photo-1585829365234-781fcd04c838?auto=format&fit=crop&q=80&w=400"}
                            alt={`${berita.judul} - YPDS Al-Hikmah Jember`}
                            width="400"
                            height="250"
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                    </div>
                    <div className="flex-grow">
                        <div className="text-[8px] sm:text-[10px] font-semibold text-brand-accent uppercase tracking-widest mb-1">
                            {berita.category?.name || 'Berita'}
                        </div>
                        <h3 className="text-sm sm:text-base font-semibold text-brand-primary leading-tight group-hover:text-brand-accent transition-colors line-clamp-2 mb-1 sm:mb-2">
                            {berita.judul}
                        </h3>
                        <div className="text-[8px] sm:text-[10px] font-medium text-brand-accent uppercase tracking-widest">
                            {formattedDate}
                        </div>
                    </div>
                </Link>
                {renderModal()}
            </>
        );
    }

    if (variant === 'sidebar') {
        return (
            <>
                <Link 
                    href={`/berita/${berita.slug}`} 
                    onClick={handleClick}
                    className={`group flex gap-3 py-3 border-b border-sage-light last:border-0 ${className}`}
                >
                    <div className="w-16 h-16 flex-shrink-0 overflow-hidden bg-brand-secondary">
                        <img
                            src={berita.image_url || "https://images.unsplash.com/photo-1585829365234-781fcd04c838?auto=format&fit=crop&q=80&w=200"}
                            alt={`${berita.judul} - YPDS Al-Hikmah Jember`}
                            width="200"
                            height="200"
                            loading="lazy"
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
                {renderModal()}
            </>
        );
    }

    // Default Vertical (current style but polished)
    return (
        <>
            <Link 
                href={`/berita/${berita.slug}`} 
                onClick={handleClick}
                className={`group block bg-white ${className}`}
            >
                <div className="aspect-[3/4] sm:aspect-video overflow-hidden bg-brand-secondary mb-4">
                    <picture className="w-full h-full">
                        {berita.image_mobile_url && (
                            <source media="(max-w: 640px)" srcSet={berita.image_mobile_url} />
                        )}
                        <img
                            src={berita.image_url || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600"}
                            alt={`${berita.judul} - YPDS Al-Hikmah Jember`}
                            width="600"
                            height="400"
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    </picture>
                </div>
                <div className="text-[10px] font-semibold text-brand-accent uppercase tracking-widest mb-2">
                    {berita.category?.name || 'Berita'}
                </div>
                <h3 className="text-xs sm:text-lg font-semibold text-brand-primary leading-tight group-hover:text-brand-accent transition-colors line-clamp-2 mb-2">
                    {berita.judul}
                </h3>
                <div className="text-[10px] font-medium text-brand-accent uppercase tracking-widest">
                    {formattedDate}
                </div>
            </Link>
            {renderModal()}
        </>
    );
}
