import React from 'react';
import { Link } from '@inertiajs/react';

export default function FasilitasShortcut() {
    const facilities = [
        { name: 'Asrama Putra & Putri', img: 'https://images.unsplash.com/photo-1555854817-40e09807a11d?auto=format&fit=crop&q=80&w=400' },
        { name: 'Laboratorium IT', img: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=400' },
        { name: 'Perpustakaan Digital', img: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=400' },
        { name: 'Pusat Olahraga', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=400' },
    ];

    return (
        <section className="py-10 md:py-14 bg-brand-primary relative overflow-hidden reveal-section">
            <div className="absolute inset-0 opacity-10">
                <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2000" alt="Pattern" className="w-full h-full object-cover" />
            </div>
            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 items-center">
                    <div className="reveal-element-left">
                        <h3 className="text-xl md:text-2xl font-black text-white tracking-tighter uppercase mb-3 leading-tight">Mendukung Perkembangan <br /> Potensi Siswa</h3>
                        <p className="text-white/70 mb-6 leading-relaxed max-w-md text-sm">
                            Fasilitas modern mulai dari laboratorium terpadu, asrama yang nyaman, hingga lapangan olahraga yang luas disediakan untuk memastikan kenyamanan belajar para siswa.
                        </p>
                        <Link href="/fasilitas" className="inline-flex items-center bg-white text-brand-primary px-7 py-3 text-[9px] font-black uppercase tracking-[0.2em] hover:bg-brand-secondary transition-all rounded-[0.25rem]">Jelajahi Fasilitas</Link>
                    </div>
                    <div className="grid grid-cols-2 gap-3 reveal-element-right">
                        {facilities.map((f, i) => (
                            <div key={i} className="group relative aspect-[4/3] overflow-hidden rounded-[0.25rem] border border-white/10">
                                <img src={f.img} alt={f.name} className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 flex items-end p-3 bg-gradient-to-t from-brand-primary to-transparent">
                                    <span className="text-[9px] font-bold text-white uppercase tracking-widest">{f.name}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}


