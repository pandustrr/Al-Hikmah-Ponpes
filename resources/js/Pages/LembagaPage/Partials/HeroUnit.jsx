import React from 'react';
import { SparklesIcon } from '@heroicons/react/24/outline';

export default function HeroUnit({ lembaga }) {
    return (
        <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-slate-900">
            {/* Background Image with Parallax Effect */}
            <div className="absolute inset-0 z-0">
                <img 
                    src={lembaga.image_url || "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=2000"} 
                    className="w-full h-full object-cover opacity-40 scale-105 animate-slow-zoom"
                    alt={lembaga.nama}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/40 to-slate-900/90"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-20">
                <div className="max-w-3xl">
                    <div className="inline-flex items-center gap-3 bg-brand-secondary/20 backdrop-blur-md border border-brand-secondary/30 px-4 py-2 rounded-full mb-8 animate-fade-in-up">
                        {lembaga.ikon_url && (
                            <img src={lembaga.ikon_url} className="w-10 h-10 object-contain drop-shadow-2xl" alt="Unit Logo" />
                        )}
                        <span className="text-brand-secondary text-[10px] font-bold uppercase tracking-[0.3em]">
                            Unit Pendidikan Al-Hikmah
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-8xl font-serif font-semibold text-white tracking-tighter leading-[0.9] mb-8 animate-fade-in-up delay-100">
                        {lembaga.nama} <br />
                        <span className="text-brand-secondary italic">Ambulu Jember</span>
                    </h1>

                    <p className="text-white/70 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl animate-fade-in-up delay-200">
                        {lembaga.summary || "Mencetak generasi yang unggul dalam ilmu pengetahuan, kokoh dalam iman, dan mulia dalam akhlak."}
                    </p>

                    <div className="flex flex-wrap gap-4 animate-fade-in-up delay-300">
                        <a href="#profil" className="bg-brand-primary text-white text-[10px] font-bold uppercase tracking-[0.2em] px-10 py-5 rounded-[0.25rem] hover:bg-white hover:text-brand-primary transition-all shadow-2xl shadow-brand-primary/20">
                            Jelajahi Unit
                        </a>
                        <div className="flex items-center gap-3 px-6 py-4 text-white/60">
                            <SparklesIcon className="h-5 w-5 text-brand-secondary" />
                            <span className="text-[9px] font-bold uppercase tracking-widest">Akreditasi A (Unggul)</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-12 hidden md:flex items-center gap-4 text-white/30">
                <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent"></div>
                <span className="text-[8px] font-bold uppercase tracking-[0.4em] rotate-180 [writing-mode:vertical-lr]">Scroll Down</span>
            </div>
        </section>
    );
}
