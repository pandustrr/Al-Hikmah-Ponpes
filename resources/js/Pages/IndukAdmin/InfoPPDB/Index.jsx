import React from 'react';
import IndukAdminLayout from '@/Layouts/Induk/IndukAdminLayout';

export default function Index(props) {
    return (
        <IndukAdminLayout title="Info PPDB">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                {/* Header Section with Decorative Line */}
                <div className="relative mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <span className="h-[1px] w-8 bg-brand-gold"></span>
                            <h2 className="text-[10px] font-semibold uppercase tracking-[0.4em] text-brand-gold">Pusat Yayasan</h2>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-serif font-semibold tracking-tight text-brand-primary">
                            Kelola Informasi <span className="italic text-brand-accent">PPDB</span>
                        </h1>
                    </div>
                    
                    <button className="px-8 py-4 bg-brand-primary text-brand-secondary text-[10px] font-semibold uppercase tracking-[0.2em] rounded-[0.25rem] shadow-premium hover:bg-brand-accent transition-all duration-500 flex items-center gap-3 group">
                        Buat Pengumuman Baru
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-gold group-hover:scale-150 transition-transform"></span>
                    </button>
                </div>

                {/* Dashboard Stats / Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {[
                        { label: 'Total Pendaftar', value: '1,240', trend: '+12%' },
                        { label: 'Gelombang Aktif', value: 'Gelombang 2', trend: 'Berakhir 30 Jun' },
                        { label: 'Status Server', value: 'Optimal', trend: '99.9% Uptime' },
                    ].map((stat, i) => (
                        <div key={i} className="bg-brand-secondary/50 border border-sage-light p-8 rounded-[0.5rem] hover:shadow-premium transition-all duration-500 group">
                            <p className="text-[10px] font-semibold uppercase tracking-widest text-brand-accent mb-4 group-hover:text-brand-gold transition-colors">{stat.label}</p>
                            <div className="flex items-baseline gap-4">
                                <h3 className="text-3xl font-serif font-semibold text-brand-primary">{stat.value}</h3>
                                <span className="text-[10px] font-semibold text-brand-accent italic">{stat.trend}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Content Card (Empty State with Design) */}
                <div className="relative overflow-hidden bg-white border border-sage-light rounded-[0.5rem] shadow-sm min-h-[400px] flex flex-col items-center justify-center p-12 group">
                    {/* Subtle Background Pattern (Geometric) */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <path d="M0,0 L100,100 M100,0 L0,100" stroke="currentColor" strokeWidth="0.1" />
                        </svg>
                    </div>

                    <div className="relative z-10 text-center max-w-md space-y-6">
                        <div className="w-20 h-20 bg-brand-secondary rounded-full flex items-center justify-center mx-auto mb-8 border border-sage-light group-hover:scale-110 transition-transform duration-700">
                            <div className="w-3 h-3 bg-brand-gold rounded-full animate-pulse"></div>
                        </div>
                        <h4 className="text-xl font-serif font-semibold text-brand-primary">Siap Untuk Melangkah</h4>
                        <p className="text-sm text-brand-accent leading-relaxed">
                            Mulai kelola informasi pendaftaran santri baru dengan menambahkan pengumuman atau mengatur gelombang pendaftaran di sini.
                        </p>
                        <div className="pt-4">
                            <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-brand-accent/50">YAYASAN AL-HIKMAH AMBULU</span>
                        </div>
                    </div>
                </div>
            </div>
        </IndukAdminLayout>
    );
}
