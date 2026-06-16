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
    ChevronDownIcon,
    Cog6ToothIcon,
    CalendarIcon
} from '@heroicons/react/24/outline';

export default function SidebarInduk({ isOpen }) {
    const { url, props } = usePage();
    const lembagas = props.lembagas || [];
    const [isLembagaOpen, setIsLembagaOpen] = useState(url.includes('/lembaga'));
    const [isBeritaOpen, setIsBeritaOpen] = useState(url.includes('/berita'));

    const isActive = (href) => {
        try {
            const urlPath = new URL(href).pathname;
            // Exact match or starts with path (e.g. for nested resources like /create or /edit)
            if (urlPath === '/admin/console') {
                return url === '/admin/console' || url === '/admin/console/dashboard';
            }
            if (urlPath === '/admin/console/berita') {
                return url === '/admin/console/berita' || (url.startsWith('/admin/console/berita/') && !url.includes('/settings'));
            }
            if (urlPath === '/admin/console/lembaga') {
                return url === '/admin/console/lembaga';
            }
            return url === urlPath || url.startsWith(urlPath + '/') || url.startsWith(urlPath + '?');
        } catch (e) {
            // Fallback to relative string checks
            const path = href.replace(/^(?:\/\/|[^\/]+)*\//, '/');
            if (path === '/admin/console/berita') {
                return url === '/admin/console/berita' || (url.startsWith('/admin/console/berita/') && !url.includes('/settings'));
            }
            if (path === '/admin/console/lembaga') {
                return url === '/admin/console/lembaga';
            }
            return url === path || url.startsWith(path + '/') || url.startsWith(path + '?');
        }
    };

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
        { 
            name: 'Berita', 
            href: route('admin.berita.index'), 
            icon: NewspaperIcon,
            hasSub: true,
            isOpen: isBeritaOpen,
            toggle: () => setIsBeritaOpen(!isBeritaOpen),
            subItems: [
                { name: 'Kelola Berita', href: route('admin.berita.index') },
                { name: 'Pengaturan Portal', href: route('admin.berita.settings') }
            ]
        },
        { name: 'Info PPDB', href: route('admin.info-ppdb.index'), icon: ClipboardDocumentListIcon },
        { name: 'Fasilitas', href: route('admin.fasilitas.index'), icon: BuildingOfficeIcon },
        { name: 'Kegiatan', href: route('admin.kegiatan.index'), icon: CalendarIcon },
        { name: 'Kontak', href: route('admin.kontak.index'), icon: PhoneIcon },
        { name: 'Pengaturan', href: route('admin.settings.index'), icon: Cog6ToothIcon },
    ];

    return (
        <aside className={`w-56 bg-brand-primary text-white min-h-screen fixed left-0 top-0 z-[60] transition-transform duration-300 transform ${
            isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}>
            <div className="p-6 border-b border-white/10">
                <h2 className="text-xl font-serif font-semibold tracking-tighter text-white">AL-HIKMAH</h2>
                <p className="text-[10px] font-bold text-brand-accent uppercase tracking-widest mt-1 opacity-80">Super Admin Panel</p>
            </div>
            
            <nav className="mt-6 px-3 h-[calc(100vh-120px)] overflow-y-auto custom-scrollbar">
                {menuItems.map((item) => {
                    const active = !item.hasSub && isActive(item.href);
                    const isParentActive = item.hasSub && (
                        (item.name === 'Tingkat Pendidikan' && url.includes('/lembaga')) || 
                        (item.name === 'Berita' && url.includes('/berita'))
                    );

                    return (
                        <div key={item.name}>
                            {item.hasSub ? (
                                <div className="mb-1">
                                    <button
                                        onClick={item.toggle}
                                        className={`w-full flex items-center justify-between px-4 py-3 rounded-[0.25rem] text-sm font-medium transition-all ${
                                            isParentActive 
                                            ? 'bg-white/10 text-white font-semibold' 
                                            : 'text-white/60 hover:bg-white/5 hover:text-white'
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
                                            {item.subItems.map((sub) => {
                                                const subActive = isActive(sub.href);
                                                return (
                                                    <Link
                                                        key={sub.name}
                                                        href={sub.href}
                                                        className={`block px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest transition-all rounded-[0.25rem] ${
                                                            subActive 
                                                            ? 'text-brand-gold bg-white/5 font-black' 
                                                            : 'text-white/70 hover:text-brand-gold hover:bg-white/5'
                                                        }`}
                                                    >
                                                        {sub.name}
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link
                                    href={item.href}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-[0.25rem] text-sm font-medium transition-all mb-1 ${
                                        active 
                                        ? 'bg-brand-accent text-brand-primary shadow-lg shadow-brand-accent/20 font-semibold' 
                                        : 'text-white/60 hover:bg-white/10 hover:text-white'
                                    }`}
                                >
                                    <item.icon className={`h-5 w-5 transition-colors ${
                                        active ? 'text-brand-primary' : 'text-white/40'
                                    }`} />
                                    {item.name}
                                </Link>
                            )}
                        </div>
                    );
                })}
            </nav>
        </aside>
    );
}
