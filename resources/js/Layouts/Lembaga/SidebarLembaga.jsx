import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function SidebarLembaga({ lembaga, isOpen }) {
    const { url } = usePage();

    const menuItems = [
        { name: 'Dashboard', href: route('lembaga.admin.dashboard', { lembaga_slug: lembaga?.slug }), icon: '📊' },
        { name: 'Info PPDB', href: route('lembaga.admin.info-ppdb.index', { lembaga_slug: lembaga?.slug }), icon: '📝' },
        { name: 'Berita & Artikel', href: route('lembaga.admin.berita.index', { lembaga_slug: lembaga?.slug }), icon: '📰' },
        { name: 'Kegiatan Santri', href: route('lembaga.admin.kegiatan.index', { lembaga_slug: lembaga?.slug }), icon: '🌙' },
        { name: 'Prestasi', href: route('lembaga.admin.prestasi.index', { lembaga_slug: lembaga?.slug }), icon: '🏆' },
        { name: 'Alumni', href: route('lembaga.admin.alumni.index', { lembaga_slug: lembaga?.slug }), icon: '🎓' },
        { name: 'Fasilitas', href: route('lembaga.admin.fasilitas.index', { lembaga_slug: lembaga?.slug }), icon: '🏢' },
        { name: 'Tentang Sekolah', href: route('lembaga.admin.tentang.index', { lembaga_slug: lembaga?.slug }), icon: '🏫' },
    ];

    return (
        <aside className={`w-64 bg-brand-primary text-white min-h-screen fixed left-0 top-0 z-[60] transition-transform duration-300 transform ${
            isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}>
            <div className="p-6 border-b border-white/10">
                <h2 className="text-xl font-black tracking-tighter uppercase">{lembaga?.slug}</h2>
                <p className="text-[10px] font-bold text-brand-accent uppercase tracking-widest mt-1">Admin Panel</p>
            </div>
            <nav className="mt-6 px-3">
                {menuItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-[0.25rem] text-sm font-medium transition-all mb-1 ${
                            url === item.href ? 'bg-white text-brand-primary shadow-lg' : 'text-white/60 hover:bg-white/10 hover:text-white'
                        }`}
                    >
                        <span className="text-lg">{item.icon}</span>
                        {item.name}
                    </Link>
                ))}
            </nav>
        </aside>
    );
}
