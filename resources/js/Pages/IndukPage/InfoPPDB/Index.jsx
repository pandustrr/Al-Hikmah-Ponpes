import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';

export default function Pendaftaran() {
    return (
        <PublicLayout title="Info PPDB" navTheme="dark">
            <div className="bg-brand-primary py-32 text-center relative overflow-hidden">
                <div className="absolute inset-0">
                    <img 
                        src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=2000" 
                        alt="Header BG" 
                        className="w-full h-full object-cover opacity-30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-primary to-transparent"></div>
                </div>
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <h1 className="text-5xl font-semibold text-white tracking-tighter mb-4 uppercase">Pendaftaran Santri Baru</h1>
                    <p className="text-brand-secondary font-medium tracking-widest uppercase">Tahun Ajaran 2026/2027</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-12">
                        <section>
                            <h2 className="text-2xl font-semibold text-brand-primary mb-6 border-b-2 border-brand-light pb-2">Persyaratan Umum</h2>
                            <ul className="list-disc list-inside space-y-4 text-brand-accent">
                                <li>Fotokopi Kartu Keluarga & Akta Kelahiran</li>
                                <li>Pas Foto Terbaru ukuran 3x4 (4 lembar)</li>
                                <li>Fotokopi Ijazah & Raport terakhir</li>
                                <li>Surat Keterangan Sehat dari Dokter</li>
                                <li>Mengisi formulir pendaftaran secara online</li>
                            </ul>
                        </section>
                        
                        <section>
                            <h2 className="text-2xl font-semibold text-brand-primary mb-6 border-b-2 border-brand-light pb-2">Jadwal Seleksi</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-brand-secondary p-6 rounded-[0.25rem] border border-brand-light">
                                    <h3 className="font-semibold mb-2">Gelombang 1</h3>
                                    <p className="text-sm text-brand-accent">Januari - Maret 2026</p>
                                </div>
                                <div className="bg-brand-secondary p-6 rounded-[0.25rem] border border-brand-light">
                                    <h3 className="font-semibold mb-2">Gelombang 2</h3>
                                    <p className="text-sm text-brand-accent">April - Juni 2026</p>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-brand-secondary p-8 rounded-[0.25rem] border border-brand-light sticky top-24">
                            <h2 className="text-xl font-semibold text-brand-primary mb-6 uppercase">Daftar Sekarang</h2>
                            <p className="text-sm text-brand-accent mb-8">Mulailah perjalanan pendidikan terbaik putra-putri Anda bersama kami.</p>
                            <button className="btn-primary w-full py-4 text-xs font-semibold uppercase tracking-widest shadow-xl">Isi Formulir Online</button>
                            <div className="mt-8 pt-8 border-t border-brand-light text-center">
                                <p className="text-xs text-brand-accent font-semibold uppercase tracking-widest mb-2">Butuh Bantuan?</p>
                                <p className="text-brand-primary font-semibold">0812-3456-7890</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}


