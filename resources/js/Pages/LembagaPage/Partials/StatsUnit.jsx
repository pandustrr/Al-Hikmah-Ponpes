import React from 'react';

export default function StatsUnit({ lembaga, stats }) {
    return (
        <>
            <section className="bg-white border-b border-slate-100 relative z-20 -mt-10 mx-6 md:mx-12 shadow-2xl rounded-[0.25rem] overflow-hidden">
                <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-100">
                    {stats.map((stat, i) => (
                        <div key={i} className="p-8 md:p-12 text-center group hover:bg-slate-50 transition-colors">
                            <stat.icon className="h-6 w-6 text-brand-primary mx-auto mb-4 opacity-40 group-hover:opacity-100 transition-opacity" />
                            <div className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-1">{stat.value}</div>
                            <div className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* News Ticker (Running Text) */}
            <section className="bg-brand-primary py-4 overflow-hidden border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 flex items-center gap-6">
                    <div className="flex-shrink-0 bg-brand-secondary text-brand-primary text-[8px] font-black uppercase tracking-widest px-3 py-1.5 rounded-sm shadow-lg z-10">
                        PENGUMUMAN
                    </div>
                    <div className="relative flex-grow overflow-hidden whitespace-nowrap">
                        <div className="inline-block animate-ticker-slow text-white/80 text-[11px] font-medium tracking-wide uppercase">
                            {lembaga.running_text || "Selamat Datang di Portal Resmi Al-Hikmah Jember. Mari Membangun Masa Depan Gemilang Bersama Kami."}
                            <span className="mx-20">***</span>
                            {lembaga.running_text || "Selamat Datang di Portal Resmi Al-Hikmah Jember. Mari Membangun Masa Depan Gemilang Bersama Kami."}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
