import React, { useState } from 'react';
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

    const currentTesti = testimonials[currentIndex];

    return (
        <section className="py-24 bg-gradient-to-b from-brand-secondary/30 to-brand-secondary/60 reveal-section relative overflow-hidden">
            {/* Background Decorative Patterns */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/az-subtle.png')] opacity-5 pointer-events-none"></div>
            
            <div className="max-w-7xl mx-auto px-4 relative z-10">
                
                {/* Header Section */}
                <div className="text-center mb-16 reveal-element-up">
                    <h2 className="text-[10px] font-black text-brand-accent uppercase tracking-[0.4em] mb-3">Testimoni</h2>
                    <h3 className="text-3xl md:text-4xl font-serif font-semibold text-brand-primary tracking-tight uppercase leading-tight">
                        Apa Kata Mereka<br />Tentang Al-Hikmah?
                    </h3>
                    <div className="h-[2px] w-16 bg-brand-accent mx-auto mt-4"></div>
                </div>

                {/* Slider Container */}
                <div className="max-w-4xl mx-auto relative reveal-element-up">
                    
                    {/* Testimonial Card */}
                    <div className="bg-white rounded-2xl border border-brand-light shadow-2xl p-8 md:p-14 relative overflow-hidden transition-all duration-300 hover:shadow-brand-primary/5">
                        
                        {/* Decorative Giant Quotation Mark */}
                        <div className="absolute top-2 left-4 text-[120px] md:text-[160px] font-serif text-brand-light/35 select-none pointer-events-none leading-none -translate-x-3 -translate-y-4">
                            “
                        </div>

                        <div className="relative z-10 flex flex-col items-center text-center">
                            
                            {/* Stars */}
                            <div className="flex gap-0.5 mb-8">
                                {[...Array(5)].map((_, s) => (
                                    <StarIcon key={s} className="w-5 h-5 text-amber-400" />
                                ))}
                            </div>

                            {/* Quote Text */}
                            <blockquote className={`text-md md:text-xl font-serif text-brand-primary italic leading-relaxed font-light mb-10 min-h-[90px] transition-all duration-300 ${
                                fade ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-3 scale-[0.98]'
                            }`}>
                                "{currentTesti.quote}"
                            </blockquote>

                            {/* Speaker Information */}
                            <div className={`flex flex-col items-center gap-4 transition-all duration-300 ${
                                fade ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                            }`}>
                                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-brand-secondary shadow-lg flex-shrink-0">
                                    <img
                                        src={currentTesti.image_url}
                                        alt={currentTesti.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="text-center">
                                    <h4 className="font-serif font-bold text-brand-primary text-base md:text-lg leading-tight">
                                        {currentTesti.name}
                                    </h4>
                                    <p className="text-[9px] md:text-[10px] text-brand-accent uppercase tracking-[0.2em] font-semibold mt-1">
                                        {currentTesti.info}
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Navigation Buttons (Left & Right desktop/tablet overlay) */}
                    <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-16 z-20">
                        <button
                            onClick={handlePrev}
                            className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-brand-light bg-white text-brand-primary hover:bg-brand-primary hover:text-white transition-all shadow-lg flex items-center justify-center group"
                            aria-label="Previous Testimonial"
                        >
                            <ArrowLeftIcon className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:-translate-x-0.5" />
                        </button>
                    </div>

                    <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-16 z-20">
                        <button
                            onClick={handleNext}
                            className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-brand-light bg-white text-brand-primary hover:bg-brand-primary hover:text-white transition-all shadow-lg flex items-center justify-center group"
                            aria-label="Next Testimonial"
                        >
                            <ArrowRightIcon className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:translate-x-0.5" />
                        </button>
                    </div>

                </div>

                {/* Pagination Indicators (Dots) */}
                <div className="flex justify-center items-center gap-2 mt-8 reveal-element-up">
                    {testimonials.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => changeSlide(idx)}
                            className={`transition-all duration-300 rounded-full ${
                                idx === currentIndex 
                                    ? 'w-6 h-1.5 bg-brand-primary' 
                                    : 'w-1.5 h-1.5 bg-brand-light hover:bg-brand-accent/50'
                            }`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}
