import React from 'react';
import { ArrowRightIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { Link } from '@inertiajs/react';

export default function HeroSection({ lembaga }) {
    return (
        <section className="relative h-[80vh] md:h-[90vh] flex items-center overflow-hidden bg-brand-primary">
            {/* Background Layer */}
            <div className="absolute inset-0 z-0">
                {/* Desktop Background Image (Hidden on Mobile) */}
                <img 
                    src={lembaga.image_url || 'https://images.unsplash.com/photo-1523050853063-bd8012fec21b?auto=format&fit=crop&q=80&w=2000'} 
                    className="hidden md:block w-full h-full object-cover opacity-55 scale-105" 
                    alt={`${lembaga.nama} Desktop Banner`} 
                />
                {/* Mobile Background Image (Visible only on Mobile, falls back to Desktop Image if Mobile Image is null) */}
                <img 
                    src={lembaga.image_mobile_url || lembaga.image_url || 'https://images.unsplash.com/photo-1523050853063-bd8012fec21b?auto=format&fit=crop&q=80&w=2000'} 
                    className="block md:hidden w-full h-full object-cover opacity-55 scale-105" 
                    alt={`${lembaga.nama} Mobile Banner`} 
                />
                <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/45 via-transparent to-brand-primary/70"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                <div className="max-w-4xl">
                    <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8 animate-fade-in-up">
                        {lembaga.ikon_url && (
                            <div className="w-16 h-16 p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-2xl flex items-center justify-center">
                                <img src={lembaga.ikon_url} alt="Logo Unit" className="w-full h-full object-contain" />
                            </div>
                        )}
                        <div className="flex items-center gap-3">
                            <span className="h-[1px] w-8 bg-brand-secondary"></span>
                            <span className="text-brand-secondary text-[10px] font-bold uppercase tracking-[0.4em]">{lembaga.hero_badge || 'Unit Pendidikan Formal'}</span>
                        </div>
                    </div>
                    
                    <h1 className="text-4xl md:text-6xl font-serif font-semibold text-white tracking-tight leading-[1.1] mb-8 uppercase animate-fade-in-up delay-100">
                        {lembaga.nama}
                    </h1>
                    
                    <p className="text-white/70 text-sm md:text-base max-w-2xl leading-relaxed mb-10 animate-fade-in-up delay-200">
                        {lembaga.summary || 'Mencetak generasi rabbani yang unggul dalam ilmu pengetahuan dan berakhlak mulia sesuai manhaj salafush shalih.'}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-center gap-5 animate-fade-in-up delay-300">
                        <a 
                            href="#ppdb"
                            className="bg-brand-secondary text-brand-primary text-[10px] font-bold uppercase tracking-widest px-8 py-4 rounded-[0.25rem] hover:bg-white transition-all flex items-center gap-3 shadow-2xl"
                        >
                            Daftar Sekarang <ArrowRightIcon className="h-4 w-4" />
                        </a>
                        <a 
                            href="#profil"
                            className="text-white/60 text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2 group"
                        >
                            Pelajari Profil <ChevronRightIcon className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
