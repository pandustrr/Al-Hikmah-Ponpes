import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';

export default function Show({ lembaga, prestasi, kegiatan }) {
    return (
        <PublicLayout title={lembaga.nama} navTheme="dark" isLembaga={true}>
            {/* Header Section */}
            <div className="bg-brand-primary py-24 text-center">
                <div className="max-w-7xl mx-auto px-4">
                    <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-4 uppercase">{lembaga.nama}</h1>
                    <p className="text-brand-accent font-medium text-sm md:text-lg tracking-widest uppercase">PROFIL LEMBAGA</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    {/* Left Side: Info */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-12">
                            <section id="tentang">
                                <h2 className="text-xs font-bold uppercase tracking-widest text-brand-primary mb-4">Tentang Kami</h2>
                                <p className="text-brand-accent leading-relaxed italic border-l-4 border-brand-light pl-6">
                                    "{lembaga.deskripsi}"
                                </p>
                            </section>
                            
                            <section className="bg-brand-secondary p-8 border border-brand-light rounded-[0.25rem]">
                                <h2 className="text-xs font-bold uppercase tracking-widest text-brand-primary mb-6">Visi & Misi</h2>
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="font-bold text-brand-primary mb-2">Visi</h3>
                                        <p className="text-sm text-brand-accent">{lembaga.visi || 'Visi lembaga belum diatur.'}</p>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-brand-primary mb-2">Misi</h3>
                                        <p className="text-sm text-brand-accent whitespace-pre-line">{lembaga.misi || 'Misi lembaga belum diatur.'}</p>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>

                    {/* Right Side: Tab-like Sections */}
                    <div className="lg:col-span-2 space-y-24">
                        {/* Prestasi Section */}
                        <section id="berita">
                            <div className="flex justify-between items-center mb-10 pb-4 border-b-2 border-brand-primary">
                                <h2 className="text-2xl font-bold text-brand-primary uppercase tracking-tighter">Prestasi {lembaga.slug.toUpperCase()}</h2>
                                <span className="text-xs font-bold bg-brand-primary text-white px-3 py-1 uppercase tracking-widest">{prestasi.length} Items</span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {prestasi.map(p => (
                                    <div key={p.id} className="group">
                                        <div className="aspect-[4/3] bg-brand-light overflow-hidden mb-4 border border-brand-light rounded-[0.25rem]">
                                            <img 
                                                src={`https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600&sig=${p.id}`} 
                                                alt={p.judul}
                                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                            />
                                        </div>
                                        <div className="text-xs text-brand-accent/50 mb-1">{new Date(p.tanggal).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                                        <h3 className="font-bold text-brand-primary group-hover:text-brand-primary transition-colors leading-tight">{p.judul}</h3>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Kegiatan Section */}
                        <section id="fasilitas">
                            <div className="flex justify-between items-center mb-10 pb-4 border-b-2 border-brand-primary">
                                <h2 className="text-2xl font-bold text-brand-primary uppercase tracking-tighter">Kegiatan Santri</h2>
                                <span className="text-xs font-bold bg-brand-primary text-white px-3 py-1 uppercase tracking-widest">{kegiatan.length} Items</span>
                            </div>
                            <div className="space-y-8">
                                {kegiatan.map(k => (
                                    <div key={k.id} className="flex flex-col md:flex-row gap-8 items-center bg-white p-6 border border-brand-light hover:border-brand-primary/30 transition-all rounded-[0.25rem] group">
                                        <div className="w-full md:w-48 aspect-video md:aspect-square bg-brand-light shrink-0 overflow-hidden rounded-[0.2rem]">
                                            <img 
                                                src={`https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=400&sig=${k.id}`} 
                                                alt={k.judul}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                        </div>
                                        <div>
                                            <div className="text-xs font-bold text-brand-primary mb-2">{new Date(k.tanggal).toLocaleDateString('id-ID')}</div>
                                            <h3 className="text-xl font-bold text-brand-primary mb-3 group-hover:text-brand-primary transition-colors">{k.judul}</h3>
                                            <p className="text-brand-accent text-sm leading-relaxed mb-4">
                                                {k.deskripsi}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}


