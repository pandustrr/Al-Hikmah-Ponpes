import React from 'react';
import { Link } from '@inertiajs/react';
import { MapPinIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

export default function UpcomingEvents({ events = [] }) {
    if (events.length === 0) return null;

    const formatDay = (dateStr) => new Date(dateStr).getDate();
    const formatMonthYear = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('id-ID', { month: 'short', year: 'numeric' });
    };

    return (
        <section className="py-16 bg-white border-b border-brand-light reveal-section">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4 reveal-element-up">
                    <div>
                        <h2 className="text-xs font-semibold text-brand-accent uppercase tracking-[0.3em] mb-2">Agenda Yayasan</h2>
                        <h3 className="text-4xl font-semibold text-brand-primary tracking-tighter uppercase">Event yang Akan Datang</h3>
                        <div className="h-1 w-20 bg-brand-primary mt-4"></div>
                    </div>
                    <Link href="/kegiatan" className="text-[9px] font-semibold text-brand-accent hover:text-brand-primary uppercase tracking-widest inline-flex items-center gap-1 transition-colors whitespace-nowrap shrink-0 group">
                        Lihat Semua Event <ArrowRightIcon className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {events.map((event, i) => (
                        <Link key={event.id} href="/kegiatan" className="group card-clean flex flex-col reveal-element-up" style={{ transitionDelay: `${i * 100}ms` }}>
                            <div className="relative aspect-[16/10] bg-brand-secondary overflow-hidden rounded-t-[0.25rem]">
                                <img
                                    src={event.image_url}
                                    alt={event.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                                />
                                <div className="absolute top-3 left-3 bg-brand-primary text-center px-3 py-2 rounded-[0.25rem] shadow-lg">
                                    <div className="text-xl font-semibold text-brand-secondary leading-none">{formatDay(event.date)}</div>
                                    <div className="text-[8px] font-semibold text-white/70 uppercase tracking-widest">{formatMonthYear(event.date)}</div>
                                </div>
                            </div>
                            <div className="p-5 border-x border-b border-brand-secondary group-hover:border-brand-primary transition-colors flex-grow rounded-b-[0.25rem]">
                                <div className="text-[9px] font-semibold text-brand-accent mb-2 uppercase tracking-widest">{event.lembaga}</div>
                                <h4 className="font-semibold text-brand-primary text-sm leading-snug group-hover:text-brand-accent transition-colors line-clamp-2 mb-3 uppercase tracking-tight">{event.title}</h4>
                                <div className="flex items-center text-[9px] text-brand-accent uppercase tracking-widest">
                                    <MapPinIcon className="h-3 w-3 mr-1 flex-shrink-0" />
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


