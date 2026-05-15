import React from 'react';
import NavbarInduk from './NavbarInduk';
import Footer from './Footer';
import { Head, usePage, Link } from '@inertiajs/react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function PublicLayout({ children, title, isLembaga = false, navTheme = 'light', isAuth = false }) {
    const { props } = usePage();
    const lembaga = props.lembaga || null;

    if (isAuth) {
        return (
            <div className="min-h-screen flex flex-col sm:justify-center items-center p-6 bg-slate-50">
                <Head title={title ? `${title} - Al-Hikmah` : 'Yayasan Al-Hikmah'} />
                
                <div className="w-full sm:max-w-md bg-white shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden rounded-[0.5rem] p-10 flex flex-col">
                    {/* Logo inside container */}
                    <div className="flex justify-center mb-8">
                        <Link href="/">
                            <div className="px-6 py-4 bg-brand-primary text-white flex items-center justify-center font-bold text-sm uppercase tracking-[0.2em] rounded-[0.25rem] shadow-lg leading-none">
                                Al- Hikmah
                            </div>
                        </Link>
                    </div>

                    {/* Form content */}
                    <div className="flex-grow">
                        {children}
                    </div>

                    {/* Back link inside container */}
                    <div className="mt-10 pt-6 border-t border-slate-100 text-center">
                        <Link href="/" className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-brand-primary transition-all inline-flex items-center gap-2 group">
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
