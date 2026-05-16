import React from 'react';

export default function KeunggulanUnit({ lembaga }) {
    return (
        <section className="py-24 bg-slate-900 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/az-subtle.png')] opacity-10"></div>
            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-brand-secondary text-[10px] font-bold uppercase tracking-[0.4em] mb-4">Why Choose Us</h2>
                    <h3 className="text-4xl md:text-6xl font-serif font-semibold text-white tracking-tight uppercase leading-none">Keunggulan <span className="text-brand-secondary italic">Strategis</span></h3>
                    <div className="h-1 w-20 bg-brand-secondary mx-auto mt-8"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-[0.25rem] overflow-hidden">
                    {(lembaga.keunggulan || "Tenaga Pengajar Profesional\nLingkungan Islami & Kondusif\nFasilitas Modern & Lengkap\nProgram Tahfidz Terpadu").split('\n').map((k, i) => (
                        <div key={i} className="bg-slate-900 p-10 hover:bg-brand-primary transition-all duration-500 group">
                            <div className="text-brand-secondary text-4xl font-serif mb-6 opacity-30 group-hover:opacity-100 transition-opacity">0{i+1}</div>
                            <h4 className="text-white text-lg font-bold uppercase tracking-tight leading-tight mb-4 group-hover:translate-x-2 transition-transform duration-500">
                                {k}
                            </h4>
                            <p className="text-white/40 text-xs leading-relaxed group-hover:text-white/70 transition-colors">
                                Berkomitmen memberikan pelayanan pendidikan terbaik dengan standar mutu yang terjamin.
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
