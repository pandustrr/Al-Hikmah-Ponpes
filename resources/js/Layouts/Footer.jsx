import React from 'react';
import { usePage, Link } from '@inertiajs/react';

export default function Footer() {
    const { props } = usePage();
    const settings = props.settings || {};

    const email = settings.portal_email_kontak || 'info@alhikmahypds.sch.id';
    const waNumber = settings.sosmed_whatsapp || '6281234567890';
    const alamat = settings.contact_alamat || 'Ambulu, Jember, Jawa Timur';
    const footerTagline = settings.contact_footer_tagline || 'Mencetak generasi rabbani yang unggul dalam ilmu pengetahuan, kokoh dalam iman, dan mulia dalam akhlak.';
    
    // Format WA number for display
    const formattedWa = waNumber.startsWith('62') ? '+' + waNumber : waNumber;

    return (
        <footer className="bg-brand-primary text-white/70 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-3 mb-4">
                            <img src="/logo.png" alt="Logo YPDS Al-Hikmah" className="h-10 w-auto object-contain p-1 bg-white/10 rounded-lg border border-white/10" />
                            <h3 className="text-white text-lg font-semibold tracking-tighter">YPDS AL-HIKMAH</h3>
                        </div>
                        <p className="text-sm leading-relaxed max-w-md whitespace-pre-line">
                            {footerTagline}
                        </p>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Tautan</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/" className="hover:text-white transition-colors">Beranda</Link></li>
                            <li><Link href="/profil" className="hover:text-white transition-colors">Profil Yayasan</Link></li>
                            <li><Link href="/berita" className="hover:text-white transition-colors">Kabar Berita</Link></li>
                            <li><Link href="/info-ppdb" className="hover:text-white transition-colors">Info PPDB</Link></li>
                            <li><Link href="/fasilitas" className="hover:text-white transition-colors">Fasilitas</Link></li>
                            <li><Link href="/kontak" className="hover:text-white transition-colors">Hubungi Kami</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Kontak</h4>
                        <ul className="space-y-2 text-sm">
                            <li>{alamat}</li>
                            <li>
                                <a href={`mailto:${email}`} className="hover:text-white transition-colors">{email}</a>
                            </li>
                            <li>
                                <a href={`https://wa.me/${waNumber.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                                    {formattedWa}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-white/10 text-center text-xs">
                    &copy; {new Date().getFullYear()} YPDS Al-Hikmah. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
