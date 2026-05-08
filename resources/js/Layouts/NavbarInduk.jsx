import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';

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
        { name: 'Tingkat Pendidikan', href: '#', isLembaga: true },
        { name: 'Berita', href: '#', dropdown: [
            ...beritaCategories.map(c => ({
                name: c.name,
                href: `/berita?kategori=${c.slug}`
            }))
        ]},
        { name: 'Info PPDB', href: '/pendaftaran' },
        { name: 'Fasilitas', href: '/fasilitas' },
        { name: 'Alumni', href: '/alumni' },
        { name: 'Kontak & Maps', href: '/kontak' },
    ];

    const [activeDropdown, setActiveDropdown] = useState(null);

    const linkClass = (href, isDropdownOpen) => {
        const isActive = url === href || isDropdownOpen;
        
        if (scrolled) {
            return `px-3 py-2 text-[10px] font-black uppercase tracking-[0.1em] transition-all duration-300 rounded-[0.25rem] flex items-center gap-1 ${
                isActive ? 'text-brand-primary bg-brand-light/50 shadow-sm' : 'text-brand-accent hover:text-brand-primary hover:bg-white/50'
            }`;
        } else {
            if (navTheme === 'dark') {
                return `px-3 py-2 text-[10px] font-black uppercase tracking-[0.1em] transition-all duration-300 rounded-[0.25rem] flex items-center gap-1 ${
                    isActive ? 'text-white bg-white/10 ring-1 ring-white/20' : 'text-white/90 hover:text-white hover:bg-white/10'
                }`;
            } else {
                return `px-3 py-2 text-[10px] font-black uppercase tracking-[0.1em] transition-all duration-300 rounded-[0.25rem] flex items-center gap-1 ${
                    isActive ? 'text-brand-primary bg-brand-secondary/50 shadow-sm' : 'text-brand-accent hover:text-brand-primary hover:bg-brand-secondary/30'
                }`;
            }
        }
    };

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
            scrolled 
                ? 'bg-brand-secondary/95 backdrop-blur-md border-b border-brand-light py-2 shadow-md' 
                : 'bg-transparent py-4'
        }`}>
            <div className="max-w-[95%] mx-auto px-4">
                <div className="flex justify-between items-center h-14">
                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0 flex items-center group">
                        <div className="flex flex-col">
                            <span className={`text-lg md:text-xl font-black tracking-tighter leading-none transition-colors ${
                                scrolled || navTheme === 'light' ? 'text-brand-primary group-hover:text-brand-accent' : 'text-white'
                            }`}>YPDS</span>
                            <span className={`text-[12px] md:text-[14px] font-black tracking-[0.2em] leading-none mt-1 transition-colors ${
                                scrolled || navTheme === 'light' ? 'text-brand-accent' : 'text-brand-secondary'
                            }`}>
                                {activeLembaga ? activeLembaga.slug.toUpperCase() : 'AL-HIKMAH'}
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden xl:flex items-center space-x-0.5">
                        {links.map((link) => (
                            <div 
                                key={link.name} 
                                className="relative"
                                onMouseEnter={() => link.dropdown || link.isLembaga ? setActiveDropdown(link.name) : null}
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                {link.dropdown || link.isLembaga ? (
                                    <>
                                        <button className={linkClass(link.href, activeDropdown === link.name)}>
                                            {link.name}
                                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-3 w-3 transition-transform ${activeDropdown === link.name ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                        
                                        <div className={`absolute top-full left-0 w-48 bg-brand-secondary border border-brand-light shadow-2xl py-2 transition-all duration-200 origin-top rounded-[0.25rem] ${
                                            activeDropdown === link.name ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'
                                        }`}>
                                            {link.isLembaga ? (
                                                allLembagas.map((l) => (
                                                    <Link 
                                                        key={l.id} href={`/${l.slug}`} 
                                                        className="block px-4 py-2 text-[10px] font-bold text-brand-accent hover:text-brand-primary hover:bg-white/50 uppercase tracking-widest"
                                                    >
                                                        {l.nama}
                                                    </Link>
                                                ))
                                            ) : (
                                                link.dropdown.map((item) => (
                                                    <Link 
                                                        key={item.name} href={item.href} 
                                                        className="block px-4 py-2 text-[10px] font-bold text-brand-accent hover:text-brand-primary hover:bg-white/50 uppercase tracking-widest"
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
                        ))}

                        {/* Search Icon */}
                        <button className={`p-2 ml-2 transition-colors ${scrolled || navTheme === 'light' ? 'text-brand-primary hover:text-brand-accent' : 'text-white/80 hover:text-white'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex xl:hidden items-center">
                        <button 
                            onClick={() => setIsOpen(!isOpen)}
                            className={`p-2 focus:outline-none transition-colors ${
                                scrolled || navTheme === 'light' ? 'text-brand-accent' : 'text-white'
                            }`}
                        >
                            {isOpen ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Drawer */}
            <div className={`xl:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? 'max-h-screen border-b border-brand-light shadow-2xl' : 'max-h-0'
            }`}>
                <div className="px-4 pt-2 pb-10 space-y-1 bg-brand-secondary">
                    {links.map((link) => (
                        <div key={link.name}>
                            {link.dropdown || link.isLembaga ? (
                                <div className="py-2">
                                    <p className="px-4 py-2 text-[8px] font-bold text-brand-accent/50 uppercase tracking-widest">{link.name}</p>
                                    <div className="pl-4 space-y-1">
                                        {link.isLembaga ? (
                                            allLembagas.map((l) => (
                                                <Link 
                                                    key={l.id} href={`/${l.slug}`} onClick={() => setIsOpen(false)}
                                                    className="block px-4 py-2 text-[10px] font-black uppercase text-brand-primary"
                                                >
                                                    {l.nama}
                                                </Link>
                                            ))
                                        ) : (
                                            link.dropdown.map((item) => (
                                                <Link 
                                                    key={item.name} href={item.href} onClick={() => setIsOpen(false)}
                                                    className="block px-4 py-2 text-[10px] font-black uppercase text-brand-primary"
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
                                    className="block px-4 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-brand-accent hover:bg-white/50"
                                >
                                    {link.name}
                                </Link>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </nav>
    );
}
