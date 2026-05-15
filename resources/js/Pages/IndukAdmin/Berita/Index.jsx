import React, { useState } from 'react';
import IndukAdminLayout from '@/Layouts/Induk/IndukAdminLayout';
import { Link, router, usePage } from '@inertiajs/react';
import { 
    PlusIcon, 
    PencilSquareIcon, 
    TrashIcon, 
    EyeIcon,
    MagnifyingGlassIcon,
    CalendarIcon,
    TagIcon,
    BuildingOfficeIcon,
    NewspaperIcon
} from '@heroicons/react/24/outline';

export default function Index({ berita, categories }) {
    const { flash } = usePage().props;
    const [selectedCategory, setSelectedCategory] = useState('latest');

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
    } else {
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
                        className={`px-6 py-4 text-[10px] font-semibold uppercase tracking-widest transition-all border-b-2 ${
                            selectedCategory === 'latest' 
                            ? 'border-brand-primary text-brand-primary' 
                            : 'border-transparent text-slate-400 hover:text-brand-primary'
                        }`}
                    >
                        Terkini (10 Baru)
                    </button>
                    <button 
                        onClick={() => setSelectedCategory('all')}
                        className={`px-6 py-4 text-[10px] font-semibold uppercase tracking-widest transition-all border-b-2 ${
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
                </div>

                {/* Flash Message */}
                {flash?.success && (
                    <div className="mb-6 p-4 bg-emerald-50 border-l-4 border-emerald-500 text-emerald-700 text-sm font-semibold uppercase tracking-wider flex items-center justify-between">
                        {flash.success}
                    </div>
                )}

                {/* Table Section */}
                <div className="bg-white border border-slate-200 rounded-[0.25rem] overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200">
                                    <th className="px-6 py-4 text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Informasi Berita</th>
                                    <th className="px-6 py-4 text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Kategori & Lembaga</th>
                                    <th className="px-6 py-4 text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Status</th>
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
                                                        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider mt-1">
                                                            Slug: {item.slug}
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

                {/* Footer Info */}
                <div className="mt-8 flex items-center justify-between">
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
                        Menampilkan {filteredBerita.length} dari {berita.length} Berita
                    </p>
                </div>
            </div>
        </IndukAdminLayout>
    );
}
