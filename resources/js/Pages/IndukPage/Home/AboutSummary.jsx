import React from 'react';
import { Link } from '@inertiajs/react';
import { ArrowLongRightIcon } from '@heroicons/react/24/outline';

export default function AboutSummary({ lembagas = [], settings = {} }) {
    const announcements = [
        { title: 'Pengumuman Ujian Akhir Semester MTS 2026', date: '06/05/2026' },
        { title: 'Jadwal Libur Idul Adha Seluruh Lembaga', date: '05/05/2026' },
        { title: 'Pembukaan Pendaftaran Ekskul Baru Tahun Ajaran 2026', date: '04/05/2026' },
    ];

    const articles = [
        { title: 'Adab Sebelum Ilmu: Mengapa Karakter Adalah Fondasi Pendidikan?', date: '06/05/2026' },
        { title: 'Menjaga Hafalan Al-Qur\'an di Era Digital', date: '05/05/2026' },
        { title: 'Teknologi dalam Pendidikan Islam Modern', date: '04/05/2026' },
    ];

    return (
        <section className="pt-16 pb-24 bg-brand-light relative z-20">
            <div className="max-w-[95%] mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
                    {/* Left & Middle: Combined Content (9 cols) */}
                    <div className="lg:col-span-9 space-y-24">

                        {/* 1. About Summary Sub-Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-9 gap-8 lg:gap-12 items-start">
                            <div className="lg:col-span-4 relative">
                                <div className="aspect-[3/4] bg-brand-secondary rounded-[0.25rem] overflow-hidden shadow-xl max-w-xs mx-auto lg:max-w-none">
                                    <img
                                        src="https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&q=80&w=600"
                                        alt="YPDS Al-Hikmah"
                                        className="w-full h-full object-cover"
                                        onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600"; }}
                                    />
                                </div>
                            </div>
                            <div className="lg:col-span-5 space-y-6">
                                <div>
                                    <h2 className="text-[10px] font-semibold text-brand-accent uppercase tracking-[0.3em] mb-2">{settings.about_title_small || 'Mengenal Lebih Dekat'}</h2>
                                    <h3 className="text-3xl font-semibold text-brand-primary tracking-tighter uppercase leading-none mb-4 whitespace-pre-line">{settings.about_title_large || 'YPDS \n Al-Hikmah'}</h3>
                                    <div className="h-0.5 w-14 bg-brand-primary"></div>
                                </div>
                                <p className="text-brand-accent leading-relaxed italic border-l-4 border-brand-primary pl-4 text-sm">
                                    "{settings.about_description_short || 'YPDS Al-Hikmah adalah lembaga pendidikan Islam yang berdedikasi untuk mencetak generasi cerdas secara intelektual dan kokoh secara spiritual.'}"
                                </p>
                                <p className="text-brand-primary leading-relaxed text-sm">
                                    {settings.about_description || 'Berdiri di jantung Ambulu, Jember, lembaga kami telah menjadi rumah bagi ribuan siswa yang menyeimbangkan kurikulum modern dengan karakter Islami.'}
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="bg-brand-secondary p-5 border border-brand-accent/10 rounded-[0.25rem]">
                                        <h4 className="font-semibold text-brand-primary text-[10px] uppercase tracking-widest mb-1">Metode Pendidikan</h4>
                                        <p className="text-[11px] text-brand-accent leading-relaxed">Holistik — mengintegrasikan sains, teknologi, dan ilmu agama.</p>
                                    </div>
                                    <div className="bg-brand-secondary p-5 border border-brand-accent/10 rounded-[0.25rem]">
                                        <h4 className="font-semibold text-brand-primary text-[10px] uppercase tracking-widest mb-1">Lingkungan Siswa</h4>
                                        <p className="text-[11px] text-brand-accent leading-relaxed">Asrama nyaman dengan pembiasaan adab harian yang terstruktur.</p>
                                    </div>
                                </div>
                                {/* Stats */}
                                <div className="grid grid-cols-4 gap-4 border-t border-brand-accent/20 pt-6">
                                    {[
                                        { value: '30+', label: 'Tahun Berdiri' },
                                        { value: '3', label: 'Jenjang' },
                                        { value: '5000+', label: 'Alumni' },
                                        { value: '100%', label: 'Berasrama' },
                                    ].map((stat, i) => (
                                        <div key={i} className="text-center">
                                            <div className="text-xl font-semibold text-brand-primary">{stat.value}</div>
                                            <div className="text-[9px] font-semibold text-brand-accent uppercase tracking-widest">{stat.label}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex flex-wrap gap-4 pt-2">
                                    <Link href="/info-ppdb" className="btn-primary px-8 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] shadow-lg">Pendaftaran Siswa Baru</Link>
                                    <Link href="/profil" className="border-2 border-brand-primary text-brand-primary px-8 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] hover:bg-brand-primary hover:text-white transition-all rounded-[0.25rem]">Profil Lengkap</Link>
                                </div>
                            </div>
                        </div>

                        {/* 2. Lembaga Education Sub-Section */}
                        <div className="space-y-12">
                            <div className="text-center lg:text-left">
                                <h2 className="text-xs font-semibold text-brand-accent uppercase tracking-[0.3em] mb-3">Program Unggulan</h2>
                                <h3 className="text-3xl font-semibold text-brand-primary tracking-tighter uppercase mb-5">Lembaga Pendidikan</h3>
                                <div className="h-1 w-20 bg-brand-primary lg:mx-0 mx-auto"></div>
                            </div>
                            <div className="grid grid-cols-2 gap-3 md:gap-6">
                                {lembagas.map((lembaga) => (
                                    <Link
                                        key={lembaga.id}
                                        href={`/${lembaga.slug}`}
                                        className="group bg-white p-4 md:p-8 border border-brand-secondary hover:border-brand-primary transition-all duration-500 rounded-[0.25rem] shadow-sm hover:shadow-xl"
                                    >
                                        <div className="text-[8px] md:text-[10px] font-semibold text-brand-accent uppercase tracking-widest mb-2 md:mb-3">Pendidikan Formal</div>
                                        <h4 className="text-sm md:text-2xl font-semibold text-brand-primary mb-3 md:mb-5 group-hover:text-brand-accent transition-colors uppercase leading-tight">{lembaga.nama}</h4>
                                        <p className="hidden md:block text-brand-accent text-sm mb-8 leading-relaxed line-clamp-2">
                                            {lembaga.deskripsi}
                                        </p>
                                        <div className="flex items-center text-brand-primary font-semibold text-[8px] md:text-[10px] uppercase tracking-widest border-t border-brand-secondary pt-3 md:pt-5">
                                            <span className="hidden md:inline">Lihat Profil Lembaga</span>
                                            <span className="md:hidden">Profil</span>
                                            <ArrowLongRightIcon className="h-3 w-3 md:h-4 md:w-4 ml-1 md:ml-2 group-hover:translate-x-1 transition-transform stroke-[3px]" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* Right Sidebar: Sticky Content (3 cols) */}
                    <div className="lg:col-span-3 lg:border-l lg:border-brand-accent/20 lg:pl-10">
                        <div className="sticky top-28 space-y-12">
                            {/* Pengumuman */}
                            <div>
                                <div className="border-b-2 border-brand-primary pb-3 mb-6">
                                    <h4 className="text-[10px] font-semibold text-brand-primary uppercase tracking-[0.2em] flex items-center justify-between">
                                        Pengumuman
                                        <span className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-pulse"></span>
                                    </h4>
                                </div>
                                <div className="space-y-6">
                                    {announcements.map((item, i) => (
                                        <Link key={i} href="/berita?kategori=pengumuman" className="block group border-b border-brand-secondary pb-4 last:border-0 hover:pl-2 transition-all duration-300">
                                            <div className="text-[8px] font-semibold text-brand-accent uppercase tracking-widest mb-1 opacity-70">Berita · {item.date}</div>
                                            <p className="text-[11px] font-semibold text-brand-primary group-hover:text-brand-accent transition-colors leading-snug line-clamp-2">{item.title}</p>
                                        </Link>
                                    ))}
                                    <div className="pt-2">
                                        <Link href="/berita?kategori=pengumuman" className="text-[10px] font-semibold text-brand-accent hover:text-brand-primary uppercase tracking-[0.2em] transition-all flex flex-col group/link">
                                            <span>Lihat Semua</span>
                                            <span className="mt-1 group-hover/link:translate-x-2 transition-transform duration-300">→</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Artikel */}
                            <div className="pt-4">
                                <div className="border-b-2 border-brand-primary pb-3 mb-6">
                                    <h4 className="text-[10px] font-semibold text-brand-primary uppercase tracking-[0.2em] flex items-center justify-between">
                                        Artikel
                                        <span className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-pulse"></span>
                                    </h4>
                                </div>
                                <div className="space-y-6">
                                    {articles.map((item, i) => (
                                        <Link key={i} href="/berita?kategori=artikel" className="block group border-b border-brand-secondary pb-4 last:border-0 hover:pl-2 transition-all duration-300">
                                            <div className="text-[8px] font-semibold text-brand-accent uppercase tracking-widest mb-1 opacity-70">Artikel · {item.date}</div>
                                            <p className="text-[11px] font-semibold text-brand-primary group-hover:text-brand-accent transition-colors leading-snug line-clamp-2">{item.title}</p>
                                        </Link>
                                    ))}
                                    <div className="pt-2">
                                        <Link href="/berita?kategori=artikel" className="text-[10px] font-semibold text-brand-accent hover:text-brand-primary uppercase tracking-[0.2em] transition-all flex flex-col group/link">
                                            <span>Lihat Semua</span>
                                            <span className="mt-1 group-hover/link:translate-x-2 transition-transform duration-300">→</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
