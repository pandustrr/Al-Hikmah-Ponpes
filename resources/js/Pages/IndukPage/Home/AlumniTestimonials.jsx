import React from 'react';
import { Link } from '@inertiajs/react';
import { StarIcon } from '@heroicons/react/24/solid';
import { ArrowLongRightIcon } from '@heroicons/react/24/outline';

export default function AlumniTestimonials() {
    const testimonials = [
        { name: 'Dr. Ahmad Fauzi', year: 'Lulusan 2005', quote: 'YPDS Al-Hikmah bukan sekadar tempat belajar, tapi tempat saya menemukan jati diri dan adab.', role: 'Dokter Spesialis', img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200&h=200', lembaga: 'MA' },
        { name: 'Siti Aminah, M.Pd', year: 'Lulusan 2010', quote: 'Kurikulum yang terintegrasi sangat membantu saya beradaptasi di dunia perkuliahan dan karir.', role: 'Dosen Pendidikan', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200&h=200', lembaga: 'MTS' },
        { name: 'M. Rizal Hakim', year: 'Lulusan 2015', quote: 'Nilai-nilai luhur yang saya dapat di sini menjadi fondasi kuat dalam kehidupan profesional saya.', role: 'Software Engineer', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200', lembaga: 'SMK' },
        { name: 'Nur Halimah', year: 'Lulusan 2018', quote: 'Belajar di YPDS Al-Hikmah mengajarkan saya disiplin dan tanggung jawab yang sangat berguna.', role: 'Pengusaha Muda', img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=200&h=200', lembaga: 'MA' },
    ];

    return (
        <section className="py-24 bg-brand-secondary reveal-section">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4 reveal-element-up">
                    <div>
                        <h2 className="text-xs font-bold text-brand-accent uppercase tracking-[0.3em] mb-2">Suara Alumni</h2>
                        <h3 className="text-4xl font-black text-brand-primary tracking-tighter uppercase leading-tight">Apa Kata Mereka<br/>Tentang Kami?</h3>
                        <div className="h-1 w-20 bg-brand-primary mt-4"></div>
                    </div>
                    <div className="flex flex-col gap-3 shrink-0">
                        <p className="text-brand-accent text-sm max-w-xs">Ribuan lulusan kami tersebar di berbagai bidang profesional dan perguruan tinggi ternama.</p>
                        <Link href="/alumni" className="text-brand-primary font-black text-[10px] uppercase tracking-widest flex items-center group w-fit gap-2">
                            Lihat Semua Alumni
                            <ArrowLongRightIcon className="h-4 w-4 stroke-[3px] group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {testimonials.map((alumni, i) => (
                        <div key={i} className="bg-white rounded-[0.25rem] p-6 border border-brand-light hover:border-brand-primary hover:shadow-md transition-all duration-300 reveal-element-up flex flex-col" style={{ transitionDelay: `${i * 80}ms` }}>
                            <div className="flex gap-0.5 mb-4">
                                {[...Array(5)].map((_, s) => (
                                    <StarIcon key={s} className="w-3.5 h-3.5 text-yellow-400" />
                                ))}
                            </div>
                            <p className="text-brand-accent text-sm italic leading-relaxed flex-grow mb-6">"{alumni.quote}"</p>
                            <div className="flex items-center gap-3">
                                <div className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0 border-2 border-brand-secondary">
                                    <img
                                        src={alumni.img}
                                        alt={alumni.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => { e.target.onerror = null; e.target.style.display='none'; }}
                                    />
                                </div>
                                <div className="min-w-0">
                                    <h4 className="font-black text-brand-primary text-sm leading-tight">{alumni.name}</h4>
                                    <p className="text-[9px] text-brand-accent uppercase tracking-widest font-bold truncate">{alumni.role}</p>
                                    <div className="flex items-center gap-1 mt-0.5">
                                        <span className="text-[8px] font-black text-brand-primary bg-brand-secondary px-1.5 py-0.5 rounded-full uppercase">{alumni.lembaga}</span>
                                        <span className="text-[8px] text-brand-accent">{alumni.year}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}


