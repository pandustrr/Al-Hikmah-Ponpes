import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { 
    ChartBarIcon, 
    AcademicCapIcon, 
    NewspaperIcon, 
    ClipboardDocumentListIcon, 
    UserGroupIcon, 
    BuildingOfficeIcon, 
    InformationCircleIcon 
} from '@heroicons/react/24/outline';

export default function SidebarInduk({ isOpen }) {
    const { url } = usePage();

    const menuItems = [
        { name: 'Dashboard', href: route('admin.dashboard'), icon: ChartBarIcon },
        { name: 'Data Lembaga', href: route('admin.lembaga.index'), icon: AcademicCapIcon },
        { name: 'Berita & Update', href: route('admin.berita.index'), icon: NewspaperIcon },
        { name: 'Info PPDB', href: route('admin.info-ppdb.index'), icon: ClipboardDocumentListIcon },
        { name: 'Fasilitas', href: route('admin.fasilitas.index'), icon: BuildingOfficeIcon },
        { name: 'Tentang Yayasan', href: route('admin.tentang.index'), icon: InformationCircleIcon },
    ];

    return (
        <aside className={`w-64 bg-brand-primary text-white min-h-screen fixed left-0 top-0 z-[60] transition-transform duration-300 transform ${
            isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}>
            <div className="p-6 border-b border-white/10">
                <h2 className="text-xl font-serif font-semibold tracking-tighter">AL-HIKMAH</h2>
                <p className="text-[10px] font-semibold text-brand-accent uppercase tracking-widest mt-1">Super Admin Panel</p>
            </div>
            <nav className="mt-6 px-3">
                {menuItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-[0.25rem] text-sm font-medium transition-all mb-1 ${
                            url === item.href ? 'bg-brand-accent text-brand-primary shadow-lg shadow-brand-accent/20' : 'text-white/60 hover:bg-white/10 hover:text-white'
                        }`}
                    >
                        <item.icon className={`h-5 w-5 transition-colors ${
                            url === item.href ? 'text-brand-primary' : 'text-white/40 group-hover:text-white'
                        }`} />
                        {item.name}
                    </Link>
                ))}
            </nav>
        </aside>
    );
}
