import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { MagnifyingGlassIcon, ChevronDownIcon, Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function NavbarInduk({ navTheme = 'light' }) {
    const { url, props } = usePage();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [showLembaga, setShowLembaga] = useState(false);
    
    const activeLembaga = props.lembaga || null;
    const allLembagas = props.lembagas || [];
    const beritaCategories = props.beritaCategories || [];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const links = [
        { name: 'Beranda', href: '/' },
        { name: 'Tentang', href: '#', dropdown: [
            { name: 'Profil', href: '/profil' },
            { name: 'Visi & Misi', href: '/visi-misi' },
            { name: 'Sejarah', href: '/sejarah' },
        ]},
        { name: activeLembaga ? activeLembaga.nama : 'Tingkat Pendidikan', href: '#', isLembaga: true },
        { name: 'Berita', href: '#', dropdown: [
            { name: 'Prestasi', href: '/berita?kategori=prestasi' },
            { name: 'Pengumuman', href: '/berita?kategori=pengumuman' },
            { name: 'Artikel', href: '/berita?kategori=artikel' },
            { name: 'Event', href: '/berita?kategori=event' },
        ]},
        { name: 'Info PPDB', href: '/info-ppdb' },
        { name: 'Fasilitas', href: '/fasilitas' },
        { name: 'Kontak & Maps', href: '/kontak' },
    ];

    const [activeDropdown, setActiveDropdown] = useState(null);

    const linkClass = (href, isDropdownOpen) => {
        const isActive = url === href || isDropdownOpen;
        
        if (scrolled) {
            return `px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.1em] transition-all duration-300 rounded-[0.25rem] flex items-center gap-1 ${
                isActive ? 'text-brand-primary bg-brand-light/50 shadow-sm' : 'text-brand-accent hover:text-brand-primary hover:bg-white/50'
            }`;
        } else {
            if (navTheme === 'dark') {
                return `px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.1em] transition-all duration-300 rounded-[0.25rem] flex items-center gap-1 ${
                    isActive ? 'text-white bg-white/10 ring-1 ring-white/20' : 'text-white/90 hover:text-white hover:bg-white/10'
                }`;
            } else {
                return `px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.1em] transition-all duration-300 rounded-[0.25rem] flex items-center gap-1 ${
                    isActive ? 'text-brand-primary bg-brand-secondary/50 shadow-sm' : 'text-brand-accent hover:text-brand-primary hover:bg-brand-secondary/30'
                }`;
            }
        }
    };

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                scrolled 
                    ? 'bg-brand-secondary/95 backdrop-blur-md border-b border-brand-light py-2 shadow-md' 
                    : 'bg-transparent py-3 md:py-4'
            }`}>
                <div className="max-w-[95%] mx-auto px-4">
                    <div className="flex justify-between items-center h-12 md:h-14">
                        {/* Logo */}
                        <Link href="/" className="flex-shrink-0 flex items-center gap-3 group">
                            {activeLembaga && activeLembaga.ikon_url && (
                                <div className="h-8 w-8 md:h-10 md:w-10 p-1 bg-white/10 backdrop-blur-sm rounded-lg border border-white/10 shadow-sm flex items-center justify-center transition-all group-hover:scale-105">
                                    <img src={activeLembaga.ikon_url} alt="Logo Unit" className="w-full h-full object-contain" />
                                </div>
                            )}
                            <div className="flex flex-col">
                                <span className={`text-md md:text-xl font-serif font-semibold tracking-tighter leading-none transition-colors ${
                                    scrolled || navTheme === 'light' ? 'text-brand-primary group-hover:text-brand-accent' : 'text-white'
                                }`}>YPDS</span>
                                <span className={`text-[10px] md:text-[14px] font-semibold tracking-[0.2em] leading-none mt-1 transition-colors ${
                                    scrolled || navTheme === 'light' ? 'text-brand-accent' : 'text-brand-secondary'
                                }`}>
                                    AL-HIKMAH
                                </span>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        {/* ... (desktop nav remains same) */}
                        <div className="hidden xl:flex items-center space-x-0.5">
                            {links.map((link) => {
                                const isLembagaActive = link.isLembaga && activeLembaga;
                                return (
                                    <div 
                                        key={link.name} 
                                        className="relative"
                                        onMouseEnter={() => link.dropdown || link.isLembaga ? setActiveDropdown(link.name) : null}
                                        onMouseLeave={() => setActiveDropdown(null)}
                                    >
                                        {link.dropdown || link.isLembaga ? (
                                            <>
                                                <button className={linkClass(link.href, activeDropdown === link.name || isLembagaActive)}>
                                                    {link.name}
                                                    <ChevronDownIcon className={`h-3 w-3 transition-transform duration-300 stroke-[3px] ${activeDropdown === link.name ? 'rotate-180' : ''}`} />
                                                </button>
                                                
                                                <div className={`absolute top-full left-0 w-48 bg-brand-secondary border border-brand-light shadow-2xl py-2 transition-all duration-200 origin-top rounded-[0.25rem] ${
                                                    activeDropdown === link.name ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'
                                                }`}>
                                                    {link.isLembaga ? (
                                                        allLembagas.map((l) => (
                                                            <Link 
                                                                key={l.id} href={`/${l.slug}`} 
                                                                className={`block px-4 py-2 text-[10px] font-semibold uppercase tracking-widest transition-colors ${
                                                                    activeLembaga?.id === l.id 
                                                                        ? 'text-brand-primary bg-white/70 shadow-inner' 
                                                                        : 'text-brand-accent hover:text-brand-primary hover:bg-white/50'
                                                                }`}
                                                            >
                                                                {l.nama}
                                                            </Link>
                                                        ))
                                                    ) : (
                                                        link.dropdown.map((item) => (
                                                            <Link 
                                                                key={item.name} href={item.href} 
                                                                className="block px-4 py-2 text-[10px] font-semibold text-brand-accent hover:text-brand-primary hover:bg-white/50 uppercase tracking-widest"
                                                            >
                                                                {item.name}
                                                            </Link>
                                                        ))
                                                    )}
                                                </div>
                                            </>
                                        ) : (
                                            <Link href={link.href} className={linkClass(link.href)}>
                                                {link.name}
                                            </Link>
                                        )}
                                    </div>
                                );
                            })}

                            {/* Search Icon */}
                            <button className={`p-2 ml-2 transition-colors ${scrolled || navTheme === 'light' ? 'text-brand-primary hover:text-brand-accent' : 'text-white/80 hover:text-white'}`}>
                                <MagnifyingGlassIcon className="h-4 w-4 stroke-[3px]" />
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="flex xl:hidden items-center">
                            <button 
                                onClick={() => setIsOpen(true)}
                                className={`p-2 focus:outline-none transition-colors ${
                                    scrolled || navTheme === 'light' ? 'text-brand-accent' : 'text-white'
                                }`}
                            >
                                <Bars3BottomRightIcon className="h-7 w-7 stroke-2" />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Navigation Sidebar (Drawer) - OUTSIDE NAV FOR PROPER SLIDE */}
            <div 
                className={`fixed inset-0 z-[100] xl:hidden transition-all duration-500 ${
                    isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
                }`}
            >
                {/* Backdrop Overlay (REDUCED BLUR & TRANSPARENCY) */}
                <div 
                    className="absolute inset-0 bg-brand-primary/50 backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                ></div>

                {/* Sidebar Content (SHRUNK WIDTH) */}
                <div className={`absolute top-0 right-0 bottom-0 w-[65%] max-w-[280px] bg-brand-secondary shadow-2xl transition-transform duration-500 transform ease-in-out ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}>
                    <div className="flex flex-col h-full overflow-y-auto custom-scrollbar">
                        {/* Sidebar Header (SHRUNK) */}
                        <div className="flex justify-between items-center p-4 border-b border-brand-light sticky top-0 bg-brand-secondary z-10">
                            <div className="flex flex-col">
                                <span className="text-brand-primary text-lg font-serif font-semibold tracking-tighter leading-none">YPDS</span>
                                <span className="text-brand-accent text-[8px] font-semibold tracking-[0.2em] leading-none mt-1">AL-HIKMAH</span>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="p-1.5 bg-brand-light/50 rounded-full text-brand-primary hover:bg-brand-light transition-all">
                                <XMarkIcon className="h-5 w-5 stroke-[3px]" />
                            </button>
                        </div>

                        {/* Sidebar Links (SHRUNK) */}
                        <div className="px-5 py-6 space-y-3">
                            {links.map((link) => {
                                const isLembagaActive = link.isLembaga && activeLembaga;
                                return (
                                    <div key={link.name} className="space-y-3">
                                        {link.dropdown || link.isLembaga ? (
                                            <div className="space-y-2">
                                                <p className={`text-[9px] font-semibold uppercase tracking-[0.3em] ${isLembagaActive ? 'text-brand-primary' : 'text-brand-accent/30'}`}>
                                                    {link.name}
                                                </p>
                                                <div className="pl-3 border-l border-brand-light space-y-3">
                                                    {link.isLembaga ? (
                                                        allLembagas.map((l) => (
                                                            <Link 
                                                                key={l.id} href={`/${l.slug}`} onClick={() => setIsOpen(false)}
                                                                className={`block text-[10px] font-semibold uppercase tracking-widest transition-colors ${
                                                                    activeLembaga?.id === l.id ? 'text-brand-primary' : 'text-brand-accent'
                                                                }`}
                                                            >
                                                                {l.nama}
                                                            </Link>
                                                        ))
                                                    ) : (
                                                        link.dropdown.map((item) => (
                                                            <Link 
                                                                key={item.name} href={item.href} onClick={() => setIsOpen(false)}
                                                                className="block text-[10px] font-semibold uppercase tracking-widest text-brand-accent hover:text-brand-primary transition-colors"
                                                            >
                                                                {item.name}
                                                            </Link>
                                                        ))
                                                    )}
                                                </div>
                                            </div>
                                        ) : (
                                            <Link 
                                                href={link.href} onClick={() => setIsOpen(false)}
                                                className="block py-1 text-xs font-semibold uppercase tracking-[0.1em] text-brand-primary hover:text-brand-accent transition-all"
                                            >
                                                {link.name}
                                            </Link>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Sidebar Footer (SHRUNK) */}
                        <div className="mt-auto p-5 bg-brand-light/20 border-t border-brand-light">
                            <p className="text-[8px] font-semibold text-brand-accent/40 uppercase tracking-[0.3em] mb-3">Informasi Pendaftaran</p>
                            <Link 
                                href="/info-ppdb" onClick={() => setIsOpen(false)}
                                className="bg-brand-primary text-white text-center block py-3 text-[9px] font-semibold uppercase tracking-[0.3em] rounded-[0.25rem] shadow-xl hover:bg-brand-accent transition-all"
                            >
                                Daftar Sekarang
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
