import React, { useState } from 'react';
import IndukAdminLayout from '@/Layouts/Induk/IndukAdminLayout';
import { useForm, Link } from '@inertiajs/react';
import { 
    PlusIcon, 
    PencilSquareIcon, 
    TrashIcon, 
    AcademicCapIcon,
    PhotoIcon,
    SparklesIcon,
    ArrowRightIcon,
    InformationCircleIcon
} from '@heroicons/react/24/outline';

export default function Index({ lembagas = [] }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingLembaga, setEditingLembaga] = useState(null);

    const { data, setData, post, processing, reset, errors, delete: destroy } = useForm({
        nama: '',
        slug: '',
        summary: '',
        image: null,
        ikon: null,
        image_url: '',
        ikon_url: '',
    });

    const [previewUrl, setPreviewUrl] = useState(null);
    const [iconPreviewUrl, setIconPreviewUrl] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setData('image', file);
        if (file) {
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleIconChange = (e) => {
        const file = e.target.files[0];
        setData('ikon', file);
        if (file) {
            setIconPreviewUrl(URL.createObjectURL(file));
        }
    };

    const openCreateModal = () => {
        setEditingLembaga(null);
        reset();
        setPreviewUrl(null);
        setIconPreviewUrl(null);
        setIsModalOpen(true);
    };

    const openEditModal = (lembaga) => {
        setEditingLembaga(lembaga);
        setData({
            nama: lembaga.nama,
            slug: lembaga.slug || '',
            summary: lembaga.summary || '',
            image: null,
            ikon: null,
            image_url: lembaga.image_url || '',
            ikon_url: lembaga.ikon_url || '',
        });
        setPreviewUrl(lembaga.image_url);
        setIconPreviewUrl(lembaga.ikon_url);
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingLembaga) {
            post(route('admin.lembaga.update', editingLembaga.id), {
                forceFormData: true,
                onSuccess: () => setIsModalOpen(false),
                data: { ...data, _method: 'put' }
            });
        } else {
            post(route('admin.lembaga.store'), {
                onSuccess: () => {
                    setIsModalOpen(false);
                    reset();
                }
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus lembaga ini? Semua data terkait akan ikut terhapus.')) {
            destroy(route('admin.lembaga.destroy', id));
        }
    };

    return (
        <IndukAdminLayout title="Master Data Lembaga">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                
                {/* Header */}
                <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-accent mb-2">Pusat Manajemen Unit</h2>
                        <h1 className="text-4xl font-semibold uppercase tracking-tighter text-slate-900 leading-none">Master Data <br /><span className="text-brand-primary">Tingkat Pendidikan</span></h1>
                        <p className="mt-4 text-[11px] text-slate-400 uppercase tracking-widest font-bold flex items-center gap-2">
                            <InformationCircleIcon className="h-4 w-4" /> Tambah & Edit info dasar unit di sini
                        </p>
                    </div>
                    <button 
                        onClick={openCreateModal}
                        className="bg-brand-primary text-white text-xs font-bold uppercase tracking-widest px-8 py-4 rounded-[0.25rem] flex items-center gap-2 hover:bg-slate-900 transition-all shadow-xl shadow-brand-primary/20"
                    >
                        <PlusIcon className="h-4 w-4" />
                        Tambah Unit Baru
                    </button>
                </div>

                {/* Master Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {lembagas.map((lembaga) => (
                        <div key={lembaga.id} className="bg-white border border-slate-200 rounded-[0.25rem] overflow-hidden shadow-sm hover:shadow-xl transition-all group flex flex-col">
                            {/* Banner Preview */}
                            <div className="aspect-video relative overflow-hidden bg-slate-100">
                                <img 
                                    src={lembaga.image_url || 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=600'} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                                    alt={lembaga.nama} 
                                />
                                {lembaga.ikon_url && (
                                    <div className="absolute bottom-4 left-4 w-10 h-10 bg-white p-2 rounded shadow-lg border border-slate-100">
                                        <img src={lembaga.ikon_url} className="w-full h-full object-contain" alt="Icon" />
                                    </div>
                                )}
                            </div>

                            <div className="p-6 flex-grow">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-bold text-slate-900 uppercase tracking-tight line-clamp-1">{lembaga.nama}</h3>
                                    <span className="text-[9px] font-bold text-brand-primary uppercase tracking-widest">/{lembaga.slug}</span>
                                </div>
                                <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed mb-6 h-8">
                                    {lembaga.summary || 'Belum ada deskripsi singkat.'}
                                </p>
                                
                                <div className="space-y-3 pt-6 border-t border-slate-100">
                                    <div className="flex items-center gap-2">
                                        <button 
                                            onClick={() => openEditModal(lembaga)}
                                            className="flex-grow px-3 py-3 bg-slate-100 text-slate-700 text-[9px] font-bold uppercase tracking-widest rounded hover:bg-brand-primary hover:text-white transition-all flex items-center justify-center gap-1.5"
                                        >
                                            <PencilSquareIcon className="h-3.5 w-3.5" />
                                            Edit Dasar
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(lembaga.id)}
                                            className="p-3 bg-red-50 text-red-500 rounded hover:bg-red-500 hover:text-white transition-all"
                                        >
                                            <TrashIcon className="h-4 w-4" />
                                        </button>
                                    </div>
                                    <Link 
                                        href={route('admin.lembaga.edit', lembaga.id)}
                                        className="w-full text-center py-3 bg-brand-primary/5 text-brand-primary text-[9px] font-bold uppercase tracking-widest rounded hover:bg-brand-primary hover:text-white transition-all flex items-center justify-center gap-1.5 shadow-sm"
                                    >
                                        Kelola Detail Konten <ArrowRightIcon className="h-3 w-3" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal Form Master Data */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-2xl rounded-[0.25rem] shadow-2xl overflow-hidden">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                            <div>
                                <h3 className="font-bold uppercase tracking-widest text-slate-900">{editingLembaga ? 'Update Master Data Unit' : 'Tambah Unit Pendidikan'}</h3>
                                <p className="text-[9px] text-slate-400 uppercase tracking-widest mt-1">Konfigurasi Identitas Utama Lembaga</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-900 transition-colors p-2 text-2xl leading-none">&times;</button>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-1">
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Nama Lembaga</label>
                                    <input 
                                        type="text" 
                                        className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-3 text-sm focus:ring-1 focus:ring-brand-primary outline-none"
                                        placeholder="Contoh: SMP Al-Hikmah"
                                        value={data.nama}
                                        onChange={e => setData('nama', e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="md:col-span-1">
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Slug URL</label>
                                    <div className="flex items-center">
                                        <span className="bg-slate-200 p-3 text-sm text-slate-500 rounded-l-[0.25rem] border border-r-0 border-slate-200">/</span>
                                        <input 
                                            type="text" 
                                            className="w-full bg-slate-50 border border-slate-200 rounded-r-[0.25rem] p-3 text-sm focus:ring-1 focus:ring-brand-primary outline-none"
                                            value={data.slug}
                                            onChange={e => setData('slug', e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Summary Singkat</label>
                                    <textarea 
                                        className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-3 text-sm focus:ring-1 focus:ring-brand-primary outline-none"
                                        rows="2"
                                        placeholder="Penjelasan singkat untuk kartu beranda..."
                                        value={data.summary}
                                        onChange={e => setData('summary', e.target.value)}
                                    ></textarea>
                                </div>
                                
                                <div className="md:col-span-1">
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Banner Hero (16:9)</label>
                                    <div className="relative aspect-video bg-slate-100 rounded-[0.25rem] overflow-hidden border-2 border-dashed border-slate-200 group">
                                        {previewUrl || data.image_url ? (
                                            <img src={previewUrl || data.image_url} className="w-full h-full object-cover" alt="Banner" />
                                        ) : (
                                            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300">
                                                <PhotoIcon className="h-8 w-8 mb-2" />
                                                <span className="text-[8px] font-bold uppercase tracking-widest">Pilih Gambar</span>
                                            </div>
                                        )}
                                        <input type="file" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                                    </div>
                                </div>
                                <div className="md:col-span-1">
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Ikon/Logo (1:1)</label>
                                    <div className="relative aspect-square w-32 mx-auto bg-slate-100 rounded-[0.25rem] overflow-hidden border-2 border-dashed border-slate-200 group">
                                        {iconPreviewUrl || data.ikon_url ? (
                                            <img src={iconPreviewUrl || data.ikon_url} className="w-full h-full object-contain p-4" alt="Icon" />
                                        ) : (
                                            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300">
                                                <SparklesIcon className="h-6 w-6 mb-2" />
                                                <span className="text-[8px] font-bold uppercase tracking-widest">Icon</span>
                                            </div>
                                        )}
                                        <input type="file" onChange={handleIconChange} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-slate-100 flex justify-end gap-4 pb-4">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors">Batal</button>
                                <button type="submit" disabled={processing} className="bg-brand-primary text-white py-3 px-12 text-[10px] font-bold uppercase tracking-widest rounded-[0.25rem] hover:bg-slate-900 transition-all shadow-xl shadow-brand-primary/20 disabled:opacity-50">
                                    {processing ? 'Menyimpan...' : (editingLembaga ? 'Update Master' : 'Tambah Master')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </IndukAdminLayout>
    );
}
