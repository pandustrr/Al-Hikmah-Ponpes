import React, { useState, useEffect } from 'react';
import { useForm, router, usePage, Head } from '@inertiajs/react';
import IndukAdminLayout from '@/Layouts/Induk/IndukAdminLayout';
import { 
    BuildingLibraryIcon, 
    ArrowRightIcon, 
    PhotoIcon, 
    PencilSquareIcon, 
    TrashIcon,
    PlusIcon
} from '@heroicons/react/24/outline';
import Toast from '@/Components/Toast';
import ConfirmationModal from '@/Components/ConfirmationModal';
import ImageInputWithCrop from '@/Components/ImageInputWithCrop';

export default function Index({ fasilitas = [], lembagas = [] }) {
    const { flash } = usePage().props;

    // Filter State (Persistent Tab)
    const [activeLembaga, setActiveLembaga] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('activeFasilitasLembaga') || 'all';
        }
        return 'all';
    });

    const handleSetActiveLembaga = (val) => {
        setActiveLembaga(val);
        if (typeof window !== 'undefined') {
            localStorage.setItem('activeFasilitasLembaga', val);
        }
    };

    const filteredFasilitas = activeLembaga === 'all'
        ? fasilitas
        : fasilitas.filter(f => f.lembaga_id === parseInt(activeLembaga));

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
    const [isFasilitasModalOpen, setIsFasilitasModalOpen] = useState(false);
    const [editingFasilitas, setEditingFasilitas] = useState(null);
    const [fasilitasPreview, setFasilitasPreview] = useState(null);

    const fasilitasForm = useForm({
        lembaga_id: '',
        nama: '',
        kategori: '',
        deskripsi: '',
        image: null,
    });

    const openAddFasilitas = () => {
        setEditingFasilitas(null);
        fasilitasForm.reset();
        fasilitasForm.setData('lembaga_id', activeLembaga !== 'all' ? activeLembaga : (lembagas.length > 0 ? lembagas[0].id : ''));
        setFasilitasPreview(null);
        setIsFasilitasModalOpen(true);
    };

    const openEditFasilitas = (f) => {
        setEditingFasilitas(f);
        fasilitasForm.setData({
            lembaga_id: f.lembaga_id,
            nama: f.nama,
            kategori: f.kategori || '',
            deskripsi: f.deskripsi || '',
            image: null,
        });
        setFasilitasPreview(f.image_url);
        setIsFasilitasModalOpen(true);
    };

    const closeFasilitasModal = () => {
        setIsFasilitasModalOpen(false);
        setEditingFasilitas(null);
        fasilitasForm.reset();
        setFasilitasPreview(null);
    };

    const submitFasilitas = (e) => {
        e.preventDefault();
        if (editingFasilitas) {
            fasilitasForm.post(route('admin.fasilitas.update', editingFasilitas.id), {
                onSuccess: () => {
                    closeFasilitasModal();
                    setToastMessage('Fasilitas berhasil diperbarui.');
                    setToastType('success');
                    setShowToast(true);
                },
            });
        } else {
            fasilitasForm.post(route('admin.fasilitas.store'), {
                onSuccess: () => {
                    closeFasilitasModal();
                    setToastMessage('Fasilitas baru berhasil ditambahkan.');
                    setToastType('success');
                    setShowToast(true);
                },
            });
        }
    };

    const deleteFasilitas = (id) => {
        setConfirmModal({
            show: true,
            title: 'Hapus Fasilitas?',
            message: 'Apakah Anda yakin ingin menghapus fasilitas ini? Foto-foto di dalam galeri fasilitas ini juga akan terhapus.',
            type: 'danger',
            confirmText: 'Ya, Hapus Permanen',
            onConfirm: () => {
                router.delete(route('admin.fasilitas.destroy', id), {
                    onSuccess: () => {
                        setConfirmModal(prev => ({ ...prev, show: false }));
                        setToastMessage('Fasilitas berhasil dihapus secara permanen.');
                        setToastType('warning');
                        setShowToast(true);
                    }
                });
            }
        });
    };

    // Galeri State
    const [galeriPreview, setGaleriPreview] = useState(null);
    const [editingGaleri, setEditingGaleri] = useState(null);
    const galeriForm = useForm({
        fasilitas_id: '',
        judul: '',
        deskripsi: '',
        image: null,
    });

    const startEditGaleri = (g) => {
        setEditingGaleri(g);
        galeriForm.setData({
            fasilitas_id: g.fasilitas_id,
            judul: g.judul || '',
            deskripsi: g.deskripsi || '',
            image: null,
        });
        setGaleriPreview(g.image_url);
    };

    const cancelEditGaleri = () => {
        setEditingGaleri(null);
        galeriForm.reset();
        if (editingFasilitas) galeriForm.setData('fasilitas_id', editingFasilitas.id);
        setGaleriPreview(null);
    };

    const submitGaleri = (e) => {
        e.preventDefault();
        galeriForm.setData('fasilitas_id', editingFasilitas.id);
        if (editingGaleri) {
            galeriForm.post(route('admin.galeri.update', editingGaleri.id), {
                onSuccess: () => {
                    cancelEditGaleri();
                    setToastMessage('Foto galeri berhasil diperbarui.');
                    setToastType('success');
                    setShowToast(true);
                },
            });
        } else {
            galeriForm.post(route('admin.galeri.store'), {
                onSuccess: () => {
                    cancelEditGaleri();
                    setToastMessage('Foto baru berhasil diunggah ke galeri.');
                    setToastType('success');
                    setShowToast(true);
                },
            });
        }
    };

    const deleteGaleri = (id) => {
        setConfirmModal({
            show: true,
            title: 'Hapus Foto Galeri?',
            message: 'Apakah Anda yakin ingin menghapus foto dari galeri fasilitas ini?',
            type: 'danger',
            confirmText: 'Ya, Hapus Foto',
            onConfirm: () => {
                router.delete(route('admin.galeri.destroy', id), {
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
        <IndukAdminLayout title="Manajemen Fasilitas Unit">
            <Head title="Kelola Fasilitas & Galeri Unit" />

            {/* Premium Reusable Notification Component */}
            <Toast 
                show={showToast}
                message={toastMessage}
                type={toastType}
                onClose={() => setShowToast(false)}
            />

            {/* Premium Reusable Confirmation Dialog Component */}
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
                        <h1 className="text-3xl font-semibold uppercase tracking-tighter text-slate-900 leading-none">Kelola Fasilitas <br /><span className="text-brand-primary">Unit Pendidikan</span></h1>
                    </div>
                    <button 
                        onClick={openAddFasilitas}
                        className="bg-brand-primary text-white text-[10px] font-bold uppercase tracking-widest px-8 py-3.5 rounded-[0.25rem] flex items-center gap-2 hover:bg-slate-900 transition-all shadow-xl shadow-brand-primary/25 self-start md:self-auto"
                    >
                        <PlusIcon className="h-4 w-4" />
                        Tambah Fasilitas Baru
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
                        Semua Fasilitas
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
                            <BuildingLibraryIcon className="h-5 w-5 text-brand-primary" />
                            <h3 className="font-bold text-slate-900 uppercase tracking-widest text-[10px]">Daftar Fasilitas ({filteredFasilitas.length})</h3>
                        </div>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200">
                                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest w-16">No</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest w-28">Gambar</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nama Fasilitas</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Kategori</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Unit</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Galeri Foto</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Deskripsi</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right w-32">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-150">
                                {filteredFasilitas.length === 0 ? (
                                    <tr>
                                        <td colSpan={8} className="px-6 py-20 text-center">
                                            <div className="flex flex-col items-center gap-4">
                                                <div className="p-4 bg-slate-50 rounded-full text-slate-300 border border-slate-200 shadow-inner">
                                                    <BuildingLibraryIcon className="h-12 w-12" />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Belum Ada Fasilitas</p>
                                                    <p className="text-[9px] text-slate-300 uppercase tracking-widest">Tambahkan fasilitas baru di unit ini.</p>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ) : filteredFasilitas.map((f, idx) => (
                                    <tr key={f.id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-6 py-5 text-[10px] font-bold text-slate-400">{idx + 1}</td>
                                        <td className="px-6 py-5">
                                            <div className="w-16 h-12 rounded-[0.25rem] bg-slate-100 overflow-hidden relative border border-slate-200 shadow-sm">
                                                <img 
                                                    src={f.image_url || `https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600`} 
                                                    className="w-full h-full object-cover" 
                                                    alt="" 
                                                />
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-xs font-bold text-slate-900 uppercase tracking-tight group-hover:text-brand-primary transition-colors">{f.nama}</td>
                                        <td className="px-6 py-5">
                                            <span className="bg-slate-55 border border-slate-200 text-slate-650 text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-[0.15rem]">
                                                {f.kategori || 'Umum'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 text-[9px] font-bold text-slate-900 uppercase tracking-widest">
                                            {f.lembaga?.nama || 'Pusat'}
                                        </td>
                                        <td className="px-6 py-5">
                                            <button 
                                                type="button" 
                                                onClick={() => openEditFasilitas(f)} 
                                                className="bg-brand-primary/5 hover:bg-brand-primary text-brand-primary hover:text-white px-2.5 py-1.5 rounded-[0.25rem] border border-brand-primary/10 text-[8px] font-black uppercase tracking-widest flex items-center gap-1 transition-all"
                                            >
                                                <PhotoIcon className="h-3.5 w-3.5" />
                                                <span>Kelola ({f.galeris?.length || 0})</span>
                                            </button>
                                        </td>
                                        <td className="px-6 py-5 text-[10px] text-slate-400 max-w-xs truncate italic">"{f.deskripsi}"</td>
                                        <td className="px-6 py-5 text-right">
                                            <div className="flex justify-end gap-1.5">
                                                <button 
                                                    type="button" 
                                                    onClick={() => openEditFasilitas(f)} 
                                                    className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-[0.25rem] border border-transparent hover:border-emerald-100 transition-all"
                                                    title="Edit"
                                                >
                                                    <PencilSquareIcon className="h-4 w-4" />
                                                </button>
                                                <button 
                                                    type="button" 
                                                    onClick={() => deleteFasilitas(f.id)} 
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

                {/* --- MODAL UNIFIED FASILITAS & GALERI --- */}
                {isFasilitasModalOpen && (() => {
                    const isEditing = !!editingFasilitas;
                    const activeFasilitas = isEditing 
                        ? (fasilitas.find(item => item.id === editingFasilitas.id) || editingFasilitas) 
                        : null;
                    const activePhotos = activeFasilitas ? (activeFasilitas.galeris || []) : [];

                    return (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
                            <div className={`bg-white w-full ${isEditing ? 'max-w-6xl' : 'max-w-md'} rounded-[0.25rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]`}>
                                
                                {/* Header */}
                                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                                    <div>
                                        <span className="text-[8px] font-black text-brand-primary uppercase tracking-[0.2em]">
                                            {isEditing ? 'Kelola Unit & Dokumentasi' : 'Manajemen Fasilitas'}
                                        </span>
                                        <h3 className="font-bold uppercase tracking-tight text-slate-900 text-sm mt-0.5">
                                            {isEditing ? `Edit Fasilitas: ${activeFasilitas.nama}` : 'Tambah Fasilitas Baru'}
                                        </h3>
                                    </div>
                                    <button 
                                        onClick={closeFasilitasModal} 
                                        className="text-slate-450 hover:text-slate-900 text-2xl leading-none"
                                    >
                                        &times;
                                    </button>
                                </div>

                                {/* Content Body */}
                                <div className="flex-1 overflow-y-auto min-h-0">
                                    <div className={`grid grid-cols-1 ${isEditing ? 'md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-slate-100' : ''}`}>
                                        
                                        {/* LEFT COLUMN: BASIC DATA & MAIN IMAGE */}
                                        <div className={`${isEditing ? 'md:col-span-5 p-8' : 'p-8'} space-y-6`}>
                                            <form onSubmit={submitFasilitas} className="space-y-5">
                                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">
                                                    Informasi Utama & Gambar Sampul
                                                </h4>
                                                
                                                <div>
                                                    <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Pilih Unit (Lembaga)</label>
                                                    <select 
                                                        className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-3 text-xs focus:ring-1 focus:ring-brand-primary outline-none"
                                                        value={fasilitasForm.data.lembaga_id}
                                                        onChange={e => fasilitasForm.setData('lembaga_id', e.target.value)}
                                                        required
                                                    >
                                                        <option value="" disabled>-- Pilih Unit --</option>
                                                        {lembagas.map(l => (
                                                            <option key={l.id} value={l.id}>{l.nama}</option>
                                                        ))}
                                                    </select>
                                                </div>

                                                <div>
                                                    <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Nama Fasilitas</label>
                                                    <input 
                                                        type="text" 
                                                        className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-3 text-xs focus:ring-1 focus:ring-brand-primary outline-none"
                                                        value={fasilitasForm.data.nama}
                                                        onChange={e => fasilitasForm.setData('nama', e.target.value)}
                                                        required
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Kategori Fasilitas</label>
                                                    <input 
                                                        type="text" 
                                                        className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-3 text-xs focus:ring-1 focus:ring-brand-primary outline-none"
                                                        value={fasilitasForm.data.kategori}
                                                        onChange={e => fasilitasForm.setData('kategori', e.target.value)}
                                                        placeholder="Contoh: Gedung, Laboratorium, Lapangan"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Deskripsi Fasilitas</label>
                                                    <textarea 
                                                        className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-3 text-xs focus:ring-1 focus:ring-brand-primary outline-none min-h-[60px]"
                                                        value={fasilitasForm.data.deskripsi}
                                                        onChange={e => fasilitasForm.setData('deskripsi', e.target.value)}
                                                        placeholder="Deskripsi singkat..."
                                                    />
                                                </div>

                                                <div>
                                                     <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">Gambar Sampul Utama (Rasio 4:3)</label>
                                                     <div className="relative aspect-[4/3] w-full bg-slate-50 rounded-[0.25rem] overflow-hidden border border-dashed border-slate-200 group hover:border-brand-primary transition-colors flex items-center justify-center">
                                                         {fasilitasPreview ? (
                                                             <img src={fasilitasPreview} className="w-full h-full object-cover" alt="Preview" />
                                                         ) : (
                                                             <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-350">
                                                                 <PhotoIcon className="h-8 w-8 mb-1" />
                                                                 <span className="text-[8px] font-bold uppercase tracking-widest">Pilih Gambar</span>
                                                             </div>
                                                         )}
                                                         <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                                                             <span className="text-white text-[8px] font-bold uppercase tracking-[0.2em] border border-white/40 px-3 py-1.5 cursor-pointer">Ganti Sampul</span>
                                                         </div>
                                                         <ImageInputWithCrop 
                                                             className="absolute inset-0 z-20"
                                                             aspectRatio={4/3}
                                                             title="Potong Gambar Sampul (4:3)"
                                                             onChange={(file) => {
                                                                 fasilitasForm.setData('image', file);
                                                                 if (file) setFasilitasPreview(URL.createObjectURL(file));
                                                             }}
                                                         />
                                                     </div>
                                                 </div>

                                                <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
                                                    <button 
                                                        type="button" 
                                                        onClick={closeFasilitasModal} 
                                                        className="px-4 py-2.5 text-[9px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors"
                                                    >
                                                        Batal
                                                    </button>
                                                    <button 
                                                        type="submit" 
                                                        disabled={fasilitasForm.processing}
                                                        className="bg-brand-primary text-white py-2.5 px-6 text-[9px] font-bold uppercase tracking-widest rounded-[0.25rem] hover:bg-slate-900 transition-all shadow-xl shadow-brand-primary/20"
                                                    >
                                                        {fasilitasForm.processing ? 'Menyimpan...' : 'Simpan Fasilitas'}
                                                    </button>
                                                </div>
                                            </form>
                                        </div>

                                        {/* RIGHT COLUMN: INTEGRATED PHOTO GALLERY (ONLY WHEN EDITING) */}
                                        {isEditing && (
                                            <div className="md:col-span-7 p-8 flex flex-col min-h-0 bg-slate-50/50 space-y-6">
                                                
                                                {/* Form Add to Gallery */}
                                                <form onSubmit={submitGaleri} className="space-y-4 bg-white border border-slate-200/60 rounded-[0.25rem] p-5 shadow-sm">
                                                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2 flex justify-between items-center">
                                                        <span>{editingGaleri ? 'Ubah Foto Galeri' : 'Unggah Foto Tambahan'}</span>
                                                        {editingGaleri && (
                                                            <button 
                                                                type="button" 
                                                                onClick={cancelEditGaleri} 
                                                                className="text-[8px] text-red-500 font-bold uppercase tracking-wider animate-pulse"
                                                            >
                                                                Batal Edit
                                                            </button>
                                                        )}
                                                    </h4>
                                                    
                                                    <div className="grid grid-cols-2 gap-3">
                                                        <div>
                                                            <label className="block text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1">Judul Foto</label>
                                                            <input 
                                                                type="text" 
                                                                className="w-full bg-slate-50 border border-slate-200 rounded p-2 text-xs focus:ring-1 focus:ring-brand-primary outline-none"
                                                                value={galeriForm.data.judul}
                                                                onChange={e => galeriForm.setData('judul', e.target.value)}
                                                                placeholder="Misal: Tampak Depan"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1">Deskripsi Singkat</label>
                                                            <input 
                                                                type="text" 
                                                                className="w-full bg-slate-50 border border-slate-200 rounded p-2 text-xs focus:ring-1 focus:ring-brand-primary outline-none"
                                                                value={galeriForm.data.deskripsi}
                                                                onChange={e => galeriForm.setData('deskripsi', e.target.value)}
                                                placeholder="Keterangan foto..."
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-3">
                                                        <div className="flex-1 relative h-10 bg-slate-50 border border-dashed border-slate-200 rounded flex items-center justify-center group overflow-hidden">
                                                            {galeriPreview ? (
                                                                <span className="text-[8px] font-bold text-brand-primary truncate px-3">File Terpilih</span>
                                                            ) : (
                                                                <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">Pilih Foto Galeri</span>
                                                            )}
                                                            <ImageInputWithCrop 
                                                                className="absolute inset-0 z-10"
                                                                aspectRatio={4/3}
                                                                title="Potong Foto Galeri (4:3)"
                                                                onChange={(file) => {
                                                                    galeriForm.setData('image', file);
                                                                    if (file) setGaleriPreview(URL.createObjectURL(file));
                                                                }}
                                                            />
                                                        </div>
                                                        <button 
                                                            type="submit" 
                                                            disabled={galeriForm.processing}
                                                            className="bg-slate-900 hover:bg-brand-primary text-white text-[8px] font-bold uppercase tracking-widest px-4 h-10 rounded-[0.25rem] transition-colors"
                                                        >
                                                            {galeriForm.processing ? 'Proses...' : (editingGaleri ? 'Ubah' : 'Unggah')}
                                                        </button>
                                                    </div>
                                                </form>

                                                {/* Gallery Photo List */}
                                                <div className="flex-1 flex flex-col min-h-0">
                                                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2 mb-3">
                                                        Koleksi Foto Galeri ({activePhotos.length})
                                                    </h4>
                                                    
                                                    <div className="flex-1 overflow-y-auto pr-1">
                                                        {activePhotos.length === 0 ? (
                                                            <div className="py-12 text-center text-slate-350">
                                                                <PhotoIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
                                                                <span className="text-[8px] font-bold uppercase tracking-widest">Belum ada foto galeri</span>
                                                            </div>
                                                        ) : (
                                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                                                {activePhotos.map((g) => (
                                                                    <div key={g.id} className="bg-white border border-slate-200 rounded overflow-hidden relative group/gal shadow-sm">
                                                                        <div className="aspect-[4/3] w-full bg-slate-100 overflow-hidden relative">
                                                                            <img src={g.image_url} className="w-full h-full object-cover" alt="Galeri" />
                                                                            <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover/gal:opacity-100 transition-opacity flex items-center justify-center gap-1.5">
                                                                                <button 
                                                                                    type="button" 
                                                                                    onClick={() => startEditGaleri(g)} 
                                                                                    className="p-1 rounded bg-white/20 hover:bg-brand-primary text-white transition-colors"
                                                                                    title="Edit"
                                                                                >
                                                                                    <PencilSquareIcon className="h-3.5 w-3.5" />
                                                                                </button>
                                                                                <button 
                                                                                    type="button" 
                                                                                    onClick={() => deleteGaleri(g.id)} 
                                                                                    className="p-1 rounded bg-white/20 hover:bg-red-600 text-white transition-colors"
                                                                                    title="Hapus"
                                                                                >
                                                                                    <TrashIcon className="h-3.5 w-3.5" />
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                        <div className="p-2 bg-white">
                                                                            <h5 className="text-[9px] font-bold uppercase tracking-widest text-slate-900 truncate">{g.judul || 'Tanpa Judul'}</h5>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })()}

            </div>
        </IndukAdminLayout>
    );
}
