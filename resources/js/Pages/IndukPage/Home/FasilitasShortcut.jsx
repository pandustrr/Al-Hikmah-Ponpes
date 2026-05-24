import React from 'react';
import { Link } from '@inertiajs/react';

const FALLBACK_FASILITAS = [
    { nama: 'Asrama Putra & Putri', image_url: null },
    { nama: 'Laboratorium IT', image_url: null },
    { nama: 'Perpustakaan Digital', image_url: null },
    { nama: 'Pusat Olahraga', image_url: null },
];

const FALLBACK_IMAGES = [
    'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=400',
];

export default function FasilitasShortcut({ fasilitasUnggulan = [], settings = {} }) {
    // Gunakan data dari DB jika ada, fallback ke data statis jika belum ada data
    const facilities = fasilitasUnggulan.length > 0 ? fasilitasUnggulan : FALLBACK_FASILITAS;

    return (
        <section className="py-16 md:py-20 bg-brand-secondary relative overflow-hidden reveal-section border-y border-brand-accent/10">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2000" alt="Pattern" className="w-full h-full object-cover" />
            </div>
            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
                    <div className="reveal-element-left">
                        <h2 className="text-xs font-semibold text-brand-accent uppercase tracking-[0.3em] mb-4">
                            {settings.fasilitas_tagline || 'Fasilitas Unggulan'}
                        </h2>
                        <h3 className="text-2xl md:text-3xl font-semibold text-brand-primary tracking-tighter uppercase mb-5 leading-tight whitespace-pre-line">
                            {settings.fasilitas_title || 'Mendukung Perkembangan \n Potensi Siswa'}
                        </h3>
                        <p className="text-brand-accent mb-8 leading-relaxed max-w-md text-sm italic">
                            {settings.fasilitas_desc || '"Fasilitas modern mulai dari laboratorium terpadu, asrama yang nyaman, hingga lapangan olahraga yang luas disediakan untuk memastikan kenyamanan belajar para siswa."'}
                        </p>
                        <div className="mt-8">
                            <Link href="/fasilitas" className="btn-primary px-8 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] shadow-lg text-center block sm:inline-block w-full sm:w-auto">
                                {settings.fasilitas_btn_text || 'Jelajahi Fasilitas Selengkapnya'}
                            </Link>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 md:gap-4 reveal-element-right">
                        {facilities.slice(0, 4).map((f, i) => (
                            <div key={f.id || i} className="group relative aspect-[4/3] overflow-hidden rounded-[0.25rem] border border-brand-accent/10 shadow-sm">
                                <img 
                                    src={f.image_url || FALLBACK_IMAGES[i % FALLBACK_IMAGES.length]} 
                                    alt={f.nama} 
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 opacity-80" 
                                    onError={(e) => { e.target.onerror = null; e.target.src = FALLBACK_IMAGES[i % FALLBACK_IMAGES.length]; }}
                                />
                                <div className="absolute inset-0 flex items-end p-2 sm:p-4 bg-gradient-to-t from-brand-primary/80 to-transparent">
                                    <span className="text-[8px] sm:text-[10px] font-semibold text-white uppercase tracking-widest leading-tight">{f.nama}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
