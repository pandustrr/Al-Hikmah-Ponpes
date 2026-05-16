import React from 'react';
import { Link } from '@inertiajs/react';

export default function CTAUnit({ lembaga }) {
    return (
        <section className="py-16 max-w-7xl mx-auto px-6 md:px-12">
            <div className="bg-brand-primary rounded-[0.25rem] p-10 md:p-16 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/az-subtle.png')] opacity-10"></div>
                <div className="relative z-10 max-w-xl mx-auto">
                    <h3 className="text-white text-2xl md:text-3xl font-serif font-semibold tracking-tight mb-4">Mulai Perjalanan Pendidikan di <span className="text-brand-secondary">{lembaga.nama}</span></h3>
                    <p className="text-white/60 text-xs md:text-sm mb-8 leading-relaxed">
                        Pendaftaran gelombang saat ini masih dibuka. Pastikan putra-putri Anda mendapatkan lingkungan belajar yang sesuai dengan tuntunan.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link 
                            href="/info-ppdb"
                            className="w-full sm:w-auto bg-brand-secondary text-brand-primary text-[9px] font-bold uppercase tracking-widest px-8 py-4 rounded-[0.2rem] hover:bg-white transition-all shadow-xl"
                        >
                            Daftar PPDB Online
                        </Link>
                        <Link 
                            href="/kontak"
                            className="w-full sm:w-auto text-white/60 text-[9px] font-bold uppercase tracking-widest hover:text-white transition-colors"
                        >
                            Tanya Admin
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
