import React, { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import IndukAdminLayout from '@/Layouts/Induk/IndukAdminLayout';
import { 
    BuildingLibraryIcon, 
    ArrowRightIcon, 
    PhotoIcon, 
    PencilSquareIcon, 
    TrashIcon 
} from '@heroicons/react/24/outline';

export default function Index({ fasilitas = [], lembagas = [] }) {
    // Filter State
    const [activeLembaga, setActiveLembaga] = useState('all');

    const filteredFasilitas = activeLembaga === 'all'
        ? fasilitas
        : fasilitas.filter(f => f.lembaga_id === parseInt(activeLembaga));

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
                },
            });
        } else {
            fasilitasForm.post(route('admin.fasilitas.store'), {
                onSuccess: () => {
                    closeFasilitasModal();
                },
            });
        }
    };

    const deleteFasilitas = (id) => {
        if (confirm('Yakin ingin menghapus fasilitas ini?')) {
            router.delete(route('admin.fasilitas.destroy', id));
        }
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
                onSuccess: () => cancelEditGaleri(),
            });
        } else {
            galeriForm.post(route('admin.galeri.store'), {
                onSuccess: () => cancelEditGaleri(),
            });
        }
    };

    const deleteGaleri = (id) => {
        if (confirm('Yakin ingin menghapus foto galeri ini?')) {
            router.delete(route('admin.galeri.destroy', id));
        }
    };

    return (
        <IndukAdminLayout title="Manajemen Fasilitas Unit">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                
                {/* Header */}
                <div className="mb-8">
                    <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-accent mb-2">Pusat Yayasan</h2>
                    <h1 className="text-3xl font-semibold uppercase tracking-tighter text-slate-900">Kelola Fasilitas Unit</h1>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap gap-2 mb-8">
                    <button
                        onClick={() => setActiveLembaga('all')}
                        className={`px-4 py-2 rounded-[0.25rem] text-[10px] font-bold uppercase tracking-widest transition-all ${
                            activeLembaga === 'all'
                            ? 'bg-slate-900 text-white shadow-lg'
                            : 'bg-white text-slate-500 border border-slate-200 hover:border-slate-400'
                        }`}
                    >
                        Semua Fasilitas
                    </button>
                    {lembagas.map(lembaga => (
                        <button
                            key={lembaga.id}
                            onClick={() => setActiveLembaga(lembaga.id.toString())}
                            className={`px-4 py-2 rounded-[0.25rem] text-[10px] font-bold uppercase tracking-widest transition-all ${
                                activeLembaga === lembaga.id.toString()
                                ? 'bg-slate-900 text-white shadow-lg'
                                : 'bg-white text-slate-500 border border-slate-200 hover:border-slate-400'
                            }`}
                        >
                            {lembaga.nama}
                        </button>
                    ))}
                </div>

                {/* Table Section */}
                <div className="bg-white border border-slate-200 rounded-[0.25rem] overflow-hidden">
                    <div className="px-8 py-6 border-b border-slate-100 bg-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <BuildingLibraryIcon className="h-5 w-5 text-brand-primary" />
                            <h3 className="font-bold text-slate-900 uppercase tracking-widest text-xs">Manajemen Fasilitas Unit</h3>
                        </div>
                        <button 
                            type="button"
                            onClick={openAddFasilitas}
                            className="text-[10px] font-bold uppercase tracking-widest text-brand-primary hover:text-slate-900 transition-colors flex items-center gap-2"
                        >
                            Tambah Fasilitas <ArrowRightIcon className="h-3 w-3" />
                        </button>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-100">
                                    <th className="px-6 py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest w-10">No</th>
                                    <th className="px-4 py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest w-24">Gambar</th>
                                    <th className="px-4 py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest">Nama Fasilitas</th>
                                    <th className="px-4 py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest">Kategori</th>
                                    <th className="px-4 py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest">Unit</th>
                                    <th className="px-4 py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest">Galeri Foto</th>
                                    <th className="px-4 py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest">Deskripsi</th>
                                    <th className="px-4 py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest text-right w-24">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredFasilitas.length === 0 ? (
                                    <tr>
                                        <td colSpan={8} className="px-6 py-16 text-center text-slate-300 text-[10px] font-bold uppercase tracking-widest border-2 border-dashed border-slate-100 rounded m-4">
                                            Belum ada data fasilitas.
                                        </td>
                                    </tr>
                                ) : filteredFasilitas.map((f, idx) => (
                                    <tr key={f.id} className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors group">
                                        <td className="px-6 py-3 text-[10px] font-bold text-slate-300">{idx + 1}</td>
                                        <td className="px-4 py-3">
                                            <div className="w-16 h-12 rounded bg-slate-100 overflow-hidden relative border border-slate-200">
                                                <img 
                                                    src={f.image_url || `https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600&sig=${idx}`} 
                                                    className="w-full h-full object-cover" 
                                                    alt={f.nama} 
                                                />
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-[11px] font-bold text-slate-900 uppercase tracking-tight">{f.nama}</td>
                                        <td className="px-4 py-3">
                                            <span className="bg-slate-100 text-slate-600 text-[8px] font-bold uppercase tracking-wider px-2 py-1 rounded">
                                                {f.kategori || 'Fasilitas'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-[10px] font-bold text-brand-primary uppercase tracking-widest">
                                            {f.lembaga?.nama || 'Pusat'}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                <button 
                                                    type="button" 
                                                    onClick={() => openEditFasilitas(f)} 
                                                    className="bg-brand-primary/5 hover:bg-brand-primary text-brand-primary hover:text-white px-2.5 py-1.5 rounded text-[8px] font-bold uppercase tracking-wider flex items-center gap-1 transition-all"
                                                >
                                                    <PhotoIcon className="h-3 w-3" />
                                                    <span>Kelola ({f.galeris?.length || 0})</span>
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-[11px] text-slate-400 leading-relaxed max-w-xs truncate italic">"{f.deskripsi}"</td>
                                        <td className="px-4 py-3 text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <button type="button" onClick={() => openEditFasilitas(f)} className="p-1.5 text-slate-400 hover:text-brand-primary transition-colors" title="Edit">
                                                    <PencilSquareIcon className="h-4 w-4" />
                                                </button>
                                                <button type="button" onClick={() => deleteFasilitas(f.id)} className="p-1.5 text-slate-400 hover:text-red-500 transition-colors" title="Hapus">
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
                                        className="text-slate-400 hover:text-slate-900 text-2xl leading-none"
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
                                                        className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-2.5 text-xs focus:ring-1 focus:ring-brand-primary outline-none"
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
                                                        className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-2.5 text-xs focus:ring-1 focus:ring-brand-primary outline-none"
                                                        value={fasilitasForm.data.nama}
                                                        onChange={e => fasilitasForm.setData('nama', e.target.value)}
                                                        required
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Kategori Fasilitas</label>
                                                    <input 
                                                        type="text" 
                                                        className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-2.5 text-xs focus:ring-1 focus:ring-brand-primary outline-none"
                                                        value={fasilitasForm.data.kategori}
                                                        onChange={e => fasilitasForm.setData('kategori', e.target.value)}
                                                        placeholder="Contoh: Gedung, Laboratorium, Lapangan"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Deskripsi Fasilitas</label>
                                                    <textarea 
                                                        className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-2.5 text-xs focus:ring-1 focus:ring-brand-primary outline-none min-h-[60px]"
                                                        value={fasilitasForm.data.deskripsi}
                                                        onChange={e => fasilitasForm.setData('deskripsi', e.target.value)}
                                                        placeholder="Deskripsi singkat..."
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">Gambar Sampul Utama (16:10 / 4:3)</label>
                                                    <div className="relative aspect-[16/10] w-full bg-slate-50 rounded overflow-hidden border border-dashed border-slate-200 group hover:border-brand-primary transition-colors">
                                                        {fasilitasPreview ? (
                                                            <img src={fasilitasPreview} className="w-full h-full object-cover" alt="Preview" />
                                                        ) : (
                                                            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300">
                                                                <PhotoIcon className="h-8 w-8 mb-1" />
                                                                <span className="text-[8px] font-bold uppercase tracking-widest">Pilih Gambar</span>
                                                            </div>
                                                        )}
                                                        <input 
                                                            type="file" 
                                                            className="absolute inset-0 opacity-0 cursor-pointer" 
                                                            onChange={e => {
                                                                const file = e.target.files[0];
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
                                                        className="bg-brand-primary text-white py-2.5 px-6 text-[9px] font-bold uppercase tracking-widest rounded-[0.25rem] hover:bg-slate-900 transition-all"
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
                                                            <input 
                                                                type="file" 
                                                                className="absolute inset-0 opacity-0 cursor-pointer" 
                                                                onChange={e => {
                                                                    const file = e.target.files[0];
                                                                    galeriForm.setData('image', file);
                                                                    if (file) setGaleriPreview(URL.createObjectURL(file));
                                                                }}
                                                                required={!editingGaleri}
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
                                                            <div className="py-12 text-center text-slate-300">
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
                                                                                    className="p-1 rounded-full bg-white/20 hover:bg-brand-primary text-white transition-colors"
                                                                                    title="Edit"
                                                                                >
                                                                                    <PencilSquareIcon className="h-3.5 w-3.5" />
                                                                                </button>
                                                                                <button 
                                                                                    type="button" 
                                                                                    onClick={() => deleteGaleri(g.id)} 
                                                                                    className="p-1 rounded-full bg-white/20 hover:bg-red-600 text-white transition-colors"
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
