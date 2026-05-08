import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function SidebarLembaga({ lembaga, isOpen }) {
    const { url } = usePage();

    const menuItems = [
        { name: 'Dashboard', href: `/${lembaga?.slug}/admin`, icon: '📊' },
        { name: 'Info PPDB', href: `/${lembaga?.slug}/admin/info-ppdb`, icon: '📝' },
        { name: 'Berita & Artikel', href: `/${lembaga?.slug}/admin/berita`, icon: '📰' },
        { name: 'Kegiatan Santri', href: `/${lembaga?.slug}/admin/kegiatan`, icon: '🌙' },
        { name: 'Prestasi', href: `/${lembaga?.slug}/admin/prestasi`, icon: '🏆' },
        { name: 'Alumni', href: `/${lembaga?.slug}/admin/alumni`, icon: '🎓' },
        { name: 'Fasilitas', href: `/${lembaga?.slug}/admin/fasilitas`, icon: '🏢' },
        { name: 'Tentang Sekolah', href: `/${lembaga?.slug}/admin/tentang`, icon: '🏫' },
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
