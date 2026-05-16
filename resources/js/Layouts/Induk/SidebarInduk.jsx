import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { 
    ChartBarIcon, 
    AcademicCapIcon, 
    NewspaperIcon, 
    ClipboardDocumentListIcon, 
    UserGroupIcon, 
    BuildingOfficeIcon, 
    InformationCircleIcon,
    PhoneIcon,
    ChevronDownIcon
} from '@heroicons/react/24/outline';

export default function SidebarInduk({ isOpen }) {
    const { url, props } = usePage();
    const lembagas = props.lembagas || [];
    const [isLembagaOpen, setIsLembagaOpen] = useState(url.includes('/lembaga'));

    const menuItems = [
        { name: 'Dashboard', href: route('admin.dashboard'), icon: ChartBarIcon },
        { name: 'Beranda', href: route('admin.landing.index'), icon: BuildingOfficeIcon },
        { name: 'Tentang', href: route('admin.tentang.index'), icon: InformationCircleIcon },
        { 
            name: 'Tingkat Pendidikan', 
            href: route('admin.lembaga.index'), 
            icon: AcademicCapIcon,
            hasSub: true,
            isOpen: isLembagaOpen,
            toggle: () => setIsLembagaOpen(!isLembagaOpen),
            subItems: [
                { name: 'Kelola Pendidikan', href: route('admin.lembaga.index') },
                ...lembagas.map(l => ({
                    name: l.nama,
                    href: route('admin.lembaga.edit', l.id)
                }))
            ]
        },
        { name: 'Berita', href: route('admin.berita.index'), icon: NewspaperIcon },
        { name: 'Info PPDB', href: route('admin.info-ppdb.index'), icon: ClipboardDocumentListIcon },
        { name: 'Fasilitas', href: route('admin.fasilitas.index'), icon: BuildingOfficeIcon },
        { name: 'Kontak', href: route('admin.kontak.index'), icon: PhoneIcon },
    ];

    return (
        <aside className={`w-64 bg-brand-primary text-white min-h-screen fixed left-0 top-0 z-[60] transition-transform duration-300 transform ${
            isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}>
            <div className="p-6 border-b border-white/10">
                <h2 className="text-xl font-serif font-semibold tracking-tighter text-white">AL-HIKMAH</h2>
                <p className="text-[10px] font-bold text-brand-accent uppercase tracking-widest mt-1 opacity-80">Super Admin Panel</p>
            </div>
            <nav className="mt-6 px-3 h-[calc(100vh-120px)] overflow-y-auto custom-scrollbar">
                {menuItems.map((item) => (
                    <div key={item.name}>
                        {item.hasSub ? (
                            <div className="mb-1">
                                <button
                                    onClick={item.toggle}
                                    className={`w-full flex items-center justify-between px-4 py-3 rounded-[0.25rem] text-sm font-medium transition-all ${
                                        url.includes('/lembaga') ? 'bg-white/10 text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <item.icon className="h-5 w-5 opacity-70" />
                                        {item.name}
                                    </div>
                                    <ChevronDownIcon className={`h-3 w-3 transition-transform duration-300 ${item.isOpen ? 'rotate-180' : ''}`} />
                                </button>
                                
                                {item.isOpen && (
                                    <div className="mt-1 ml-4 pl-4 border-l border-white/10 space-y-1">
                                        {item.subItems.map((sub) => (
                                            <Link
                                                key={sub.name}
                                                href={sub.href}
                                                className="block px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-white/40 hover:text-brand-accent transition-colors"
                                            >
                                                {sub.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-[0.25rem] text-sm font-medium transition-all mb-1 ${
                                    url === item.href ? 'bg-brand-accent text-brand-primary shadow-lg shadow-brand-accent/20' : 'text-white/60 hover:bg-white/10 hover:text-white'
                                }`}
                            >
                                <item.icon className={`h-5 w-5 transition-colors ${
                                    url === item.href ? 'text-brand-primary' : 'text-white/40'
                                }`} />
                                {item.name}
                            </Link>
                        )}
                    </div>
                ))}
            </nav>
        </aside>
    );
}

