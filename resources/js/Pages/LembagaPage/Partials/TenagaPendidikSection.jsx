import React from 'react';

export default function TenagaPendidikSection({ pengajars = [], lembaga = {} }) {
    if (pengajars.length === 0) return null;

    return (
        <section className="py-20 md:py-28 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="flex flex-col items-center">
                    <div className="w-full">
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                            <div>
                                <div className="inline-flex items-center gap-2 mb-4">
                                    <span className="h-[2px] w-8 bg-brand-primary"></span>
                                    <span className="text-brand-primary text-[10px] font-bold uppercase tracking-[0.3em]">{lembaga.tenaga_pendidik_tagline || 'Tenaga Pendidik'}</span>
                                </div>
                                <h2 className="text-3xl md:text-5xl font-serif font-semibold text-slate-900 tracking-tight leading-tight">
                                    {lembaga.tenaga_pendidik_title || 'Mengenal Para'} <br />
                                    <span className="text-brand-primary">{lembaga.tenaga_pendidik_subtitle || 'Asatidzah Kami'}</span>
                                </h2>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-12">
                            {pengajars.map((teacher) => (
                                <div key={teacher.id} className="group">
                                    <div className="aspect-[3/4] rounded-[0.25rem] overflow-hidden mb-6 relative shadow-lg">
                                        <img 
                                            src={teacher.image_url || 'https://placehold.co/600x800/f1f5f9/94a3b8?text=Ustadz'} 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" 
                                            alt={teacher.nama} 
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    </div>
                                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-tight mb-1 group-hover:text-brand-primary transition-colors">{teacher.nama}</h4>
                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">{teacher.jabatan}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
