import React from 'react';
import { Link } from '@inertiajs/react';
import { ArrowRightIcon, ArrowLongRightIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

export default function PpdbCta() {
    const requirements = [
        'Fotokopi Kartu Keluarga & Akta Kelahiran',
        'Pas Foto Terbaru ukuran 3x4 (4 lembar)',
        'Fotokopi Ijazah & Raport terakhir',
        'Surat Keterangan Sehat dari Dokter',
        'Mengisi formulir pendaftaran secara online',
    ];

    return (
        <section className="py-12 md:py-24 bg-brand-secondary reveal-section">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
                    <div className="reveal-element-left">
                        <h2 className="text-xs font-semibold text-brand-accent uppercase tracking-[0.3em] mb-3">Penerimaan Siswa Baru</h2>
                        <h3 className="text-3xl md:text-4xl font-semibold text-brand-primary tracking-tighter uppercase mb-5 leading-tight">Info PPDB <br /> 2026/2027</h3>
                        <div className="h-1 w-20 bg-brand-primary mb-6"></div>
                        <div className="grid grid-cols-2 gap-3 mb-6">
                            <div className="bg-white p-4 md:p-6 border border-brand-accent/20 rounded-[0.25rem]">
                                <div className="text-[10px] font-semibold text-brand-accent uppercase tracking-widest mb-1">Gelombang 1</div>
                                <div className="font-semibold text-brand-primary text-sm">Januari – Maret 2026</div>
                            </div>
                            <div className="bg-white p-4 md:p-6 border border-brand-accent/20 rounded-[0.25rem]">
                                <div className="text-[10px] font-semibold text-brand-accent uppercase tracking-widest mb-1">Gelombang 2</div>
                                <div className="font-semibold text-brand-primary text-sm">April – Juni 2026</div>
                            </div>
                        </div>
                        <Link href="/pendaftaran" className="btn-primary px-7 md:px-10 py-3.5 md:py-4 text-[10px] font-semibold uppercase tracking-[0.2em] inline-flex items-center hover:scale-105 transition-all shadow-xl group">
                            Lihat Info Lengkap PPDB
                            <ArrowLongRightIcon className="h-4 w-4 ml-2 stroke-[3px] group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                    <div className="reveal-element-right">
                        <div className="bg-brand-primary p-7 md:p-10 rounded-[0.25rem] text-white">
                            <h4 className="text-[10px] font-semibold uppercase tracking-widest text-white/50 mb-6">Persyaratan Umum</h4>
                            <ul className="space-y-4">
                                {requirements.map((item, i) => (
                                    <li key={i} className="flex items-start text-sm group">
                                        <CheckCircleIcon className="w-5 h-5 text-brand-secondary/50 group-hover:text-brand-secondary transition-colors mr-3 mt-0.5 flex-shrink-0" />
                                        <span className="text-white/80">{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-8 pt-8 border-t border-white/10 flex items-center justify-between">
                                <div>
                                    <p className="text-[10px] text-white/50 uppercase tracking-widest mb-1">Butuh Bantuan?</p>
                                    <p className="font-semibold text-brand-secondary">0812-3456-7890</p>
                                </div>
                                <Link href="/kontak" className="text-[10px] font-semibold text-brand-secondary/70 hover:text-brand-secondary uppercase tracking-widest transition-colors flex items-center gap-1 group">
                                    Hubungi Kami <ArrowRightIcon className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}


