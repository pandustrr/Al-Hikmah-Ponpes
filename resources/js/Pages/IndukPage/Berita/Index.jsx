import React, { useState } from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Link, router } from '@inertiajs/react';
import NewsTicker from './NewsTicker';
import NewsCard from './NewsCard';

export default function Index({ berita, currentCategory, categories }) {
    // Combine "Semua Berita" with dynamic categories from DB
    const allCategories = [
        { slug: '', name: 'Terkini' },
        ...categories
    ];

    const handleFilter = (slug) => {
        router.get('/berita', slug ? { kategori: slug } : {}, {
            preserveState: true,
            replace: true,
        });
    };

    // Split berita into featured and others
    const featuredNews = berita.length > 0 ? berita[0] : null;
    const otherNews = berita.length > 1 ? berita.slice(1) : [];
    const latestNewsForTicker = berita.slice(0, 5);
    const popularNews = berita.slice(0, 5); // Fallback for popular if not provided

    return (
        <PublicLayout title="Berita & Informasi">
            {/* News Top Bar (Tempo Style) */}
            <div className="bg-brand-primary text-white py-1.5 border-b border-white/10 hidden md:block">
                <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-[10px] font-semibold uppercase tracking-widest">
                    <div className="flex items-center gap-4">
                        <span>{new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        <span className="text-white/30">|</span>
                        <span className="text-brand-secondary animate-pulse flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-brand-secondary rounded-full"></span>
                            Live Update
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <a href="#" className="hover:text-brand-secondary transition-colors">Facebook</a>
                        <a href="#" className="hover:text-brand-secondary transition-colors">Instagram</a>
                        <a href="#" className="hover:text-brand-secondary transition-colors">Twitter</a>
                        <a href="#" className="hover:text-brand-secondary transition-colors">YouTube</a>
                    </div>
                </div>
            </div>

            {/* Header / Masthead for News */}
            <div className="bg-white pt-10 pb-6 border-b border-sage-light">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <div className="mb-4">
                        <span className="bg-brand-primary text-white text-[10px] font-semibold px-2 py-0.5 tracking-tighter uppercase">Portal Berita</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-semibold text-brand-primary tracking-tighter uppercase mb-2">
                        <span className="text-brand-accent">Al-Hikmah</span> NEWS
                    </h1>
                    <p className="text-[10px] font-semibold text-brand-accent uppercase tracking-[0.5em] mb-8">
                        Independent • Trustworthy • Educational
                    </p>
                    
                    {/* Navigation / Filter */}
                    <div className="flex flex-wrap items-center justify-center border-t border-sage-light mt-4 overflow-x-auto no-scrollbar sticky top-14 bg-white/95 backdrop-blur-md z-40 shadow-sm md:shadow-none">
                        {allCategories.map(cat => (
                            <button
                                key={cat.slug}
                                onClick={() => handleFilter(cat.slug)}
                                className={`px-6 py-4 text-xs font-semibold uppercase tracking-widest whitespace-nowrap transition-all border-b-2 ${
                                    (currentCategory || '') === cat.slug 
                                    ? 'border-brand-primary text-brand-primary' 
                                    : 'border-transparent text-brand-accent hover:text-brand-primary'
                                }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <NewsTicker items={latestNewsForTicker} />  

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    
                    {/* Main Content Area */}
                    <div className="lg:col-span-8">
                        {featuredNews ? (
                            <div className="space-y-10">
                                {/* Featured Hero */}
                                <NewsCard berita={featuredNews} variant="featured" className="rounded-[0.25rem]" />

                                {/* Sub Grid / List */}
                                <div className="space-y-2">
                                    <h2 className="text-lg font-semibold text-brand-primary uppercase tracking-widest border-l-4 border-brand-primary pl-4 mb-6">
                                        Berita Lainnya
                                    </h2>
                                    {otherNews.length > 0 ? (
                                        <div className="divide-y divide-sage-light">
                                            {otherNews.map(item => (
                                                <NewsCard key={item.id} berita={item} variant="horizontal" />
                                            ))}
                                        </div>
                                     ) : (
                                         <div className="py-10 text-center text-brand-accent italic">
                                             Belum ada berita lainnya.
                                         </div>
                                     )}
                                 </div>

                                 {/* Multimedia Section */}
                                 <div className="pt-10 border-t border-sage-light">
                                     <div className="flex items-center justify-between mb-6">
                                         <h2 className="text-lg font-semibold text-brand-primary uppercase tracking-widest border-l-4 border-brand-primary pl-4">
                                             Multimedia Al-Hikmah
                                         </h2>
                                         <Link href="#" className="text-[10px] font-semibold text-brand-accent hover:text-brand-primary uppercase tracking-widest transition-colors">Lihat Semua Galeri</Link>
                                     </div>
                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                         <div className="relative aspect-video bg-brand-secondary overflow-hidden rounded-[0.25rem] group cursor-pointer">
                                             <img src="https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Video" />
                                             <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-all">
                                                 <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                                                     <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-brand-primary border-b-[8px] border-b-transparent ml-1"></div>
                                                 </div>
                                             </div>
                                             <div className="absolute bottom-4 left-4 right-4">
                                                 <span className="bg-red-600 text-white text-[8px] font-semibold px-1.5 py-0.5 uppercase tracking-widest mb-2 inline-block">VIDEO</span>
                                                 <h4 className="text-white font-semibold text-sm leading-tight">Profil Singkat Pondok Pesantren Al-Hikmah 2026</h4>
                                             </div>
                                         </div>
                                         <div className="grid grid-cols-2 gap-4">
                                             <div className="relative aspect-square bg-brand-secondary overflow-hidden rounded-[0.25rem] group cursor-pointer">
                                                 <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Foto" />
                                                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                             </div>
                                             <div className="relative aspect-square bg-brand-secondary overflow-hidden rounded-[0.25rem] group cursor-pointer">
                                                 <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Foto" />
                                                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                             </div>
                                             <div className="relative aspect-square bg-brand-secondary overflow-hidden rounded-[0.25rem] group cursor-pointer">
                                                 <img src="https://images.unsplash.com/photo-1577896851231-70ef14697593?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Foto" />
                                                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                             </div>
                                             <div className="relative aspect-square bg-brand-secondary overflow-hidden rounded-[0.25rem] group cursor-pointer">
                                                 <img src="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Foto" />
                                                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                             </div>
                                         </div>
                                     </div>
                                 </div>
                             </div>
                        ) : (
                            <div className="text-center py-24 bg-brand-secondary border border-dashed border-sage-light rounded-[0.25rem]">
                                <p className="text-brand-accent font-semibold uppercase tracking-widest text-sm">Belum ada berita yang diterbitkan</p>
                            </div>
                        )}
                    </div>

                    {/* Sidebar Area */}
                    <aside className="lg:col-span-4 space-y-10">
                        {/* Popular News Section */}
                        <div className="bg-brand-secondary p-6 rounded-[0.25rem]">
                            <h2 className="text-sm font-semibold text-brand-primary uppercase tracking-widest border-b-2 border-brand-primary pb-2 mb-6">
                                Terpopuler
                            </h2>
                            <div className="space-y-1">
                                {popularNews.map((item, index) => (
                                    <div key={item.id} className="flex gap-4 group cursor-pointer border-b border-sage-light last:border-0 py-4">
                                        <span className="text-3xl font-semibold text-sage-light group-hover:text-brand-primary/20 transition-colors">
                                            {index + 1}
                                        </span>
                                        <Link href={`/berita/${item.slug}`} className="flex-grow">
                                            <h3 className="text-xs font-semibold text-brand-primary leading-tight group-hover:text-brand-accent transition-colors line-clamp-2">
                                                {item.judul}
                                            </h3>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Newsletter or Ad Mockup */}
                        <div className="bg-brand-primary p-8 text-center text-white rounded-[0.25rem]">
                            <h3 className="text-lg font-semibold uppercase tracking-tighter mb-2">Langganan Warta</h3>
                            <p className="text-xs text-brand-secondary/60 mb-6">Dapatkan berita terbaru langsung di inbox Anda.</p>
                            <div className="flex flex-col gap-2">
                                <input 
                                    type="email" 
                                    placeholder="Alamat Email" 
                                    className="bg-white/10 border-white/20 text-white text-xs px-4 py-3 focus:bg-white/20 transition-all outline-none rounded-[0.25rem]"
                                />
                                <button className="bg-brand-accent hover:bg-brand-secondary hover:text-brand-primary text-white text-[10px] font-semibold uppercase tracking-widest py-3 transition-colors rounded-[0.25rem]">
                                    Daftar Sekarang
                                </button>
                            </div>
                        </div>

                        {/* Instagram Feed Mockup */}
                        <div>
                            <h2 className="text-sm font-semibold text-brand-primary uppercase tracking-widest border-b-2 border-brand-primary pb-2 mb-6">
                                Instagram @alhikmah
                            </h2>
                            <div className="grid grid-cols-3 gap-2">
                                {[1,2,3,4,5,6].map(i => (
                                    <div key={i} className="aspect-square bg-brand-secondary overflow-hidden rounded-[0.1rem] hover:opacity-80 transition-opacity cursor-pointer">
                                        <img src={`https://images.unsplash.com/photo-${1500000000000 + i}?auto=format&fit=crop&q=60&w=200&h=200`} className="w-full h-full object-cover" alt="IG" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Popular Tags */}
                        <div>
                            <h2 className="text-sm font-semibold text-brand-primary uppercase tracking-widest border-b-2 border-brand-primary pb-2 mb-6">
                                Tag Populer
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {['Pondok', 'Prestasi', 'PPDB', 'Pendidikan', 'Islam', 'Santri', 'Kegiatan', 'Ramadhan'].map(tag => (
                                    <span key={tag} className="px-3 py-1 bg-white border border-sage-light text-[9px] font-semibold text-brand-accent uppercase tracking-widest rounded-full hover:border-brand-primary hover:text-brand-primary cursor-pointer transition-all">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </aside>

                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}} />
        </PublicLayout>
    );
}



