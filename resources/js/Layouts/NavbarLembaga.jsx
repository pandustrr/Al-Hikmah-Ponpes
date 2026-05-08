import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { MagnifyingGlassIcon, Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function NavbarLembaga({ theme = 'light', lembaga }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Beranda', href: `/${lembaga?.slug}` },
        { name: 'Tentang', href: `/${lembaga?.slug}#tentang` },
        { name: 'Berita', href: `/${lembaga?.slug}#berita` },
        { name: 'Info PPDB', href: '/pendaftaran' },
        { name: 'Fasilitas', href: `/${lembaga?.slug}#fasilitas` },
        { name: 'Alumni', href: `/${lembaga?.slug}#alumni` },
    ];

    const getLinkClass = () => {
        if (isScrolled) {
            return 'text-slate-600 hover:text-slate-900 hover:bg-slate-100';
        }
        return theme === 'dark' 
            ? 'text-white/90 hover:text-white hover:bg-white/10' 
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100';
    };

    const getLogoTextClass = () => {
        if (isScrolled) return 'text-slate-900';
        return theme === 'dark' ? 'text-white' : 'text-slate-900';
    };

    const getLogoBoxClass = () => {
        if (isScrolled) return 'bg-slate-900 text-white';
        return theme === 'dark' ? 'bg-white text-slate-900' : 'bg-slate-900 text-white';
    };

    return (
        <nav className={`fixed w-full z-[100] transition-all duration-500 ${
            isScrolled ? 'bg-white py-2 shadow-xl border-b border-slate-100' : 'bg-transparent py-4'
        }`}>
            <div className="max-w-[95%] mx-auto px-4 flex justify-between items-center h-14">
                <Link href="/" className="group flex items-center gap-3">
                    <div className={`w-10 h-10 flex items-center justify-center font-black text-xl transition-all duration-500 ${getLogoBoxClass()}`}>
                        {lembaga?.slug?.toUpperCase().substring(0, 2) || 'AL'}
                    </div>
                    <div>
                        <span className={`block text-lg font-black tracking-tighter leading-none transition-colors duration-500 ${getLogoTextClass()}`}>
                            {lembaga?.nama || 'AL-HIKMAH'}
                        </span>
                        <span className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-colors duration-500 ${
                            isScrolled ? 'text-brand-accent' : (theme === 'dark' ? 'text-slate-400' : 'text-slate-400')
                        }`}>
                            Unit Pendidikan
                        </span>
                    </div>
                </Link>

                <div className="hidden lg:flex items-center space-x-0.5">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`px-3 py-2 text-[10px] font-black uppercase tracking-[0.1em] transition-all duration-300 rounded-[0.25rem] ${getLinkClass()}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="w-4"></div>
                    <Link 
                        href="/"
                        className={`px-5 py-2 text-[10px] font-black uppercase tracking-widest transition-all rounded-[0.25rem] ${
                            isScrolled 
                            ? 'bg-slate-900 text-white hover:bg-slate-800' 
                            : (theme === 'dark' ? 'bg-white text-slate-900 hover:bg-slate-100 shadow-lg' : 'bg-slate-900 text-white hover:bg-slate-800')
                        }`}
                    >
                        Kembali ke Yayasan
                    </Link>

                    <button className={`p-2 ml-2 transition-colors ${
                        isScrolled ? 'text-slate-600 hover:text-slate-900' : (theme === 'dark' ? 'text-white hover:text-brand-accent' : 'text-slate-600 hover:text-slate-900')
                    }`}>
                        <MagnifyingGlassIcon className="h-4 w-4 stroke-[3px]" />
                    </button>
                </div>

                <button 
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className={`lg:hidden p-2 transition-colors ${
                        isScrolled ? 'text-slate-900' : (theme === 'dark' ? 'text-white' : 'text-slate-900')
                    }`}
                >
                    {isMobileMenuOpen ? (
                        <XMarkIcon className="h-6 w-6 stroke-2" />
                    ) : (
                        <Bars3BottomRightIcon className="h-6 w-6 stroke-2" />
                    )}
                </button>
            </div>

            <div className={`lg:hidden fixed inset-0 z-[90] transition-all duration-500 ${
                isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}>
                <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
                <div className="absolute right-0 top-0 bottom-0 w-80 bg-white p-12 shadow-2xl text-slate-900">
                    <nav className="flex flex-col gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-xl font-black uppercase tracking-tighter hover:text-brand-primary transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <hr className="border-slate-100" />
                        <Link 
                            href="/"
                            className="text-sm font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors"
                        >
                            Kembali ke Yayasan
                        </Link>
                    </nav>
                </div>
            </div>
        </nav>
    );
}
