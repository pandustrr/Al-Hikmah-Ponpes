import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { 
    PhoneIcon, 
    ArrowTopRightOnSquareIcon, 
    QuestionMarkCircleIcon, 
    ChevronDownIcon,
    AcademicCapIcon,
    UserGroupIcon,
    ChatBubbleLeftEllipsisIcon
} from '@heroicons/react/24/outline';

export default function Index({ ppdbInfos = [], lembagas = [], faqs = [], settings = {} }) {
    const [openFaq, setOpenFaq] = useState(null);

    const toggleFaq = (id) => {
        setOpenFaq(openFaq === id ? null : id);
    };

    return (
        <PublicLayout title="Informasi PPDB" navTheme="dark">
            <div className="relative min-h-[50vh] flex items-center pt-32 pb-20 overflow-hidden bg-brand-primary">
                <div className="absolute inset-0 z-0">
                    <img 
                        src={settings.ppdb_hero_bg || 'https://images.unsplash.com/photo-1523050335392-93851179ae22?w=1600'} 
                        alt="Hero BG" 
                        className="w-full h-full object-cover opacity-30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-primary via-brand-primary/20 to-transparent"></div>
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
                    <div className="max-w-3xl">
                        <h2 className="text-xs font-semibold text-brand-accent uppercase tracking-[0.4em] mb-4">Portal Pendaftaran</h2>
                        <h1 className="text-5xl md:text-6xl font-serif font-semibold text-brand-primary tracking-tight uppercase leading-[0.9] mb-8">
                            Mulai Perjalanan <br /> <span className="italic text-brand-accent">Masa Depanmu</span> Di Sini
                        </h1>
                        <p className="text-lg text-white/70 leading-relaxed">
                            Selamat datang di pusat informasi Penerimaan Peserta Didik Baru (PPDB) Yayasan Pendidikan dan Dakwah Sosial Al-Hikmah Jember. Pilih jenjang pendidikan dan temukan informasi yang Anda butuhkan.
                        </p>
                    </div>
                </div>
            </div>

            {/* Institutions Grid */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12">
                        {ppdbInfos.map((info) => (
                            <div key={info.id} className="group flex flex-col bg-slate-50 border border-slate-100 rounded-[0.25rem] overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                                <div className="relative aspect-[21/9] overflow-hidden">
                                    <img 
                                        src={info.banner_url || 'https://images.unsplash.com/photo-1523050335392-93851179ae22?w=1200'} 
                                        alt={info.lembaga.nama} 
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                                        <div className="text-white">
                                            <div className="text-[10px] font-semibold uppercase tracking-widest text-white/70 mb-1">Unit Pendidikan</div>
                                            <h3 className="text-2xl font-semibold uppercase tracking-tight leading-none">{info.lembaga.nama}</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-8 flex-grow flex flex-col">
                                    <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-grow">
                                        {info.description || 'Informasi pendaftaran lengkap untuk jenjang ini dapat dilihat melalui link di bawah ini.'}
                                    </p>
                                    
                                    <div className="space-y-6 pt-6 border-t border-slate-200">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2.5 bg-brand-primary/5 rounded-full">
                                                    <PhoneIcon className="h-4 w-4 text-brand-primary" />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Informasi Kontak</p>
                                                    <p className="font-bold text-brand-primary text-sm">{info.contact_number || '0812-xxxx-xxxx'}</p>
                                                </div>
                                            </div>
                                            <a 
                                                href={`https://wa.me/${info.contact_number?.replace(/[^0-9]/g, '')}`} 
                                                className="text-[10px] font-bold text-brand-primary uppercase tracking-widest hover:underline"
                                            >
                                                Hubungi WA
                                            </a>
                                        </div>

                                        <a 
                                            href={info.registration_link} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="w-full bg-brand-primary text-white py-4 rounded-[0.25rem] text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-slate-900 transition-colors shadow-xl shadow-brand-primary/10 group/btn"
                                        >
                                            Daftar Sekarang Online
                                            <ArrowTopRightOnSquareIcon className="h-3 w-3 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 bg-brand-secondary/10">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <div className="inline-flex p-3 bg-brand-primary/5 rounded-full mb-6">
                            <ChatBubbleLeftEllipsisIcon className="h-6 w-6 text-brand-primary" />
                        </div>
                        <h2 className="text-3xl font-serif font-semibold text-brand-primary uppercase tracking-tight">Tanya Jawab Seputar PPDB</h2>
                        <div className="h-1 w-20 bg-brand-primary mx-auto mt-6"></div>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq) => (
                            <div key={faq.id} className="bg-white border border-slate-200 rounded-[0.25rem] overflow-hidden">
                                <button 
                                    onClick={() => toggleFaq(faq.id)}
                                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="text-brand-accent font-serif font-bold text-lg opacity-30">
                                            {faq.lembaga ? faq.lembaga.slug.toUpperCase() : 'ALL'}
                                        </div>
                                        <span className="font-semibold text-brand-primary text-sm uppercase tracking-tight">{faq.question}</span>
                                    </div>
                                    <ChevronDownIcon className={`h-4 w-4 text-brand-accent transition-transform duration-300 ${openFaq === faq.id ? 'rotate-180' : ''}`} />
                                </button>
                                {openFaq === faq.id && (
                                    <div className="px-6 pb-6 pt-0 animate-fade-in-up">
                                        <div className="h-[1px] w-full bg-slate-100 mb-6"></div>
                                        <p className="text-slate-600 text-sm leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 p-8 bg-brand-primary rounded-[0.25rem] text-center text-white">
                        <h3 className="text-lg font-semibold mb-2">Masih Memiliki Pertanyaan?</h3>
                        <p className="text-white/70 text-sm mb-8">Tim admin kami siap membantu Anda memberikan informasi lebih lanjut seputar pendaftaran.</p>
                        <Link href="/kontak" className="inline-flex items-center gap-2 bg-white text-brand-primary px-8 py-3 rounded-[0.25rem] text-[10px] font-bold uppercase tracking-widest hover:bg-brand-secondary transition-colors">
                            Hubungi Pusat Bantuan
                        </Link>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
