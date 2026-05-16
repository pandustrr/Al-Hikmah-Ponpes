import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { 
    AcademicCapIcon, 
    StarIcon, 
    UserGroupIcon, 
    CheckBadgeIcon,
    ArrowRightIcon,
    SparklesIcon,
    BuildingLibraryIcon,
    PresentationChartLineIcon,
    ChevronRightIcon
} from '@heroicons/react/24/outline';
import { Link } from '@inertiajs/react';

export default function Show({ lembaga, prestasi = [], kegiatan = [] }) {
    // Stats with balanced sizing
    const stats = [
        { label: 'Siswa Aktif', value: '450+', icon: UserGroupIcon },
        { label: 'Tenaga Pengajar', value: '35+', icon: AcademicCapIcon },
        { label: 'Fasilitas Unggulan', value: '12+', icon: BuildingLibraryIcon },
        { label: 'Akreditasi', value: 'A', icon: CheckBadgeIcon },
    ];

    return (
        <PublicLayout title={lembaga.nama} navTheme="dark" isLembaga={true}>
            {/* --- REFINED HERO SECTION --- */}
            <section className="relative h-[70vh] min-h-[500px] flex items-center overflow-hidden bg-brand-primary">
                {/* Background Layer */}
                <div className="absolute inset-0">
                    <img 
                        src={lembaga.image_url || 'https://images.unsplash.com/photo-1523050335392-93851179ae22?w=1920'} 
                        className="w-full h-full object-cover opacity-30 scale-105" 
                        alt={lembaga.nama} 
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/60 via-transparent to-brand-primary"></div>
                </div>

                <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                    <div className="max-w-4xl">
                        <div className="flex items-center gap-3 mb-6 animate-fade-in-up">
                            <span className="h-[1px] w-8 bg-brand-secondary"></span>
                            <span className="text-brand-secondary text-[10px] font-bold uppercase tracking-[0.4em]">Unit Pendidikan Formal</span>
                        </div>
                        
                        <h1 className="text-4xl md:text-6xl font-serif font-semibold text-white tracking-tight leading-[1.1] mb-8 uppercase animate-fade-in-up delay-100">
                            {lembaga.nama}
                        </h1>
                        
                        <p className="text-white/70 text-sm md:text-base max-w-2xl leading-relaxed mb-10 animate-fade-in-up delay-200">
                            {lembaga.summary || 'Mencetak generasi rabbani yang unggul dalam ilmu pengetahuan dan berakhlak mulia sesuai manhaj salafush shalih.'}
                        </p>
                        
                        <div className="flex flex-col sm:flex-row items-center gap-5 animate-fade-in-up delay-300">
                            <Link 
                                href="/info-ppdb"
                                className="bg-brand-secondary text-brand-primary text-[10px] font-bold uppercase tracking-widest px-8 py-4 rounded-[0.25rem] hover:bg-white transition-all flex items-center gap-3 shadow-2xl"
                            >
                                Daftar Sekarang <ArrowRightIcon className="h-4 w-4" />
                            </Link>
                            <a 
                                href="#profil"
                                className="text-white/60 text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2 group"
                            >
                                Pelajari Profil <ChevronRightIcon className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- COMPACT STATS (MATCHING MAIN PAGE) --- */}
            <div className="relative z-20 -mt-10 max-w-7xl mx-auto px-6 md:px-12">
                <div className="grid grid-cols-2 lg:grid-cols-4 bg-white shadow-2xl rounded-[0.25rem] border border-slate-100 divide-x divide-slate-50">
                    {stats.map((stat, i) => (
                        <div key={i} className="p-6 md:p-8 flex items-center gap-4 group">
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-brand-primary/5 rounded-full flex items-center justify-center shrink-0 group-hover:bg-brand-primary/10 transition-colors">
                                <stat.icon className="h-5 w-5 md:h-6 md:w-6 text-brand-primary" />
                            </div>
                            <div>
                                <div className="text-xl md:text-2xl font-bold text-slate-900 tracking-tighter leading-none mb-1">{stat.value}</div>
                                <div className="text-[8px] md:text-[9px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- REFINED ABOUT SECTION --- */}
            <section id="profil" className="py-20 md:py-28 bg-[#FBFBF9]">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
                        <div className="lg:col-span-5 relative">
                            <div className="relative z-10 aspect-[4/5] rounded-[0.25rem] overflow-hidden shadow-2xl border-[12px] border-white">
                                <img 
                                    src={lembaga.image_url || 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?w=800'} 
                                    className="w-full h-full object-cover" 
                                    alt="About" 
                                />
                            </div>
                            {/* Icon Overlay */}
                            {lembaga.ikon_url && (
                                <div className="absolute -bottom-6 -right-6 w-24 h-24 md:w-32 md:h-32 bg-white p-4 shadow-xl border border-slate-100 z-20">
                                    <img src={lembaga.ikon_url} className="w-full h-full object-contain" alt="Icon" />
                                </div>
                            )}
                        </div>

                        <div className="lg:col-span-7">
                            <div className="inline-flex items-center gap-2 mb-6">
                                <span className="h-[2px] w-8 bg-brand-primary"></span>
                                <span className="text-brand-primary text-[10px] font-bold uppercase tracking-[0.3em]">Membangun Generasi</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-slate-900 tracking-tight leading-tight mb-8">
                                Filosofi Pendidikan di <br />
                                <span className="text-brand-primary">{lembaga.nama}</span>
                            </h2>
                            <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-10 italic border-l-2 border-brand-primary/20 pl-6">
                                {lembaga.deskripsi}
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-6 bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                    <SparklesIcon className="h-5 w-5 text-brand-primary mb-4" />
                                    <h4 className="font-bold text-slate-900 uppercase tracking-widest text-[10px] mb-2">Visi Pendidikan</h4>
                                    <p className="text-[11px] text-slate-500 leading-relaxed">{lembaga.visi}</p>
                                </div>
                                <div className="p-6 bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                    <StarIcon className="h-5 w-5 text-brand-primary mb-4" />
                                    <h4 className="font-bold text-slate-900 uppercase tracking-widest text-[10px] mb-2">Misi Utama</h4>
                                    <p className="text-[11px] text-slate-500 leading-relaxed whitespace-pre-line">{lembaga.misi}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- PROGRAM & ADVANTAGES (MATCHING DENSITY) --- */}
            <section className="py-20 md:py-28 bg-brand-primary text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-white/[0.02] -skew-x-12 translate-x-1/4"></div>
                <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        <div>
                            <h2 className="text-brand-secondary text-[10px] font-bold uppercase tracking-[0.4em] mb-4">Program & Keunggulan</h2>
                            <h3 className="text-3xl md:text-5xl font-serif font-semibold tracking-tight mb-10">Pendidikan Berbasis <br /> <span className="text-brand-secondary">Adab & Kompetensi</span></h3>
                            
                            <div className="bg-white/5 border border-white/10 p-8 md:p-10 backdrop-blur-sm rounded-[0.25rem]">
                                <div className="flex items-start gap-4 mb-6">
                                    <PresentationChartLineIcon className="h-6 w-6 text-brand-secondary shrink-0" />
                                    <div>
                                        <h4 className="text-sm font-bold uppercase tracking-widest mb-3">Struktur Pendidikan</h4>
                                        <p className="text-xs text-white/60 leading-relaxed whitespace-pre-line">
                                            {lembaga.struktur_pendidikan || 'Kurikulum yang kami terapkan mengintegrasikan nilai-nilai kepesantrenan dengan standar pendidikan nasional.'}
                                        </p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    {['Kurikulum Merdeka', 'Tahfidzul Qur\'an', 'Adab & Akhlak', 'Bilingual Program'].map((item, i) => (
                                        <div key={i} className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-white/40">
                                            <CheckBadgeIcon className="h-3 w-3 text-brand-secondary" /> {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {(lembaga.keunggulan ? lembaga.keunggulan.split('\n') : ['Fasilitas Modern', 'Pengajar Ahli', 'Lingkungan Aman', 'Beasiswa Prestasi']).map((adv, i) => (
                                <div key={i} className="group p-6 bg-white/5 border border-white/5 hover:border-brand-secondary/30 transition-all">
                                    <div className="text-brand-secondary text-lg font-bold mb-3 opacity-20 group-hover:opacity-100 transition-opacity">0{i+1}</div>
                                    <h5 className="font-bold uppercase tracking-widest text-[9px] text-white mb-2">{adv}</h5>
                                    <p className="text-[9px] text-white/40 leading-relaxed uppercase tracking-wider">Layanan pendidikan terbaik untuk masa depan santri.</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* --- COMPACT NEWS (MATCHING LANDING) --- */}
            <section className="py-20 md:py-28 bg-white">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="flex items-end justify-between mb-12">
                        <div>
                            <h2 className="text-[10px] font-bold text-brand-primary uppercase tracking-[0.4em] mb-4">Galeri Unit</h2>
                            <h3 className="text-3xl md:text-4xl font-serif font-semibold text-slate-900 tracking-tight">Prestasi & <span className="text-brand-primary">Kegiatan</span></h3>
                        </div>
                        <Link href="/berita" className="text-[9px] font-bold text-slate-400 hover:text-brand-primary uppercase tracking-widest flex items-center gap-2">
                            Selengkapnya <ArrowRightIcon className="h-3 w-3" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {prestasi.slice(0, 3).map((p, i) => (
                            <div key={i} className="group flex flex-col h-full border border-slate-100 p-4 hover:shadow-xl transition-all">
                                <div className="aspect-video overflow-hidden mb-6 relative grayscale group-hover:grayscale-0 transition-all duration-700">
                                    <img 
                                        src={`https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600&sig=${p.id}`} 
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                                        alt={p.judul} 
                                    />
                                    <div className="absolute top-3 left-3 bg-brand-primary text-white text-[7px] font-bold uppercase tracking-widest px-2 py-1 shadow-lg">
                                        Update Unit
                                    </div>
                                </div>
                                <div className="flex-grow">
                                    <div className="text-[8px] font-bold text-brand-secondary uppercase tracking-[0.2em] mb-2">
                                        {new Date(p.tanggal).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })}
                                    </div>
                                    <h4 className="text-base font-bold text-slate-900 uppercase tracking-tight leading-tight line-clamp-2 group-hover:text-brand-primary transition-colors">
                                        {p.judul}
                                    </h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- COMPACT CTA --- */}
            <section className="py-16 max-w-7xl mx-auto px-6 md:px-12">
                <div className="bg-brand-primary rounded-[0.25rem] p-10 md:p-16 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/az-subtle.png')] opacity-10"></div>
                    <div className="relative z-10 max-w-xl mx-auto">
                        <h3 className="text-white text-2xl md:text-3xl font-serif font-semibold tracking-tight mb-4">Mulai Perjalanan Pendidikan di <span className="text-brand-secondary">{lembaga.nama}</span></h3>
                        <p className="text-white/60 text-xs md:text-sm mb-8 leading-relaxed">
                            Pendaftaran gelombang saat ini masih dibuka. Pastikan putra-putri Anda mendapatkan lingkungan belajar yang sesuai dengan tuntunan.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link 
                                href="/info-ppdb"
                                className="w-full sm:w-auto bg-brand-secondary text-brand-primary text-[9px] font-bold uppercase tracking-widest px-8 py-4 rounded-[0.2rem] hover:bg-white transition-all shadow-xl"
                            >
                                Daftar PPDB Online
                            </Link>
                            <Link 
                                href="/kontak"
                                className="w-full sm:w-auto text-white/60 text-[9px] font-bold uppercase tracking-widest hover:text-white transition-colors"
                            >
                                Tanya Admin
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(15px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.8s ease-out forwards;
                }
                .delay-100 { animation-delay: 0.1s; }
                .delay-200 { animation-delay: 0.2s; }
                .delay-300 { animation-delay: 0.3s; }
            `}} />
        </PublicLayout>
    );
}
