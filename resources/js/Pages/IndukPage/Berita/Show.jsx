import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Link, Head } from '@inertiajs/react';
import NewsCard from './NewsCard';

export default function Show({ berita, recentBerita = [], settings = {} }) {
    const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/berita/${berita.slug}` : '';
    const formattedDate = berita.created_at 
        ? new Date(berita.created_at).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) 
        : '';

    return (
        <PublicLayout title={berita.judul}>
            <Head>
                <meta name="description" content={berita.konten?.substring(0, 160)} />
            </Head>

            {/* News Top Bar (Tempo Style) */}
            <div className="bg-brand-primary text-white py-1.5 border-b border-white/10 hidden md:block">
                <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-[10px] font-semibold uppercase tracking-widest">
                    <div className="flex items-center gap-4">
                        <span>{new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        <span className="text-white/30">|</span>
                        <span className="text-brand-secondary animate-pulse flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-brand-secondary rounded-full"></span>
                            Live Update
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <a href={settings.social_facebook || "#"} className="hover:text-brand-secondary transition-colors" target="_blank">Facebook</a>
                        <a href={settings.social_instagram || "#"} className="hover:text-brand-secondary transition-colors" target="_blank">Instagram</a>
                        <a href={settings.social_twitter || "#"} className="hover:text-brand-secondary transition-colors" target="_blank">Twitter</a>
                        <a href={settings.social_youtube || "#"} className="hover:text-brand-secondary transition-colors" target="_blank">YouTube</a>
                    </div>
                </div>
            </div>



            <div className="bg-white border-b border-sage-light">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-brand-accent">
                    <Link href="/" className="hover:text-brand-primary">Beranda</Link>
                    <span>/</span>
                    <Link href="/berita" className="hover:text-brand-primary">Berita</Link>
                    <span>/</span>
                    <span className="text-brand-primary truncate max-w-[200px]">{berita.judul}</span>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
                    {/* Article Content */}
                    <article className="lg:col-span-8">
                        <div className="mb-8">
                            <div className="text-xs font-semibold text-brand-primary uppercase tracking-[0.2em] mb-4">
                                {berita.category?.name || 'Berita Utama'}
                            </div>
                            <h1 className="text-3xl md:text-5xl font-semibold text-brand-primary leading-tight tracking-tighter mb-6">
                                {berita.judul}
                            </h1>
                            <div className="flex flex-wrap items-center gap-6 py-6 border-y border-sage-light text-brand-accent">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-brand-secondary flex items-center justify-center text-[10px] font-semibold text-brand-accent">
                                        AH
                                    </div>
                                    <span className="text-xs font-semibold text-brand-primary uppercase tracking-widest">Redaksi Al-Hikmah</span>
                                </div>
                                <div className="text-[10px] font-semibold uppercase tracking-widest">
                                    {formattedDate}
                                </div>
                            </div>
                        </div>

                        <div className="aspect-video bg-brand-secondary mb-10 overflow-hidden rounded-[0.25rem]">
                            <img
                                src={berita.image_url || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200"}
                                alt={berita.judul}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="prose prose-slate max-w-none mb-12">
                            <div 
                                dangerouslySetInnerHTML={{ __html: berita.konten }} 
                                className="text-brand-primary leading-relaxed text-lg font-serif space-y-6"
                            />
                        </div>

                        {/* Share & Tags */}
                        <div className="mt-16 pt-10 border-t border-sage-light space-y-8">
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-2">Tag Kategori:</span>
                                <Link 
                                    href={`/berita?kategori=${berita.category?.slug}`}
                                    className="px-4 py-1.5 bg-brand-secondary/50 text-brand-primary text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-brand-primary hover:text-white transition-all"
                                >
                                    #{berita.category?.name || 'Berita'}
                                </Link>
                            </div>

                            <div className="flex items-center gap-4">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Bagikan:</span>
                                <div className="flex items-center gap-3">
                                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 text-slate-400 hover:bg-brand-primary hover:text-white transition-all">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                                    </a>
                                    <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`📰 ${berita.judul}\n${shareUrl}`)}`} target="_blank" rel="noopener noreferrer" className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 text-slate-400 hover:bg-brand-primary hover:text-white transition-all">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </article>

                    {/* Sidebar */}
                    <aside className="lg:col-span-4 space-y-12">
                        <div>
                            <h2 className="text-sm font-semibold text-brand-primary uppercase tracking-widest border-b-2 border-brand-primary pb-2 mb-6">
                                Berita Terkait
                            </h2>
                            <div className="space-y-2">
                                {recentBerita.length > 0 ? (
                                    recentBerita.map(item => (
                                        <NewsCard key={item.id} berita={item} variant="sidebar" />
                                    ))
                                ) : (
                                    <p className="text-xs text-brand-accent italic">Tidak ada berita terkait lainnya.</p>
                                )}
                            </div>
                        </div>

                        <div className="sticky top-24">
                            <div className="bg-brand-primary p-8 text-white rounded-[0.25rem]">
                                <h3 className="text-xl font-semibold uppercase tracking-tighter mb-4 leading-tight">Dukung Pendidikan Al-Hikmah</h3>
                                <p className="text-sm text-brand-secondary/80 mb-6 leading-relaxed">Kontribusi Anda membantu kami memberikan pendidikan berkualitas bagi santri.</p>
                                <Link href="/kontak" className="inline-block bg-white text-brand-primary text-[10px] font-semibold uppercase tracking-widest px-6 py-3 hover:bg-brand-secondary transition-colors rounded-[0.25rem]">
                                    Donasi Sekarang
                                </Link>
                            </div>
                        </div>
                    </aside>

                </div>
            </div>
            
            <style dangerouslySetInnerHTML={{ __html: `
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&display=swap');
                .font-serif {
                    font-family: 'Playfair Display', serif;
                }
            `}} />
        </PublicLayout>
    );
}



