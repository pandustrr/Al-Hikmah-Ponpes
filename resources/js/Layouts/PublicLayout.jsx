import React from 'react';
import NavbarInduk from './NavbarInduk';
import Footer from './Footer';
import { Head, usePage, Link } from '@inertiajs/react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function PublicLayout({ children, title, isLembaga = false, navTheme = 'light', isAuth = false }) {
    const { props } = usePage();
    const lembaga = props.lembaga || null;

    if (isAuth) {
        const loginBg = props.loginBg || 'https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?w=1600';
        return (
            <div 
                className="min-h-screen flex flex-col sm:justify-center items-center p-6 bg-cover bg-center relative"
                style={{ backgroundImage: `url(${loginBg})` }}
            >
                {/* Dark overlay with premium backdrop-blur */}
                <div className="absolute inset-0 bg-brand-primary/80 backdrop-blur-[2px] z-0"></div>

                <Head title={title ? `${title} - Al-Hikmah` : 'Yayasan Al-Hikmah'} />

                <div className="w-full sm:max-w-md bg-white/95 backdrop-blur shadow-2xl border border-white/20 overflow-hidden rounded-[0.5rem] p-10 flex flex-col relative z-10">
                    {/* Logo inside container */}
                    <div className="flex justify-center mb-8">
                        <Link href="/">
                            <div className="flex flex-col items-center gap-3 group">
                                <div className="h-16 w-16 p-2 bg-brand-primary/5 rounded-full border border-brand-primary/20 shadow-sm flex items-center justify-center transition-all group-hover:scale-105">
                                    <img src="/logo.png" alt="Logo YPDS Al-Hikmah" className="max-w-full max-h-full object-contain" />
                                </div>
                                <span className="text-xs font-bold text-brand-primary uppercase tracking-[0.2em] group-hover:text-brand-accent transition-colors">YPDS AL-HIKMAH</span>
                            </div>
                        </Link>
                    </div>

                    {/* Form content */}
                    <div className="flex-grow">
                        {children}
                    </div>

                    {/* Back link inside container */}
                    <div className="mt-10 pt-6 border-t border-slate-100 text-center">
                        <Link href="/" className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400 hover:text-brand-primary transition-all inline-flex items-center gap-2 group">
                            <ArrowLeftIcon className="h-3 w-3 transition-transform group-hover:-translate-x-1" /> Kembali ke Beranda
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Head title={title ? `${title} - Al-Hikmah` : 'Yayasan Al-Hikmah'} />

            <NavbarInduk navTheme={navTheme} />

            <main className="flex-grow">
                {children}
            </main>

            <Footer />
        </div>
    );
}
