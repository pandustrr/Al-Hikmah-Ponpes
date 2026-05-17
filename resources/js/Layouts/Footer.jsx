import React from 'react';

export default function Footer() {
    return (
        <footer className="bg-brand-primary text-white/70 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-2">
                        <div className="flex items-center gap-3 mb-4">
                            <img src="/logo.png" alt="Logo YPDS Al-Hikmah" className="h-10 w-auto object-contain p-1 bg-white/10 rounded-lg border border-white/10" />
                            <h3 className="text-white text-lg font-semibold tracking-tighter">YPDS AL-HIKMAH</h3>
                        </div>
                        <p className="text-sm leading-relaxed max-w-md">
                            Mencetak generasi rabbani yang unggul dalam ilmu pengetahuan, kokoh dalam iman, dan mulia dalam akhlak.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Tautan</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-white transition-colors">Sejarah</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Visi & Misi</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Pendaftaran</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Kontak</h4>
                        <ul className="space-y-2 text-sm">
                            <li>Ambulu, Jember, Jawa Timur</li>
                            <li>info@alhikmahypds.sch.id</li>
                            <li>(0331) 123456</li>
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
