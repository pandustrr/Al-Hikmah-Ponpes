import React, { useState } from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { 
    BeakerIcon, 
    HomeIcon, 
    BuildingLibraryIcon, 
    Square2StackIcon,
    ChevronRightIcon,
    PhotoIcon
} from '@heroicons/react/24/outline';
import ImageGalleryModal from '@/Components/ImageGalleryModal';

const fasilitasIcons = {
    'laboratorium': <BeakerIcon className="w-8 h-8" />,
    'asrama': <HomeIcon className="w-8 h-8" />,
    'masjid': <BuildingLibraryIcon className="w-8 h-8" />,
    'default': <Square2StackIcon className="w-8 h-8" />,
};

const fallbackFasilitas = [
    { id: 1, nama: 'Asrama Putra & Putri', deskripsi: 'Asrama nyaman terpisah dengan fasilitas lengkap dan pengawasan 24 jam.', img: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=600' },
    { id: 2, nama: 'Laboratorium IT', deskripsi: 'Lab komputer modern dengan koneksi internet cepat untuk mendukung pembelajaran digital.', img: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=600' },
    { id: 3, nama: 'Perpustakaan Digital', deskripsi: 'Koleksi ribuan buku fisik dan akses e-book untuk menunjang literasi siswa.', img: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=600' },
    { id: 4, nama: 'Lapangan Olahraga', deskripsi: 'Fasilitas olahraga lengkap mulai dari lapangan basket, voli, hingga futsal.', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=600' },
    { id: 5, nama: 'Masjid Utama', deskripsi: 'Masjid utama yang menjadi pusat kegiatan ibadah dan keagamaan seluruh siswa.', img: 'https://images.unsplash.com/photo-1591620729680-4e1e16f7d55a?auto=format&fit=crop&q=80&w=600' },
    { id: 6, nama: 'Aula Serbaguna', deskripsi: 'Ruang serbaguna berkapasitas besar untuk kegiatan seminar, wisuda, dan acara khusus.', img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600' },
];

export default function Index({ fasilitas = [], lembagas = [], settings = {} }) {
    const data = fasilitas.length > 0 ? fasilitas : fallbackFasilitas;
    const [activeLembaga, setActiveLembaga] = useState('all');
    const [activeFacility, setActiveFacility] = useState(null);

    // Filter data berdasarkan lembaga yang aktif
    const filteredData = activeLembaga === 'all' 
        ? data 
        : data.filter(f => f.lembaga_id === parseInt(activeLembaga));

    return (
        <PublicLayout title="Fasilitas" navTheme="dark">
            {/* Hero */}
            <div className="relative min-h-[50vh] flex items-center pt-36 pb-28 overflow-hidden bg-brand-primary">
                {/* Background Layer with Overlay grid */}
                <div className="absolute inset-0 z-0">
                    <img 
                        src={settings.news_hero_bg || 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1600'} 
                        alt="Hero BG" 
                        className="w-full h-full object-cover opacity-55 scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/60 via-brand-primary/40 to-brand-primary/80"></div>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/az-subtle.png')] opacity-10"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 mb-6">
                            <span className="h-[2px] w-8 bg-brand-secondary"></span>
                            <span className="text-brand-secondary text-[10px] font-black uppercase tracking-[0.4em]">
                                Infrastruktur Modern
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-serif font-semibold text-white tracking-tight uppercase leading-[1.1] mb-8">
                            Fasilitas Yayasan
                        </h1>
                        <p className="text-sm md:text-base text-white/70 leading-relaxed font-light">
                            Fasilitas lengkap dan modern untuk mendukung perkembangan intelektual, spiritual, dan jasmani santri Yayasan Pendidikan dan Dakwah Sosial Al-Hikmah Jember.
                        </p>
                    </div>
                </div>
            </div>



            {/* Grid */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                
                {/* Filter Tabs */}
                <div className="flex flex-wrap justify-center gap-2 mb-12">
                    <button
                        onClick={() => setActiveLembaga('all')}
                        className={`px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                            activeLembaga === 'all'
                            ? 'bg-brand-primary text-white shadow-lg'
                            : 'bg-white text-slate-500 border border-slate-200 hover:border-brand-primary hover:text-brand-primary'
                        }`}
                    >
                        Semua Fasilitas
                    </button>
                    {lembagas.map(lembaga => (
                        <button
                            key={lembaga.id}
                            onClick={() => setActiveLembaga(lembaga.id.toString())}
                            className={`px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                                activeLembaga === lembaga.id.toString()
                                ? 'bg-brand-primary text-white shadow-lg'
                                : 'bg-white text-slate-500 border border-slate-200 hover:border-brand-primary hover:text-brand-primary'
                            }`}
                        >
                            {lembaga.nama}
                        </button>
                    ))}
                </div>

                {filteredData.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 md:gap-8">
                        {filteredData.map((f, i) => {
                            const totalPhotos = 1 + (f.galeris?.length || 0);

                            return (
                                <div 
                                    key={f.id || i} 
                                    onClick={() => setActiveFacility(f)}
                                    className="group bg-white border border-slate-200 rounded-[0.25rem] overflow-hidden hover:shadow-2xl hover:shadow-brand-primary/5 transition-all duration-500 cursor-pointer flex flex-col justify-between relative"
                                >
                                    <div className="aspect-[4/3] overflow-hidden relative bg-slate-100">
                                        <img 
                                            src={f.img || f.image_url || `https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600&sig=${i}`} 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                                            alt={f.nama} 
                                            onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600"; }}
                                        />
                                        
                                        {/* Category Badge */}
                                        <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-10">
                                            <span className="bg-brand-primary/95 backdrop-blur-sm text-white text-[7px] sm:text-[8px] font-bold uppercase tracking-widest px-1.5 py-0.5 sm:px-3 sm:py-1.5 shadow-lg rounded-[0.125rem]">
                                                {f.kategori || 'Sarana'}
                                            </span>
                                        </div>

                                        {/* Unit Badge (uses short slug on mobile to avoid overlapping) */}
                                        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10">
                                            <span className="bg-brand-accent/95 backdrop-blur-sm text-white text-[7px] sm:text-[8px] font-bold uppercase tracking-widest px-1.5 py-0.5 sm:px-3 sm:py-1.5 shadow-lg rounded-[0.125rem] max-w-[80px] sm:max-w-none truncate block">
                                                {f.lembaga?.nama ? (f.lembaga.slug.toUpperCase()) : 'Pusat'}
                                            </span>
                                        </div>

                                        {/* Photos Count Badge */}
                                        <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 bg-slate-900/85 backdrop-blur-sm px-1.5 py-0.5 sm:px-2.5 sm:py-1.5 rounded-[0.125rem] sm:rounded-[0.25rem] flex items-center gap-1 sm:gap-1.5 text-white shadow-lg z-10">
                                            <PhotoIcon className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 text-brand-primary shrink-0" />
                                            <span className="text-[6px] sm:text-[9px] font-bold font-mono">{totalPhotos} Foto</span>
                                        </div>
                                    </div>

                                    <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between">
                                        <div>
                                            <h4 className="text-xs sm:text-base font-bold text-slate-900 uppercase tracking-tight mb-1 sm:mb-2 group-hover:text-brand-primary transition-colors line-clamp-1">{f.nama}</h4>
                                            <p className="text-slate-500 text-[10px] sm:text-xs leading-relaxed line-clamp-2 sm:line-clamp-3 italic">
                                                "{f.deskripsi}"
                                            </p>
                                        </div>

                                        <div className="mt-3 pt-3 sm:mt-4 sm:pt-4 border-t border-slate-100 flex items-center justify-between">
                                            <span className="text-[7px] sm:text-[8px] font-black text-brand-primary uppercase tracking-widest group-hover:translate-x-1 transition-transform flex items-center gap-0.5 sm:gap-1">
                                                Lihat Detail <ChevronRightIcon className="h-1.5 w-1.5 sm:h-2 sm:w-2" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-slate-50 border border-dashed border-slate-200 rounded-[0.25rem]">
                        <p className="text-slate-400 font-semibold uppercase tracking-widest text-sm">Belum ada fasilitas di unit ini.</p>
                    </div>
                )}
            </div>

            {/* LIGHTBOX SLIDER MODAL */}
            <ImageGalleryModal 
                isOpen={!!activeFacility}
                onClose={() => setActiveFacility(null)}
                title={activeFacility?.nama}
                category={activeFacility?.kategori}
                description={activeFacility?.deskripsi}
                mainImage={activeFacility?.image_url || activeFacility?.img}
                images={activeFacility?.galeris || []}
            />
        </PublicLayout>
    );
}


