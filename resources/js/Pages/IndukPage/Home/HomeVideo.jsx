import React from 'react';
import { PlayIcon } from '@heroicons/react/24/solid';

export default function HomeVideo({ settings = {} }) {
    const rawUrls = settings.youtube_video_urls;
    
    if (!rawUrls) return null;

    // Helper untuk extract ID video YouTube
    const getYouTubeEmbedUrl = (url) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.trim().match(regExp);
        return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : null;
    };

    // Parsing data video (mendukung format JSON array & fallback split baris baru)
    let parsedUrls = [];
    try {
        const trimmed = rawUrls.trim();
        if (trimmed.startsWith('[')) {
            parsedUrls = JSON.parse(trimmed);
        } else if (trimmed) {
            parsedUrls = trimmed.split('\n').map(u => u.trim()).filter(Boolean);
        }
    } catch (e) {
        console.error("Error parsing youtube_video_urls:", e);
        parsedUrls = [];
    }

    // Bersihkan dan ubah ke embed url yang valid
    const embedUrls = parsedUrls
        .map(url => getYouTubeEmbedUrl(url))
        .filter(url => url !== null);

    if (embedUrls.length === 0) return null;

    // Menentukan layout grid berdasarkan jumlah video agar estetis
    let gridClass = "grid-cols-1 max-w-4xl mx-auto";
    if (embedUrls.length === 2) {
        gridClass = "grid-cols-1 md:grid-cols-2 max-w-6xl mx-auto gap-8";
    } else if (embedUrls.length >= 3) {
        gridClass = "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto gap-6";
    }

    return (
        <section className="py-16 md:py-24 bg-brand-primary relative overflow-hidden reveal-section">
            {/* Background Decorations */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/az-subtle.png')] opacity-10"></div>
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-accent/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <div className="inline-flex items-center gap-2 mb-4">
                        <span className="h-[2px] w-6 bg-brand-accent"></span>
                        <span className="text-brand-accent text-[10px] font-black uppercase tracking-[0.4em]">Galeri Video Resmi</span>
                        <span className="h-[2px] w-6 bg-brand-accent"></span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-serif font-semibold text-white tracking-tight uppercase">
                        Dokumentasi & Video Profil YPDS Al-Hikmah
                    </h2>
                    <p className="text-white/60 text-sm mt-4 leading-relaxed font-light">
                        Simak video profil resmi serta dokumentasi kegiatan kami untuk melihat lingkungan belajar dan pembiasaan nilai adab santri.
                    </p>
                </div>

                {/* Video Grid */}
                <div className={`grid ${gridClass}`}>
                    {embedUrls.map((embedUrl, idx) => (
                        <div 
                            key={idx} 
                            className="relative aspect-video w-full rounded-[0.5rem] overflow-hidden bg-slate-900 border border-brand-accent/20 shadow-2xl group hover:border-brand-accent transition-all duration-300"
                        >
                            {/* YouTube Iframe */}
                            <iframe
                                src={`${embedUrl}?autoplay=0&rel=0`}
                                title={`Video Profil YPDS Al-Hikmah - ${idx + 1}`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                className="absolute inset-0 w-full h-full z-10"
                            ></iframe>

                            {/* Fallback placeholder */}
                            <div className="absolute inset-0 flex items-center justify-center bg-slate-950 z-0">
                                <div className="flex flex-col items-center gap-4 text-white/50">
                                    <PlayIcon className="h-12 w-12 text-brand-accent animate-pulse" />
                                    <span className="text-[10px] uppercase tracking-widest">Loading Video {idx + 1}...</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
