import React, { useState } from 'react';
import { ArrowsPointingOutIcon } from '@heroicons/react/24/outline';
import ImageGalleryModal from '@/Components/ImageGalleryModal';

export default function GaleriSection({ galeris = [] }) {
    const [selectedIdx, setSelectedIdx] = useState(null);

    if (!galeris || galeris.length === 0) return null;

    const currentItem = selectedIdx !== null ? galeris[selectedIdx] : null;
    
    // Create the secondary images array by removing the active item from the collection
    const getSecondaryImages = () => {
        if (selectedIdx === null) return [];
        return galeris.filter((_, idx) => idx !== selectedIdx);
    };

    return (
        <section className="py-24 bg-slate-50 border-t border-slate-100">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                
                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-[10px] font-bold text-brand-primary uppercase tracking-[0.4em] mb-4">Galeri Foto</h2>
                    <h3 className="text-3xl md:text-4xl font-serif font-semibold text-slate-900 tracking-tight leading-tight">
                        Potret Aktivitas & <span className="text-brand-primary">Dokumentasi Unit</span>
                    </h3>
                    <div className="w-12 h-1 bg-brand-primary mx-auto mt-6 rounded-full"></div>
                </div>

                {/* Photo Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {galeris.map((g, i) => (
                        <div 
                            key={g.id || i}
                            onClick={() => setSelectedIdx(i)}
                            className="group relative aspect-[4/3] bg-slate-200 border border-slate-200/60 rounded-[0.25rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer"
                        >
                            {/* Photograph */}
                            <img 
                                src={g.image_url} 
                                alt={g.judul} 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                            />

                            {/* Black Glass Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-5">
                                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <div className="w-8 h-8 bg-brand-primary/95 text-white rounded-full flex items-center justify-center mb-3 shadow-lg self-start">
                                        <ArrowsPointingOutIcon className="h-4 w-4" />
                                    </div>
                                    <h4 className="text-sm font-bold text-white uppercase tracking-tight line-clamp-1">{g.judul}</h4>
                                    {g.deskripsi && (
                                        <p className="text-[10px] text-slate-300 leading-snug line-clamp-2 mt-1 font-light italic">
                                            "{g.deskripsi}"
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* REUSABLE LIGHTBOX PREVIEW MODAL */}
            <ImageGalleryModal 
                isOpen={selectedIdx !== null}
                onClose={() => setSelectedIdx(null)}
                title={currentItem?.judul}
                category="Dokumentasi"
                description={currentItem?.deskripsi}
                mainImage={currentItem?.image_url}
                images={getSecondaryImages()}
            />
        </section>
    );
}
