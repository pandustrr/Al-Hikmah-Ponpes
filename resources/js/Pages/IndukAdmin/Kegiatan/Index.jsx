import React, { useState, useEffect } from 'react';
import { useForm, router, usePage, Head } from '@inertiajs/react';
import IndukAdminLayout from '@/Layouts/Induk/IndukAdminLayout';
import { 
    CalendarIcon, 
    ArrowRightIcon, 
    PhotoIcon, 
    PencilSquareIcon, 
    TrashIcon,
    PlusIcon
} from '@heroicons/react/24/outline';
import Toast from '@/Components/Toast';
import ConfirmationModal from '@/Components/ConfirmationModal';
import ImageInputWithCrop from '@/Components/ImageInputWithCrop';

export default function Index({ kegiatans = [], lembagas = [] }) {
    const { flash } = usePage().props;

    // Filter State (Persistent Tab)
    const [activeLembaga, setActiveLembaga] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('activeKegiatanLembaga') || 'all';
        }
        return 'all';
    });

    const handleSetActiveLembaga = (val) => {
        setActiveLembaga(val);
        if (typeof window !== 'undefined') {
            localStorage.setItem('activeKegiatanLembaga', val);
        }
    };

    const filteredKegiatans = activeLembaga === 'all'
        ? kegiatans
        : kegiatans.filter(k => k.lembaga_id === parseInt(activeLembaga));

    // Toast Notification State
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('success');

    // Monitor flash messages
    useEffect(() => {
        if (flash?.success) {
            setToastMessage(flash.success);
            setToastType('success');
            setShowToast(true);
        } else if (flash?.error) {
            setToastMessage(flash.error);
            setToastType('error');
            setShowToast(true);
        }
    }, [flash]);

    // Confirmation Modal State
    const [confirmModal, setConfirmModal] = useState({
        show: false,
        title: '',
        message: '',
        type: 'danger',
        onConfirm: null
    });

    // Modal & Form State
    const [isKegiatanModalOpen, setIsKegiatanModalOpen] = useState(false);
    const [editingKegiatan, setEditingKegiatan] = useState(null);
    const [kegiatanPreview, setKegiatanPreview] = useState(null);

    const kegiatanForm = useForm({
        lembaga_id: '',
        judul: '',
        tanggal: '',
        deskripsi: '',
        image: null,
    });

    const openAddKegiatan = () => {
        setEditingKegiatan(null);
        kegiatanForm.reset();
        kegiatanForm.setData({
            lembaga_id: activeLembaga !== 'all' ? activeLembaga : (lembagas.length > 0 ? lembagas[0].id : ''),
            judul: '',
            tanggal: new Date().toISOString().split('T')[0],
            deskripsi: '',
            image: null
        });
        setKegiatanPreview(null);
        setIsKegiatanModalOpen(true);
    };

    const openEditKegiatan = (k) => {
        setEditingKegiatan(k);
        kegiatanForm.setData({
            lembaga_id: k.lembaga_id || '',
            judul: k.judul,
            tanggal: k.tanggal || '',
            deskripsi: k.deskripsi || '',
            image: null,
        });
        setKegiatanPreview(k.image_url);
        setIsKegiatanModalOpen(true);
    };

    const closeKegiatanModal = () => {
        setIsKegiatanModalOpen(false);
        setEditingKegiatan(null);
        kegiatanForm.reset();
        setKegiatanPreview(null);
        setGaleriPreview(null);
        galeriForm.reset();
    };

    const submitKegiatan = (e) => {
        e.preventDefault();
        if (editingKegiatan) {
            kegiatanForm.post(route('admin.kegiatan.update', editingKegiatan.id), {
                onSuccess: () => {
                    closeKegiatanModal();
                    setToastMessage('Kegiatan berhasil diperbarui.');
                    setToastType('success');
                    setShowToast(true);
                },
            });
        } else {
            kegiatanForm.post(route('admin.kegiatan.store'), {
                onSuccess: () => {
                    closeKegiatanModal();
                    setToastMessage('Kegiatan baru berhasil ditambahkan.');
                    setToastType('success');
                    setShowToast(true);
                },
            });
        }
    };

    const deleteKegiatan = (id) => {
        setConfirmModal({
            show: true,
            title: 'Hapus Kegiatan?',
            message: 'Apakah Anda yakin ingin menghapus kegiatan ini? Foto-foto di dalam galeri kegiatan ini juga akan terhapus permanen.',
            type: 'danger',
            confirmText: 'Ya, Hapus Permanen',
            onConfirm: () => {
                router.delete(route('admin.kegiatan.destroy', id), {
                    onSuccess: () => {
                        setConfirmModal(prev => ({ ...prev, show: false }));
                        setToastMessage('Kegiatan berhasil dihapus secara permanen.');
                        setToastType('warning');
                        setShowToast(true);
                    }
                });
            }
        });
    };

    // Galeri State
    const [galeriPreview, setGaleriPreview] = useState(null);
    const galeriForm = useForm({
        judul: '',
        deskripsi: '',
        image: null,
    });

    const submitGaleri = (e) => {
        e.preventDefault();
        if (!editingKegiatan) return;

        galeriForm.post(route('admin.kegiatan.galeri.store', editingKegiatan.id), {
            onSuccess: () => {
                setGaleriPreview(null);
                galeriForm.reset();
                setToastMessage('Foto baru berhasil diunggah ke galeri.');
                setToastType('success');
                setShowToast(true);
            },
        });
    };

    const deleteGaleri = (id) => {
        setConfirmModal({
            show: true,
            title: 'Hapus Foto Galeri?',
            message: 'Apakah Anda yakin ingin menghapus foto dari galeri kegiatan ini?',
            type: 'danger',
            confirmText: 'Ya, Hapus Foto',
            onConfirm: () => {
                router.delete(route('admin.kegiatan.galeri.destroy', id), {
                    onSuccess: () => {
                        setConfirmModal(prev => ({ ...prev, show: false }));
                        setToastMessage('Foto galeri berhasil dihapus secara permanen.');
                        setToastType('warning');
                        setShowToast(true);
                    }
                });
            }
        });
    };

    return (
        <IndukAdminLayout title="Manajemen Kegiatan Yayasan">
            <Head title="Kelola Kegiatan & Galeri" />

            <Toast 
                show={showToast}
                message={toastMessage}
                type={toastType}
                onClose={() => setShowToast(false)}
            />

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
                
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-100 pb-6">
                    <div>
                        <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-accent mb-2">Pusat Yayasan</h2>
                        <h1 className="text-3xl font-semibold uppercase tracking-tighter text-slate-900 leading-none">Kelola Kegiatan <br /><span className="text-brand-primary">Lembaga Pendidikan</span></h1>
                    </div>
                    <button 
                        onClick={openAddKegiatan}
                        className="bg-brand-primary text-white text-[10px] font-bold uppercase tracking-widest px-8 py-3.5 rounded-[0.25rem] flex items-center gap-2 hover:bg-slate-900 transition-all shadow-xl shadow-brand-primary/25 self-start md:self-auto"
                    >
                        <PlusIcon className="h-4 w-4" />
                        Tambah Kegiatan Baru
                    </button>
                </div>

                {/* Filter Tabs */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 bg-slate-50/30 p-2.5 rounded-[0.25rem]">
                    <button
                        onClick={() => handleSetActiveLembaga('all')}
                        className={`px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-all rounded-[0.25rem] ${
                            activeLembaga === 'all'
                            ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/10'
                            : 'text-slate-500 hover:text-brand-primary hover:bg-slate-100'
                        }`}
                    >
                        Semua Kegiatan
                    </button>
                    {lembagas.map(lembaga => (
                        <button
                            key={lembaga.id}
                            onClick={() => handleSetActiveLembaga(lembaga.id.toString())}
                            className={`px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-all rounded-[0.25rem] ${
                                activeLembaga === lembaga.id.toString()
                                ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/10'
                                : 'text-slate-500 hover:text-brand-primary hover:bg-slate-100'
                            }`}
                        >
                            {lembaga.nama}
                        </button>
                    ))}
                </div>

                {/* Table Section */}
                <div className="bg-white border border-slate-200 rounded-[0.25rem] overflow-hidden shadow-sm">
                    <div className="px-8 py-6 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <CalendarIcon className="h-5 w-5 text-brand-primary" />
                            <h3 className="font-bold text-slate-900 uppercase tracking-widest text-[10px]">Daftar Kegiatan ({filteredKegiatans.length})</h3>
                        </div>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200">
                                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest w-16">No</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest w-28">Gambar</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Judul Kegiatan</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tanggal</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Lembaga/Unit</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Galeri Foto</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Deskripsi</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right w-32">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-150">
                                {filteredKegiatans.length === 0 ? (
                                    <tr>
                                        <td colSpan={8} className="px-6 py-20 text-center">
                                            <div className="flex flex-col items-center gap-4">
                                                <div className="p-4 bg-slate-50 rounded-full text-slate-300 border border-slate-200 shadow-inner">
                                                    <CalendarIcon className="h-12 w-12" />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Belum Ada Kegiatan</p>
                                                    <p className="text-[9px] text-slate-300 uppercase tracking-widest">Tambahkan kegiatan baru di unit ini.</p>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ) : filteredKegiatans.map((k, idx) => (
                                    <tr key={k.id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-6 py-5 text-[10px] font-bold text-slate-400">{idx + 1}</td>
                                        <td className="px-6 py-5">
                                            <div className="w-16 h-12 rounded-[0.25rem] bg-slate-100 overflow-hidden relative border border-slate-200 shadow-sm">
                                                <img 
                                                    src={k.image_url || `https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=600`} 
                                                    className="w-full h-full object-cover" 
                                                    alt="" 
                                                />
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-xs font-bold text-slate-900 uppercase tracking-tight group-hover:text-brand-primary transition-colors">{k.judul}</td>
                                        <td className="px-6 py-5 text-[9px] font-bold text-slate-500">
                                            {k.tanggal ? new Date(k.tanggal).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'}) : '-'}
                                        </td>
                                        <td className="px-6 py-5 text-[9px] font-bold text-slate-900 uppercase tracking-widest">
                                            {k.lembaga?.nama || 'Semua Unit (Yayasan)'}
                                        </td>
                                        <td className="px-6 py-5">
                                            <button 
                                                type="button" 
                                                onClick={() => openEditKegiatan(k)} 
                                                className="bg-brand-primary/5 hover:bg-brand-primary text-brand-primary hover:text-white px-2.5 py-1.5 rounded-[0.25rem] border border-brand-primary/10 text-[8px] font-black uppercase tracking-widest flex items-center gap-1 transition-all"
                                            >
                                                <PhotoIcon className="h-3.5 w-3.5" />
                                                <span>Kelola ({k.galeris?.length || 0})</span>
                                            </button>
                                        </td>
                                        <td className="px-6 py-5 text-[10px] text-slate-400 max-w-xs truncate italic">"{k.deskripsi}"</td>
                                        <td className="px-6 py-5 text-right">
                                            <div className="flex justify-end gap-1.5">
                                                <button 
                                                    type="button" 
                                                    onClick={() => openEditKegiatan(k)} 
                                                    className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-[0.25rem] border border-transparent hover:border-emerald-100 transition-all"
                                                    title="Edit"
                                                >
                                                    <PencilSquareIcon className="h-4 w-4" />
                                                </button>
                                                <button 
                                                    type="button" 
                                                    onClick={() => deleteKegiatan(k.id)} 
                                                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-[0.25rem] border border-transparent hover:border-rose-100 transition-all" 
                                                    title="Hapus"
                                                >
                                                    <TrashIcon className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* --- MODAL UNIFIED KEGIATAN & GALERI --- */}
                {isKegiatanModalOpen && (() => {
                    const isEditing = !!editingKegiatan;
                    const activeKegiatan = isEditing 
                        ? (kegiatans.find(item => item.id === editingKegiatan.id) || editingKegiatan) 
                        : null;
                    const activePhotos = activeKegiatan ? (activeKegiatan.galeris || []) : [];

                    return (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
                            <div className={`bg-white w-full ${isEditing ? 'max-w-6xl' : 'max-w-md'} rounded-[0.25rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]`}>
                                
                                {/* Header */}
                                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                                    <div>
                                        <span className="text-[8px] font-black text-brand-primary uppercase tracking-[0.2em]">
                                            Menu Kegiatan
                                        </span>
                                        <h3 className="text-lg font-bold text-slate-900 uppercase tracking-tighter mt-1">
                                            {isEditing ? `Kelola & Edit: ${activeKegiatan.judul}` : 'Tambah Kegiatan Baru'}
                                        </h3>
                                    </div>
                                    <button 
                                        onClick={closeKegiatanModal}
                                        className="text-slate-400 hover:text-slate-600 text-xs font-bold uppercase tracking-widest"
                                    >
                                        Tutup ✕
                                    </button>
                                </div>

                                {/* Content Body */}
                                <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                                    
                                    {/* LEFT COLUMN: ACTIVITY FORM */}
                                    <div className={`${isEditing ? 'md:col-span-5' : 'md:col-span-12'} p-8 space-y-6`}>
                                        <form onSubmit={submitKegiatan} className="space-y-4">
                                            
                                            {/* Lembaga Select */}
                                            <div>
                                                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Lembaga / Unit Unit</label>
                                                <select 
                                                    className="w-full bg-slate-50 border border-slate-200 rounded p-3 text-xs focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none uppercase font-bold tracking-wider"
                                                    value={kegiatanForm.data.lembaga_id}
                                                    onChange={e => kegiatanForm.setData('lembaga_id', e.target.value)}
                                                >
                                                    <option value="">Semua Unit (Yayasan)</option>
                                                    {lembagas.map(l => (
                                                        <option key={l.id} value={l.id}>{l.nama}</option>
                                                    ))}
                                                </select>
                                                {kegiatanForm.errors.lembaga_id && (
                                                    <span className="text-red-500 text-[8px] font-bold uppercase tracking-wider block mt-1">{kegiatanForm.errors.lembaga_id}</span>
                                                )}
                                            </div>

                                            {/* Judul */}
                                            <div>
                                                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Judul Kegiatan</label>
                                                <input 
                                                    type="text" 
                                                    className="w-full bg-slate-50 border border-slate-200 rounded p-3 text-xs focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none"
                                                    value={kegiatanForm.data.judul}
                                                    onChange={e => kegiatanForm.setData('judul', e.target.value)}
                                                    placeholder="Contoh: Pondok Ramadhan 1445 H"
                                                    required
                                                />
                                                {kegiatanForm.errors.judul && (
                                                    <span className="text-red-500 text-[8px] font-bold uppercase tracking-wider block mt-1">{kegiatanForm.errors.judul}</span>
                                                )}
                                            </div>

                                            {/* Tanggal */}
                                            <div>
                                                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Tanggal Pelaksanaan</label>
                                                <input 
                                                    type="date" 
                                                    className="w-full bg-slate-50 border border-slate-200 rounded p-3 text-xs focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none font-bold"
                                                    value={kegiatanForm.data.tanggal}
                                                    onChange={e => kegiatanForm.setData('tanggal', e.target.value)}
                                                    required
                                                />
                                                {kegiatanForm.errors.tanggal && (
                                                    <span className="text-red-500 text-[8px] font-bold uppercase tracking-wider block mt-1">{kegiatanForm.errors.tanggal}</span>
                                                )}
                                            </div>

                                            {/* Deskripsi */}
                                            <div>
                                                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Deskripsi Kegiatan</label>
                                                <textarea 
                                                    rows={4}
                                                    className="w-full bg-slate-50 border border-slate-200 rounded p-3 text-xs focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none"
                                                    value={kegiatanForm.data.deskripsi}
                                                    onChange={e => kegiatanForm.setData('deskripsi', e.target.value)}
                                                    placeholder="Tulis detail kegiatan di sini..."
                                                    required
                                                />
                                                {kegiatanForm.errors.deskripsi && (
                                                    <span className="text-red-500 text-[8px] font-bold uppercase tracking-wider block mt-1">{kegiatanForm.errors.deskripsi}</span>
                                                )}
                                            </div>

                                            {/* Main Image Upload */}
                                            <div>
                                                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Foto Utama (Sampul)</label>
                                                <div className="w-full h-48 rounded-[0.25rem] bg-slate-50 border border-dashed border-slate-200 relative flex flex-col items-center justify-center overflow-hidden group">
                                                    {kegiatanPreview ? (
                                                        <img src={kegiatanPreview} className="w-full h-full object-cover z-0" alt="" />
                                                    ) : (
                                                        <div className="flex flex-col items-center text-slate-300 z-0">
                                                            <PhotoIcon className="h-8 w-8 mb-1" />
                                                            <span className="text-[8px] font-bold uppercase tracking-widest">Pilih Gambar</span>
                                                        </div>
                                                    )}
                                                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10 pointer-events-none">
                                                        <span className="text-white text-[8px] font-bold uppercase tracking-[0.2em] border border-white/40 px-3 py-1.5 cursor-pointer">Ganti Sampul</span>
                                                    </div>
                                                    <ImageInputWithCrop 
                                                        className="absolute inset-0 z-20"
                                                        aspectRatio={4/3}
                                                        title="Potong Gambar Sampul (4:3)"
                                                        onChange={(file) => {
                                                            kegiatanForm.setData('image', file);
                                                            if (file) setKegiatanPreview(URL.createObjectURL(file));
                                                        }}
                                                    />
                                                </div>
                                                {kegiatanForm.errors.image && (
                                                    <span className="text-red-500 text-[8px] font-bold uppercase tracking-wider block mt-1">{kegiatanForm.errors.image}</span>
                                                )}
                                            </div>

                                            <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
                                                <button 
                                                    type="button" 
                                                    onClick={closeKegiatanModal} 
                                                    className="px-4 py-2.5 text-[9px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors"
                                                >
                                                    Batal
                                                </button>
                                                <button 
                                                    type="submit" 
                                                    disabled={kegiatanForm.processing}
                                                    className="bg-brand-primary text-white py-2.5 px-6 text-[9px] font-bold uppercase tracking-widest rounded-[0.25rem] hover:bg-slate-900 transition-all shadow-xl shadow-brand-primary/20"
                                                >
                                                    {kegiatanForm.processing ? 'Menyimpan...' : 'Simpan Kegiatan'}
                                                </button>
                                            </div>
                                        </form>
                                    </div>

                                    {/* RIGHT COLUMN: INTEGRATED PHOTO GALLERY (ONLY WHEN EDITING) */}
                                    {isEditing && (
                                        <div className="md:col-span-7 p-8 flex flex-col min-h-0 bg-slate-50/50 space-y-6">
                                            
                                            {/* Form Add to Gallery */}
                                            <form onSubmit={submitGaleri} className="space-y-4 bg-white border border-slate-200/60 rounded-[0.25rem] p-5 shadow-sm">
                                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">
                                                    Unggah Foto Tambahan Galeri
                                                </h4>
                                                
                                                <div className="grid grid-cols-2 gap-3">
                                                    <div>
                                                        <label className="block text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1">Judul Foto (Opsional)</label>
                                                        <input 
                                                            type="text" 
                                                            className="w-full bg-slate-50 border border-slate-200 rounded p-2 text-xs focus:ring-1 focus:ring-brand-primary outline-none"
                                                            value={galeriForm.data.judul}
                                                            onChange={e => galeriForm.setData('judul', e.target.value)}
                                                            placeholder="Misal: Sambutan Kepala Madrasah"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1">Keterangan (Opsional)</label>
                                                        <input 
                                                            type="text" 
                                                            className="w-full bg-slate-50 border border-slate-200 rounded p-2 text-xs focus:ring-1 focus:ring-brand-primary outline-none"
                                                            value={galeriForm.data.deskripsi}
                                                            onChange={e => galeriForm.setData('deskripsi', e.target.value)}
                                                            placeholder="Keterangan singkat..."
                                                        />
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-3">
                                                     <div className="flex-1 relative h-28 bg-slate-50 border border-dashed border-slate-200 rounded flex flex-col items-center justify-center group overflow-hidden">
                                                         {galeriPreview ? (
                                                             <>
                                                                 <img src={galeriPreview} className="w-full h-full object-cover z-0 animate-fade-in" alt="Preview" />
                                                                 <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10 pointer-events-none">
                                                                     <span className="text-white text-[8px] font-bold uppercase tracking-[0.2em] border border-white/40 px-3 py-1.5 cursor-pointer">Ganti Foto</span>
                                                                 </div>
                                                             </>
                                                         ) : (
                                                             <div className="flex flex-col items-center text-slate-350 z-0">
                                                                 <PhotoIcon className="h-6 w-6 mb-1 text-slate-300" />
                                                                 <span className="text-[8px] font-bold uppercase tracking-widest">Pilih Foto Galeri</span>
                                                             </div>
                                                         )}
                                                         <ImageInputWithCrop 
                                                             className="absolute inset-0 z-20 cursor-pointer"
                                                             aspectRatio={4/3}
                                                             title="Potong Foto Galeri (4:3)"
                                                             onChange={(file) => {
                                                                 galeriForm.setData('image', file);
                                                                 if (file) setGaleriPreview(URL.createObjectURL(file));
                                                             }}
                                                         />
                                                     </div>
                                                     <div className="flex flex-col gap-2">
                                                         <button 
                                                             type="submit" 
                                                             disabled={galeriForm.processing || !galeriPreview}
                                                             className="bg-slate-900 hover:bg-brand-primary text-white text-[8px] font-bold uppercase tracking-widest px-6 h-11 rounded-[0.25rem] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                         >
                                                             {galeriForm.processing ? 'Mengunggah...' : 'Unggah Foto'}
                                                         </button>
                                                         {galeriPreview && (
                                                             <button 
                                                                 type="button" 
                                                                 onClick={() => {
                                                                     galeriForm.setData('image', null);
                                                                     setGaleriPreview(null);
                                                                 }}
                                                                 className="text-red-500 hover:text-red-650 text-[8px] font-bold uppercase tracking-widest text-center py-1 hover:underline"
                                                             >
                                                                 Batal
                                                             </button>
                                                         )}
                                                     </div>
                                                 </div>
                                            </form>

                                            {/* Gallery Grid */}
                                            <div className="flex-1 overflow-y-auto min-h-[200px] max-h-[350px] pr-2 custom-scrollbar">
                                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 border-b border-slate-100 pb-2">
                                                    Foto Galeri Saat Ini ({activePhotos.length})
                                                </h4>
                                                {activePhotos.length === 0 ? (
                                                    <div className="h-full flex flex-col items-center justify-center text-slate-300 py-10 border border-dashed border-slate-200 rounded bg-white">
                                                        <PhotoIcon className="h-8 w-8 mb-1" />
                                                        <span className="text-[8px] font-bold uppercase tracking-widest">Belum Ada Foto Galeri</span>
                                                    </div>
                                                ) : (
                                                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 gap-3">
                                                        {activePhotos.map((photo) => (
                                                            <div key={photo.id} className="relative group aspect-[4/3] rounded border border-slate-200 overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
                                                                <img src={photo.image_url} className="w-full h-full object-cover" alt="" />
                                                                
                                                                {/* Hover Info & Action */}
                                                                <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity p-2.5 flex flex-col justify-between items-start text-white">
                                                                    <div className="space-y-0.5 max-w-full">
                                                                        {photo.judul && <p className="text-[9px] font-bold truncate uppercase">{photo.judul}</p>}
                                                                        {photo.deskripsi && <p className="text-[7px] text-slate-300 truncate leading-snug">{photo.deskripsi}</p>}
                                                                    </div>
                                                                    
                                                                    <button 
                                                                        type="button" 
                                                                        onClick={() => deleteGaleri(photo.id)}
                                                                        className="bg-red-500/80 hover:bg-red-650 p-1.5 rounded text-white self-end transition-colors"
                                                                        title="Hapus Foto"
                                                                    >
                                                                        <TrashIcon className="h-3 w-3" />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                </div>
                            </div>
                        </div>
                    );
                })()}

            </div>
        </IndukAdminLayout>
    );
}
