import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Link, Head } from '@inertiajs/react';
import NewsCard from './NewsCard';

export default function Show({ berita, recentBerita = [], settings = {} }) {
    const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/berita/${berita.slug}` : `/berita/${berita.slug}`;
    const formattedDate = berita.created_at 
        ? new Date(berita.created_at).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) 
        : '';
    // Use ringkasan first (curated excerpt), fallback to stripping konten HTML
    const cleanDescription = berita.ringkasan
        ? berita.ringkasan.replace(/<[^>]*>/g, '').substring(0, 155)
        : berita.konten
            ? berita.konten.replace(/<[^>]*>/g, '').substring(0, 155) + '...'
            : '';

    const canonicalUrl = typeof window !== 'undefined'
        ? `${window.location.origin}/berita/${berita.slug}`
        : `/berita/${berita.slug}`;

    const newsArticleSchema = {
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        'headline': berita.judul,
        'description': cleanDescription,
        'image': berita.image_url ? [{
            '@type': 'ImageObject',
            'url': berita.image_url,
            'width': 1200,
            'height': 630,
            'caption': `${berita.judul} - YPDS Al-Hikmah Jember`,
        }] : [],
        'datePublished': berita.created_at,
        'dateModified': berita.updated_at || berita.created_at,
        'author': [{ '@type': 'Organization', 'name': 'Redaksi YPDS Al-Hikmah', 'url': 'https://ypdsalhikmahjbr.com' }],
        'publisher': {
            '@type': 'Organization',
            'name': 'YPDS Al-Hikmah Jember',
            'logo': { '@type': 'ImageObject', 'url': 'https://ypdsalhikmahjbr.com/logo.png', 'width': 200, 'height': 200 }
        },
        'mainEntityOfPage': { '@type': 'WebPage', '@id': canonicalUrl },
        'articleSection': berita.category?.name || 'Berita',
        'inLanguage': 'id-ID',
        'isPartOf': { '@type': 'WebSite', 'name': 'YPDS Al-Hikmah Jember', 'url': 'https://ypdsalhikmahjbr.com' },
    };

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'Beranda', 'item': 'https://ypdsalhikmahjbr.com' },
            { '@type': 'ListItem', 'position': 2, 'name': 'Berita', 'item': 'https://ypdsalhikmahjbr.com/berita' },
            { '@type': 'ListItem', 'position': 3, 'name': berita.judul, 'item': canonicalUrl },
        ]
    };

    return (
        <PublicLayout title={berita.judul}>
            <Head>
                <title key="title">{`${berita.judul} - YPDS Al-Hikmah Jember`}</title>
                <meta key="desc" name="description" content={cleanDescription} />
                <link key="canonical" rel="canonical" href={canonicalUrl} />
                <meta key="og-type" property="og:type" content="article" />
                <meta key="og-title" property="og:title" content={`${berita.judul} - YPDS Al-Hikmah Jember`} />
                <meta key="og-desc" property="og:description" content={cleanDescription} />
                <meta key="og-url" property="og:url" content={canonicalUrl} />
                {berita.image_url && <meta key="og-img" property="og:image" content={berita.image_url} />}
                <script key="ld-article" type="application/ld+json">
                    {JSON.stringify(newsArticleSchema)}
                </script>
                <script key="ld-breadcrumb" type="application/ld+json">
                    {JSON.stringify(breadcrumbSchema)}
                </script>
            </Head>

            {/* Wrapper to offset the fixed navbar height so the top bar is not covered or too close */}
            <div className="pt-20 md:pt-24">
                {/* News Top Bar (Tempo Style) - Diaktifkan di mobile secara responsif */}
                <div className="bg-brand-primary text-white py-2 border-b border-white/10">
                    <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0 text-[9px] md:text-[10px] font-semibold uppercase tracking-widest text-center sm:text-left">
                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 sm:gap-4">
                            <span>{new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            <span className="text-white/30">|</span>
                            <span className="text-brand-secondary animate-pulse flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-brand-secondary rounded-full"></span>
                                Live Update
                            </span>
                        </div>
                        <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
                            <a href={settings.social_facebook || "#"} className="hover:text-brand-secondary transition-colors" target="_blank">Facebook</a>
                            <a href={settings.social_instagram || "#"} className="hover:text-brand-secondary transition-colors" target="_blank">Instagram</a>
                            <a href={settings.social_twitter || "#"} className="hover:text-brand-secondary transition-colors" target="_blank">Twitter</a>
                            <a href={settings.social_youtube || "#"} className="hover:text-brand-secondary transition-colors" target="_blank">YouTube</a>
                        </div>
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
                            <div className="flex flex-wrap items-center gap-6 py-4 mb-6 border-y border-sage-light text-brand-accent">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-brand-secondary flex items-center justify-center text-[10px] font-semibold text-brand-accent">
                                        AH
                                    </div>
                                    <span className="text-xs font-semibold text-brand-primary uppercase tracking-widest">Redaksi Al-Hikmah</span>
                                </div>
                                <time dateTime={berita.created_at} className="text-[10px] font-semibold uppercase tracking-widest">
                                    {formattedDate}
                                </time>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-semibold text-brand-primary leading-tight tracking-tighter mb-2">
                                {berita.judul}
                            </h1>
                        </div>

                        <div className="aspect-[3/4] sm:aspect-video bg-brand-secondary mb-10 overflow-hidden rounded-[0.25rem]">
                            <picture className="w-full h-full">
                                {berita.image_mobile_url && (
                                    <source media="(max-w: 640px)" srcSet={berita.image_mobile_url} />
                                )}
                                <img
                                    src={berita.image_url || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200"}
                                    alt={`${berita.judul} - YPDS Al-Hikmah Jember`}
                                    width="1200"
                                    height="630"
                                    loading="eager"
                                    fetchpriority="high"
                                    className="w-full h-full object-cover"
                                />
                            </picture>
                        </div>

                        <div className="max-w-none mb-12">
                            <div 
                                dangerouslySetInnerHTML={{ __html: berita.konten ? berita.konten.replace(/&nbsp;/g, ' ') : '' }} 
                                className="text-brand-primary leading-relaxed text-[15px] md:text-lg font-serif break-words overflow-hidden rich-text-content"
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
                .rich-text-content p {
                    margin-bottom: 1.5rem;
                }
                .rich-text-content h1, .rich-text-content h2, .rich-text-content h3 {
                    font-weight: 700;
                    margin-top: 2rem;
                    margin-bottom: 1rem;
                    color: var(--color-brand-primary, inherit);
                }
                .rich-text-content ul {
                    list-style-type: disc;
                    padding-left: 1.5rem;
                    margin-bottom: 1.5rem;
                }
                .rich-text-content ol {
                    list-style-type: decimal;
                    padding-left: 1.5rem;
                    margin-bottom: 1.5rem;
                }
                .rich-text-content img {
                    max-width: 100%;
                    height: auto;
                    border-radius: 0.5rem;
                    margin-bottom: 1.5rem;
                }
                .rich-text-content a {
                    color: var(--color-brand-accent, #3b82f6);
                    text-decoration: underline;
                }
            `}} />
        </PublicLayout>
    );
}



