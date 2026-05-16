import React from 'react';
import { AcademicCapIcon, UserGroupIcon, CheckBadgeIcon, BuildingLibraryIcon } from '@heroicons/react/24/outline';

const stats = [
    { label: 'Siswa Aktif', value: '450+', icon: UserGroupIcon },
    { label: 'Tenaga Pendidik', value: '35+', icon: AcademicCapIcon },
    { label: 'Fasilitas Unggulan', value: '12+', icon: BuildingLibraryIcon },
    { label: 'Akreditasi', value: 'A', icon: CheckBadgeIcon },
];

export default function StatsBar({ lembaga }) {
    // Derive stats from lembaga data if available, otherwise use defaults
    const displayStats = [
        { label: 'Siswa Aktif', value: lembaga?.jumlah_siswa || '450+', icon: UserGroupIcon },
        { label: 'Tenaga Pendidik', value: lembaga?.jumlah_pengajar || '35+', icon: AcademicCapIcon },
        { label: 'Fasilitas Unggulan', value: lembaga?.jumlah_fasilitas || '12+', icon: BuildingLibraryIcon },
        { label: 'Akreditasi', value: lembaga?.akreditasi || 'A', icon: CheckBadgeIcon },
    ];

    return (
        <div className="relative z-20 -mt-10 max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 bg-white shadow-2xl rounded-[0.25rem] border border-slate-100 divide-x divide-slate-50">
                {displayStats.map((stat, i) => (
                    <div key={i} className="p-6 md:p-8 flex items-center gap-4 group">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-brand-primary/5 rounded-full flex items-center justify-center shrink-0 group-hover:bg-brand-primary/10 transition-colors">
                            <stat.icon className="h-5 w-5 md:h-6 md:w-6 text-brand-primary" />
                        </div>
                        <div>
                            <div className="text-xl md:text-2xl font-bold text-slate-900 tracking-tighter leading-none mb-1">{stat.value}</div>
                            <div className="text-[8px] md:text-[9px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
