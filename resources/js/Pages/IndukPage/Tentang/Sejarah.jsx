import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';

export default function Sejarah() {
    const timeline = [
        { year: '1995', title: 'Peletakan Batu Pertama', desc: 'YPDS Al-Hikmah didirikan dengan modal semangat dan tekad untuk memajukan pendidikan di wilayah Jember Selatan.' },
        { year: '2005', title: 'Pengembangan Fasilitas', desc: 'Pembangunan asrama putra dan putri serta gedung laboratorium terpadu.' },
        { year: '2015', title: 'Akreditasi A', desc: 'Seluruh jenjang pendidikan di bawah naungan YPDS Al-Hikmah meraih predikat Akreditasi A.' },
        { year: '2023', title: 'Digitalisasi Pesantren', desc: 'Implementasi sistem administrasi dan pembelajaran berbasis digital secara menyeluruh.' },
    ];

    return (
        <PublicLayout title="Sejarah">
            <div className="bg-brand-secondary py-24 border-b border-brand-light">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-5xl font-semibold text-brand-primary tracking-tighter mb-4 uppercase">Sejarah Perjalanan</h1>
                    <p className="text-brand-accent max-w-2xl mx-auto uppercase tracking-widest font-semibold">Jejak Langkah Mencerdaskan Bangsa</p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-24">
                <div className="relative border-l-2 border-brand-light ml-4 md:ml-0 md:left-1/2">
                    {timeline.map((item, i) => (
                        <div key={i} className={`mb-16 relative ${i % 2 === 0 ? 'md:-left-[420px] text-right' : 'md:left-8'}`}>
                            <div className="absolute top-0 w-8 h-8 bg-brand-primary rounded-full -left-[17px] md:left-auto md:right-[-49px] border-4 border-white shadow-sm"></div>
                            <div className={`bg-brand-secondary p-8 rounded-[0.25rem] border border-brand-light shadow-sm w-full md:w-[400px] inline-block ${i % 2 === 1 ? 'md:ml-4' : ''}`}>
                                <span className="text-2xl font-semibold text-brand-primary block mb-2">{item.year}</span>
                                <h3 className="text-lg font-semibold text-brand-primary mb-4 uppercase tracking-tighter">{item.title}</h3>
                                <p className="text-sm text-brand-accent leading-relaxed">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </PublicLayout>
    );
}


