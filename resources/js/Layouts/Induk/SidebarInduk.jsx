import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function SidebarInduk({ isOpen }) {
    const { url } = usePage();

    const menuItems = [
        { name: 'Dashboard', href: '/admin', icon: '📊' },
        { name: 'Data Lembaga', href: '/admin/lembaga', icon: '🏫' },
        { name: 'Berita & Update', href: '/admin/berita', icon: '📰' },
        { name: 'Info PPDB', href: '/admin/info-ppdb', icon: '📝' },
        { name: 'Alumni', href: '/admin/alumni', icon: '🎓' },
        { name: 'Fasilitas', href: '/admin/fasilitas', icon: '🏢' },
        { name: 'Tentang Yayasan', href: '/admin/tentang', icon: '🏛️' },
    ];

    return (
        <aside className={`w-64 bg-slate-900 text-white min-h-screen fixed left-0 top-0 z-[60] transition-transform duration-300 transform ${
            isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}>
            <div className="p-6 border-b border-slate-800">
                <h2 className="text-xl font-black tracking-tighter">AL-HIKMAH</h2>
                <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mt-1">Super Admin Panel</p>
            </div>
            <nav className="mt-6 px-3">
                {menuItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-[0.25rem] text-sm font-medium transition-all mb-1 ${
                            url === item.href ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
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
