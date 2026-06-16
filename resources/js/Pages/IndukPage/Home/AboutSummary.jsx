import React from 'react';
import { Link } from '@inertiajs/react';
import { ArrowLongRightIcon } from '@heroicons/react/24/outline';

export default function AboutSummary({ lembagas = [], settings = {}, announcements = [], announcementTitle = 'Pengumuman', announcementSlug = 'pengumuman', articles = [], articleTitle = 'Artikel & Wawasan', articleSlug = 'artikel' }) {
    // Gambar profil: dari admin setting 'about_image', fallback ke Unsplash
    const aboutImage = settings.about_image || 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&q=80&w=600';

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
                                        src={aboutImage}
                                        alt="YPDS Al-Hikmah"
                                        className="w-full h-full object-cover"
                                        onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600"; }}
                                    />
                                </div>
                            </div>
                            <div className="lg:col-span-5 space-y-6">
                                <div>
                                    <h2 className="text-xs font-bold text-brand-accent uppercase tracking-[0.25em] mb-2">{settings.about_title_small || 'Mengenal Lebih Dekat'}</h2>
                                    <h3 className="text-3xl font-bold text-brand-primary tracking-tighter uppercase leading-none mb-4 whitespace-pre-line">{settings.about_title_large || 'YPDS \n Al-Hikmah'}</h3>
                                    <div className="h-0.5 w-14 bg-brand-primary"></div>
                                </div>
                                <p className="text-brand-accent leading-relaxed border-l-4 border-brand-primary pl-4 text-sm font-medium">
                                    "{settings.about_description_short || 'YPDS Al-Hikmah adalah lembaga pendidikan Islam yang berdedikasi untuk mencetak generasi cerdas secara intelektual dan kokoh secara spiritual.'}"
                                </p>
                                <p className="text-brand-primary leading-relaxed text-sm font-medium">
                                    {settings.about_description || 'Berdiri di jantung Ambulu, Jember, lembaga kami telah menjadi rumah bagi ribuan siswa yang menyeimbangkan kurikulum modern dengan karakter Islami.'}
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {(Array.isArray(settings.about_features) ? settings.about_features : [
                                        { title: 'Metode Pendidikan', desc: settings.about_method_desc || 'Holistik — mengintegrasikan sains, teknologi, dan ilmu agama.' },
                                        { title: 'Lingkungan Siswa', desc: settings.about_env_desc || 'Asrama nyaman dengan pembiasaan adab harian yang terstruktur.' }
                                    ]).map((feature, i) => (
                                        <div key={i} className="bg-brand-secondary p-5 border border-brand-accent/10 rounded-[0.25rem]">
                                            <h4 className="font-bold text-brand-primary text-xs uppercase tracking-widest mb-1">{feature.title}</h4>
                                            <p className="text-xs text-brand-accent leading-relaxed font-medium">{feature.desc}</p>
                                        </div>
                                    ))}
                                </div>
                                {/* Stats */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-brand-accent/20 pt-6">
                                    {[
                                        { value: settings.about_stat_1_val || '30+', label: settings.about_stat_1_lbl || 'Tahun Berdiri' },
                                        { value: settings.about_stat_2_val || '3', label: settings.about_stat_2_lbl || 'Jenjang' },
                                        { value: settings.about_stat_3_val || '5000+', label: settings.about_stat_3_lbl || 'Alumni' },
                                        { value: settings.about_stat_4_val || '100%', label: settings.about_stat_4_lbl || 'Berasrama' },
                                    ].map((stat, i) => (
                                        <div key={i} className="text-center py-2 bg-brand-primary/5 rounded-[0.25rem] md:bg-transparent md:py-0">
                                            <div className="text-xl font-bold text-brand-primary">{stat.value}</div>
                                            <div className="text-[10px] font-bold text-brand-accent uppercase tracking-widest">{stat.label}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex flex-col sm:flex-row gap-4 pt-2 w-full">
                                    <Link href="/info-ppdb" className="btn-primary px-8 py-3 text-xs font-bold uppercase tracking-[0.15em] shadow-lg text-center w-full sm:w-auto">Pendaftaran Siswa Baru</Link>
                                    <Link href="/profil" className="border-2 border-brand-primary text-brand-primary px-8 py-3 text-xs font-bold uppercase tracking-[0.15em] hover:bg-brand-primary hover:text-white transition-all rounded-[0.25rem] text-center w-full sm:w-auto">Profil Lengkap</Link>
                                </div>
                            </div>
                        </div>

                        {/* 2. Lembaga Education Sub-Section */}
                        <div className="space-y-12">
                            <div className="text-center lg:text-left">
                                <h2 className="text-xs font-bold text-brand-accent uppercase tracking-[0.25em] mb-3">{settings.about_lembaga_tagline || 'Program Unggulan'}</h2>
                                <h3 className="text-3xl font-bold text-brand-primary tracking-tighter uppercase mb-5">{settings.about_lembaga_title || 'Lembaga Pendidikan'}</h3>
                                <div className="h-1 w-20 bg-brand-primary lg:mx-0 mx-auto"></div>
                            </div>
                            <div className="grid grid-cols-2 gap-3 md:gap-6">
                                {lembagas.map((lembaga) => (
                                    <Link
                                        key={lembaga.id}
                                        href={`/${lembaga.slug}`}
                                        className="group bg-white p-3 md:p-8 border border-brand-secondary hover:border-brand-primary transition-all duration-500 rounded-[0.25rem] shadow-sm hover:shadow-xl"
                                    >
                                        <div className="text-[10px] md:text-xs font-bold text-brand-accent uppercase tracking-widest mb-1.5 md:mb-3">Pendidikan Formal</div>
                                        <h4 className="text-xs sm:text-base md:text-2xl font-bold text-brand-primary mb-2 md:mb-5 group-hover:text-brand-accent transition-colors uppercase leading-tight line-clamp-2">{lembaga.nama}</h4>
                                        <p className="hidden md:block text-brand-accent text-sm mb-8 leading-relaxed line-clamp-2 font-medium">
                                            {lembaga.deskripsi}
                                        </p>
                                        <div className="flex items-center text-brand-primary font-bold text-[10px] md:text-xs uppercase tracking-widest border-t border-brand-secondary pt-2 md:pt-5">
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
                                    <h4 className="text-xs font-bold text-brand-primary uppercase tracking-[0.15em] flex items-center justify-between">
                                        {announcementTitle}
                                        <span className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-pulse"></span>
                                    </h4>
                                </div>
                                <div className="space-y-6">
                                    {announcements.length === 0 ? (
                                        <p className="text-xs text-slate-400 font-medium">Belum ada berita.</p>
                                    ) : (
                                        announcements.map((item) => (
                                            <Link key={item.id} href={route('berita.show', item.slug)} className="block group border-b border-brand-secondary pb-4 last:border-0 hover:pl-2 transition-all duration-300">
                                                <div className="flex gap-3 items-start">
                                                    {item.image_url && (
                                                        <div className="w-16 h-16 shrink-0 rounded-[0.25rem] overflow-hidden bg-brand-secondary border border-brand-accent/5">
                                                            <img
                                                                src={item.image_url}
                                                                alt={item.judul}
                                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                                onError={(e) => {
                                                                    e.target.onerror = null;
                                                                    e.target.src = "https://images.unsplash.com/photo-1504711432869-5d39a110fdd7?auto=format&fit=crop&q=80&w=400";
                                                                }}
                                                            />
                                                        </div>
                                                    )}
                                                    <div className="flex-1 min-w-0">
                                                        <div className="text-[10px] font-bold text-brand-accent uppercase tracking-widest mb-1 opacity-70">{item.category?.name || 'Berita'} · {item.formatted_date || item.tanggal}</div>
                                                        <p className="text-xs font-bold text-brand-primary group-hover:text-brand-accent transition-colors leading-snug line-clamp-2">{item.judul}</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))
                                    )}
                                    <div className="pt-2">
                                        <Link href={`/berita?kategori=${encodeURIComponent(announcementSlug)}`} className="text-xs font-bold text-brand-accent hover:text-brand-primary uppercase tracking-[0.15em] transition-all flex flex-col group/link">
                                            <span>Lihat Semua</span>
                                            <span className="mt-1 group-hover/link:translate-x-2 transition-transform duration-300">→</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Artikel */}
                            <div className="pt-4">
                                <div className="border-b-2 border-brand-primary pb-3 mb-6">
                                    <h4 className="text-xs font-bold text-brand-primary uppercase tracking-[0.15em] flex items-center justify-between">
                                        {articleTitle}
                                        <span className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-pulse"></span>
                                    </h4>
                                </div>
                                <div className="space-y-6">
                                    {articles.length === 0 ? (
                                        <p className="text-xs text-slate-400 font-medium">Belum ada berita.</p>
                                    ) : (
                                        articles.map((item) => (
                                            <Link key={item.id} href={route('berita.show', item.slug)} className="block group border-b border-brand-secondary pb-4 last:border-0 hover:pl-2 transition-all duration-300">
                                                <div className="flex gap-3 items-start">
                                                    {item.image_url && (
                                                        <div className="w-16 h-16 shrink-0 rounded-[0.25rem] overflow-hidden bg-brand-secondary border border-brand-accent/5">
                                                            <img
                                                                src={item.image_url}
                                                                alt={item.judul}
                                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                                onError={(e) => {
                                                                    e.target.onerror = null;
                                                                    e.target.src = "https://images.unsplash.com/photo-1585829365234-781fcd04c838?auto=format&fit=crop&q=80&w=400";
                                                                }}
                                                            />
                                                        </div>
                                                    )}
                                                    <div className="flex-1 min-w-0">
                                                        <div className="text-[10px] font-bold text-brand-accent uppercase tracking-widest mb-1 opacity-70">{item.category?.name || 'Artikel'} · {item.formatted_date || item.tanggal}</div>
                                                        <p className="text-xs font-bold text-brand-primary group-hover:text-brand-accent transition-colors leading-snug line-clamp-2">{item.judul}</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))
                                    )}
                                    <div className="pt-2">
                                        <Link href={`/berita?kategori=${encodeURIComponent(articleSlug)}`} className="text-xs font-bold text-brand-accent hover:text-brand-primary uppercase tracking-[0.15em] transition-all flex flex-col group/link">
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
