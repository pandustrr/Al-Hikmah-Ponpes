import React from 'react';

export default function PengajarUnit({ pengajars }) {
    return (
        <section className="py-32 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
                    <div className="max-w-2xl">
                        <h2 className="text-brand-primary text-[10px] font-bold uppercase tracking-[0.4em] mb-4">SDM Berkualitas</h2>
                        <h3 className="text-4xl md:text-6xl font-serif font-semibold text-slate-900 tracking-tight leading-none uppercase">Tenaga <span className="text-brand-primary">Pendidik</span></h3>
                        <p className="mt-8 text-slate-500 text-base md:text-lg leading-relaxed font-serif italic">
                            "Dibimbing oleh para asatidz dan pengajar profesional yang berdedikasi tinggi dalam mentransfer ilmu dan membimbing adab santri."
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-10">
                    {pengajars.map((p, i) => (
                        <div key={p.id} className="group animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
                            <div className="aspect-[3/4] overflow-hidden bg-slate-100 rounded-[0.25rem] mb-6 relative shadow-lg group-hover:shadow-brand-primary/10 transition-all duration-500">
                                {p.image_url ? (
                                    <img 
                                        src={p.image_url} 
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                                        alt={p.nama} 
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                                        <span className="text-[10px] font-black uppercase tracking-widest">No Photo</span>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-brand-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            </div>
                            <div className="text-center md:text-left">
                                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-tight mb-1 group-hover:text-brand-primary transition-colors">{p.nama}</h4>
                                <p className="text-[10px] font-bold text-brand-primary/60 uppercase tracking-[0.2em]">{p.jabatan}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
