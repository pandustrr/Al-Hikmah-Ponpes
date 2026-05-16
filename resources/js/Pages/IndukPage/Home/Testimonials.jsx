import React from 'react';
import { StarIcon } from '@heroicons/react/24/solid';

export default function Testimonials({ testimonials = [] }) {
    if (testimonials.length === 0) return null;

    return (
        <section className="py-24 bg-brand-secondary reveal-section">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4 reveal-element-up">
                    <div>
                        <h2 className="text-[10px] font-semibold text-brand-accent uppercase tracking-[0.4em] mb-3">Testimoni</h2>
                        <h3 className="text-4xl font-serif font-semibold text-brand-primary tracking-tight uppercase leading-tight">Apa Kata Mereka<br />Tentang Al-Hikmah?</h3>
                        <div className="h-1 w-20 bg-brand-primary mt-4"></div>
                    </div>
                    <div className="max-w-xs">
                        <p className="text-brand-accent text-sm leading-relaxed">Kepuasan wali santri dan perkembangan karakter anak didik adalah prioritas utama kami.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {testimonials.map((testi, i) => (
                        <div key={i} className="bg-white rounded-[0.25rem] p-6 border border-brand-light hover:border-brand-primary hover:shadow-md transition-all duration-300 reveal-element-up flex flex-col" style={{ transitionDelay: `${i * 80}ms` }}>
                            <div className="flex gap-0.5 mb-4">
                                {[...Array(5)].map((_, s) => (
                                    <StarIcon key={s} className="w-3.5 h-3.5 text-yellow-400" />
                                ))}
                            </div>
                            <p className="text-brand-accent text-sm italic leading-relaxed flex-grow mb-6">"{testi.quote}"</p>
                            <div className="flex items-center gap-3">
                                <div className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0 border-2 border-brand-secondary">
                                    <img
                                        src={testi.image_url}
                                        alt={testi.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="min-w-0">
                                    <h4 className="font-semibold text-brand-primary text-sm leading-tight">{testi.name}</h4>
                                    <p className="text-[10px] text-brand-accent uppercase tracking-widest font-semibold mt-0.5">{testi.info}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
