import React from 'react';

export default function RunningTextBanner({ text }) {
    if (!text) return null;
    return (
        <div className="bg-brand-primary py-4 overflow-hidden flex items-center relative">
            {/* Left label badge */}
            <div className="shrink-0 z-10 bg-brand-secondary text-brand-primary text-[9px] font-black uppercase tracking-[0.25em] px-5 py-3 absolute left-0">
                Info Terkini
            </div>

            {/* Scrolling text */}
            <div className="w-full overflow-hidden relative pl-32">
                <div className="animate-ticker whitespace-nowrap">
                    <span className="text-white text-[11px] font-bold uppercase tracking-[0.25em] inline-flex items-center gap-16">
                        <span>{text}</span>
                        <span className="text-brand-secondary">✦</span>
                        <span>{text}</span>
                        <span className="text-brand-secondary">✦</span>
                        <span>{text}</span>
                        <span className="text-brand-secondary">✦</span>
                        <span>{text}</span>
                    </span>
                </div>
            </div>
        </div>
    );
}
