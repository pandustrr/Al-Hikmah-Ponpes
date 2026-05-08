import React from 'react';
import { Link } from '@inertiajs/react';
import { ArrowLongRightIcon } from '@heroicons/react/24/outline';

export default function LembagaSection({ lembagas }) {
    return (
        <section className="py-12 md:py-24 bg-brand-secondary reveal-section">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-10 md:mb-16 reveal-element-up">
                    <h2 className="text-xs font-bold text-brand-accent uppercase tracking-[0.3em] mb-3">Program Unggulan</h2>
                    <h3 className="text-3xl md:text-4xl font-black text-brand-primary tracking-tighter uppercase mb-5">Lembaga Pendidikan</h3>
                    <div className="h-1 w-20 bg-brand-primary mx-auto"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
                    {lembagas.map((lembaga, i) => (
                        <Link
                            key={lembaga.id}
                            href={`/${lembaga.slug}`}
                            className={`group bg-white p-7 md:p-10 border border-brand-light hover:border-brand-primary transition-all duration-500 rounded-[0.25rem] shadow-sm hover:shadow-2xl reveal-element-up`}
                            style={{ transitionDelay: `${i * 100}ms` }}
                        >
                            <div className="text-[10px] font-bold text-brand-accent uppercase tracking-widest mb-3">Pendidikan Formal</div>
                            <h4 className="text-xl md:text-2xl font-black text-brand-primary mb-4 md:mb-6 group-hover:text-brand-accent transition-colors uppercase">{lembaga.nama}</h4>
                            <p className="text-brand-accent text-sm mb-6 md:mb-8 leading-relaxed line-clamp-3">
                                {lembaga.deskripsi}
                            </p>
                            <div className="flex items-center text-brand-primary font-black text-[10px] uppercase tracking-widest border-t border-brand-light pt-5">
                                Lihat Profil Lembaga
                                <ArrowLongRightIcon className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform stroke-[3px]" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}


