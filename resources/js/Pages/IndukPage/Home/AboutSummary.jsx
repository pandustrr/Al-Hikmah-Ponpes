import React from 'react';
import { Link } from '@inertiajs/react';

export default function AboutSummary() {
    return (
        <section className="py-16 bg-brand-light overflow-hidden reveal-section">
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
                    {/* Image */}
                    <div className="lg:col-span-2 relative reveal-element-left">
                        <div className="aspect-[3/4] bg-brand-secondary rounded-[0.25rem] overflow-hidden shadow-xl max-w-xs mx-auto lg:max-w-none">
                            <img
                                src="https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&q=80&w=600"
                                alt="YPDS Al-Hikmah"
                                className="w-full h-full object-cover"
                                onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600"; }}
                            />
                        </div>
                        <div className="absolute -bottom-5 -right-5 bg-brand-primary p-5 shadow-xl hidden md:block">
                            <p className="text-2xl font-black text-brand-secondary mb-0.5">30+</p>
                            <p className="text-[9px] font-bold text-white/70 uppercase tracking-widest">Tahun Berdedikasi</p>
                        </div>
                    </div>
                    {/* Content */}
                    <div className="lg:col-span-3 space-y-5 reveal-element-right">
                        <div>
                            <h2 className="text-[10px] font-bold text-brand-accent uppercase tracking-[0.3em] mb-2">Mengenal Lebih Dekat</h2>
                            <h3 className="text-3xl font-black text-brand-primary tracking-tighter uppercase leading-none mb-4">YPDS <br /> Al-Hikmah</h3>
                            <div className="h-0.5 w-14 bg-brand-primary"></div>
                        </div>
                        <p className="text-brand-accent leading-relaxed italic border-l-4 border-brand-primary pl-4 text-sm">
                            "YPDS Al-Hikmah adalah lembaga pendidikan Islam yang berdedikasi untuk mencetak generasi cerdas secara intelektual dan kokoh secara spiritual."
                        </p>
                        <p className="text-brand-primary leading-relaxed text-sm">
                            Berdiri di jantung Ambulu, Jember, lembaga kami telah menjadi rumah bagi ribuan siswa yang menyeimbangkan kurikulum modern dengan karakter Islami.
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-brand-secondary p-4 border border-brand-accent/20">
                                <h4 className="font-black text-brand-primary text-[10px] uppercase tracking-widest mb-1">Metode Pendidikan</h4>
                                <p className="text-[11px] text-brand-accent leading-relaxed">Holistik — mengintegrasikan sains, teknologi, dan ilmu agama.</p>
                            </div>
                            <div className="bg-brand-secondary p-4 border border-brand-accent/20">
                                <h4 className="font-black text-brand-primary text-[10px] uppercase tracking-widest mb-1">Lingkungan Siswa</h4>
                                <p className="text-[11px] text-brand-accent leading-relaxed">Asrama nyaman dengan pembiasaan adab harian yang terstruktur.</p>
                            </div>
                        </div>
                        {/* Stats */}
                        <div className="grid grid-cols-4 gap-3 border-t border-brand-accent/20 pt-5">
                            {[
                                { value: '30+', label: 'Tahun Berdiri' },
                                { value: '3', label: 'Jenjang' },
                                { value: '5000+', label: 'Alumni' },
                                { value: '100%', label: 'Berasrama' },
                            ].map((stat, i) => (
                                <div key={i} className="text-center">
                                    <div className="text-xl font-black text-brand-primary">{stat.value}</div>
                                    <div className="text-[9px] font-bold text-brand-accent uppercase tracking-widest">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-3 pt-1">
                            <Link href="/pendaftaran" className="btn-primary px-6 py-2.5 text-[9px] font-black uppercase tracking-[0.2em] shadow-lg hover:scale-105 transition-all">Pendaftaran Siswa Baru</Link>
                            <Link href="/profil" className="border border-brand-primary text-brand-primary px-6 py-2.5 text-[9px] font-black uppercase tracking-[0.2em] hover:bg-brand-primary hover:text-white transition-all rounded-[0.25rem]">Profil Lengkap</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}


