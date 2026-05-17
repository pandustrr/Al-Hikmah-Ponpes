import React, { useState, useEffect } from 'react';
import IndukAdminLayout from '@/Layouts/Induk/IndukAdminLayout';
import { Link, router, usePage, Head } from '@inertiajs/react';
import { 
    PlusIcon, 
    PencilSquareIcon, 
    TrashIcon, 
    EyeIcon,
    CalendarIcon,
    TagIcon,
    BuildingOfficeIcon,
    NewspaperIcon,
    InformationCircleIcon
} from '@heroicons/react/24/outline';
import Toast from '@/Components/Toast';
import ConfirmationModal from '@/Components/ConfirmationModal';

export default function Index({ berita = [], categories = [] }) {
    const { flash } = usePage().props;
    const [selectedCategory, setSelectedCategory] = useState('latest');

    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('success');

    // Monitor flash messages
    useEffect(() => {
        if (flash.success) {
            setToastMessage(flash.success);
            setToastType('success');
            setShowToast(true);
        } else if (flash.error) {
            setToastMessage(flash.error);
            setToastType('error');
            setShowToast(true);
        }
    }, [flash]);

    // Modal Confirmation State
    const [confirmModal, setConfirmModal] = useState({
        show: false,
        title: '',
        message: '',
        type: 'danger',
        onConfirm: null
    });

    const handleDelete = (id) => {
        setConfirmModal({
            show: true,
            title: 'Hapus Artikel Berita?',
            message: 'Apakah Anda yakin ingin menghapus artikel berita ini? Artikel yang terhapus tidak dapat dikembalikan secara instan.',
            type: 'danger',
            confirmText: 'Ya, Hapus Permanen',
            onConfirm: () => {
                router.delete(route('admin.berita.destroy', id), {
                    onSuccess: () => {
                        setConfirmModal(prev => ({ ...prev, show: false }));
                        setToastMessage('Artikel berita berhasil dihapus secara permanen.');
                        setToastType('warning');
                        setShowToast(true);
                    }
                });
            }
        });
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
            <Head title="Kelola Berita & Publikasi" />

            {/* Reusable Premium Toast Component */}
            <Toast 
                show={showToast}
                message={toastMessage}
                type={toastType}
                onClose={() => setShowToast(false)}
            />

            {/* Reusable Premium Confirmation Modal Component */}
            <ConfirmationModal
                show={confirmModal.show}
                title={confirmModal.title}
                message={confirmModal.message}
                type={confirmModal.type}
                confirmText={confirmModal.confirmText}
                onConfirm={confirmModal.onConfirm}
                onCancel={() => setConfirmModal(prev => ({ ...prev, show: false }))}
            />

            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8 animate-fade-in">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-100 pb-6">
                    <div>
                        <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-accent mb-2">Pusat Yayasan</h2>
                        <h1 className="text-3xl font-semibold uppercase tracking-tighter text-slate-900 leading-none">Kelola Berita <br /><span className="text-brand-primary">Yayasan & Lembaga</span></h1>
                        <p className="mt-3 text-[10px] text-slate-400 uppercase tracking-widest font-bold flex items-center gap-1.5">
                            <InformationCircleIcon className="h-4 w-4 text-brand-primary" /> Kelola artikel berita publikasi unit & yayasan di sini
                        </p>
                    </div>
                    <Link 
                        href={route('admin.berita.create')}
                        className="bg-brand-primary text-white text-[10px] font-bold uppercase tracking-widest px-8 py-3.5 rounded-[0.25rem] flex items-center gap-2 hover:bg-slate-900 transition-all shadow-xl shadow-brand-primary/25 self-start md:self-auto"
                    >
                        <PlusIcon className="h-4 w-4" />
                        Tambah Berita Baru
                    </Link>
                </div>

                {/* Category Tabs */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 bg-slate-50/30 p-2.5 rounded-[0.25rem]">
                    <button 
                        onClick={() => setSelectedCategory('latest')}
                        className={`px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-all rounded-[0.25rem] ${
                            selectedCategory === 'latest' 
                            ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/10' 
                            : 'text-slate-500 hover:text-brand-primary hover:bg-slate-100'
                        }`}
                    >
                        Terkini (10 Baru)
                    </button>
                    <button 
                        onClick={() => setSelectedCategory('all')}
                        className={`px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-all rounded-[0.25rem] ${
                            selectedCategory === 'all' 
                            ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/10' 
                            : 'text-slate-500 hover:text-brand-primary hover:bg-slate-100'
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
                                className={`px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-all rounded-[0.25rem] ${
                                    selectedCategory === cat.id.toString() 
                                    ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/10' 
                                    : 'text-slate-500 hover:text-brand-primary hover:bg-slate-100'
                                }`}
                            >
                                {cat.name} ({count})
                            </button>
                        );
                    })}
                </div>

                {/* Table Section */}
                <div className="bg-white border border-slate-200 rounded-[0.25rem] overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200">
                                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Informasi Berita</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Kategori & Lembaga</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Popularitas</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Status</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tanggal</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-150">
                                {filteredBerita.length > 0 ? (
                                    filteredBerita.map((item) => (
                                        <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-4">
                                                    <div className="h-12 w-12 flex-shrink-0 bg-slate-100 rounded-[0.25rem] overflow-hidden border border-slate-200 shadow-sm">
                                                        <img 
                                                            src={item.image_url || 'https://placehold.co/150/f1f5f9/94a3b8?text=Berita'} 
                                                            alt="" 
                                                            className="h-full w-full object-cover"
                                                            loading="lazy"
                                                        />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-xs font-bold text-slate-900 line-clamp-1 group-hover:text-brand-primary transition-colors uppercase tracking-tight">
                                                            {item.judul}
                                                        </h3>
                                                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-1.5 flex items-center gap-2">
                                                            Slug: {item.slug}
                                                            {item.is_sticky === 1 && <span className="bg-amber-50 border border-amber-200 text-amber-700 px-1.5 py-0.5 rounded-[0.15rem] text-[8px] font-black">STICKY</span>}
                                                        </p>
                                                    </div>
                                                </div>
                                             </td>
                                            <td className="px-6 py-5">
                                                <div className="space-y-1.5">
                                                    <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-900 uppercase tracking-widest">
                                                        <TagIcon className="h-3 w-3 text-brand-primary" />
                                                        {item.category?.name || 'Uncategorized'}
                                                    </div>
                                                    <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                                                        <BuildingOfficeIcon className="h-3 w-3" />
                                                        {item.lembaga?.name || 'Pusat Yayasan'}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-2 text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                                                    <EyeIcon className="h-3.5 w-3.5 text-slate-400" />
                                                    {item.views || 0} Views
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-center">
                                                <span className={`inline-flex items-center px-2 py-1 rounded-[0.15rem] text-[8px] font-black uppercase tracking-widest ${
                                                    item.status === 'published' 
                                                    ? 'bg-emerald-50 border border-emerald-200 text-emerald-700' 
                                                    : 'bg-slate-50 border border-slate-200 text-slate-500'
                                                }`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5 text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                                                <div className="flex items-center gap-1.5">
                                                    <CalendarIcon className="h-3.5 w-3.5 text-slate-400" />
                                                    {new Date(item.tanggal).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' })}
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-right">
                                                <div className="flex justify-end gap-1.5">
                                                    <a 
                                                        href={`/berita/${item.slug}`} 
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="p-2 text-slate-400 hover:text-brand-primary hover:bg-slate-100 rounded-[0.25rem] border border-transparent hover:border-slate-200 transition-all"
                                                        title="Lihat Preview"
                                                    >
                                                        <EyeIcon className="h-4 w-4" />
                                                    </a>
                                                    <Link 
                                                        href={route('admin.berita.edit', item.id)}
                                                        className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-[0.25rem] border border-transparent hover:border-emerald-100 transition-all"
                                                        title="Edit"
                                                    >
                                                        <PencilSquareIcon className="h-4 w-4" />
                                                    </Link>
                                                    <button 
                                                        onClick={() => handleDelete(item.id)}
                                                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-[0.25rem] border border-transparent hover:border-rose-100 transition-all"
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
                                        <td colSpan="6" className="px-6 py-20 text-center">
                                            <div className="flex flex-col items-center gap-4">
                                                <div className="p-4 bg-slate-50 rounded-full text-slate-300 border border-slate-200 shadow-inner">
                                                    <NewspaperIcon className="h-12 w-12" />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Belum Ada Berita</p>
                                                    <p className="text-[9px] text-slate-300 uppercase tracking-widest">Tidak ada berita di kategori ini.</p>
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
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                        Menampilkan {filteredBerita.length} dari {berita.length} Berita
                    </p>
                </div>
            </div>
        </IndukAdminLayout>
    );
}
