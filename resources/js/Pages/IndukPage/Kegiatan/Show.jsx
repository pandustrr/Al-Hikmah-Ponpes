import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { 
    CalendarIcon, 
    ArrowLeftIcon, 
    ChevronRightIcon,
    PhotoIcon 
} from '@heroicons/react/24/outline';
import ImageGalleryModal from '@/Components/ImageGalleryModal';

export default function Show({ kegiatan = {}, recentKegiatan = [], settings = {} }) {
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);

    // Date formatting helper
    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        return new Date(dateStr).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    return (
        <PublicLayout title={kegiatan.judul} navTheme="dark">
            <Head title={`${kegiatan.judul} - Kegiatan Yayasan`} />

            {/* Breadcrumbs Banner */}
            <div className="bg-brand-primary pt-36 pb-8 border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/50">
                    <Link href="/" className="hover:text-white transition-colors">Home</Link>
                    <ChevronRightIcon className="h-3 w-3" />
                    <Link href="/kegiatan" className="hover:text-white transition-colors">Kegiatan</Link>
                    <ChevronRightIcon className="h-3 w-3" />
                    <span className="text-white truncate max-w-xs">{kegiatan.judul}</span>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
                    {/* Left Column: Detail Info (8 Cols) */}
                    <div className="lg:col-span-8 space-y-8">
                        
                        {/* Title and Metadata */}
                        <div className="space-y-4">
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="bg-brand-primary text-white text-[8px] font-black uppercase tracking-widest px-3 py-1.5 rounded-[0.125rem]">
                                    {kegiatan.lembaga ? kegiatan.lembaga.nama : 'Yayasan'}
                                </span>
                                {kegiatan.tanggal && (
                                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-bold uppercase tracking-wider">
                                        <CalendarIcon className="h-4 w-4 text-brand-gold" />
                                        <span>{formatDate(kegiatan.tanggal)}</span>
                                    </div>
                                )}
                            </div>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-slate-900 tracking-tight leading-tight uppercase">
                                {kegiatan.judul}
                            </h1>
                        </div>

                        {/* Main Cover Photo */}
                        <div className="aspect-video w-full rounded-[0.25rem] overflow-hidden border border-slate-200 shadow-lg relative group bg-slate-900">
                            <img 
                                src={kegiatan.image_url || `https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1200`} 
                                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-102"
                                alt={kegiatan.judul}
                            />
                            {/* Overlay trigger */}
                            <button 
                                onClick={() => setIsGalleryOpen(true)}
                                className="absolute bottom-4 right-4 bg-slate-900/85 backdrop-blur-sm px-4 py-2 text-white hover:bg-brand-primary text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 rounded-[0.25rem] transition-colors shadow-lg"
                            >
                                <PhotoIcon className="h-4 w-4 text-brand-gold" />
                                <span>Buka Galeri ({1 + (kegiatan.galeris?.length || 0)} Foto)</span>
                            </button>
                        </div>

                        {/* Description Text */}
                        <div className="prose max-w-none text-slate-650 leading-relaxed font-light text-base space-y-4">
                            {kegiatan.deskripsi?.split('\n').map((para, index) => (
                                <p key={index}>{para}</p>
                            ))}
                        </div>

                        {/* Back button */}
                        <div className="pt-8 border-t border-slate-100">
                            <Link 
                                href="/kegiatan" 
                                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-primary hover:text-slate-900 transition-colors"
                            >
                                <ArrowLeftIcon className="h-4 w-4" />
                                Kembali ke Daftar Kegiatan
                            </Link>
                        </div>
                    </div>

                    {/* Right Column: Galeri Grid & Sidebar (4 Cols) */}
                    <div className="lg:col-span-4 space-y-10">
                        
                        {/* Gallery Section */}
                        <div className="bg-slate-50 border border-slate-200/80 rounded-[0.25rem] p-6 space-y-6">
                            <div>
                                <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest border-b border-slate-200 pb-3 flex justify-between items-center">
                                    <span>Galeri Dokumentasi</span>
                                    <span className="text-[10px] font-mono font-bold text-brand-primary">
                                        {1 + (kegiatan.galeris?.length || 0)} Foto
                                    </span>
                                </h3>
                            </div>

                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-2 gap-3">
                                {/* Main Cover in Mini Grid */}
                                <div 
                                    onClick={() => setIsGalleryOpen(true)}
                                    className="aspect-square rounded border border-slate-200 overflow-hidden relative cursor-pointer bg-slate-100 group shadow-sm hover:shadow-md transition-all"
                                >
                                    <img 
                                        src={kegiatan.image_url || `https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=300`} 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        alt=""
                                    />
                                    <div className="absolute inset-0 bg-slate-900/30 group-hover:bg-slate-900/50 transition-colors flex items-center justify-center text-white">
                                        <span className="text-[7px] font-bold uppercase tracking-[0.2em] border border-white/40 px-2 py-1 bg-slate-900/30">Sampul</span>
                                    </div>
                                </div>

                                {/* Gallery Photos */}
                                {kegiatan.galeris?.map((photo, index) => (
                                    <div 
                                        key={photo.id || index}
                                        onClick={() => setIsGalleryOpen(true)}
                                        className="aspect-square rounded border border-slate-200 overflow-hidden relative cursor-pointer bg-slate-100 group shadow-sm hover:shadow-md transition-all"
                                    >
                                        <img 
                                            src={photo.image_url} 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            alt=""
                                        />
                                        <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                            <PhotoIcon className="h-6 w-6 text-white" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recent Activities list */}
                        {recentKegiatan.length > 0 && (
                            <div className="space-y-6">
                                <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest border-b border-slate-200 pb-3">
                                    Kegiatan Terbaru
                                </h3>
                                <div className="space-y-4">
                                    {recentKegiatan.map((rk) => (
                                        <Link 
                                            key={rk.id}
                                            href={route('kegiatan.show', rk.slug)}
                                            className="flex gap-4 group"
                                        >
                                            <div className="w-20 h-16 rounded-[0.25rem] overflow-hidden border border-slate-200 bg-slate-100 flex-shrink-0">
                                                <img 
                                                    src={rk.image_url || `https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=200`} 
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    alt="" 
                                                />
                                            </div>
                                            <div className="flex-1 flex flex-col justify-between py-0.5">
                                                <h4 className="text-xs font-bold text-slate-900 group-hover:text-brand-primary transition-colors line-clamp-2 uppercase tracking-tight leading-snug">
                                                    {rk.judul}
                                                </h4>
                                                {rk.tanggal && (
                                                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                                                        {formatDate(rk.tanggal)}
                                                    </span>
                                                )}
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>

                </div>
            </div>

            {/* Overlay slideshow gallery */}
            <ImageGalleryModal 
                isOpen={isGalleryOpen}
                onClose={() => setIsGalleryOpen(false)}
                title={kegiatan.judul}
                category={kegiatan.lembaga ? kegiatan.lembaga.nama : 'Yayasan'}
                description={kegiatan.deskripsi}
                mainImage={kegiatan.image_url}
                images={kegiatan.galeris || []}
            />

        </PublicLayout>
    );
}
