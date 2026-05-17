import React, { useState } from 'react';
import { 
    ChevronRightIcon, 
    PhotoIcon 
} from '@heroicons/react/24/outline';
import { Link } from '@inertiajs/react';
import ImageGalleryModal from '@/Components/ImageGalleryModal';

export default function FasilitasSection({ lembaga, fasilitas = [] }) {
    const [activeFacility, setActiveFacility] = useState(null);

    if (!fasilitas || fasilitas.length === 0) return null;

    return (
        <section className="py-24 bg-slate-50 border-y border-slate-100">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                    <div className="max-w-2xl">
                        <h2 className="text-brand-primary text-[10px] font-bold uppercase tracking-[0.4em] mb-4">Infrastruktur & Sarana</h2>
                        <h3 className="text-3xl md:text-5xl font-serif font-semibold text-slate-900 tracking-tight leading-none uppercase">
                            Fasilitas <span className="text-brand-primary">Unggulan</span>
                        </h3>
                        <p className="mt-6 text-slate-500 text-sm md:text-base leading-relaxed">
                            Kami menyediakan lingkungan belajar yang aman dan lengkap untuk menunjang tumbuh kembang santri secara optimal di <span className="font-bold text-slate-700">{lembaga.nama}</span>.
                        </p>
                    </div>
                    <Link href="/fasilitas" className="group flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-brand-primary transition-colors">
                        Lihat Semua Fasilitas <ChevronRightIcon className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {fasilitas.map((f, i) => {
                        const totalPhotos = 1 + (f.galeris?.length || 0);

                        return (
                            <div 
                                key={f.id} 
                                onClick={() => setActiveFacility(f)}
                                className="group bg-white border border-slate-200 rounded-[0.25rem] overflow-hidden hover:shadow-2xl hover:shadow-brand-primary/5 transition-all duration-500 cursor-pointer flex flex-col justify-between"
                            >
                                <div className="aspect-[4/3] overflow-hidden relative bg-slate-100">
                                    <img 
                                        src={f.image_url || `https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600&sig=${i}`} 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                                        alt={f.nama} 
                                    />
                                    
                                    {/* Category Badge */}
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-brand-primary/95 backdrop-blur-sm text-white text-[8px] font-bold uppercase tracking-widest px-3 py-1.5 shadow-lg">
                                            {f.kategori || 'Sarana'}
                                        </span>
                                    </div>

                                    {/* Photos Count Badge */}
                                    <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-sm px-2.5 py-1.5 rounded-[0.25rem] flex items-center gap-1.5 text-white shadow-lg">
                                        <PhotoIcon className="h-3.5 w-3.5 text-brand-primary" />
                                        <span className="text-[9px] font-bold font-mono">{totalPhotos} Foto</span>
                                    </div>
                                </div>

                                <div className="p-5 flex-1 flex flex-col justify-between">
                                    <div>
                                        <h4 className="text-base font-bold text-slate-900 uppercase tracking-tight mb-2 group-hover:text-brand-primary transition-colors line-clamp-1">{f.nama}</h4>
                                        <p className="text-slate-500 text-xs leading-relaxed line-clamp-3 italic">
                                            "{f.deskripsi}"
                                        </p>
                                    </div>

                                    <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                                        <span className="text-[8px] font-black text-brand-primary uppercase tracking-widest group-hover:translate-x-1 transition-transform flex items-center gap-1">
                                            Lihat Detail <ChevronRightIcon className="h-2 w-2" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* LIGHTBOX SLIDER MODAL FOR FACILITY GALLERY (Reused across pages consistently) */}
            <ImageGalleryModal 
                isOpen={!!activeFacility}
                onClose={() => setActiveFacility(null)}
                title={activeFacility?.nama}
                category={activeFacility?.kategori}
                description={activeFacility?.deskripsi}
                mainImage={activeFacility?.image_url}
                images={activeFacility?.galeris || []}
            />
        </section>
    );
}
