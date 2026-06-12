import React, { useState, useEffect } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

export default function Testimonials({ testimonials = [] }) {
    if (testimonials.length === 0) return null;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [fade, setFade] = useState(true);

    const changeSlide = (newIndex) => {
        setFade(false);
        setTimeout(() => {
            setCurrentIndex(newIndex);
            setFade(true);
        }, 200);
    };

    const handleNext = () => {
        changeSlide((currentIndex + 1) % testimonials.length);
    };

    const handlePrev = () => {
        changeSlide((currentIndex - 1 + testimonials.length) % testimonials.length);
    };

    useEffect(() => {
        if (testimonials.length <= 1) return;

        const interval = setInterval(() => {
            changeSlide((currentIndex + 1) % testimonials.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [currentIndex, testimonials.length]);

    const currentTesti = testimonials[currentIndex];

    return (
        <section className="py-16 md:py-20 bg-gradient-to-b from-brand-secondary/30 to-brand-secondary/60 reveal-section relative overflow-hidden">
            {/* Background Decorative Patterns */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/az-subtle.png')] opacity-5 pointer-events-none"></div>
            
            <div className="max-w-7xl mx-auto px-4 relative z-10">
                
                {/* Header Section */}
                <div className="text-center mb-12 reveal-element-up">
                    <h2 className="text-xs font-bold text-brand-accent uppercase tracking-[0.3em] mb-2.5">Testimoni</h2>
                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-brand-primary tracking-tight uppercase leading-tight">
                        Apa Kata Mereka<br />Tentang Al-Hikmah?
                    </h3>
                    <div className="h-[2px] w-12 bg-brand-accent mx-auto mt-3"></div>
                </div>

                {/* Slider Container */}
                <div className="max-w-4xl mx-auto relative reveal-element-up">
                    
                    {/* Testimonial Card (Sleek Horizontal Rectangle) */}
                    <div className="bg-white rounded-2xl border border-brand-light shadow-xl p-8 md:p-10 relative overflow-hidden transition-all duration-300 hover:shadow-brand-primary/5">
                        
                        <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-8 items-center">
                            
                            {/* Left Column: Speaker Info & Stars (1/4 width on desktop, bottom on mobile) */}
                            <div className={`md:col-span-1 order-2 md:order-1 flex flex-col items-center text-center md:border-r md:border-brand-light md:pr-8 transition-all duration-300 ${
                                fade ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                            }`}>
                                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-brand-secondary shadow-md flex-shrink-0 mb-4">
                                    <img
                                        src={currentTesti.image_url}
                                        alt={currentTesti.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="text-center mb-4">
                                    <h4 className="font-serif font-bold text-brand-primary text-sm md:text-base leading-tight">
                                        {currentTesti.name}
                                    </h4>
                                    <p className="text-[10px] md:text-xs text-brand-accent uppercase tracking-[0.15em] font-bold mt-1">
                                        {currentTesti.info}
                                    </p>
                                </div>
                                {/* Stars */}
                                <div className="flex gap-0.5">
                                    {[...Array(5)].map((_, s) => (
                                        <StarIcon key={s} className="w-4 h-4 text-amber-400" />
                                    ))}
                                </div>
                            </div>

                            {/* Right Column: Quote text (3/4 width on desktop, top on mobile) */}
                            <div className="md:col-span-3 order-1 md:order-2 relative pl-0 md:pl-4">
                                {/* Decorative Giant Quotation Mark */}
                                <div className="absolute -top-8 -left-2 text-[80px] md:text-[100px] font-serif text-brand-light/25 select-none pointer-events-none leading-none">
                                    “
                                </div>

                                <blockquote className={`text-sm md:text-base font-serif text-brand-primary italic leading-relaxed font-medium pl-6 relative z-10 transition-all duration-300 ${
                                    fade ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                                }`}>
                                    "{currentTesti.quote}"
                                </blockquote>
                            </div>

                        </div>
                    </div>

                    {/* Navigation Buttons (Left & Right desktop/tablet overlay) */}
                    <div className="absolute top-1/2 -translate-y-1/2 -left-3 md:-left-6 z-20">
                        <button
                            onClick={handlePrev}
                            className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-brand-light bg-white text-brand-primary hover:bg-brand-primary hover:text-white transition-all shadow-md flex items-center justify-center group"
                            aria-label="Previous Testimonial"
                        >
                            <ArrowLeftIcon className="w-3.5 h-3.5 md:w-4 md:h-4 transition-transform group-hover:-translate-x-0.5" />
                        </button>
                    </div>

                    <div className="absolute top-1/2 -translate-y-1/2 -right-3 md:-right-6 z-20">
                        <button
                            onClick={handleNext}
                            className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-brand-light bg-white text-brand-primary hover:bg-brand-primary hover:text-white transition-all shadow-md flex items-center justify-center group"
                            aria-label="Next Testimonial"
                        >
                            <ArrowRightIcon className="w-3.5 h-3.5 md:w-4 md:h-4 transition-transform group-hover:translate-x-0.5" />
                        </button>
                    </div>

                </div>

                {/* Pagination Indicators (Dots) */}
                <div className="flex justify-center items-center gap-1.5 mt-8 reveal-element-up">
                    {testimonials.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => changeSlide(idx)}
                            className={`transition-all duration-300 rounded-full ${
                                idx === currentIndex 
                                    ? 'w-5 h-1 bg-brand-primary' 
                                    : 'w-1 h-1 bg-brand-light hover:bg-brand-accent/50'
                            }`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}
