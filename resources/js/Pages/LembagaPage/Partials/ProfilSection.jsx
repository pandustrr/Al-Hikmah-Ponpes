import React from 'react';
import { SparklesIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { Link } from '@inertiajs/react';

// Normalize HTML entities (e.g. &amp; → &) from database-stored content
function decodeHtml(str = '') {
    return str
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'");
}

function NewsSidebarCard({ items, title, type }) {
    if (!items || items.length === 0) return null;
    return (
        <div className="bg-white border border-slate-100 p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                <h4 className="text-[11px] font-bold text-slate-900 uppercase tracking-[0.3em]">{title}</h4>
                <span className="w-1.5 h-1.5 bg-brand-primary rounded-full"></span>
            </div>
            <div className="space-y-8">
                {items.map((item, idx) => (
                    <div key={idx} className="group cursor-pointer">
                        <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                            <span>{type}</span>
                            <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                            <span>{new Date(item.tanggal).toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' })}</span>
                        </div>
                        <Link 
                            href={`/berita/${item.slug}`}
                            className="text-[13px] font-bold text-slate-800 leading-tight block group-hover:text-brand-primary transition-colors uppercase tracking-tight"
                        >
                            {item.judul}
                        </Link>
                    </div>
                ))}
            </div>
            <Link href="/berita" className="mt-10 pt-6 border-t border-slate-50 flex flex-col gap-2 group">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-brand-primary transition-colors">Lihat Semua</span>
                <span className="text-slate-300 group-hover:text-brand-primary group-hover:translate-x-2 transition-all">→</span>
            </Link>
        </div>
    );
}

export default function ProfilSection({ lembaga, sidebarSections = [], sidebarBeritas = [], sidebarCategoryName = '' }) {
    // Support both new multi-section format and legacy single section
    const sections = sidebarSections.length > 0
        ? sidebarSections
        : (sidebarBeritas.length > 0 ? [{ category_name: sidebarCategoryName, items: sidebarBeritas }] : []);
    const hasSidebar = sections.length > 0;

    return (
        <section id="profil" className="py-20 md:py-28 bg-[#FBFBF9]">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className={`grid grid-cols-1 gap-12 lg:gap-20 ${hasSidebar ? 'lg:grid-cols-12' : ''}`}>
                    
                    {/* LEFT CONTENT: PHILOSOPHY */}
                    <div className={hasSidebar ? 'lg:col-span-8' : 'w-full'}>
                        <div className="inline-flex items-center gap-2 mb-6">
                            <span className="h-[2px] w-8 bg-brand-primary"></span>
                            <span className="text-brand-primary text-[10px] font-bold uppercase tracking-[0.3em]">
                                {lembaga.filosofi_tagline || 'Membangun Generasi'}
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-serif font-semibold text-slate-900 tracking-tight leading-tight mb-8">
                            {lembaga.filosofi_title ? decodeHtml(lembaga.filosofi_title) : `Filosofi Pendidikan di ${lembaga.nama}`}
                        </h2>
                        <div className="relative mb-12">
                            <div className="rounded-[0.25rem] overflow-hidden shadow-2xl border-[12px] border-white relative group">
                                {/* Desktop Image */}
                                <img 
                                    src={lembaga.profil_image_url || lembaga.image_url || 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?w=800'} 
                                    className="hidden md:block w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 aspect-video" 
                                    alt="About Desktop" 
                                />
                                {/* Mobile Image */}
                                <img 
                                    src={lembaga.profil_image_mobile_url || lembaga.image_mobile_url || lembaga.profil_image_url || lembaga.image_url || 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?w=800'} 
                                    className="block md:hidden w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 aspect-[3/4]" 
                                    alt="About Mobile" 
                                />
                                {lembaga.ikon_url && (
                                    <div className="absolute top-6 right-6 w-20 h-20 bg-white/90 backdrop-blur p-4 shadow-xl z-20">
                                        <img src={lembaga.ikon_url} className="w-full h-full object-contain" alt="Icon" />
                                    </div>
                                )}
                            </div>
                        </div>

                        {lembaga.deskripsi && (
                            <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-12 border-l-2 border-brand-primary/20 pl-6">
                                {decodeHtml(lembaga.deskripsi)}
                            </p>
                        )}

                        <div className="space-y-6">
                            {/* VISI */}
                            {lembaga.visi && (
                                <div className="relative bg-brand-primary overflow-hidden p-7 md:p-8">
                                    <div className="absolute top-4 left-6 text-white/10 font-serif text-[120px] leading-none select-none">"</div>
                                    <div className="relative z-10">
                                        <div className="flex items-center gap-2 mb-6">
                                            <SparklesIcon className="h-4 w-4 text-brand-secondary" />
                                            <span className="text-brand-secondary text-[9px] font-black uppercase tracking-[0.3em]">Visi Pendidikan</span>
                                        </div>
                                        <p className="text-white text-sm font-semibold leading-relaxed">
                                            {decodeHtml(lembaga.visi)}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* MISI */}
                            {lembaga.misi && (
                                <div className="bg-white border border-slate-100 shadow-sm p-7 md:p-8">
                                    <div className="flex items-center gap-2 mb-8">
                                        <CheckCircleIcon className="h-4 w-4 text-brand-primary" />
                                        <span className="text-brand-primary text-[9px] font-black uppercase tracking-[0.3em]">Misi Utama</span>
                                    </div>
                                    <ol className="space-y-5">
                                        {decodeHtml(lembaga.misi).split('\n').filter(Boolean).map((point, i) => (
                                            <li key={i} className="flex items-start gap-4">
                                                <span className="shrink-0 w-6 h-6 rounded-full bg-brand-primary/10 text-brand-primary text-[9px] font-black flex items-center justify-center mt-0.5">
                                                    {i + 1}
                                                </span>
                                                <span className="text-sm text-slate-600 leading-relaxed">
                                                    {point.replace(/^\d+\.\s*/, '')}
                                                </span>
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* RIGHT SIDEBAR — dynamic multi-section sidebar news */}
                    {hasSidebar && (
                        <div className="lg:col-span-4 space-y-10 lg:sticky lg:top-24 self-start">
                            {sections.map((section, idx) => (
                                <NewsSidebarCard 
                                    key={idx}
                                    items={section.items} 
                                    title={section.category_name} 
                                    type={section.category_name} 
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
