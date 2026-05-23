import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { 
    PhoneIcon, 
    ArrowTopRightOnSquareIcon, 
    ChevronDownIcon,
    AcademicCapIcon,
    UserGroupIcon,
    ChatBubbleLeftEllipsisIcon,
    BuildingLibraryIcon,
    CheckBadgeIcon,
    ArrowRightIcon,
    ClipboardDocumentCheckIcon
} from '@heroicons/react/24/outline';

export default function Index({ ppdbInfos = [], lembagas = [], faqs = [], settings = {} }) {
    const [openFaq, setOpenFaq] = useState(null);

    const toggleFaq = (id) => {
        setOpenFaq(openFaq === id ? null : id);
    };

    return (
        <PublicLayout title="Informasi PPDB" navTheme="dark">
            
            {/* HERO SECTION */}
            <div className="relative min-h-[50vh] flex items-center pt-32 pb-24 overflow-hidden bg-brand-primary">
                {/* Background Layer with Overlay grid */}
                <div className="absolute inset-0 z-0">
                    {/* Desktop Background */}
                    <img 
                        src={settings.ppdb_hero_bg || 'https://images.unsplash.com/photo-1523050335392-93851179ae22?w=1600'} 
                        alt="Hero BG Desktop" 
                        className="hidden md:block w-full h-full object-cover opacity-55 scale-105"
                    />
                    {/* Mobile Background */}
                    <img 
                        src={settings.ppdb_hero_bg_mobile || settings.ppdb_hero_bg || 'https://images.unsplash.com/photo-1523050335392-93851179ae22?w=1600'} 
                        alt="Hero BG Mobile" 
                        className="block md:hidden w-full h-full object-cover opacity-55 scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/60 via-brand-primary/40 to-brand-primary/80"></div>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/az-subtle.png')] opacity-10"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 mb-6">
                            <span className="h-[2px] w-8 bg-brand-secondary"></span>
                            <span className="text-brand-secondary text-[10px] font-black uppercase tracking-[0.4em]">
                                {settings.ppdb_hero_tagline || 'Portal Pendaftaran Terpadu'}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-serif font-semibold text-white tracking-tight uppercase leading-[1.1] mb-8">
                            {settings.ppdb_hero_title || 'Mulai Perjalanan Masa Depan Rabbani Di Sini'}
                        </h1>
                        <p className="text-sm md:text-base text-white/70 leading-relaxed font-light">
                            {settings.ppdb_hero_description || 'Selamat datang di pusat Penerimaan Peserta Didik Baru (PPDB) Yayasan Pendidikan dan Dakwah Sosial Al-Hikmah Jember. Kami berkomitmen menyelenggarakan pendidikan berkualitas terintegrasi nilai-nilai keislaman demi mencetak generasi bertakwa dan berakhlak mulia.'}
                        </p>
                    </div>
                </div>
            </div>

            {/* INSTITUTIONS GRID SECTION */}
            <section className="py-24 bg-[#FBFBF9]">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="text-center max-w-2xl mx-auto mb-20">
                        <span className="text-[10px] font-bold text-brand-primary uppercase tracking-[0.3em] mb-3 block">Jenjang Sekolah</span>
                        <h2 className="text-3xl md:text-4xl font-serif font-semibold text-slate-900 tracking-tight uppercase">Pilih Unit Pendidikan</h2>
                        <p className="text-slate-500 text-xs mt-4 leading-relaxed uppercase tracking-wider">Silakan pilih unit pendidikan terbaik yang sesuai dengan kelompok tumbuh kembang ananda.</p>
                        <div className="w-12 h-1 bg-brand-primary mx-auto mt-6 rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        {ppdbInfos.map((info) => {
                            // Normalize WA contact info
                            const contacts = (info.contact_persons && info.contact_persons.length > 0)
                                ? info.contact_persons
                                : (info.contact_number ? [{ name: 'Panitia PPDB', number: info.contact_number }] : []);

                            return (
                                <div key={info.id} className="group flex flex-col bg-white border border-slate-200/60 rounded-[0.25rem] overflow-hidden hover:shadow-2xl transition-all duration-700 hover:-translate-y-2">
                                    
                                    {/* Card Banner */}
                                    <div className="relative aspect-[21/9] overflow-hidden bg-slate-900">
                                        <img 
                                            src={info.lembaga.image_url || info.banner_url || 'https://images.unsplash.com/photo-1523050335392-93851179ae22?w=1200'} 
                                            alt={info.lembaga.nama} 
                                            className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                                        
                                        {/* Status Badge */}
                                        <div className="absolute top-4 left-4 z-10">
                                            {info.is_open ? (
                                                <div className="flex items-center gap-2 bg-emerald-500 text-white text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1.5 shadow-lg rounded-[0.2rem]">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                                                    Pendaftaran Aktif
                                                </div>
                                            ) : (
                                                <div className="bg-red-600 text-white text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1.5 shadow-lg rounded-[0.2rem]">
                                                    Tutup
                                                </div>
                                            )}
                                        </div>



                                        {/* School Logo & Title Overlay */}
                                        <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 flex items-end gap-4">
                                            {info.lembaga.ikon_url && (
                                                <div className="w-12 h-12 p-2 bg-white/95 backdrop-blur rounded-lg shadow-xl shrink-0 flex items-center justify-center border border-slate-100">
                                                    <img src={info.lembaga.ikon_url} alt="Logo" className="w-full h-full object-contain" />
                                                </div>
                                            )}
                                            <div className="text-white">
                                                <div className="text-[8px] font-bold uppercase tracking-widest text-slate-300">Pendidikan Formal</div>
                                                <h3 className="text-lg md:text-xl font-bold uppercase tracking-tight leading-tight mt-0.5">{info.lembaga.nama}</h3>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Card Content */}
                                    <div className="p-6 md:p-10 flex-grow flex flex-col justify-between">
                                        
                                        {/* Description */}
                                        <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-8">
                                            {info.description || 'Menyelenggarakan sistem pendidikan seimbang yang mengintegrasikan kecakapan literasi modern dengan fondasi aqidah shahihah.'}
                                        </p>



                                        {/* Contacts & WA Panel */}
                                        <div className="space-y-6 pt-6 border-t border-slate-100">
                                            
                                            {/* WhatsApp Multi-panitia links */}
                                            <div className="space-y-2.5">
                                                <span className="block text-[8px] font-black text-slate-400 uppercase tracking-widest">Kontak Panitia Unit:</span>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                    {contacts.map((c, i) => (
                                                        <a 
                                                            key={i}
                                                            href={`https://wa.me/${c.number.replace(/\D/g, '')}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center gap-3 p-3 border border-slate-100 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-200 transition-all rounded group"
                                                        >
                                                            <div className="w-7 h-7 rounded-full bg-[#25D366] flex items-center justify-center shrink-0 shadow-md">
                                                                <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M11.999 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2 22l5.098-1.338A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.522 2 11.999 2zm0 18c-1.66 0-3.205-.438-4.54-1.205l-.323-.192-3.023.793.807-2.958-.212-.343A7.97 7.97 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/></svg>
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-[7.5px] font-black text-slate-400 uppercase tracking-widest leading-none">{c.name}</p>
                                                                <p className="text-[11px] font-bold text-slate-700 mt-1 leading-none group-hover:text-emerald-600 transition-colors">{c.number}</p>
                                                            </div>
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Primary Register CTA Button */}
                                            {info.is_open ? (
                                                info.registration_link && info.is_link_active ? (
                                                    <a 
                                                        href={info.registration_link} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        className="w-full bg-brand-primary text-white py-4 rounded-[0.25rem] text-[9px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-2 hover:bg-slate-900 transition-all shadow-xl shadow-brand-primary/10 group/btn"
                                                    >
                                                        Isi Formulir Online ({info.lembaga.slug.toUpperCase()})
                                                        <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                                                    </a>
                                                ) : (
                                                    <button 
                                                        disabled
                                                        className="w-full bg-slate-100 text-slate-400 py-4 rounded-[0.25rem] text-[9px] font-black uppercase tracking-[0.3em] flex items-center justify-center cursor-not-allowed border border-slate-200"
                                                    >
                                                        Formulir Online Belum Tersedia
                                                    </button>
                                                )
                                            ) : (
                                                <button 
                                                    disabled
                                                    className="w-full bg-slate-200 text-slate-400 py-4 rounded-[0.25rem] text-[9px] font-black uppercase tracking-[0.3em] flex items-center justify-center cursor-not-allowed"
                                                >
                                                    Pendaftaran Sedang Ditutup
                                                </button>
                                            )}

                                            {/* Link to detail page */}
                                            <div className="text-center pt-2">
                                                <Link 
                                                    href={`/${info.lembaga.slug}`}
                                                    className="inline-flex items-center gap-2 text-[9px] font-bold text-slate-400 hover:text-brand-primary uppercase tracking-widest transition-colors group/link"
                                                >
                                                    Lihat Profil Lengkap Unit <ArrowRightIcon className="h-3 w-3 group-hover/link:translate-x-1 transition-transform" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* FAQ ACCORDION SECTION */}
            <section className="py-24 bg-white border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
                        
                        {/* Left Column (Sticky Title) */}
                        <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-4">
                            <div className="inline-flex p-3 bg-brand-primary/5 rounded-full mb-2">
                                <ChatBubbleLeftEllipsisIcon className="h-6 w-6 text-brand-primary" />
                            </div>
                            <span className="text-[10px] font-bold text-brand-primary uppercase tracking-[0.3em] block">
                                {settings.ppdb_faq_tagline || 'Informasi Umum'}
                            </span>
                            <h2 className="text-2xl md:text-3xl font-serif font-semibold text-slate-900 tracking-tight uppercase leading-[1.25]">
                                {settings.ppdb_faq_title || 'Tanya Jawab Seputar PPDB'}
                            </h2>
                            <div className="w-12 h-1 bg-brand-primary rounded-full mt-4"></div>
                            <p className="text-slate-500 text-xs leading-relaxed pt-2">
                                {settings.ppdb_faq_description || 'Temukan jawaban dari berbagai pertanyaan umum yang sering diajukan seputar proses penerimaan, administrasi, syarat masuk, dan sistem pengajaran terpadu di Yayasan Al-Hikmah Jember.'}
                            </p>
                        </div>

                        {/* Right Column (Accordion List) */}
                        <div className="lg:col-span-8 space-y-4">
                            {faqs.map((faq) => (
                                <div key={faq.id} className="bg-white border border-slate-200 rounded-[0.25rem] overflow-hidden hover:border-slate-300 transition-colors shadow-sm">
                                    <button 
                                        onClick={() => toggleFaq(faq.id)}
                                        className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                                    >
                                        <div className="flex items-center gap-4">
                                            <span className="text-brand-accent font-serif font-black text-[9px] tracking-widest px-2.5 py-1 bg-brand-secondary border border-brand-accent/20 rounded shrink-0">
                                                {faq.lembaga ? faq.lembaga.slug.toUpperCase() : 'UMUM'}
                                            </span>
                                            <span className="font-bold text-slate-800 text-xs md:text-sm uppercase tracking-tight leading-snug">{faq.question}</span>
                                        </div>
                                        <ChevronDownIcon className={`h-4 w-4 text-slate-400 transition-transform duration-300 shrink-0 ${openFaq === faq.id ? 'rotate-180 text-brand-primary' : ''}`} />
                                    </button>
                                    {openFaq === faq.id && (
                                        <div className="px-6 pb-6 pt-0 animate-fade-in-up">
                                            <div className="h-[1px] w-full bg-slate-100 mb-5"></div>
                                            <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                    </div>

                    {/* CTA HELP SECTION */}
                    <div className="mt-20 p-8 md:p-12 bg-brand-primary rounded-[0.25rem] text-center text-white relative overflow-hidden shadow-2xl animate-fade-in">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/az-subtle.png')] opacity-10"></div>
                        <div className="relative z-10 max-w-xl mx-auto">
                            <h3 className="text-xl md:text-2xl font-serif font-semibold text-white mb-3">
                                {settings.ppdb_help_title || 'Butuh Bantuan Lebih Lanjut?'}
                            </h3>
                            <p className="text-white/60 text-xs md:text-sm mb-8 leading-relaxed">
                                {settings.ppdb_help_description || 'Jangan ragu untuk menghubungi layanan informasi pusat Yayasan Al-Hikmah jika Anda memerlukan panduan atau penjelasan seputar pendaftaran.'}
                            </p>
                            <Link 
                                href="/kontak" 
                                className="inline-flex items-center gap-2 bg-brand-secondary text-brand-primary px-8 py-4 rounded-[0.25rem] text-[10px] font-black uppercase tracking-widest hover:bg-white hover:scale-105 transition-all shadow-xl"
                            >
                                {settings.ppdb_help_button || 'Hubungi Layanan Bantuan'}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}

