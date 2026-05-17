import React, { useState } from 'react';
import IndukAdminLayout from '@/Layouts/Induk/IndukAdminLayout';
import { Link, router, usePage, useForm } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import { 
    PlusIcon, 
    PencilSquareIcon, 
    TrashIcon, 
    EyeIcon,
    MagnifyingGlassIcon,
    CalendarIcon,
    TagIcon,
    BuildingOfficeIcon,
    NewspaperIcon,
    Cog6ToothIcon
} from '@heroicons/react/24/outline';

export default function Index({ berita, categories, settings }) {
    const { flash } = usePage().props;
    const [selectedCategory, setSelectedCategory] = useState('latest');

    // Flatten settings for form state
    const initialSettings = [];
    if (settings) {
        Object.values(settings).forEach(group => {
            group.forEach(s => {
                initialSettings.push({ id: s.id, key: s.key, value: s.value || '', label: s.label, group: s.group });
            });
        });
    }

    const { data: settingsData, setData: setSettingsData, put: putSettings, processing: settingsProcessing } = useForm({
        settings: initialSettings
    });

    const handleSettingsChange = (id, value) => {
        const newSettings = settingsData.settings.map(s => 
            s.id === id ? { ...s, value } : s
        );
        setSettingsData('settings', newSettings);
    };

    const handleSettingsSubmit = (e) => {
        e.preventDefault();
        putSettings(route('admin.settings.update'), {
            preserveScroll: true,
        });
    };

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus berita ini?')) {
            router.delete(route('admin.berita.destroy', id));
        }
    };

    let filteredBerita = [];
    if (selectedCategory === 'latest') {
        filteredBerita = berita.slice(0, 10);
    } else if (selectedCategory === 'all') {
        filteredBerita = berita;
    } else if (selectedCategory !== 'settings') {
        filteredBerita = berita.filter(item => item.category_id === parseInt(selectedCategory));
    }

    return (
        <IndukAdminLayout title="Kelola Berita">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
                    <div>
                        <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-accent mb-2">Pusat Yayasan</h2>
                        <h1 className="text-4xl font-semibold uppercase tracking-tighter text-slate-900 leading-none">Kelola Berita <br /><span className="text-brand-primary">Yayasan & Lembaga</span></h1>
                    </div>
                    <Link 
                        href={route('admin.berita.create')}
                        className="inline-flex items-center gap-2 bg-brand-primary hover:bg-slate-900 text-white text-xs font-semibold uppercase tracking-widest px-6 py-4 transition-all rounded-[0.25rem] shadow-xl shadow-brand-primary/20"
                    >
                        <PlusIcon className="h-4 w-4" />
                        Tambah Berita Baru
                    </Link>
                </div>

                {/* Category Tabs */}
                <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 no-scrollbar border-b border-slate-200">
                    <button 
                        onClick={() => setSelectedCategory('latest')}
                        className={`px-6 py-4 text-[10px] font-semibold uppercase tracking-widest transition-all border-b-2 whitespace-nowrap ${
                            selectedCategory === 'latest' 
                            ? 'border-brand-primary text-brand-primary' 
                            : 'border-transparent text-slate-400 hover:text-brand-primary'
                        }`}
                    >
                        Terkini (10 Baru)
                    </button>
                    <button 
                        onClick={() => setSelectedCategory('all')}
                        className={`px-6 py-4 text-[10px] font-semibold uppercase tracking-widest transition-all border-b-2 whitespace-nowrap ${
                            selectedCategory === 'all' 
                            ? 'border-brand-primary text-brand-primary' 
                            : 'border-transparent text-slate-400 hover:text-brand-primary'
                        }`}
                    >
                        Semua ({berita.length})
                    </button>
                    {categories.map(cat => {
                        const count = berita.filter(b => b.category_id === cat.id).length;
                        return (
                            <button 
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id.toString())}
                                className={`px-6 py-4 text-[10px] font-semibold uppercase tracking-widest transition-all border-b-2 whitespace-nowrap ${
                                    selectedCategory === cat.id.toString() 
                                    ? 'border-brand-primary text-brand-primary' 
                                    : 'border-transparent text-slate-400 hover:text-brand-primary'
                                }`}
                            >
                                {cat.name} ({count})
                            </button>
                        );
                    })}
                    <div className="flex-grow"></div>
                    <button 
                        onClick={() => setSelectedCategory('settings')}
                        className={`px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all border-b-2 flex items-center gap-2 ${
                            selectedCategory === 'settings' 
                            ? 'border-brand-primary text-brand-primary bg-brand-secondary/30' 
                            : 'border-transparent text-brand-accent hover:text-brand-primary'
                        }`}
                    >
                        <Cog6ToothIcon className="h-4 w-4" />
                        Pengaturan Page
                    </button>
                </div>

                {/* Flash Message */}
                {flash?.success && (
                    <div className="mb-6 p-4 bg-emerald-50 border-l-4 border-emerald-500 text-emerald-700 text-[10px] font-black uppercase tracking-widest flex items-center justify-between rounded-[0.15rem]">
                        {flash.success}
                    </div>
                )}

                {selectedCategory === 'settings' ? (
                    /* Settings Section */
                    <div className="bg-white border border-slate-200 rounded-[0.25rem] overflow-hidden shadow-sm p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="max-w-4xl">
                            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tighter mb-8 border-b-4 border-brand-primary inline-block">
                                Pengaturan Portal Berita
                            </h2>
                            <form onSubmit={handleSettingsSubmit} className="space-y-10">
                                {settings && Object.entries(settings).map(([group, groupSettings]) => (
                                    <div key={group} className="space-y-6">
                                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-primary bg-brand-secondary/50 px-4 py-2 rounded inline-block">
                                            Grup: {group}
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                                            {groupSettings.map((s) => {
                                                const formItem = settingsData.settings.find(item => item.id === s.id);
                                                return (
                                                    <div key={s.id}>
                                                        <InputLabel htmlFor={s.key} value={s.label} className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2" />
                                                        <TextInput
                                                            id={s.key}
                                                            type="text"
                                                            className="mt-1 block w-full border-slate-200 focus:border-brand-primary focus:ring-brand-primary rounded-[0.25rem] text-sm font-bold"
                                                            value={formItem?.value || ''}
                                                            onChange={(e) => handleSettingsChange(s.id, e.target.value)}
                                                        />
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                                <div className="flex items-center justify-end pt-8 border-t border-slate-100">
                                    <PrimaryButton 
                                        disabled={settingsProcessing}
                                        className="bg-brand-primary hover:bg-slate-900 text-white text-xs font-black uppercase tracking-widest px-10 py-4 transition-all rounded-[0.25rem] shadow-xl shadow-brand-primary/20"
                                    >
                                        {settingsProcessing ? 'Menyimpan...' : 'Simpan Pengaturan'}
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                ) : (
                    /* Table Section */
                    <div className="bg-white border border-slate-200 rounded-[0.25rem] overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200">
                                        <th className="px-6 py-4 text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Informasi Berita</th>
                                        <th className="px-6 py-4 text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Kategori & Lembaga</th>
                                        <th className="px-6 py-4 text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Popularitas</th>
                                        <th className="px-6 py-4 text-[10px] font-semibold text-slate-400 uppercase tracking-widest text-center">Status</th>
                                        <th className="px-6 py-4 text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Tanggal</th>
                                        <th className="px-6 py-4 text-[10px] font-semibold text-slate-400 uppercase tracking-widest text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {filteredBerita.length > 0 ? (
                                        filteredBerita.map((item) => (
                                            <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center gap-4">
                                                        <div className="h-12 w-12 flex-shrink-0 bg-slate-100 rounded-[0.25rem] overflow-hidden">
                                                            <img 
                                                                src={item.image_url || 'https://placehold.co/150/f1f5f9/94a3b8?text=Berita'} 
                                                                alt="" 
                                                                className="h-full w-full object-cover"
                                                            />
                                                        </div>
                                                        <div>
                                                            <h3 className="text-sm font-bold text-slate-900 line-clamp-1 group-hover:text-brand-primary transition-colors">
                                                                {item.judul}
                                                            </h3>
                                                            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider mt-1 flex items-center gap-2">
                                                                Slug: {item.slug}
                                                                {item.is_sticky && <span className="bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded text-[8px] font-black">STICKY</span>}
                                                            </p>
                                                        </div>
                                                    </div>
                                                 </td>
                                                <td className="px-6 py-5">
                                                    <div className="space-y-1">
                                                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-900 uppercase tracking-widest">
                                                            <TagIcon className="h-3 w-3 text-brand-primary" />
                                                            {item.category?.name || 'Uncategorized'}
                                                        </div>
                                                        <div className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
                                                            <BuildingOfficeIcon className="h-3 w-3" />
                                                            {item.lembaga?.name || 'Pusat Yayasan'}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                                                        <EyeIcon className="h-3 w-3 text-slate-400" />
                                                        {item.views || 0} Views
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5 text-center">
                                                    <span className={`inline-flex items-center px-2 py-1 rounded-[0.15rem] text-[9px] font-bold uppercase tracking-widest ${
                                                        item.status === 'published' 
                                                        ? 'bg-emerald-100 text-emerald-700' 
                                                        : 'bg-slate-100 text-slate-500'
                                                    }`}>
                                                        {item.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-5 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">
                                                    <div className="flex items-center gap-1.5">
                                                        <CalendarIcon className="h-3 w-3" />
                                                        {new Date(item.tanggal).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' })}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <a 
                                                            href={`/berita/${item.slug}`} 
                                                            target="_blank"
                                                            className="p-2 text-slate-400 hover:text-brand-primary hover:bg-slate-100 rounded-full transition-all"
                                                            title="Lihat Preview"
                                                        >
                                                            <EyeIcon className="h-4 w-4" />
                                                        </a>
                                                        <Link 
                                                            href={route('admin.berita.edit', item.id)}
                                                            className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-slate-100 rounded-full transition-all"
                                                            title="Edit"
                                                        >
                                                            <PencilSquareIcon className="h-4 w-4" />
                                                        </Link>
                                                        <button 
                                                            onClick={() => handleDelete(item.id)}
                                                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-slate-100 rounded-full transition-all"
                                                            title="Hapus"
                                                        >
                                                            <TrashIcon className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-20 text-center">
                                                <div className="flex flex-col items-center gap-4">
                                                    <div className="p-4 bg-slate-50 rounded-full text-slate-300">
                                                        <NewspaperIcon className="h-12 w-12" />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-[0.2em]">Belum Ada Berita</p>
                                                        <p className="text-[10px] text-slate-300 uppercase tracking-widest">Tidak ada berita di kategori ini.</p>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {selectedCategory !== 'settings' && (
                    /* Footer Info */
                    <div className="mt-8 flex items-center justify-between">
                        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
                            Menampilkan {filteredBerita.length} dari {berita.length} Berita
                        </p>
                    </div>
                )}
            </div>
        </IndukAdminLayout>
    );
}

