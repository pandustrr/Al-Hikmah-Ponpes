import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { 
    BeakerIcon, 
    HomeIcon, 
    BuildingLibraryIcon, 
    Square2StackIcon 
} from '@heroicons/react/24/outline';

const fasilitasIcons = {
    'laboratorium': <BeakerIcon className="w-8 h-8" />,
    'asrama': <HomeIcon className="w-8 h-8" />,
    'masjid': <BuildingLibraryIcon className="w-8 h-8" />,
    'default': <Square2StackIcon className="w-8 h-8" />,
};

const fallbackFasilitas = [
    { id: 1, nama: 'Asrama Putra & Putri', deskripsi: 'Asrama nyaman terpisah dengan fasilitas lengkap dan pengawasan 24 jam.', img: 'https://images.unsplash.com/photo-1555854817-40e09807a11d?auto=format&fit=crop&q=80&w=600' },
    { id: 2, nama: 'Laboratorium IT', deskripsi: 'Lab komputer modern dengan koneksi internet cepat untuk mendukung pembelajaran digital.', img: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=600' },
    { id: 3, nama: 'Perpustakaan Digital', deskripsi: 'Koleksi ribuan buku fisik dan akses e-book untuk menunjang literasi siswa.', img: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=600' },
    { id: 4, nama: 'Lapangan Olahraga', deskripsi: 'Fasilitas olahraga lengkap mulai dari lapangan basket, voli, hingga futsal.', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=600' },
    { id: 5, nama: 'Masjid Utama', deskripsi: 'Masjid utama yang menjadi pusat kegiatan ibadah dan keagamaan seluruh siswa.', img: 'https://images.unsplash.com/photo-1591620729680-4e1e16f7d55a?auto=format&fit=crop&q=80&w=600' },
    { id: 6, nama: 'Aula Serbaguna', deskripsi: 'Ruang serbaguna berkapasitas besar untuk kegiatan seminar, wisuda, dan acara khusus.', img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600' },
];

export default function Index({ fasilitas = [] }) {
    const data = fasilitas.length > 0 ? fasilitas : fallbackFasilitas;

    return (
        <PublicLayout title="Fasilitas">
            {/* Hero */}
            <div className="bg-brand-secondary border-b border-sage-light">
                <div className="max-w-7xl mx-auto px-4 py-16 text-center">
                    <h2 className="text-xs font-bold text-brand-accent uppercase tracking-[0.3em] mb-3">Infrastruktur Modern</h2>
                    <h1 className="text-4xl md:text-5xl font-black text-brand-primary tracking-tighter mb-4 uppercase">Fasilitas Yayasan</h1>
                    <div className="h-1 w-16 bg-brand-primary mx-auto mb-4"></div>
                    <p className="text-brand-accent max-w-xl mx-auto">Fasilitas lengkap dan modern untuk mendukung perkembangan intelektual, spiritual, dan jasmani siswa.</p>
                </div>
            </div>

            {/* Stats Bar */}
            <div className="bg-brand-primary py-8">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        {[
                            { value: '6+', label: 'Jenis Fasilitas' },
                            { value: '2', label: 'Gedung Asrama' },
                            { value: '1', label: 'Masjid Utama' },
                            { value: '100%', label: 'Berasrama' },
                        ].map((s, i) => (
                            <div key={i}>
                                <div className="text-2xl font-black text-brand-secondary">{s.value}</div>
                                <div className="text-[10px] font-bold text-white/50 uppercase tracking-widest mt-1">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data.map((f, i) => (
                        <div key={f.id || i} className="group card-clean bg-white overflow-hidden">
                            <div className="aspect-video overflow-hidden bg-brand-secondary">
                                <img
                                    src={f.img || f.image_url || `https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600&sig=${i}`}
                                    alt={f.nama}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600"; }}
                                />
                            </div>
                            <div className="p-7">
                                <div className="text-brand-primary mb-4">
                                    {fasilitasIcons['default']}
                                </div>
                                <h3 className="text-lg font-black text-brand-primary uppercase tracking-tight mb-3">{f.nama}</h3>
                                <p className="text-brand-accent text-sm leading-relaxed">{f.deskripsi}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </PublicLayout>
    );
}


