import React, { useState } from 'react';
import { Link } from '@inertiajs/react';

const FALLBACK_FASILITAS = [
    { id: 'fb-1', nama: 'Asrama Putra & Putri', image_url: null, galeris: [] },
    { id: 'fb-2', nama: 'Laboratorium IT', image_url: null, galeris: [] },
    { id: 'fb-3', nama: 'Perpustakaan Digital', image_url: null, galeris: [] },
    { id: 'fb-4', nama: 'Pusat Olahraga', image_url: null, galeris: [] },
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

    const [activeFacilityId, setActiveFacilityId] = useState(null);
    const [selectedLightboxImage, setSelectedLightboxImage] = useState(null);

    const handleFacilityClick = (facilityId) => {
        setActiveFacilityId(prev => prev === facilityId ? null : facilityId);
    };

    const activeFacility = facilities.find(f => (f.id || f.nama) === activeFacilityId);

    return (
        <section className="py-16 md:py-20 bg-brand-secondary relative overflow-hidden reveal-section border-y border-brand-accent/10">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2000" alt="Pattern" className="w-full h-full object-cover" />
            </div>
            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
                    <div className="reveal-element-left">
                        <h2 className="text-xs font-bold text-brand-accent uppercase tracking-[0.25em] mb-4">
                            {settings.fasilitas_tagline || 'Fasilitas Unggulan'}
                        </h2>
                        <h3 className="text-2xl md:text-3xl font-bold text-brand-primary tracking-tighter uppercase mb-5 leading-tight whitespace-pre-line">
                            {settings.fasilitas_title || 'Mendukung Perkembangan \n Potensi Siswa'}
                        </h3>
                        <p className="text-brand-accent mb-8 leading-relaxed max-w-md text-sm italic font-medium">
                            {settings.fasilitas_desc || '"Fasilitas modern mulai dari laboratorium terpadu, asrama yang nyaman, hingga lapangan olahraga yang luas disediakan untuk memastikan kenyamanan belajar para siswa."'}
                        </p>
                        <div className="mt-8">
                            <Link href="/fasilitas" className="btn-primary px-8 py-3 text-xs font-bold uppercase tracking-[0.15em] shadow-lg text-center block sm:inline-block w-full sm:w-auto">
                                {settings.fasilitas_btn_text || 'Jelajahi Fasilitas Selengkapnya'}
                            </Link>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 md:gap-4 reveal-element-right">
                        {facilities.map((f, i) => {
                            const isSelected = activeFacilityId === (f.id || f.nama);
                            return (
                                <div 
                                    key={f.id || i} 
                                    onClick={() => handleFacilityClick(f.id || f.nama)}
                                    className={`group relative aspect-[4/3] overflow-hidden rounded-[0.25rem] border shadow-sm cursor-pointer transition-all duration-300 ${
                                        isSelected 
                                            ? 'ring-2 ring-brand-primary border-transparent scale-95 shadow-md' 
                                            : 'border-brand-accent/10 hover:border-brand-primary/50'
                                    }`}
                                >
                                    <img 
                                        src={f.image_url || FALLBACK_IMAGES[i % FALLBACK_IMAGES.length]} 
                                        alt={f.nama} 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 filter-none opacity-100 brightness-100 grayscale-0" 
                                        onError={(e) => { e.target.onerror = null; e.target.src = FALLBACK_IMAGES[i % FALLBACK_IMAGES.length]; }}
                                    />
                                    {/* Overlay */}
                                    <div className="absolute inset-0 flex flex-col justify-between p-2 sm:p-4 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent group-hover:from-slate-950/95 transition-all duration-300">
                                        <div className="flex justify-end">
                                            {/* Indicator Icon */}
                                            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white transition-all ${
                                                isSelected ? 'bg-brand-primary border border-white/40' : 'bg-black/45 group-hover:bg-brand-primary/80'
                                            }`}>
                                                {isSelected ? '✓' : '+'}
                                            </span>
                                        </div>
                                        <span className="text-[10px] sm:text-xs font-bold text-white uppercase tracking-widest leading-tight drop-shadow-md">{f.nama}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Dropdown Galeri Fasilitas */}
                    {activeFacility && (
                        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-[0.25rem] p-6 md:p-8 shadow-xl animate-fade-in space-y-6">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                                <div className="space-y-1">
                                    <span className="text-[9px] font-black text-brand-primary uppercase tracking-[0.2em] block">Galeri Foto Resmi</span>
                                    <h4 className="text-base font-bold text-slate-800 uppercase tracking-tight">{activeFacility.nama}</h4>
                                </div>
                                <button 
                                    onClick={() => setActiveFacilityId(null)} 
                                    className="text-[10px] font-bold text-slate-400 hover:text-slate-800 uppercase tracking-widest border border-slate-200 hover:border-slate-300 px-3 py-1.5 rounded transition-all"
                                >
                                    Tutup Galeri ×
                                </button>
                            </div>

                            {activeFacility.deskripsi && (
                                <p className="text-xs text-slate-500 leading-relaxed max-w-2xl">{activeFacility.deskripsi}</p>
                            )}

                            {/* Grid Gambar Galeri */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                {activeFacility.galeris && activeFacility.galeris.length > 0 ? (
                                    activeFacility.galeris.map((img) => (
                                        <div 
                                            key={img.id} 
                                            onClick={() => setSelectedLightboxImage(img.image_url)}
                                            className="group relative aspect-[4/3] overflow-hidden rounded-[0.25rem] border border-slate-100 cursor-pointer shadow-sm"
                                        >
                                            <img 
                                                src={img.image_url} 
                                                alt={img.judul || activeFacility.nama} 
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                            />
                                            <div className="absolute inset-0 bg-brand-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2.5">
                                                <span className="text-[9px] font-bold text-white uppercase tracking-wider truncate w-full">
                                                    {img.judul || 'Perbesar Foto 🔍'}
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    // Fallback: jika tidak ada galeri tambahan, tampilkan gambar utama fasilitas
                                    <div 
                                        onClick={() => setSelectedLightboxImage(activeFacility.image_url || FALLBACK_IMAGES[0])}
                                        className="group relative aspect-[4/3] overflow-hidden rounded-[0.25rem] border border-slate-100 cursor-pointer shadow-sm col-span-1"
                                    >
                                        <img 
                                            src={activeFacility.image_url || FALLBACK_IMAGES[0]} 
                                            alt={activeFacility.nama} 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                        />
                                        <div className="absolute inset-0 bg-brand-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2.5">
                                            <span className="text-[9px] font-bold text-white uppercase tracking-wider truncate w-full">
                                                Perbesar Foto Utama 🔍
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Lightbox Modal Premium */}
            {selectedLightboxImage && (
                <div 
                    className="fixed inset-0 bg-slate-950/90 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 transition-all duration-300 animate-fade-in"
                    onClick={() => setSelectedLightboxImage(null)}
                >
                    <button 
                        onClick={() => setSelectedLightboxImage(null)}
                        className="absolute top-6 right-6 text-white/75 hover:text-white text-3xl font-extralight transition-colors"
                        aria-label="Tutup"
                    >
                        ×
                    </button>
                    <div 
                        className="relative max-w-4xl max-h-[85vh] overflow-hidden rounded-[0.25rem] bg-slate-900 border border-white/10 shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img 
                            src={selectedLightboxImage} 
                            alt="Lightbox Preview" 
                            className="max-w-full max-h-[80vh] object-contain mx-auto"
                        />
                    </div>
                </div>
            )}
        </section>
    );
}
