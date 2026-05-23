import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

export default function Hero({ offsetY, berita = [], settings = {} }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    
    // Fallback data jika berita kosong
    const sliderBerita = (berita && berita.length > 0) ? berita.slice(0, 5) : [
        { 
            id: 'fallback-1', 
            judul: 'Membangun Masa Depan dengan Adab & Ilmu', 
            category: { name: 'Visi Kami' }, 
            slug: '#',
            image_url: 'https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=1200'
        }
    ];

    useEffect(() => {
        if (sliderBerita.length <= 1) return;
        
        const timer = setInterval(() => {
            handleNext();
        }, 8000);

        return () => clearInterval(timer);
    }, [currentIndex, sliderBerita.length]);

    const handleNext = () => {
        setIsAnimating(true);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % sliderBerita.length);
            setIsAnimating(false);
        }, 400);
    };

    const goToSlide = (index) => {
        if (index === currentIndex) return;
        setIsAnimating(true);
        setTimeout(() => {
            setCurrentIndex(index);
            setIsAnimating(false);
        }, 400);
    };

    return (
        <section className="relative h-[85vh] min-h-[650px] flex items-center overflow-hidden bg-brand-primary">
            {/* Static Background Image Layer */}
            <div className="absolute inset-0">
                <picture>
                    {settings.hero_bg_mobile && (
                        <source media="(max-w: 640px)" srcSet={settings.hero_bg_mobile} />
                    )}
                    <img
                        src={settings.hero_bg || 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1600'}
                        alt="Hero Background"
                        className="w-full h-full object-cover object-center scale-105"
                        style={{ transform: `translateY(${offsetY * 0.15}px)` }}
                    />
                </picture>
            </div>
            
            {/* Sophisticated Overlay for the main background */}
            <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/80 via-brand-primary/60 to-brand-primary"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 w-full h-full flex flex-col justify-start lg:grid lg:grid-cols-12 lg:items-center gap-3 lg:gap-12 pb-8 lg:pb-0 pt-25 lg:pt-0">
                
                {/* Main Headline (Glassmorphism & Refined) */}
                <div className="lg:col-span-7 xl:col-span-8 flex flex-col items-center lg:items-start text-center lg:text-left mb-4 lg:mb-0">
                    <div className={`transition-all duration-700 transform w-full ${isAnimating ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
                        
                        {/* Glass Card for Content with Dynamic Blurred Background */}
                        <div className="relative overflow-hidden backdrop-blur-sm bg-white/10 border border-white/20 p-6 sm:p-8 rounded-2xl mb-0 md:mb-10 shadow-2xl">
                            
                            {/* Dynamic Background Image Layer inside the card */}
                            {sliderBerita.map((item, index) => item && (
                                <div 
                                    key={`card-bg-${item.id || index}`}
                                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                                        index === currentIndex ? 'opacity-100' : 'opacity-0'
                                    }`}
                                >
                                    <img
                                        src={item.image_url || 'https://picsum.photos/id/1018/1200/800'}
                                        alt="News Background"
                                        className="w-full h-full object-cover object-center scale-110 blur-none opacity-60 mix-blend-overlay"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/80 to-brand-primary/25"></div>
                                </div>
                            ))}

                            <div className="relative z-10 space-y-4 md:space-y-4 text-left">
                                <div className="space-y-1 mb-2">
                                    {settings.hero_subtitle && (
                                        <div className="text-white/60 text-[9px] font-semibold uppercase tracking-[0.4em]">
                                            {settings.hero_subtitle}
                                        </div>
                                    )}
                                    <div className="flex items-center justify-start gap-3">
                                        <span className="h-[1px] w-8 md:w-12 bg-brand-secondary"></span>
                                        <span className="text-brand-secondary text-[8px] md:text-[11px] font-semibold uppercase tracking-[0.5em]">
                                            {sliderBerita[currentIndex].category?.name || 'YPDS Update'}
                                        </span>
                                    </div>
                                </div>
                                <h1 className="text-2xl md:text-4xl lg:text-5xl font-serif font-semibold text-white tracking-tight leading-[1.2] max-w-2xl">
                                    {sliderBerita[currentIndex].judul}
                                </h1>
                                <p className="text-white/80 text-[10px] md:text-base font-light max-w-xl line-clamp-2 md:line-clamp-3 leading-relaxed">
                                    {sliderBerita[currentIndex].ringkasan || 'Dapatkan informasi terbaru mengenai perkembangan pendidikan dan kegiatan eksklusif di lingkungan YPDS Al-Hikmah Jember.'}
                                </p>
                            </div>

                            <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-5 mt-8">
                                <Link 
                                    href={sliderBerita[currentIndex].slug === '#' ? '#' : `/berita/${sliderBerita[currentIndex].slug}`}
                                    className="bg-brand-secondary text-brand-primary px-5 md:px-7 py-2.5 md:py-3 text-[8px] md:text-[9px] font-semibold uppercase tracking-[0.2em] rounded-[0.25rem] flex items-center gap-2.5 md:gap-3 hover:bg-white transition-all shadow-xl w-fit group"
                                >
                                    Baca Selengkapnya
                                    <ChevronRightIcon className="w-3.5 h-3.5 md:w-4 h-4 stroke-[2.5px] group-hover:translate-x-1 transition-transform" />
                                </Link>

                                {/* Indicators Integrated closer to Button for Mobile */}
                                <div className="flex lg:hidden items-center gap-2.5 mt-2 sm:mt-0 sm:ml-auto">
                                    {sliderBerita.map((_, idx) => (
                                        <button
                                            key={`dot-${idx}`}
                                            onClick={() => goToSlide(idx)}
                                            className={`transition-all duration-500 rounded-full h-1.5 ${
                                                idx === currentIndex ? 'w-8 bg-brand-secondary' : 'w-2 bg-white/40'
                                            }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Thumbnail Gallery Sidebar (Docked Look) */}
                <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-4">
                    <h3 className="text-white/70 text-[10px] font-semibold uppercase tracking-[0.4em] mb-1 hidden lg:block">Berita Lainnya</h3>
                    
                    <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto pb-6 lg:pb-0 custom-scrollbar snap-x scroll-px-4 px-4 lg:px-0">
                        {sliderBerita.map((item, idx) => (
                            <button
                                key={`thumb-${item.id}`}
                                onClick={() => goToSlide(idx)}
                                className={`group relative flex flex-shrink-0 lg:flex-shrink flex-col lg:flex-row lg:items-center gap-2 lg:gap-4 p-2.5 lg:p-3 rounded-[0.5rem] transition-all duration-500 snap-center w-[140px] md:w-[160px] lg:w-full backdrop-blur-xl ${
                                    idx === currentIndex 
                                        ? 'bg-black/60 border-2 border-brand-secondary shadow-2xl scale-[1.02] lg:scale-100' 
                                        : 'bg-black/40 border border-white/30 hover:bg-black/50 hover:border-white/60 opacity-100'
                                }`}
                            >
                                <div className="w-full lg:w-24 h-16 lg:h-16 flex-shrink-0 rounded-[0.3rem] overflow-hidden bg-brand-primary">
                                    <img 
                                        src={item.image_url || 'https://images.unsplash.com/photo-1590076215667-875d4ef2d968?auto=format&fit=crop&q=80&w=200'} 
                                        alt={item.judul}
                                        className={`w-full h-full object-cover transition-transform duration-700 ${idx === currentIndex ? 'scale-110' : 'group-hover:scale-110'}`}
                                    />
                                </div>
                                <div className="text-left min-w-0 py-1">
                                    <p className={`text-[8px] lg:text-[10px] font-bold uppercase tracking-widest mb-1 ${idx === currentIndex ? 'text-brand-secondary' : 'text-white/80'}`}>
                                        {item.category?.name || 'Berita'}
                                    </p>
                                    <h4 className={`text-[10px] lg:text-[11px] font-semibold leading-tight line-clamp-2 ${idx === currentIndex ? 'text-white' : 'text-white/90 group-hover:text-white'}`}>
                                        {item.judul}
                                    </h4>
                                </div>
                                {idx === currentIndex && (
                                    <div className="absolute left-0 right-0 bottom-0 h-1 bg-brand-secondary lg:hidden rounded-b-[0.5rem]"></div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/5 overflow-hidden">
                <div 
                    key={currentIndex}
                    className="h-full bg-brand-secondary origin-left animate-timer-progress"
                    style={{ animationDuration: '8000ms' }}
                ></div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes timer-progress {
                    from { transform: scaleX(0); }
                    to { transform: scaleX(1); }
                }
                .animate-timer-progress {
                    animation-name: timer-progress;
                    animation-timing-function: linear;
                    animation-fill-mode: forwards;
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.05);
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.2);
                }
            `}} />
        </section>
    );
}
