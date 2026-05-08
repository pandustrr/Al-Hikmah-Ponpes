import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';

const fasilitasIcons = {
    'laboratorium': (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15M14.25 3.104c.251.023.501.05.75.082M19.8 15a2.25 2.25 0 01.45 2.25L19.5 21h-15l-.75-3.75A2.25 2.25 0 015 15m14.8 0H5" /></svg>
    ),
    'asrama': (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>
    ),
    'masjid': (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3a9 9 0 100 18A9 9 0 0012 3z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v18M3 12h18" /></svg>
    ),
    'default': (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>
    ),
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


