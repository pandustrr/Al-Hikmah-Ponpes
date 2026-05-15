import React from 'react';
import { Link } from '@inertiajs/react';

export default function NewsTicker({ items = [] }) {
    if (items.length === 0) return null;

    return (
        <div className="bg-white border-y border-sage-light py-2 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 flex items-center">
                <div className="flex-shrink-0 bg-brand-primary text-white text-[10px] font-semibold uppercase tracking-widest px-3 py-1 mr-4 z-10">
                    TERKINI
                </div>
                <div className="relative flex-grow overflow-hidden h-6">
                    <div className="absolute whitespace-nowrap animate-marquee flex items-center gap-8">
                        {items.map((item, i) => (
                            <Link 
                                key={i} 
                                href={`/berita/${item.slug}`}
                                className="text-sm font-semibold text-brand-primary hover:text-brand-accent transition-colors flex items-center gap-2"
                            >
                                <span className="text-sage-mid">•</span>
                                {item.judul}
                            </Link>
                        ))}
                        {/* Duplicate for seamless loop if items are few */}
                        {items.length < 5 && items.map((item, i) => (
                            <Link 
                                key={`dup-${i}`} 
                                href={`/berita/${item.slug}`}
                                className="text-sm font-semibold text-brand-primary hover:text-brand-accent transition-colors flex items-center gap-2"
                            >
                                <span className="text-sage-mid">•</span>
                                {item.judul}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 30s linear infinite;
                }
                .animate-marquee:hover {
                    animation-play-state: paused;
                }
            `}} />
        </div>
    );
}
