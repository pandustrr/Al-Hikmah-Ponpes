import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { BookOpenIcon, HomeModernIcon } from '@heroicons/react/24/outline';

export default function Profil({ settings = {} }) {
    const defaultTimeline = [
        { year: '1995', title: 'Peletakan Batu Pertama', desc: 'YPDS Al-Hikmah didirikan dengan modal semangat dan tekad untuk memajukan pendidikan di wilayah Jember Selatan. Bangunan pertama berupa madrasah sederhana.' },
        { year: '2005', title: 'Pengembangan Fasilitas', desc: 'Merespon minat masyarakat yang tinggi, dilakukan pembangunan asrama putra dan putri serta gedung laboratorium terpadu untuk mendukung sains.' },
        { year: '2015', title: 'Akreditasi A', desc: 'Seluruh jenjang pendidikan di bawah naungan YPDS Al-Hikmah meraih predikat Akreditasi A, membuktikan komitmen pada kualitas mutu pengajaran.' },
        { year: '2023', title: 'Digitalisasi Pesantren', desc: 'Implementasi sistem administrasi dan pembelajaran berbasis digital secara menyeluruh, bersiap menghadapi tantangan era modern.' },
    ];

    const defaultMisi = [
        'Menyelenggarakan pendidikan berbasis adab dan akhlak mulia sesuai nilai-nilai Islam.',
        'Mengembangkan potensi intelektual siswa melalui kurikulum yang integratif dan komprehensif.',
        'Membekali siswa dengan keterampilan abad 21, kemandirian, dan jiwa kewirausahaan.',
        'Membangun lingkungan yayasan yang modern, bersih, aman, dan asri.',
        'Menjalin kemitraan strategis dengan berbagai lembaga pendidikan tingkat nasional dan internasional.'
    ];

    const timeline = settings.profil_sejarah_timeline && settings.profil_sejarah_timeline.length > 0 ? settings.profil_sejarah_timeline : defaultTimeline;
    const misiList = settings.profil_misi_list && settings.profil_misi_list.length > 0 ? settings.profil_misi_list : defaultMisi;

    return (
        <PublicLayout title="Profil & Tentang Kami" navTheme="dark">
            
            {/* HERO SECTION */}
            <div className="relative min-h-[50vh] flex items-center pt-32 pb-24 overflow-hidden bg-brand-primary">
                {/* Background Layer with Overlay grid */}
                <div className="absolute inset-0 z-0">
                    <img 
                        src={settings.profil_hero_bg || 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1600'} 
                        alt="Hero BG" 
                        className="w-full h-full object-cover opacity-65 scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/45 via-brand-primary/30 to-brand-primary/70"></div>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/az-subtle.png')] opacity-10"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 mb-4 md:mb-6">
                            <span className="h-[2px] w-6 md:w-8 bg-brand-secondary"></span>
                            <span className="text-brand-secondary text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em]">
                                {settings.profil_hero_tagline || 'Mengenal Lebih Dekat'}
                            </span>
                        </div>
                        <h1 className="text-2xl sm:text-4xl md:text-6xl font-serif font-semibold text-white tracking-tight uppercase leading-[1.2] md:leading-[1.1] mb-4 md:mb-8">
                            {settings.profil_hero_title || 'PROFIL YPDS AL-HIKMAH'}
                        </h1>
                        <p className="text-xs sm:text-sm md:text-base text-white/70 leading-relaxed font-light">
                            {settings.profil_hero_desc || 'Membangun Adab dan Ilmu Sejak Dini. YPDS Al-Hikmah adalah lembaga pendidikan Islam terpadu yang berdedikasi untuk mencetak generasi yang cerdas secara intelektual and kokoh secara spiritual di Jember.'}
                        </p>
                    </div>

                    {/* Integrated CTA Buttons & Compact Stats Row */}
                    <div className="mt-8 pt-6 border-t border-white/10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 md:gap-8">
                        {/* Hero Action Buttons */}
                        <div className="flex flex-wrap items-center gap-3 md:gap-4 shrink-0">
                            <a 
                                href="#sejarah" 
                                className="px-4 py-2.5 md:px-6 md:py-3.5 bg-brand-secondary text-brand-primary text-[8px] md:text-[10px] font-black uppercase tracking-widest rounded hover:bg-white hover:scale-102 transition-all shadow-xl"
                            >
                                {settings.profil_hero_btn1 || 'Sejarah Lembaga'}
                            </a>
                            <a 
                                href="#visi-misi" 
                                className="px-4 py-2.5 md:px-6 md:py-3.5 bg-white/10 text-white text-[8px] md:text-[10px] font-black uppercase tracking-widest border border-white/20 rounded hover:bg-white/20 transition-all backdrop-blur-sm"
                            >
                                {settings.profil_hero_btn2 || 'Visi & Misi'}
                            </a>
                        </div>

                        {/* Compact Stats Grid (Shrunk & Aligned on the right side) */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 text-left divide-x-0 sm:divide-x sm:divide-white/10 lg:pl-8">
                            {[
                                { value: settings.profil_stat1_value || '25+', label: settings.profil_stat1_label || 'Tahun Mengabdi' },
                                { value: settings.profil_stat2_value || '4', label: settings.profil_stat2_label || 'Unit Pendidikan' },
                                { value: settings.profil_stat3_value || '1500+', label: settings.profil_stat3_label || 'Santri Aktif' },
                                { value: settings.profil_stat4_value || 'Ribuan', label: settings.profil_stat4_label || 'Alumni Tersebar' },
                            ].map((s, i) => (
                                <div key={i} className={`flex flex-col ${i > 0 ? 'sm:pl-4 lg:pl-6' : ''}`}>
                                    <div className="text-base sm:text-lg md:text-xl font-serif font-black text-brand-secondary leading-none mb-1">{s.value}</div>
                                    <div className="text-[7.5px] sm:text-[8px] md:text-[9px] font-bold text-white/60 uppercase tracking-[0.12em] sm:tracking-[0.15em] leading-tight">{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* PROFIL SECTION */}
            <section id="profil" className="py-12 sm:py-16 md:py-24 bg-[#FBFBF9] scroll-mt-20 border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
                    
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-20 items-center">
                        {/* Left Text */}
                        <div className="lg:col-span-6 space-y-4 sm:space-y-6">
                            <div className="inline-flex p-2.5 sm:p-3 bg-brand-primary/5 rounded-full mb-1">
                                <BookOpenIcon className="h-5 w-5 sm:h-6 sm:w-6 text-brand-primary" />
                            </div>
                            <span className="text-[8px] sm:text-[10px] font-bold text-brand-primary uppercase tracking-[0.25em] sm:tracking-[0.3em] block">
                                {settings.profil_tentang_tagline || 'Tentang Kami'}
                            </span>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold text-slate-900 tracking-tight uppercase leading-[1.2] sm:leading-[1.25]">
                                {settings.profil_tentang_title || 'Harmoni Tradisi & Inovasi Modern'}
                            </h2>
                            <div className="w-12 h-0.5 sm:h-1 bg-brand-primary mt-2 sm:mt-4 rounded-full"></div>
                            
                            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed pt-1">
                                {settings.profil_tentang_desc || 'Berdiri di jantung Ambulu, Jember, lembaga kami telah menjadi rumah bagi ribuan siswa untuk menimba ilmu. Kami percaya bahwa pendidikan terbaik adalah yang menyeimbangkan antara kurikulum modern dan nilai-nilai luhur Islami.'}
                            </p>
                            
                            <div className="pt-2 sm:pt-4 space-y-3 sm:space-y-4">
                                <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-white border border-slate-200/60 rounded-[0.25rem] shadow-sm">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-brand-primary/10 rounded-full flex items-center justify-center shrink-0">
                                        <BookOpenIcon className="w-4 h-4 sm:w-5 sm:h-5 text-brand-primary" />
                                    </div>
                                    <div>
                                        <h4 className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-tight">Metode Pendidikan</h4>
                                        <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5 sm:mt-1 leading-relaxed">Pendekatan holistik yang mengintegrasikan sains, teknologi, dan ilmu agama dalam lingkungan yang kondusif.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-white border border-slate-200/60 rounded-[0.25rem] shadow-sm">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-brand-primary/10 rounded-full flex items-center justify-center shrink-0">
                                        <HomeModernIcon className="w-4 h-4 sm:w-5 sm:h-5 text-brand-primary" />
                                    </div>
                                    <div>
                                        <h4 className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-tight">Lingkungan Santri</h4>
                                        <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5 sm:mt-1 leading-relaxed">Fasilitas asrama yang nyaman dan pembiasaan adab harian ketat untuk membentuk karakter santri yang tangguh.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Image */}
                        <div className="lg:col-span-6 relative mt-4 lg:mt-0">
                            {/* Decorative Elements (Scaled down on mobile to prevent layout shift) */}
                            <div className="absolute -top-2 -left-2 sm:-top-4 sm:-left-4 w-16 h-16 sm:w-24 sm:h-24 bg-brand-secondary/40 rounded-[0.25rem] -z-10"></div>
                            <div className="absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 w-20 h-20 sm:w-32 sm:h-32 bg-brand-primary/10 rounded-[0.25rem] -z-10"></div>
                            
                            {/* Main Image Container */}
                            <div className="relative aspect-[4/5] sm:aspect-[4/3] md:aspect-[3/4] overflow-hidden bg-slate-900 rounded-[0.25rem] shadow-xl border border-slate-200/60">
                                <img 
                                    src={settings.profil_image || 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=1000'} 
                                    alt="Profil" 
                                    className="w-full h-full object-cover opacity-90"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                                
                                {/* Info Box (Mobile Safe spacing and paddings) */}
                                <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 bg-white/95 backdrop-blur border border-white/20 p-3 sm:p-4 rounded-[0.25rem] flex items-center gap-3 sm:gap-4 shadow-lg">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-brand-primary text-white flex flex-col items-center justify-center rounded-[0.25rem] shrink-0">
                                        <span className="text-sm sm:text-lg font-black leading-none">
                                            {settings.profil_tentang_years || '25+'}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-[8px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Pengalaman Kami</span>
                                        <span className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-tight mt-0.5 block">Tahun Mengabdi</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* VISI & MISI SECTION */}
            <section id="visi-misi" className="py-12 sm:py-16 md:py-24 bg-white scroll-mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
                    <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16 md:mb-20">
                        <span className="text-[8px] sm:text-[10px] font-bold text-brand-primary uppercase tracking-[0.25em] sm:tracking-[0.3em] mb-2 sm:mb-3 block">
                            {settings.profil_visi_tagline || 'Arah & Tujuan'}
                        </span>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold text-slate-900 tracking-tight uppercase">
                            {settings.profil_visi_title || 'Visi & Misi Lembaga'}
                        </h2>
                        <div className="w-12 h-0.5 sm:h-1 bg-brand-primary mx-auto mt-4 sm:mt-6 rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
                        {/* Visi Block */}
                        <div className="bg-brand-primary p-6 sm:p-10 md:p-14 rounded-[0.25rem] text-white relative overflow-hidden shadow-xl min-h-[220px] sm:min-h-0 flex flex-col justify-center">
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/az-subtle.png')] opacity-10"></div>
                            <div className="relative z-10 h-full flex flex-col justify-center">
                                <h3 className="text-[8px] sm:text-[10px] font-black text-brand-secondary uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-4 sm:mb-6">Visi Utama</h3>
                                <p className="text-lg sm:text-2xl md:text-3xl font-serif font-semibold leading-relaxed italic">
                                    "{settings.profil_visi_text || 'Menjadi lembaga pendidikan Islam terkemuka yang melahirkan generasi beradab, berilmu, dan bermanfaat bagi semesta alam.'}"
                                </p>
                            </div>
                            <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 text-[80px] sm:text-[180px] font-serif font-black text-white/5 leading-none select-none">"</div>
                        </div>

                        {/* Misi List */}
                        <div className="flex flex-col justify-center mt-4 lg:mt-0">
                            <h3 className="text-base sm:text-lg font-bold text-slate-900 uppercase tracking-tight mb-4 sm:mb-8 border-b-2 border-brand-primary w-fit pb-1.5 sm:pb-2">Misi Kami</h3>
                            <ul className="space-y-4 sm:space-y-6">
                                {misiList.map((misi, i) => (
                                    <li key={i} className="flex items-start gap-3 sm:gap-4 group">
                                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-slate-100 border border-slate-200 text-brand-primary flex items-center justify-center font-bold text-[10px] sm:text-xs shrink-0 group-hover:bg-brand-primary group-hover:text-white transition-colors">
                                            {i + 1}
                                        </div>
                                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium pt-0.5 sm:pt-1">
                                            {misi}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* SEJARAH SECTION */}
            <section id="sejarah" className="py-12 sm:py-16 md:py-24 bg-[#FBFBF9] border-t border-slate-100 scroll-mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
                    
                    <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16 md:mb-20">
                        <span className="text-[8px] sm:text-[10px] font-bold text-brand-primary uppercase tracking-[0.25em] sm:tracking-[0.3em] mb-2 sm:mb-3 block">
                            {settings.profil_sejarah_tagline || 'Sejarah Perjalanan'}
                        </span>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold text-slate-900 tracking-tight uppercase">
                            {settings.profil_sejarah_title || 'Jejak Langkah'}
                        </h2>
                        <p className="text-slate-500 text-[10px] sm:text-xs mt-3 sm:mt-4 leading-relaxed uppercase tracking-wider">
                            {settings.profil_sejarah_desc || 'Membangun Peradaban Sejak 1995'}
                        </p>
                        <div className="w-12 h-0.5 sm:h-1 bg-brand-primary mx-auto mt-4 sm:mt-6 rounded-full"></div>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <div className="relative">
                            {/* Vertical Line */}
                            <div className="absolute left-[15px] sm:left-[19px] md:left-1/2 top-4 bottom-4 w-0.5 bg-slate-200 md:-translate-x-1/2"></div>
                            
                            {timeline.map((item, i) => {
                                const isEven = i % 2 === 0;
                                return (
                                    <div key={i} className={`relative flex items-center mb-8 sm:mb-12 last:mb-0 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                                        
                                        {/* Timeline Dot */}
                                        <div className="absolute left-[15px] sm:left-[19px] md:left-1/2 w-2 h-2 sm:w-3 sm:h-3 bg-brand-primary border-4 border-[#FBFBF9] rounded-full transform -translate-x-1/2 z-10 box-content"></div>
                                        
                                        {/* Empty Side for Desktop */}
                                        <div className="hidden md:block md:w-1/2"></div>
                                        
                                        {/* Content Card */}
                                        <div className={`w-full md:w-1/2 pl-8 sm:pl-12 md:pl-0 ${isEven ? 'md:pr-12' : 'md:pl-12'}`}>
                                            <div className="bg-white border border-slate-200/60 p-4 sm:p-6 rounded-[0.25rem] shadow-sm hover:shadow-md transition-shadow relative group">
                                                {/* Connecting Line Desktop */}
                                                <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-12 h-px bg-slate-200 ${isEven ? '-right-12' : '-left-12'}`}></div>
                                                
                                                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                                                    <span className="text-[8px] sm:text-[10px] font-black text-brand-secondary bg-brand-primary px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-[0.1rem] uppercase tracking-widest">
                                                        {item.year}
                                                    </span>
                                                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-tight">{item.title}</h3>
                                                </div>
                                                <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">
                                                    {item.desc}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                </div>
            </section>

        </PublicLayout>
    );
}
