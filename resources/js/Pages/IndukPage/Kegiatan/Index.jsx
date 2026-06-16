import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { 
    CalendarIcon, 
    ChevronRightIcon,
    MagnifyingGlassIcon,
    ArrowRightIcon
} from '@heroicons/react/24/outline';

export default function Index({ kegiatan = [], lembagas = [], settings = {}, filters = {} }) {
    const [activeLembaga, setActiveLembaga] = useState(filters.lembaga || 'all');
    const [searchQuery, setSearchQuery] = useState(filters.q || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('kegiatan.index'), { 
            q: searchQuery, 
            lembaga: activeLembaga !== 'all' ? activeLembaga : undefined 
        }, {
            preserveState: true,
            replace: true
        });
    };

    const handleFilterLembaga = (id) => {
        setActiveLembaga(id);
        router.get(route('kegiatan.index'), { 
            q: searchQuery || undefined, 
            lembaga: id !== 'all' ? id : undefined 
        }, {
            preserveState: true,
            replace: true
        });
    };

    return (
        <PublicLayout title="Kegiatan" navTheme="dark">
            <Head title="Kegiatan Yayasan & Unit Pendidikan" />

            {/* Hero */}
            <div className="relative min-h-[50vh] flex items-center pt-36 pb-28 overflow-hidden bg-brand-primary">
                {/* Background Layer with Overlay grid */}
                <div className="absolute inset-0 z-0">
                    <img 
                        src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1600" 
                        alt="Hero BG" 
                        className="w-full h-full object-cover opacity-35 scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/60 via-brand-primary/40 to-brand-primary/80"></div>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/az-subtle.png')] opacity-10"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
                    <div className="max-w-3xl animate-fade-in-up">
                        <div className="inline-flex items-center gap-2 mb-6">
                            <span className="h-[2px] w-8 bg-brand-secondary"></span>
                            <span className="text-brand-secondary text-[10px] font-black uppercase tracking-[0.4em]">
                                Aktivitas & Momentum
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-serif font-semibold text-white tracking-tight uppercase leading-[1.1] mb-8">
                            Kegiatan Yayasan
                        </h1>
                        <p className="text-sm md:text-base text-white/70 leading-relaxed font-light">
                            Dokumentasi kegiatan, program pendidikan, dan momentum penting yang berlangsung di Yayasan Pendidikan dan Dakwah Sosial Al-Hikmah Jember.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                
                {/* Search & Filter bar */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 pb-6 border-b border-slate-100">
                    {/* Filter Tabs */}
                    <div className="flex flex-wrap gap-2 order-2 md:order-1">
                        <button
                            onClick={() => handleFilterLembaga('all')}
                            className={`px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                                activeLembaga === 'all'
                                ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/25'
                                : 'bg-slate-50 text-slate-500 border border-slate-200 hover:border-brand-primary hover:text-brand-primary'
                            }`}
                        >
                            Semua Unit
                        </button>
                        {lembagas.map(lembaga => (
                            <button
                                key={lembaga.id}
                                onClick={() => handleFilterLembaga(lembaga.id.toString())}
                                className={`px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                                    activeLembaga === lembaga.id.toString()
                                    ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/25'
                                    : 'bg-slate-50 text-slate-500 border border-slate-200 hover:border-brand-primary hover:text-brand-primary'
                                }`}
                            >
                                {lembaga.nama}
                            </button>
                        ))}
                    </div>

                    {/* Search Form */}
                    <form onSubmit={handleSearch} className="relative w-full md:w-80 order-1 md:order-2">
                        <input 
                            type="text" 
                            placeholder="Cari kegiatan..."
                            className="w-full bg-slate-50 border border-slate-200 rounded-full pl-6 pr-12 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button 
                            type="submit"
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-brand-primary text-white p-2 rounded-full hover:bg-slate-900 transition-colors"
                        >
                            <MagnifyingGlassIcon className="h-3.5 w-3.5" />
                        </button>
                    </form>
                </div>

                {/* Listing Grid */}
                {kegiatan.length === 0 ? (
                    <div className="py-24 text-center border border-dashed border-slate-200 rounded-[0.25rem] bg-slate-50/50">
                        <div className="max-w-md mx-auto space-y-4">
                            <div className="p-4 bg-white rounded-full inline-block shadow-sm text-slate-300">
                                <CalendarIcon className="h-10 w-10" />
                            </div>
                            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-800">Kegiatan Tidak Ditemukan</h3>
                            <p className="text-xs text-slate-400 font-light">Tidak ada dokumentasi kegiatan yang sesuai dengan filter pencarian Anda saat ini.</p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {kegiatan.map((k, i) => (
                            <Link 
                                key={k.id || i}
                                href={route('kegiatan.show', k.slug)}
                                className="group flex flex-col bg-white border border-slate-200/80 rounded-[0.25rem] overflow-hidden hover:shadow-2xl hover:shadow-brand-primary/5 transition-all duration-500 cursor-pointer"
                            >
                                {/* Cover Image */}
                                <div className="aspect-[4/3] overflow-hidden relative bg-slate-100">
                                    <img 
                                        src={k.image_url || `https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=600`}
                                        alt={k.judul}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                        onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=600"; }}
                                    />
                                    
                                    {/* Unit Badge */}
                                    <div className="absolute top-4 left-4 z-10">
                                        <span className="bg-brand-primary/95 backdrop-blur-sm text-white text-[8px] font-bold uppercase tracking-widest px-3 py-1.5 shadow-lg rounded-[0.125rem]">
                                            {k.lembaga ? k.lembaga.nama : 'Yayasan'}
                                        </span>
                                    </div>
                                    
                                    {/* Date Overlay */}
                                    {k.tanggal && (
                                        <div className="absolute bottom-4 left-4 z-10 bg-slate-900/70 backdrop-blur-sm text-white text-[8px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-[0.125rem] flex items-center gap-1.5">
                                            <CalendarIcon className="h-3 w-3 text-brand-gold" />
                                            <span>
                                                {new Date(k.tanggal).toLocaleDateString('id-ID', {day: 'numeric', month: 'short', year: 'numeric'})}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Details */}
                                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                                    <div className="space-y-2">
                                        <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-primary transition-colors line-clamp-2 uppercase tracking-tight leading-snug">
                                            {k.judul}
                                        </h3>
                                        <p className="text-slate-500 text-xs font-light leading-relaxed line-clamp-3">
                                            {k.deskripsi}
                                        </p>
                                    </div>
                                    
                                    {/* Button */}
                                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-brand-primary uppercase tracking-widest group-hover:text-slate-900 transition-colors">
                                        <span>Selengkapnya</span>
                                        <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

            </div>
        </PublicLayout>
    );
}
