import React from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

export default function VisiMisiUnit({ lembaga }) {
    return (
        <section id="profil" className="py-24 max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                <div className="space-y-10">
                    <div>
                        <h2 className="text-brand-primary text-[10px] font-bold uppercase tracking-[0.4em] mb-4">Filosofi & Tujuan</h2>
                        <h3 className="text-4xl md:text-6xl font-serif font-semibold text-slate-900 tracking-tight leading-none uppercase">Visi & <span className="text-brand-primary italic">Misi</span></h3>
                    </div>

                    <div className="bg-brand-secondary/30 p-10 border-l-4 border-brand-primary rounded-[0.25rem]">
                        <h4 className="text-xs font-bold text-brand-primary uppercase tracking-widest mb-4">Visi Unit</h4>
                        <p className="text-xl md:text-2xl font-serif text-slate-800 leading-relaxed italic">
                            "{lembaga.visi || "Mewujudkan generasi Rabbani yang berakhlaqul karimah, cerdas, dan mandiri."}"
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Misi Strategis</h4>
                        <div className="grid grid-cols-1 gap-4">
                            {(lembaga.misi || "Menyelenggarakan pendidikan berkualitas\nMenanamkan nilai-nilai keislaman\nMengembangkan potensi bakat dan minat").split('\n').map((m, i) => (
                                <div key={i} className="flex items-start gap-4 p-5 bg-white border border-slate-100 rounded-[0.25rem] hover:border-brand-primary/30 transition-colors group">
                                    <CheckCircleIcon className="h-6 w-6 text-brand-primary flex-shrink-0 opacity-20 group-hover:opacity-100 transition-opacity" />
                                    <p className="text-slate-600 text-sm leading-relaxed">{m}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="lg:sticky lg:top-32 space-y-8">
                    <div className="bg-slate-900 p-12 text-white rounded-[0.25rem] relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/20 blur-3xl rounded-full -mr-16 -mt-16"></div>
                        <h4 className="text-[10px] font-bold text-brand-secondary uppercase tracking-[0.3em] mb-6">Sistem Kurikulum</h4>
                        <h3 className="text-3xl font-serif font-semibold mb-8 tracking-tight uppercase">Struktur <br />Pendidikan</h3>
                        <p className="text-white/60 text-sm leading-relaxed mb-10">
                            {lembaga.struktur_pendidikan || "Kami menerapkan kurikulum terintegrasi yang menggabungkan standar nasional dengan kedalaman khazanah keilmuan pesantren."}
                        </p>
                        <div className="space-y-4">
                            {['Kurikulum Nasional (Kemdikbud/Kemenag)', 'Tahfidz Al-Qur\'an', 'Kajian Kitab Turats'].map((k, i) => (
                                <div key={i} className="flex items-center gap-3 py-3 border-b border-white/10 last:border-0">
                                    <div className="w-1.5 h-1.5 bg-brand-secondary rounded-full"></div>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">{k}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
