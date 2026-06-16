import React, { useState, useEffect } from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Link, Head, router } from '@inertiajs/react';
import NewsTicker from './NewsTicker';
import NewsCard from './NewsCard';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
export default function Index({ berita, multimedia = [], currentCategory, currentCategorySeoSlug, categories, settings = {}, popularNews = [], filters = {} }) {
    const [searchQuery, setSearchQuery] = useState(filters.q || '');
    const [search, setSearch] = useState(filters.q || '');
    // Combine "Semua Berita" with dynamic categories from DB
    const allCategories = [
        { slug: '', name: 'Semua' },
        ...categories
    ];

    const handleFilter = (slug) => {
        router.get('/berita', slug ? { kategori: slug } : {}, {
            preserveState: true,
            replace: true,
        });
    };

    const handleMainSearch = (e) => {
        e.preventDefault();
        router.get('/berita', { q: search, kategori: currentCategory }, {
            preserveState: true,
            replace: true,
        });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/berita', { q: searchQuery, kategori: currentCategory }, {
            preserveState: true,
            replace: true,
        });
    };

    const featuredNewsList = berita.slice(0, 5);
    const otherNews = berita.slice(featuredNewsList.length);
    const latestNewsForTicker = berita.slice(0, 5);

    // Slider state
    const [currentSlide, setCurrentSlide] = useState(0);

    const currentCategoryName = currentCategory
        ? categories.find(c => c.slug === currentCategory)?.name || currentCategory
        : null;

    useEffect(() => {
        if (featuredNewsList.length > 1) {
            const timer = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % featuredNewsList.length);
            }, 5000);
            return () => clearInterval(timer);
        }
    }, [featuredNewsList.length]);

    // popularNews is now passed from props correctly sorted by views

    return (
        <PublicLayout title={currentCategory
            ? `Berita ${currentCategoryName}`
            : 'Berita & Informasi'}
        >
            {/* Dynamic SEO Head for SPA navigation */}
            <Head>
                {currentCategory ? (
                    <>
                        <title key="title">{`Berita ${currentCategoryName} - YPDS Al-Hikmah Kesilir Wuluhan Jember`}</title>
                        <meta key="desc" name="description" content={`Kumpulan berita dan informasi kategori ${currentCategoryName} dari Yayasan Al-Hikmah Ambulu.`} />
                        <meta key="og-title" property="og:title" content={`Berita ${currentCategoryName} - YPDS Al-Hikmah Kesilir Wuluhan Jember`} />
                        <meta key="og-desc" property="og:description" content={`Kumpulan berita dan informasi kategori ${currentCategoryName} dari Yayasan Al-Hikmah Ambulu.`} />
                    </>
                ) : (
                    <>
                        <title key="title">Berita &amp; Informasi Terbaru - YPDS Al-Hikmah Kesilir Wuluhan Jember</title>
                        <meta key="desc" name="description" content="Baca berita, pengumuman, dan informasi terkini dari Yayasan Al-Hikmah Ambulu. Update kegiatan, prestasi, dan program pendidikan santri." />
                    </>
                )}
                <link key="canonical" rel="canonical" href={typeof window !== 'undefined'
                    ? (currentCategory ? `${window.location.origin}/berita/kategori/${currentCategory}` : `${window.location.origin}/berita`)
                    : (currentCategory ? `/berita/kategori/${currentCategory}` : '/berita')} />
                <meta key="og-type" property="og:type" content="website" />
                <meta key="og-url" property="og:url" content={typeof window !== 'undefined'
                    ? (currentCategory ? `${window.location.origin}/berita/kategori/${currentCategory}` : `${window.location.origin}/berita`)
                    : (currentCategory ? `/berita/kategori/${currentCategory}` : '/berita')} />
                <meta key="robots" name="robots" content="index, follow" />
            </Head>
            {/* Wrapper to offset the fixed navbar height so the top bar is not covered or too close */}
            <div className="pt-20 md:pt-24">
                {/* News Top Bar (Tempo Style) - Diaktifkan di mobile secara responsif dengan penyesuaian posisi */}
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

            {/* Header / Masthead for News */}
            <div
                className="bg-white pt-10 pb-6 border-b border-sage-light bg-cover bg-center bg-no-repeat relative"
                style={settings.news_hero_bg ? {
                    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.98)), url('${settings.news_hero_bg}')`
                } : {}}
            >
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <div className="mb-4">
                        <span className="bg-brand-primary text-white text-[10px] font-semibold px-2 py-0.5 tracking-tighter uppercase">{settings.news_portal_badge || 'Portal Berita'}</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-semibold text-brand-primary tracking-tighter uppercase mb-2">
                        {settings.news_portal_title ? (
                            <span dangerouslySetInnerHTML={{ __html: settings.news_portal_title.replace('Al-Hikmah', '<span class="text-brand-accent">Al-Hikmah</span>') }} />
                        ) : (
                            <><span className="text-brand-accent">Al-Hikmah</span> NEWS</>
                        )}
                    </h1>
                    <p className="text-[10px] font-semibold text-brand-accent uppercase tracking-[0.5em] mb-8">
                        {settings.portal_tagline || 'Independent • Trustworthy • Educational'}
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto mb-10">
                        <form onSubmit={handleMainSearch} className="relative group">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder={settings.news_search_placeholder || "Cari berita atau informasi..."}
                                className="w-full bg-slate-50 border-2 border-sage-light focus:border-brand-primary focus:bg-white px-10 sm:px-12 py-3 sm:py-4 rounded-full text-[10px] sm:text-sm font-medium transition-all outline-none"
                            />
                            <MagnifyingGlassIcon className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-brand-accent group-focus-within:text-brand-primary transition-colors" />
                            <button type="submit" className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 bg-brand-primary hover:bg-slate-900 text-white text-[9px] sm:text-[10px] font-black uppercase tracking-widest px-4 sm:px-6 py-2 sm:py-2.5 rounded-full transition-all">
                                Cari
                            </button>
                        </form>
                    </div>

                    {/* Navigation / Filter */}
                    <div className="flex border-t border-sage-light mt-4 overflow-x-auto no-scrollbar sticky top-14 bg-white/95 backdrop-blur-md z-40 shadow-sm md:shadow-none w-full">
                        <div className="flex w-max sm:mx-auto px-4 md:px-0">
                            {allCategories.map(cat => (
                                <button
                                    key={cat.slug}
                                    onClick={() => handleFilter(cat.slug)}
                                    className={`px-3 sm:px-4 py-3 sm:py-3 text-[9px] sm:text-[10px] font-semibold uppercase tracking-widest whitespace-nowrap transition-all border-b-2 ${(currentCategory || '') === cat.slug
                                            ? 'border-brand-primary text-brand-primary'
                                            : 'border-transparent text-brand-accent hover:text-brand-primary'
                                        }`}
                                >
                                    {cat.name} {cat.beritas_count > 0 && <span className="ml-1 text-[8px] sm:text-[8.5px] opacity-50">({cat.beritas_count})</span>}
                                </button>
                            ))}
                        </div>

                        {/* Search Bar */}
                        <div className="px-4 py-2 border-l border-sage-light hidden lg:block">
                            <form onSubmit={handleSearch} className="relative group">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Cari berita..."
                                    className="bg-brand-secondary/50 border-none rounded-full py-1.5 pl-8 pr-4 text-xs font-semibold text-brand-primary focus:ring-1 focus:ring-brand-primary w-48 transition-all group-hover:w-64"
                                />
                                <MagnifyingGlassIcon className="w-4 h-4 text-brand-accent absolute left-2.5 top-1/2 -translate-y-1/2" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <NewsTicker items={latestNewsForTicker} />

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                    {/* Main Content Area */}
                    <div className="lg:col-span-8">
                        {featuredNewsList.length > 0 ? (
                            <div className="space-y-10">
                                {/* Featured Hero Slider */}
                                <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden rounded-[0.25rem] group/slider">
                                    {featuredNewsList.map((item, index) => (
                                        <div
                                            key={item.id}
                                            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                                                }`}
                                        >
                                            <NewsCard berita={item} variant="featured" className="h-full w-full" isPriority={index === 0} />
                                        </div>
                                    ))}

                                    {/* Slider Indicators */}
                                    {featuredNewsList.length > 1 && (
                                        <div className="absolute bottom-3 right-3 sm:bottom-6 sm:right-6 z-20 flex gap-1.5 sm:gap-2 opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300">
                                            {featuredNewsList.map((_, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => setCurrentSlide(index)}
                                                    className={`h-1 sm:h-1.5 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-brand-secondary w-4 sm:w-6' : 'bg-white/50 w-1.5 sm:w-2 hover:bg-white'
                                                        }`}
                                                    aria-label={`Go to slide ${index + 1}`}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Sub Grid / List */}
                                <div className="space-y-2">
                                    <h2 className="text-lg font-semibold text-brand-primary uppercase tracking-widest border-l-4 border-brand-primary pl-4 mb-6">
                                        {settings.news_other_title || 'Berita Lainnya'}
                                    </h2>
                                    {otherNews.length > 0 ? (
                                        <div className="divide-y divide-sage-light">
                                            {otherNews.map(item => (
                                                <NewsCard key={item.id} berita={item} variant="horizontal" />
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="py-10 text-center text-brand-accent">
                                            Belum ada berita lainnya.
                                        </div>
                                    )}
                                </div>

                                {/* Multimedia Section */}
                                <div className="pt-10 border-t border-sage-light">
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-lg font-semibold text-brand-primary uppercase tracking-widest border-l-4 border-brand-primary pl-4">
                                            {settings.news_multimedia_title || 'Multimedia Al-Hikmah'}
                                        </h2>
                                        <Link href="#" className="text-[10px] font-semibold text-brand-accent hover:text-brand-primary uppercase tracking-widest transition-colors">Lihat Semua Galeri</Link>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {multimedia.length > 0 ? (
                                            <>
                                                <Link href={`/berita/${multimedia[0].slug}`} className="relative aspect-video bg-brand-secondary overflow-hidden rounded-[0.25rem] group cursor-pointer">
                                                    <img src={multimedia[0].image_url} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Video" />
                                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-all">
                                                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                                                            <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-brand-primary border-b-[8px] border-b-transparent ml-1"></div>
                                                        </div>
                                                    </div>
                                                    <div className="absolute bottom-4 left-4 right-4 text-left">
                                                        <span className="bg-red-600 text-white text-[8px] font-semibold px-1.5 py-0.5 uppercase tracking-widest mb-2 inline-block">MULTIMEDIA</span>
                                                        <h4 className="text-white font-semibold text-sm leading-tight">{multimedia[0].judul}</h4>
                                                    </div>
                                                </Link>
                                                <div className="grid grid-cols-2 gap-4">
                                                    {multimedia.slice(1, 5).map(item => (
                                                        <Link key={item.id} href={`/berita/${item.slug}`} className="relative aspect-square bg-brand-secondary overflow-hidden rounded-[0.25rem] group cursor-pointer">
                                                            <img src={item.image_url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Foto" />
                                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </>
                                        ) : (
                                            <div className="col-span-2 py-10 text-center text-brand-accent border border-dashed border-sage-light">
                                                Belum ada konten multimedia.
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-24 bg-brand-secondary border border-dashed border-sage-light rounded-[0.25rem]">
                                <p className="text-brand-accent font-semibold uppercase tracking-widest text-sm">Belum ada berita yang diterbitkan</p>
                            </div>
                        )}
                    </div>

                    {/* Sidebar Area */}
                    <aside className="lg:col-span-4 space-y-10">
                        {/* Popular News Section */}
                        <div className="bg-brand-secondary p-6 rounded-[0.25rem]">
                            <h2 className="text-sm font-semibold text-brand-primary uppercase tracking-widest border-b-2 border-brand-primary pb-2 mb-6">
                                {settings.news_popular_title || 'Terpopuler'}
                            </h2>
                            <div className="space-y-1">
                                {popularNews.map((item, index) => (
                                    <div key={item.id} className="flex gap-4 group cursor-pointer border-b border-sage-light last:border-0 py-4">
                                        <span className="text-3xl font-semibold text-sage-light group-hover:text-brand-primary/20 transition-colors">
                                            {index + 1}
                                        </span>
                                        <Link href={`/berita/${item.slug}`} className="flex-grow">
                                            <h3 className="text-xs font-semibold text-brand-primary leading-tight group-hover:text-brand-accent transition-colors line-clamp-2">
                                                {item.judul}
                                            </h3>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>



                        {/* Instagram CTA */}
                        <div>
                            <h2 className="text-sm font-semibold text-brand-primary uppercase tracking-widest border-b-2 border-brand-primary pb-2 mb-6">
                                {settings.news_ig_title || 'Instagram @alhikmah'}
                            </h2>
                            <div className="bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 p-6 rounded-[0.25rem] text-white shadow-lg relative overflow-hidden group">
                                <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-xl group-hover:bg-white/20 transition-all"></div>
                                <div className="absolute -left-4 -bottom-4 w-32 h-32 bg-orange-400/20 rounded-full blur-xl group-hover:bg-orange-400/30 transition-all"></div>

                                <div className="relative z-10 flex flex-col items-center text-center space-y-4 py-2">
                                    <svg className="w-12 h-12 drop-shadow-md" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                                    <p className="text-sm font-medium drop-shadow-sm line-clamp-2">Ikuti kami di Instagram untuk melihat dokumentasi kegiatan dan keseharian santri.</p>
                                    <a href={settings.social_instagram || "#"} target="_blank" rel="noopener noreferrer" className="mt-2 bg-white text-pink-600 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-slate-100 hover:scale-105 active:scale-95 transition-all shadow-md">
                                        Follow Instagram
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Popular Tags */}
                        <div>
                            <h2 className="text-sm font-semibold text-brand-primary uppercase tracking-widest border-b-2 border-brand-primary pb-2 mb-6">
                                {settings.news_tags_title || 'Tag Populer'}
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {categories.slice(0, 8).map(cat => (
                                    <button
                                        key={cat.id}
                                        onClick={() => handleFilter(cat.slug)}
                                        className="px-3 py-1 bg-white border border-sage-light text-[9px] font-semibold text-brand-accent uppercase tracking-widest rounded-full hover:border-brand-primary hover:text-brand-primary cursor-pointer transition-all"
                                    >
                                        #{cat.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </aside>

                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}} />
        </PublicLayout>
    );
}



