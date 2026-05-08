import React from 'react';
import { Link } from '@inertiajs/react';

export default function UpcomingEvents() {
    const events = [
        { date: '15', month: 'Mei 2026', title: 'Musabaqah Tilawatil Quran Antar Siswa 2026', lembaga: 'MTS · MA · SMK', lokasi: 'Aula Utama', img: 'https://images.unsplash.com/photo-1585829365234-781f8c4414b8?auto=format&fit=crop&q=80&w=600' },
        { date: '22', month: 'Mei 2026', title: 'Seminar Nasional Pendidikan Islam Digital', lembaga: 'Seluruh Lembaga', lokasi: 'Gedung Serbaguna', img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600' },
        { date: '01', month: 'Jun 2026', title: 'Wisuda & Haflah Akhirussanah 2026', lembaga: 'MA · SMK', lokasi: 'Lapangan Utama', img: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=600' },
        { date: '10', month: 'Jun 2026', title: 'Penerimaan Siswa Baru Gelombang 2', lembaga: 'MTS · MA · SMK', lokasi: 'Kantor Pusat', img: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&q=80&w=600' },
    ];

    return (
        <section className="py-16 bg-white border-b border-brand-light reveal-section">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4 reveal-element-up">
                    <div>
                        <h2 className="text-xs font-bold text-brand-accent uppercase tracking-[0.3em] mb-2">Agenda Yayasan</h2>
                        <h3 className="text-4xl font-black text-brand-primary tracking-tighter uppercase">Event yang Akan Datang</h3>
                        <div className="h-1 w-20 bg-brand-primary mt-4"></div>
                    </div>
                    <Link href="/kegiatan" className="text-[9px] font-black text-brand-accent hover:text-brand-primary uppercase tracking-widest inline-flex items-center transition-colors whitespace-nowrap shrink-0">
                        Lihat Semua Event →
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {events.map((event, i) => (
                        <Link key={i} href="/kegiatan" className="group card-clean flex flex-col reveal-element-up" style={{ transitionDelay: `${i * 100}ms` }}>
                            <div className="relative aspect-[16/10] bg-brand-secondary overflow-hidden rounded-t-[0.25rem]">
                                <img
                                    src={event.img}
                                    alt={event.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                                />
                                <div className="absolute top-3 left-3 bg-brand-primary text-center px-3 py-2 rounded-[0.25rem] shadow-lg">
                                    <div className="text-xl font-black text-brand-secondary leading-none">{event.date}</div>
                                    <div className="text-[8px] font-bold text-white/70 uppercase tracking-widest">{event.month}</div>
                                </div>
                            </div>
                            <div className="p-5 border-x border-b border-brand-secondary group-hover:border-brand-primary transition-colors flex-grow rounded-b-[0.25rem]">
                                <div className="text-[9px] font-black text-brand-accent mb-2 uppercase tracking-widest">{event.lembaga}</div>
                                <h4 className="font-black text-brand-primary text-sm leading-snug group-hover:text-brand-accent transition-colors line-clamp-2 mb-3 uppercase tracking-tight">{event.title}</h4>
                                <div className="flex items-center text-[9px] text-brand-accent uppercase tracking-widest">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                                    </svg>
                                    {event.lokasi}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}


