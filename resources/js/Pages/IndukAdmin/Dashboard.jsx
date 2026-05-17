import React from 'react';
import IndukAdminLayout from '@/Layouts/Induk/IndukAdminLayout';
import { Head, Link } from '@inertiajs/react';
import { 
    AcademicCapIcon, 
    NewspaperIcon, 
    UserGroupIcon, 
    ChatBubbleLeftRightIcon,
    CalendarIcon,
    Cog6ToothIcon,
    PlusIcon,
    PencilSquareIcon,
    ArrowRightIcon,
    GlobeAltIcon,
    SparklesIcon,
    DocumentPlusIcon,
    BuildingLibraryIcon
} from '@heroicons/react/24/outline';

export default function Dashboard({ stats, recent_berita = [], recent_lembaga = [] }) {
    const formattedDate = new Date().toLocaleDateString('id-ID', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });

    const statCards = [
        { 
            name: 'Total Lembaga', 
            value: stats.total_lembaga, 
            icon: BuildingLibraryIcon,
            color: 'text-brand-gold bg-brand-primary/10 border-brand-primary/20',
            desc: 'Unit sekolah aktif'
        },
        { 
            name: 'Total Berita', 
            value: stats.total_berita, 
            icon: NewspaperIcon,
            color: 'text-[#8B5CF6] bg-[#8B5CF6]/10 border-[#8B5CF6]/20',
            desc: 'Artikel terpublikasi'
        },
        { 
            name: 'Pendidik & Staf', 
            value: stats.total_pengajar, 
            icon: UserGroupIcon,
            color: 'text-brand-primary bg-brand-primary/5 border-brand-primary/10',
            desc: 'Guru terdaftar'
        },
        { 
            name: 'Testimonial', 
            value: stats.total_testimonial, 
            icon: ChatBubbleLeftRightIcon,
            color: 'text-[#10B981] bg-[#10B981]/10 border-[#10B981]/20',
            desc: 'Wali & alumni aktif'
        },
    ];

    const quickActions = [
        {
            title: 'Tulis Berita Baru',
            desc: 'Buat postingan kabar terkini pesantren',
            href: route('admin.berita.create'),
            icon: DocumentPlusIcon,
            color: 'hover:border-brand-gold hover:shadow-brand-gold/10'
        },
        {
            title: 'Tambah Lembaga',
            desc: 'Daftarkan unit sekolah di bawah yayasan',
            href: route('admin.lembaga.create'),
            icon: PlusIcon,
            color: 'hover:border-[#8B5CF6] hover:shadow-[#8B5CF6]/10'
        },
        {
            title: 'Pengaturan SEO',
            desc: 'Cek pratinjau Google & Sitemap.xml',
            href: route('admin.settings.index'),
            icon: Cog6ToothIcon,
            color: 'hover:border-brand-primary hover:shadow-brand-primary/10'
        },
        {
            title: 'Agenda Kegiatan',
            desc: 'Kelola jadwal acara mendatang yayasan',
            href: route('admin.events.index'),
            icon: CalendarIcon,
            color: 'hover:border-[#10B981] hover:shadow-[#10B981]/10'
        }
    ];

    return (
        <IndukAdminLayout title="Dashboard Super Admin">
            <Head title="Pusat Kendali Yayasan" />

            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-8 animate-fade-in">
                
                {/* 1. Header Section */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-100 pb-6">
                    <div>
                        <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-accent mb-2">Pusat Yayasan</h2>
                        <h1 className="text-4xl font-semibold uppercase tracking-tighter text-slate-900 leading-none">Console <br /><span className="text-brand-primary">Super Admin</span></h1>
                    </div>
                    <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 py-2.5 px-4 rounded-[0.25rem] self-start md:self-auto shadow-sm">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
                        <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{formattedDate}</span>
                    </div>
                </div>

                {/* 2. Welcome Banner */}
                <div className="relative overflow-hidden rounded-[0.25rem] bg-gradient-to-r from-brand-primary via-[#4A4E42] to-[#676C5D] text-white p-8 md:p-10 shadow-xl shadow-brand-primary/10 border border-brand-primary/30">
                    <div className="absolute top-0 right-0 -mt-6 -mr-6 w-48 h-48 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="absolute bottom-0 right-1/4 -mb-10 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
                    
                    <div className="relative z-10 max-w-2xl space-y-4">
                        <div className="flex items-center gap-2">
                            <SparklesIcon className="h-5 w-5 text-brand-gold animate-bounce" />
                            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-brand-gold">Yayasan Al-Hikmah Ambulu</span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-serif font-semibold tracking-tight leading-tight">
                            Selamat Datang Kembali di Pusat Kendali Yayasan
                        </h3>
                        <p className="text-slate-200/90 text-xs md:text-sm leading-relaxed">
                            Di sini Anda dapat mengelola seluruh data lembaga pendidikan di bawah naungan pondok pesantren, mempublikasikan kabar berita terkini, mengonfigurasi pengaturan SEO sosial media, dan memantau program pendaftaran santri baru (PPDB) terintegrasi.
                        </p>
                        <div className="pt-2 flex flex-wrap gap-3">
                            <a 
                                href="/" 
                                target="_blank"
                                className="inline-flex items-center gap-2 bg-brand-gold text-brand-primary py-2.5 px-5 text-[10px] font-bold uppercase tracking-widest rounded-[0.25rem] hover:bg-white hover:text-brand-primary transition-all shadow-lg shadow-brand-gold/10"
                            >
                                Lihat Website Publik <GlobeAltIcon className="h-3.5 w-3.5" />
                            </a>
                            <Link 
                                href={route('admin.settings.index')}
                                className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/20 py-2.5 px-5 text-[10px] font-bold uppercase tracking-widest rounded-[0.25rem] hover:bg-white/20 transition-all"
                            >
                                Konfigurasi Sistem <Cog6ToothIcon className="h-3.5 w-3.5" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* 3. Stat Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {statCards.map((card) => (
                        <div key={card.name} className="bg-white p-6 border border-slate-200 rounded-[0.25rem] shadow-sm flex items-center justify-between group hover:border-slate-300 hover:shadow-md transition-all duration-300">
                            <div className="space-y-1">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">{card.name}</span>
                                <p className="text-3xl font-serif font-black text-slate-900 tracking-tight group-hover:text-brand-primary transition-colors">{card.value}</p>
                                <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wide block">{card.desc}</span>
                            </div>
                            <div className={`p-3.5 rounded-[0.25rem] border ${card.color} shrink-0 group-hover:scale-105 transition-transform duration-300`}>
                                <card.icon className="h-6 w-6" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* 4. Quick Actions Grid */}
                <div>
                    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-3 mb-5">Pintasan Tindakan Cepat</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {quickActions.map((action) => (
                            <Link
                                key={action.title}
                                href={action.href}
                                className={`bg-white border border-slate-200 rounded-[0.25rem] p-6 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-40 group border-b-2 hover:border-b-brand-gold ${action.color}`}
                            >
                                <div className="space-y-2">
                                    <div className="w-10 h-10 bg-slate-50 border border-slate-200 rounded-[0.25rem] flex items-center justify-center text-slate-500 group-hover:bg-brand-primary/5 group-hover:text-brand-primary transition-all">
                                        <action.icon className="h-5 w-5" />
                                    </div>
                                    <h4 className="text-xs font-bold text-slate-800 group-hover:text-brand-primary transition-colors">{action.title}</h4>
                                    <p className="text-[10px] text-slate-400 font-medium leading-relaxed">{action.desc}</p>
                                </div>
                                <div className="flex items-center gap-1 text-[9px] font-black text-brand-accent group-hover:text-brand-primary uppercase tracking-widest self-end mt-2 transition-all">
                                    Mulai <ArrowRightIcon className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* 5. Split Recent Lists */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Left Column: Recent News */}
                    <div className="lg:col-span-7 bg-white border border-slate-200 rounded-[0.25rem] p-6 shadow-sm space-y-6">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                            <div className="flex items-center gap-2">
                                <span className="h-[2px] w-5 bg-brand-primary"></span>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Kabar Berita Terkini</span>
                            </div>
                            <Link 
                                href={route('admin.berita.index')}
                                className="text-[9px] font-black uppercase tracking-wider text-brand-primary hover:text-brand-accent transition-colors"
                            >
                                Lihat Semua Berita ➔
                            </Link>
                        </div>

                        <div className="space-y-4">
                            {recent_berita.length > 0 ? (
                                recent_berita.map((item) => (
                                    <div key={item.id} className="flex gap-4 items-start p-3 rounded-[0.25rem] hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 group">
                                        <div className="w-16 h-12 rounded-[0.25rem] overflow-hidden bg-brand-secondary shrink-0 relative border border-slate-100">
                                            <img 
                                                src={item.image_url || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=150"} 
                                                className="w-full h-full object-cover" 
                                                alt={item.judul}
                                            />
                                        </div>
                                        <div className="flex-grow space-y-1">
                                            <div className="flex items-center justify-between">
                                                <span className="bg-brand-primary/5 text-brand-primary text-[8px] font-bold px-2 py-0.5 uppercase tracking-wider rounded">
                                                    {item.category?.name || 'Kabar'}
                                                </span>
                                                <span className="text-[9px] font-medium text-slate-400">
                                                    {new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                </span>
                                            </div>
                                            <h4 className="text-xs font-semibold text-slate-800 line-clamp-1 group-hover:text-brand-primary transition-colors">
                                                {item.judul}
                                            </h4>
                                            <div className="flex items-center justify-between pt-1">
                                                <span className={`text-[8px] font-bold uppercase tracking-wider ${
                                                    item.status === 'published' ? 'text-emerald-600' : 'text-amber-600'
                                                }`}>
                                                    ● {item.status === 'published' ? 'Terbit' : 'Draft'}
                                                </span>
                                                <Link 
                                                    href={route('admin.berita.edit', item.id)}
                                                    className="text-[9px] font-black uppercase text-brand-accent hover:text-brand-primary transition-colors flex items-center gap-1"
                                                >
                                                    <PencilSquareIcon className="h-3 w-3" /> Edit
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8">
                                    <p className="text-xs text-slate-400 italic">Belum ada berita terbit.</p>
                                    <Link 
                                        href={route('admin.berita.create')}
                                        className="inline-flex items-center gap-2 mt-4 text-[9px] font-black uppercase text-brand-primary hover:underline tracking-widest"
                                    >
                                        Buat Berita Pertama Anda <PlusIcon className="h-3 w-3" />
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Registered Schools */}
                    <div className="lg:col-span-5 bg-white border border-slate-200 rounded-[0.25rem] p-6 shadow-sm space-y-6">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                            <div className="flex items-center gap-2">
                                <span className="h-[2px] w-5 bg-brand-primary"></span>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Lembaga Terdaftar</span>
                            </div>
                            <Link 
                                href={route('admin.lembaga.index')}
                                className="text-[9px] font-black uppercase tracking-wider text-brand-primary hover:text-brand-accent transition-colors"
                            >
                                Kelola ➔
                            </Link>
                        </div>

                        <div className="space-y-4">
                            {recent_lembaga.length > 0 ? (
                                recent_lembaga.map((item) => (
                                    <div key={item.id} className="flex gap-4 items-center p-3 rounded-[0.25rem] hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 group">
                                        <div className="w-10 h-10 rounded-full bg-brand-primary/5 flex items-center justify-center shrink-0 border border-brand-primary/15 text-brand-primary font-serif font-black uppercase">
                                            {item.nama.substring(0, 2)}
                                        </div>
                                        <div className="flex-grow space-y-0.5">
                                            <h4 className="text-xs font-bold text-slate-800 group-hover:text-brand-primary transition-colors">
                                                {item.nama}
                                            </h4>
                                            <div className="flex items-center justify-between text-[9px] text-slate-400">
                                                <span className="font-semibold uppercase tracking-wider">
                                                    Accreditation: {item.akreditasi || 'A'}
                                                </span>
                                                <a 
                                                    href={`/${item.slug}`} 
                                                    target="_blank" 
                                                    className="font-bold uppercase tracking-widest text-brand-accent hover:text-brand-primary transition-colors"
                                                >
                                                    Lihat Halaman ↗
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8">
                                    <p className="text-xs text-slate-400 italic">Belum ada lembaga terdaftar.</p>
                                    <Link 
                                        href={route('admin.lembaga.create')}
                                        className="inline-flex items-center gap-2 mt-4 text-[9px] font-black uppercase text-brand-primary hover:underline tracking-widest"
                                    >
                                        Tambah Lembaga Baru <PlusIcon className="h-3 w-3" />
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                </div>

            </div>
        </IndukAdminLayout>
    );
}
