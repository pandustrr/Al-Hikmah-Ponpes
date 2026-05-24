import React from 'react';
import { PresentationChartLineIcon, CheckBadgeIcon } from '@heroicons/react/24/outline';

export default function KeunggulanSection({ lembaga }) {
    const keunggulanList = lembaga.keunggulan_list && lembaga.keunggulan_list.length > 0
        ? lembaga.keunggulan_list
        : [
            { title: 'Fasilitas Modern', desc: 'Layanan pendidikan terbaik untuk masa depan santri.' },
            { title: 'Pengajar Ahli', desc: 'Layanan pendidikan terbaik untuk masa depan santri.' },
            { title: 'Lingkungan Aman', desc: 'Layanan pendidikan terbaik untuk masa depan santri.' },
            { title: 'Beasiswa Prestasi', desc: 'Layanan pendidikan terbaik untuk masa depan santri.' }
          ];

    return (
        <section className="py-16 md:py-20 bg-transparent">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                {/* Dark block — tidak full lebar, ada margin kiri-kanan */}
                <div className="bg-brand-primary text-white overflow-hidden relative rounded-[0.5rem]">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-white/[0.02] -skew-x-12 translate-x-1/4"></div>

                    <div className="px-6 md:px-16 py-10 md:py-20 relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                            <div>
                                <h2 className="text-brand-secondary text-[10px] font-bold uppercase tracking-[0.4em] mb-4">{lembaga.program_title || 'Program & Keunggulan'}</h2>
                                <h3 className="text-3xl md:text-5xl font-serif font-semibold tracking-tight mb-10">Pendidikan Berbasis <br /> <span className="text-brand-secondary">{lembaga.adab_title || 'Adab & Kompetensi'}</span></h3>

                                <div className="bg-white/5 border border-white/10 p-8 md:p-10 backdrop-blur-sm rounded-[0.25rem]">
                                    <div className="flex items-start gap-4 mb-6">
                                        <PresentationChartLineIcon className="h-6 w-6 text-brand-secondary shrink-0" />
                                        <div>
                                            <h4 className="text-sm font-bold uppercase tracking-widest mb-3 text-white">{lembaga.struktur_title || 'Struktur Pendidikan'}</h4>
                                            <p className="text-xs text-white/80 leading-relaxed whitespace-pre-line">
                                                {lembaga.struktur_pendidikan || 'Kurikulum yang kami terapkan mengintegrasikan nilai-nilai kepesantrenan dengan standar pendidikan nasional.'}
                                            </p>
                                        </div>
                                    </div>
                                    {lembaga.program_tags && (
                                        <div className="grid grid-cols-2 gap-4">
                                            {lembaga.program_tags.split('|').filter(Boolean).map((item, i) => (
                                                <div key={i} className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-white/80">
                                                    <CheckBadgeIcon className="h-3 w-3 text-brand-secondary" /> {item.trim()}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 md:gap-4">
                                {keunggulanList.map((adv, i) => (
                                    <div key={i} className="group p-6 bg-white/5 border border-white/10 hover:border-brand-secondary hover:bg-brand-secondary/10 transition-all duration-300 cursor-default">
                                        <div className="text-brand-secondary text-lg font-bold mb-3 opacity-20 group-hover:opacity-100 transition-opacity">0{i + 1}</div>
                                        <h5 className="font-bold uppercase tracking-widest text-[9px] text-white mb-2">{adv.title}</h5>
                                        <p className="text-[9px] text-white/70 leading-relaxed uppercase tracking-wider">{adv.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
