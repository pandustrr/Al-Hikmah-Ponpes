import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { BookOpenIcon, HomeModernIcon, CheckBadgeIcon } from '@heroicons/react/24/outline';

export default function Profil() {
    const timeline = [
        { year: '1995', title: 'Peletakan Batu Pertama', desc: 'YPDS Al-Hikmah didirikan dengan modal semangat dan tekad untuk memajukan pendidikan di wilayah Jember Selatan. Bangunan pertama berupa madrasah sederhana.' },
        { year: '2005', title: 'Pengembangan Fasilitas', desc: 'Merespon minat masyarakat yang tinggi, dilakukan pembangunan asrama putra dan putri serta gedung laboratorium terpadu untuk mendukung sains.' },
        { year: '2015', title: 'Akreditasi A', desc: 'Seluruh jenjang pendidikan di bawah naungan YPDS Al-Hikmah meraih predikat Akreditasi A, membuktikan komitmen pada kualitas mutu pengajaran.' },
        { year: '2023', title: 'Digitalisasi Pesantren', desc: 'Implementasi sistem administrasi dan pembelajaran berbasis digital secara menyeluruh, bersiap menghadapi tantangan era modern.' },
    ];

    return (
        <PublicLayout title="Profil & Tentang Kami" navTheme="dark">
            
            {/* HERO SECTION - CONSISTENT WITH INFO PPDB */}
            <div className="relative min-h-[50vh] flex items-center pt-32 pb-24 overflow-hidden bg-brand-primary">
                {/* Background Layer with Overlay grid */}
                <div className="absolute inset-0 z-0">
                    <img 
                        src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1600" 
                        alt="Hero BG" 
                        className="w-full h-full object-cover opacity-25 scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/80 via-brand-primary to-brand-primary"></div>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/az-subtle.png')] opacity-10"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full text-center md:text-left">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center justify-center md:justify-start gap-2 mb-6 w-full md:w-auto">
                            <span className="h-[2px] w-8 bg-brand-secondary"></span>
                            <span className="text-brand-secondary text-[10px] font-black uppercase tracking-[0.4em]">
                                Mengenal Lebih Dekat
                            </span>
                            <span className="h-[2px] w-8 bg-brand-secondary md:hidden"></span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-serif font-semibold text-white tracking-tight uppercase leading-[1.1] mb-8">
                            PROFIL YPDS AL-HIKMAH
                        </h1>
                        <p className="text-sm md:text-base text-white/70 leading-relaxed font-light">
                            Membangun Adab dan Ilmu Sejak Dini. YPDS Al-Hikmah adalah lembaga pendidikan Islam terpadu yang berdedikasi untuk mencetak generasi yang cerdas secara intelektual dan kokoh secara spiritual di Jember.
                        </p>
                    </div>
                </div>
            </div>

            {/* PROFIL SECTION - CONSISTENT WITH FASILITAS */}
            <section id="profil" className="py-24 bg-[#FBFBF9] scroll-mt-20 border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
                        {/* Left Text */}
                        <div className="lg:col-span-6 space-y-6">
                            <div className="inline-flex p-3 bg-brand-primary/5 rounded-full mb-2">
                                <BookOpenIcon className="h-6 w-6 text-brand-primary" />
                            </div>
                            <span className="text-[10px] font-bold text-brand-primary uppercase tracking-[0.3em] block">
                                Tentang Kami
                            </span>
                            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-slate-900 tracking-tight uppercase leading-[1.25]">
                                Harmoni Tradisi & Inovasi Modern
                            </h2>
                            <div className="w-12 h-1 bg-brand-primary mt-4 rounded-full"></div>
                            
                            <p className="text-slate-600 text-sm leading-relaxed pt-2">
                                Berdiri di jantung Ambulu, Jember, lembaga kami telah menjadi rumah bagi ribuan siswa untuk menimba ilmu. Kami percaya bahwa pendidikan terbaik adalah yang menyeimbangkan antara kurikulum modern dan nilai-nilai luhur Islami.
                            </p>
                            
                            <div className="pt-4 space-y-4">
                                <div className="flex items-start gap-4 p-4 bg-white border border-slate-200/60 rounded-[0.25rem] shadow-sm">
                                    <div className="w-10 h-10 bg-brand-primary/10 rounded-full flex items-center justify-center shrink-0">
                                        <BookOpenIcon className="w-5 h-5 text-brand-primary" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-800 uppercase tracking-tight">Metode Pendidikan</h4>
                                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">Pendekatan holistik yang mengintegrasikan sains, teknologi, dan ilmu agama dalam lingkungan yang kondusif.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-4 bg-white border border-slate-200/60 rounded-[0.25rem] shadow-sm">
                                    <div className="w-10 h-10 bg-brand-primary/10 rounded-full flex items-center justify-center shrink-0">
                                        <HomeModernIcon className="w-5 h-5 text-brand-primary" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-800 uppercase tracking-tight">Lingkungan Santri</h4>
                                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">Fasilitas asrama yang nyaman dan pembiasaan adab harian ketat untuk membentuk karakter santri yang tangguh.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Image */}
                        <div className="lg:col-span-6 relative">
                            {/* Decorative Elements */}
                            <div className="absolute -top-4 -left-4 w-24 h-24 bg-brand-secondary/40 rounded-[0.25rem] -z-10"></div>
                            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-brand-primary/10 rounded-[0.25rem] -z-10"></div>
                            
                            {/* Main Image Container */}
                            <div className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden bg-slate-900 rounded-[0.25rem] shadow-xl border border-slate-200/60">
                                <img 
                                    src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=1000" 
                                    alt="Siswa Al-Hikmah" 
                                    className="w-full h-full object-cover opacity-90"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                                
                                {/* Info Box */}
                                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur border border-white/20 p-4 rounded-[0.25rem] flex items-center gap-4 shadow-lg">
                                    <div className="w-12 h-12 bg-brand-primary text-white flex flex-col items-center justify-center rounded-[0.25rem] shrink-0">
                                        <span className="text-lg font-black leading-none">25+</span>
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Pengalaman Kami</span>
                                        <span className="text-sm font-bold text-slate-800 uppercase tracking-tight mt-0.5 block">Tahun Mengabdi</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* VISI & MISI SECTION */}
            <section id="visi-misi" className="py-24 bg-white scroll-mt-20">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="text-center max-w-2xl mx-auto mb-20">
                        <span className="text-[10px] font-bold text-brand-primary uppercase tracking-[0.3em] mb-3 block">Arah & Tujuan</span>
                        <h2 className="text-3xl md:text-4xl font-serif font-semibold text-slate-900 tracking-tight uppercase">Visi & Misi Lembaga</h2>
                        <div className="w-12 h-1 bg-brand-primary mx-auto mt-6 rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Visi Block */}
                        <div className="bg-brand-primary p-10 md:p-14 rounded-[0.25rem] text-white relative overflow-hidden shadow-xl">
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/az-subtle.png')] opacity-10"></div>
                            <div className="relative z-10 h-full flex flex-col justify-center">
                                <h3 className="text-[10px] font-black text-brand-secondary uppercase tracking-[0.4em] mb-6">Visi Utama</h3>
                                <p className="text-2xl md:text-3xl font-serif font-semibold leading-relaxed italic">
                                    "Menjadi lembaga pendidikan Islam terkemuka yang melahirkan generasi beradab, berilmu, dan bermanfaat bagi semesta alam."
                                </p>
                            </div>
                            <div className="absolute -bottom-6 -right-6 text-[180px] font-serif font-black text-white/5 leading-none select-none">"</div>
                        </div>

                        {/* Misi List */}
                        <div className="flex flex-col justify-center">
                            <h3 className="text-lg font-bold text-slate-900 uppercase tracking-tight mb-8 border-b-2 border-brand-primary w-fit pb-2">Misi Kami</h3>
                            <ul className="space-y-6">
                                {[
                                    'Menyelenggarakan pendidikan berbasis adab dan akhlak mulia sesuai nilai-nilai Islam.',
                                    'Mengembangkan potensi intelektual siswa melalui kurikulum yang integratif dan komprehensif.',
                                    'Membekali siswa dengan keterampilan abad 21, kemandirian, dan jiwa kewirausahaan.',
                                    'Membangun lingkungan yayasan yang modern, bersih, aman, dan asri.',
                                    'Menjalin kemitraan strategis dengan berbagai lembaga pendidikan tingkat nasional dan internasional.'
                                ].map((misi, i) => (
                                    <li key={i} className="flex items-start gap-4 group">
                                        <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 text-brand-primary flex items-center justify-center font-bold text-xs shrink-0 group-hover:bg-brand-primary group-hover:text-white transition-colors">
                                            {i + 1}
                                        </div>
                                        <p className="text-slate-600 text-sm leading-relaxed font-medium pt-1">
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
            <section id="sejarah" className="py-24 bg-[#FBFBF9] border-t border-slate-100 scroll-mt-20">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    
                    <div className="text-center max-w-2xl mx-auto mb-20">
                        <span className="text-[10px] font-bold text-brand-primary uppercase tracking-[0.3em] mb-3 block">Sejarah Perjalanan</span>
                        <h2 className="text-3xl md:text-4xl font-serif font-semibold text-slate-900 tracking-tight uppercase">Jejak Langkah</h2>
                        <p className="text-slate-500 text-xs mt-4 leading-relaxed uppercase tracking-wider">Membangun Peradaban Sejak 1995</p>
                        <div className="w-12 h-1 bg-brand-primary mx-auto mt-6 rounded-full"></div>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <div className="relative">
                            {/* Vertical Line */}
                            <div className="absolute left-[19px] md:left-1/2 top-4 bottom-4 w-0.5 bg-slate-200 md:-translate-x-1/2"></div>
                            
                            {timeline.map((item, i) => {
                                const isEven = i % 2 === 0;
                                return (
                                    <div key={i} className={`relative flex items-center mb-12 last:mb-0 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                                        
                                        {/* Timeline Dot */}
                                        <div className="absolute left-[19px] md:left-1/2 w-3 h-3 bg-brand-primary border-4 border-[#FBFBF9] rounded-full transform -translate-x-1/2 z-10 box-content"></div>
                                        
                                        {/* Empty Side for Desktop */}
                                        <div className="hidden md:block md:w-1/2"></div>
                                        
                                        {/* Content Card */}
                                        <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pr-12' : 'md:pl-12'}`}>
                                            <div className="bg-white border border-slate-200/60 p-6 rounded-[0.25rem] shadow-sm hover:shadow-md transition-shadow relative group">
                                                {/* Connecting Line Desktop */}
                                                <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-12 h-px bg-slate-200 ${isEven ? '-right-12' : '-left-12'}`}></div>
                                                
                                                <div className="flex items-center gap-3 mb-3">
                                                    <span className="text-[10px] font-black text-brand-secondary bg-brand-primary px-2.5 py-1 rounded-[0.1rem] uppercase tracking-widest">
                                                        {item.year}
                                                    </span>
                                                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-tight">{item.title}</h3>
                                                </div>
                                                <p className="text-xs text-slate-500 leading-relaxed">
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
