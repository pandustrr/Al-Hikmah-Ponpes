import React from 'react';
import { AcademicCapIcon, PhoneIcon, ArrowRightIcon, LinkIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

export default function PpdbSection({ lembaga, ppdbInfo }) {
    if (!ppdbInfo) return null;

    const waNumber = ppdbInfo.contact_number?.replace(/\D/g, '');
    const currentYear = new Date().getFullYear();

    return (
        <section className="py-20 md:py-24 bg-[#FBFBF9] border-t border-slate-100">
            <div className="max-w-7xl mx-auto px-6 md:px-12">

                {/* Section label */}
                <div className="inline-flex items-center gap-2 mb-8">
                    <span className="h-[2px] w-8 bg-brand-primary"></span>
                    <span className="text-brand-primary text-[10px] font-bold uppercase tracking-[0.3em]">Penerimaan Peserta Didik Baru</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                    {/* Left: Deskripsi & CTA */}
                    <div>
                        <h2 className="text-3xl md:text-4xl font-serif font-semibold text-slate-900 tracking-tight leading-tight mb-6">
                            Bergabunglah Bersama <br />
                            <span className="text-brand-primary">{lembaga.nama}</span>
                        </h2>

                        {ppdbInfo.description && (
                            <p className="text-slate-600 text-sm leading-relaxed mb-8 whitespace-pre-line">
                                {ppdbInfo.description}
                            </p>
                        )}

                        {/* Checklist highlights */}
                        <ul className="space-y-3 mb-10">
                            {[
                                'Lingkungan belajar islami & modern',
                                'Tenaga pendidik berpengalaman & bersertifikasi',
                                'Kurikulum terintegrasi nilai pesantren',
                                'Fasilitas lengkap & representatif',
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                                    <CheckCircleIcon className="h-4 w-4 text-brand-primary mt-0.5 shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <div className="flex flex-col sm:flex-row gap-3">
                            {ppdbInfo.registration_link && (
                                <a
                                    href={ppdbInfo.registration_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-brand-primary hover:bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.25em] px-8 py-4 transition-all rounded-[0.25rem] shadow-xl shadow-brand-primary/20 group"
                                >
                                    <AcademicCapIcon className="h-4 w-4" />
                                    Daftar Sekarang
                                    <ArrowRightIcon className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                                </a>
                            )}
                            {waNumber && (
                                <a
                                    href={`https://wa.me/${waNumber}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 border border-slate-200 hover:border-brand-primary bg-white text-slate-700 hover:text-brand-primary text-[10px] font-black uppercase tracking-[0.25em] px-8 py-4 transition-all rounded-[0.25rem]"
                                >
                                    <PhoneIcon className="h-4 w-4" />
                                    Hubungi Kami
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Right: Registration Info Card */}
                    <div className="bg-white border border-slate-200 rounded-[0.25rem] shadow-lg overflow-hidden">

                        {/* Card Header */}
                        <div className="bg-brand-primary px-6 py-5 md:px-8 md:py-6">
                            <p className="text-brand-secondary text-[9px] font-black uppercase tracking-[0.3em] mb-1">Informasi Pendaftaran</p>
                            <h3 className="text-white text-lg font-bold uppercase tracking-tight">
                                PPDB {currentYear}/{currentYear + 1}
                            </h3>
                            <p className="text-white/60 text-[10px] mt-1 tracking-wider">{lembaga.nama}</p>
                        </div>

                        {/* Card Body */}
                        <div className="p-6 md:p-8 space-y-6">

                            {/* Status */}
                            <div className="flex items-center gap-3">
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
                                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Pendaftaran Sedang Dibuka</span>
                            </div>

                            <div className="h-px bg-slate-100"></div>

                            {/* Contact */}
                            {ppdbInfo.contact_number && (
                                <div className="flex items-start gap-4">
                                    <div className="w-9 h-9 rounded-full bg-brand-primary/5 flex items-center justify-center shrink-0">
                                        <PhoneIcon className="h-4 w-4 text-brand-primary" />
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1">Kontak / WhatsApp</p>
                                        <a
                                            href={`https://wa.me/${waNumber}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm font-bold text-slate-800 hover:text-brand-primary transition-colors"
                                        >
                                            {ppdbInfo.contact_number}
                                        </a>
                                    </div>
                                </div>
                            )}

                            {/* Registration Link */}
                            {ppdbInfo.registration_link && (
                                <div className="flex items-start gap-4">
                                    <div className="w-9 h-9 rounded-full bg-brand-primary/5 flex items-center justify-center shrink-0">
                                        <LinkIcon className="h-4 w-4 text-brand-primary" />
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1">Formulir Pendaftaran Online</p>
                                        <a
                                            href={ppdbInfo.registration_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm font-bold text-brand-primary hover:underline truncate block max-w-[220px]"
                                        >
                                            Klik di sini untuk mendaftar →
                                        </a>
                                    </div>
                                </div>
                            )}

                            <div className="h-px bg-slate-100"></div>

                            {/* CTA Footer */}
                            {ppdbInfo.registration_link && (
                                <a
                                    href={ppdbInfo.registration_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 w-full bg-brand-primary hover:bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest py-4 transition-all rounded-[0.25rem] group"
                                >
                                    <AcademicCapIcon className="h-4 w-4" />
                                    Isi Formulir Pendaftaran
                                    <ArrowRightIcon className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                                </a>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
