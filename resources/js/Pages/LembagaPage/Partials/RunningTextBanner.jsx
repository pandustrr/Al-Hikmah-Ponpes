import React from 'react';

export default function RunningTextBanner({ text }) {
    if (!text) return null;

    // Repeat text multiple times so the track is always full
    const repeated = Array(6).fill(text).join('   ✦   ');

    return (
        <div className="bg-brand-primary py-3.5 overflow-hidden flex items-center relative">
            {/* Left label badge */}
            <div className="shrink-0 z-10 bg-brand-secondary text-brand-primary text-[9px] font-black uppercase tracking-[0.25em] px-5 py-2.5 absolute left-0 top-0 h-full flex items-center">
                Info Terkini
            </div>

            {/* Scrolling container */}
            <div className="w-full overflow-hidden pl-[120px]">
                {/*
                  Two identical tracks side-by-side.
                  When track-1 slides fully off left, track-2 fills the gap.
                  The animation resets seamlessly because both tracks have the
                  same content and width, creating an infinite loop with no
                  blank gap at the start.
                */}
                <div className="flex whitespace-nowrap" style={{ animation: 'ticker-scroll 25s linear infinite' }}>
                    <span className="text-white text-[11px] font-semibold uppercase tracking-[0.2em] pr-16 inline-block">
                        {repeated}
                    </span>
                    <span className="text-white text-[11px] font-semibold uppercase tracking-[0.2em] pr-16 inline-block" aria-hidden="true">
                        {repeated}
                    </span>
                </div>
            </div>

            <style>{`
                @keyframes ticker-scroll {
                    0%   { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
            `}</style>
        </div>
    );
}
