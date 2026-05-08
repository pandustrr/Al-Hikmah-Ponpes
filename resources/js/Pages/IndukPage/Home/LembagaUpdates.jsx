import React from 'react';
import { Link } from '@inertiajs/react';

export default function LembagaUpdates({ lembagas }) {
    return (
        <section className="py-12 md:py-24 bg-white border-b border-brand-light reveal-section">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-10 md:mb-20 reveal-element-up">
                    <h2 className="text-xs font-bold text-brand-accent uppercase tracking-[0.3em] mb-3">Informasi Terkini</h2>
                    <h3 className="text-3xl md:text-4xl font-black text-brand-primary tracking-tighter uppercase mb-5">Update Lembaga</h3>
                    <div className="h-1 w-20 bg-brand-primary mx-auto"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
                    {/* LEFT — Lembaga Updates */}
                    <div className="lg:col-span-8 space-y-12 md:space-y-20">
                        {lembagas.map((lembaga) => (
                            <div key={lembaga.id} className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start border-l-4 border-brand-secondary pl-5 md:pl-8 reveal-element-up">
                                <div className="lg:col-span-4">
                                    <div className="sticky top-24">
                                        <h3 className="text-6xl font-black text-brand-primary/5 mb-[-1.2rem] uppercase">{lembaga.slug}</h3>
                                        <h4 className="text-xl font-black text-brand-primary mb-4 uppercase tracking-tighter">{lembaga.nama}</h4>
                                        <Link href={`/${lembaga.slug}`} className="text-brand-accent text-xs font-black hover:text-brand-primary uppercase tracking-[0.15em] inline-flex items-center bg-brand-secondary px-4 py-2.5 transition-all rounded-[0.25rem]">
                                            Kunjungi {lembaga.slug.toUpperCase()}
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                                <div className="lg:col-span-8">
                                    <div className="space-y-5">
                                        <h5 className="text-[10px] font-black uppercase tracking-widest text-brand-primary border-b-2 border-brand-primary pb-2 flex items-center gap-2">
                                            <span className="w-2 h-2 bg-brand-primary rounded-full"></span>
                                            Prestasi Terbaru
                                        </h5>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                            {lembaga.latest_prestasi?.map(p => (
                                                <div key={p.id} className="group bg-white border border-brand-secondary hover:border-brand-primary transition-all rounded-[0.25rem] overflow-hidden">
                                                    <Link href={`/prestasi/${p.slug}`} className="block">
                                                        <div className="aspect-[16/9] overflow-hidden bg-brand-secondary">
                                                            <img
                                                                src={p.image_url || "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&q=80&w=400"}
                                                                alt={p.judul}
                                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                                onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1544717305-996b815c338c?auto=format&fit=crop&q=80&w=400"; }}
                                                            />
                                                        </div>
                                                    </Link>
                                                    <div className="p-3">
                                                        <Link href={`/prestasi/${p.slug}`}>
                                                            <h6 className="font-black text-brand-primary group-hover:text-brand-accent transition-colors leading-snug text-[12px] line-clamp-2 mb-2">{p.judul}</h6>
                                                        </Link>
                                                        <div className="flex items-center gap-3">
                                                            <span className="text-[8px] font-black text-brand-accent uppercase tracking-[0.15em]">Share</span>
                                                            <div className="flex gap-2">
                                                                <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`🏆 ${p.judul} — YPDS Al-Hikmah\n${window.location.origin}/prestasi/${p.slug}`)}`} target="_blank" rel="noopener noreferrer" title="WhatsApp" className="text-brand-accent hover:text-[#25D366] transition-colors">
                                                                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                                                                </a>
                                                                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${window.location.origin}/prestasi/${p.slug}`)}`} target="_blank" rel="noopener noreferrer" title="Facebook" className="text-brand-accent hover:text-[#1877F2] transition-colors">
                                                                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                                                                </a>
                                                                <button title="Instagram" className="text-brand-accent hover:text-[#E4405F] transition-colors">
                                                                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* RIGHT SIDEBAR — Pengumuman & Artikel */}
                    <div className="lg:col-span-4 hidden lg:block">
                        <div className="sticky top-24 space-y-10">
                            <div>
                                <div className="border-b-2 border-brand-primary pb-3 mb-5">
                                    <h4 className="text-sm font-black text-brand-primary uppercase tracking-widest">Pengumuman</h4>
                                </div>
                                <div className="space-y-5">
                                    {[
                                        { title: 'Pengumuman Ujian Akhir Semester MTS 2026', date: '06/05/2026' },
                                        { title: 'Jadwal Libur Idul Adha Seluruh Lembaga', date: '05/05/2026' },
                                        { title: 'Pembukaan Pendaftaran Ekskul Baru Tahun Ajaran 2026', date: '04/05/2026' },
                                    ].map((item, i) => (
                                        <Link key={i} href="/berita?kategori=pengumuman" className="block group border-b border-brand-secondary pb-4">
                                            <div className="text-[9px] font-black text-brand-accent uppercase tracking-widest mb-1">Berita · {item.date}</div>
                                            <p className="text-xs font-bold text-brand-primary group-hover:text-brand-accent transition-colors leading-snug line-clamp-2">{item.title}</p>
                                        </Link>
                                    ))}
                                    <Link href="/berita?kategori=pengumuman" className="text-[9px] font-black text-brand-accent hover:text-brand-primary uppercase tracking-widest transition-colors">Lihat Semua →</Link>
                                </div>
                            </div>
                            
                            {/* Artikel Section */}
                            <div>
                                <div className="border-b-2 border-brand-primary pb-3 mb-5">
                                    <h4 className="text-sm font-black text-brand-primary uppercase tracking-widest">Artikel</h4>
                                </div>
                                <div className="space-y-5">
                                    {[
                                        { title: 'Adab Sebelum Ilmu: Mengapa Karakter Adalah Fondasi Pendidikan?', date: '06/05/2026' },
                                        { title: 'Menjaga Hafalan Al-Qur\'an di Era Digital', date: '05/05/2026' },
                                        { title: 'Teknologi dalam Pendidikan Islam Modern', date: '04/05/2026' },
                                    ].map((item, i) => (
                                        <Link key={i} href="/berita?kategori=artikel" className="block group border-b border-brand-secondary pb-4">
                                            <div className="text-[9px] font-black text-brand-accent uppercase tracking-widest mb-1">Artikel · {item.date}</div>
                                            <p className="text-xs font-bold text-brand-primary group-hover:text-brand-accent transition-colors leading-snug line-clamp-2">{item.title}</p>
                                        </Link>
                                    ))}
                                    <Link href="/berita?kategori=artikel" className="text-[9px] font-black text-brand-accent hover:text-brand-primary uppercase tracking-widest transition-colors">Lihat Semua →</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}


