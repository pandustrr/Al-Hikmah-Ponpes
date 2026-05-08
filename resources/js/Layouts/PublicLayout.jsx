import React from 'react';
import NavbarInduk from './NavbarInduk';
import NavbarLembaga from './NavbarLembaga';
import Footer from './Footer';
import { Head, usePage, Link } from '@inertiajs/react';

export default function PublicLayout({ children, title, isLembaga = false, navTheme = 'light', isAuth = false }) {
    const { props } = usePage();
    const lembaga = props.lembaga || null;

    if (isAuth) {
        return (
            <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-slate-50">
                <Head title={title ? `${title} - Al-Hikmah` : 'Yayasan Al-Hikmah'} />
                
                <div className="mb-8">
                    <Link href="/">
                        <div className="w-16 h-16 bg-brand-primary text-white flex items-center justify-center font-black text-2xl rounded-[0.25rem] shadow-xl">
                            AL
                        </div>
                    </Link>
                </div>

                <div className="w-full sm:max-w-md mt-6 px-10 py-10 bg-white shadow-sm border border-slate-200 overflow-hidden sm:rounded-[0.25rem]">
                    {children}
                </div>

                <div className="mt-8">
                    <Link href="/" className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-brand-primary transition-all">
                        ← Kembali ke Beranda
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Head title={title ? `${title} - Al-Hikmah` : 'Yayasan Al-Hikmah'} />
            
            {isLembaga ? (
                <NavbarLembaga theme={navTheme} lembaga={lembaga} />
            ) : (
                <NavbarInduk navTheme={navTheme} />
            )}
            
            <main className="flex-grow">
                {children}
            </main>

            <Footer />
        </div>
    );
}
