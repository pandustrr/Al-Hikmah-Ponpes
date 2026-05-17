import React, { useState, useEffect } from 'react';
import IndukAdminLayout from '@/Layouts/Induk/IndukAdminLayout';
import { useForm, Link, usePage, Head } from '@inertiajs/react';
import { 
    PlusIcon, 
    PencilSquareIcon, 
    TrashIcon, 
    PhotoIcon,
    SparklesIcon,
    ArrowRightIcon,
    InformationCircleIcon
} from '@heroicons/react/24/outline';
import Toast from '@/Components/Toast';
import ConfirmationModal from '@/Components/ConfirmationModal';

export default function Index({ lembagas = [] }) {
    const { flash } = usePage().props;

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

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingLembaga, setEditingLembaga] = useState(null);

    const { data, setData, post, processing, reset, errors, delete: destroy } = useForm({
        nama: '',
        slug: '',
        summary: '',
        running_text: '',
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
            running_text: lembaga.running_text || '',
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
                onSuccess: () => {
                    setIsModalOpen(false);
                    setToastMessage('Lembaga berhasil diperbarui!');
                    setToastType('success');
                    setShowToast(true);
                },
                data: { ...data, _method: 'put' }
            });
        } else {
            post(route('admin.lembaga.store'), {
                onSuccess: () => {
                    setIsModalOpen(false);
                    reset();
                    setToastMessage('Lembaga baru berhasil ditambahkan!');
                    setToastType('success');
                    setShowToast(true);
                }
            });
        }
    };

    const handleDelete = (id) => {
        setConfirmModal({
            show: true,
            title: 'Hapus Unit Pendidikan?',
            message: 'Apakah Anda yakin ingin menghapus unit pendidikan ini? Semua data terkait (fasilitas, pengajar, dll.) akan ikut terhapus secara permanen dari basis data.',
            type: 'danger',
            confirmText: 'Ya, Hapus Permanen',
            onConfirm: () => {
                destroy(route('admin.lembaga.destroy', id), {
                    onSuccess: () => {
                        setConfirmModal(prev => ({ ...prev, show: false }));
                        setToastMessage('Unit pendidikan berhasil dihapus secara permanen.');
                        setToastType('warning');
                        setShowToast(true);
                    }
                });
            }
        });
    };

    // Standard high-end luxury earthy form style classes
    const labelStyle = "block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2";
    const inputStyle = "w-full text-xs text-slate-800 bg-white border border-slate-200 rounded-[0.25rem] py-2.5 px-3.5 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/20 hover:border-slate-300 transition-all outline-none placeholder-slate-400 font-semibold";
    const textareaStyle = "w-full text-xs text-slate-800 bg-white border border-slate-200 rounded-[0.25rem] py-2.5 px-3.5 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/20 hover:border-slate-300 transition-all outline-none placeholder-slate-400 font-semibold leading-relaxed";

    return (
        <IndukAdminLayout title="Kelola Pendidikan">
            <Head title="Kelola Unit Pendidikan" />

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
                
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-100 pb-6">
                    <div>
                        <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-accent mb-2">Pusat Manajemen Unit</h2>
                        <h1 className="text-3xl font-semibold uppercase tracking-tighter text-slate-900 leading-none">Kelola <br /><span className="text-brand-primary">Tingkat Pendidikan</span></h1>
                        <p className="mt-3 text-[10px] text-slate-400 uppercase tracking-widest font-bold flex items-center gap-1.5">
                            <InformationCircleIcon className="h-4 w-4 text-brand-primary" /> Tambah & Edit info dasar unit di sini
                        </p>
                    </div>
                    <button 
                        onClick={openCreateModal}
                        className="bg-brand-primary text-white text-[10px] font-bold uppercase tracking-widest px-8 py-3.5 rounded-[0.25rem] flex items-center gap-2 hover:bg-slate-900 transition-all shadow-xl shadow-brand-primary/25 self-start md:self-auto"
                    >
                        <PlusIcon className="h-4 w-4" />
                        Tambah Unit Baru
                    </button>
                </div>

                {/* Master Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {lembagas.map((lembaga) => (
                        <div key={lembaga.id} className="bg-white border border-slate-200 rounded-[0.25rem] overflow-hidden shadow-sm hover:shadow-xl hover:border-slate-300 transition-all group flex flex-col">
                            {/* Banner Preview */}
                            <div className="aspect-video relative overflow-hidden bg-slate-100">
                                <img 
                                    src={lembaga.image_url || 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=600'} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                                    alt={lembaga.nama} 
                                    loading="lazy"
                                />
                                {lembaga.ikon_url && (
                                    <div className="absolute bottom-4 left-4 w-10 h-10 bg-white p-2 rounded shadow-lg border border-slate-100 flex items-center justify-center">
                                        <img src={lembaga.ikon_url} className="w-full h-full object-contain" alt="Icon" />
                                    </div>
                                )}
                            </div>

                            <div className="p-6 flex-grow flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center justify-between mb-2 gap-2">
                                        <h3 className="font-bold text-slate-900 uppercase tracking-tight line-clamp-1 text-sm">{lembaga.nama}</h3>
                                        <span className="text-[8px] font-bold text-brand-primary uppercase tracking-widest shrink-0">/{lembaga.slug}</span>
                                    </div>
                                    <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed mb-6 h-8">
                                        {lembaga.summary || 'Belum ada deskripsi singkat.'}
                                    </p>
                                </div>
                                
                                <div className="space-y-3 pt-6 border-t border-slate-100">
                                    <div className="flex items-center gap-2">
                                        <button 
                                            onClick={() => openEditModal(lembaga)}
                                            className="flex-grow px-3 py-3 bg-slate-50 text-slate-700 text-[9px] font-bold uppercase tracking-widest rounded hover:bg-brand-primary hover:text-white border border-slate-200 hover:border-brand-primary transition-all flex items-center justify-center gap-1.5"
                                        >
                                            <PencilSquareIcon className="h-3.5 w-3.5" />
                                            Edit Dasar
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(lembaga.id)}
                                            className="p-3 bg-rose-50 text-rose-600 rounded hover:bg-rose-600 hover:text-white border border-rose-100 hover:border-rose-600 transition-all"
                                            title="Hapus Lembaga"
                                        >
                                            <TrashIcon className="h-4 w-4" />
                                        </button>
                                    </div>
                                    <Link 
                                        href={route('admin.lembaga.edit', lembaga.id)}
                                        className="w-full text-center py-3 bg-brand-primary/5 text-brand-primary text-[9px] font-bold uppercase tracking-widest rounded hover:bg-brand-primary hover:text-white border border-brand-primary/10 transition-all flex items-center justify-center gap-1.5 shadow-sm"
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
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white w-full max-w-2xl rounded-[0.25rem] shadow-2xl overflow-hidden border border-slate-200 animate-scale-up">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                            <div>
                                <h3 className="font-bold uppercase tracking-widest text-slate-900 text-sm">{editingLembaga ? 'Update Data Unit' : 'Tambah Unit Pendidikan'}</h3>
                                <p className="text-[9px] text-slate-400 uppercase tracking-widest mt-1">Konfigurasi Identitas Utama Lembaga</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-900 transition-colors p-2 text-2xl leading-none">&times;</button>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-1 space-y-1.5">
                                    <label className={labelStyle}>Nama Lembaga</label>
                                    <input 
                                        type="text" 
                                        className={inputStyle}
                                        placeholder="Contoh: SMP Al-Hikmah"
                                        value={data.nama}
                                        onChange={e => setData('nama', e.target.value)}
                                        required
                                    />
                                    {errors.nama && <span className="text-[10px] text-rose-500 font-semibold">{errors.nama}</span>}
                                </div>
                                <div className="md:col-span-1 space-y-1.5">
                                    <label className={labelStyle}>Slug URL</label>
                                    <div className="flex items-center">
                                        <span className="bg-slate-50 p-2.5 text-xs text-slate-400 rounded-l-[0.25rem] border border-r-0 border-slate-200 font-bold">/</span>
                                        <input 
                                            type="text" 
                                            className="w-full text-xs text-slate-800 bg-white border border-slate-200 rounded-r-[0.25rem] py-2.5 px-3.5 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/20 hover:border-slate-300 transition-all outline-none placeholder-slate-400 font-semibold"
                                            value={data.slug}
                                            onChange={e => setData('slug', e.target.value)}
                                            placeholder="smp-alhikmah"
                                        />
                                    </div>
                                    {errors.slug && <span className="text-[10px] text-rose-500 font-semibold">{errors.slug}</span>}
                                </div>
                                <div className="md:col-span-2 space-y-1.5">
                                    <label className={labelStyle}>Summary Singkat</label>
                                    <textarea 
                                        className={textareaStyle}
                                        rows="2"
                                        placeholder="Penjelasan singkat untuk kartu beranda..."
                                        value={data.summary}
                                        onChange={e => setData('summary', e.target.value)}
                                    ></textarea>
                                    {errors.summary && <span className="text-[10px] text-rose-500 font-semibold">{errors.summary}</span>}
                                </div>
                                <div className="md:col-span-2 space-y-1.5">
                                    <label className={labelStyle}>Running Text (Pengumuman Berjalan)</label>
                                    <input 
                                        type="text"
                                        className={inputStyle}
                                        placeholder="Contoh: Pendaftaran Santri Baru Telah Dibuka! Hubungi Admin..."
                                        value={data.running_text}
                                        onChange={e => setData('running_text', e.target.value)}
                                    />
                                    {errors.running_text && <span className="text-[10px] text-rose-500 font-semibold">{errors.running_text}</span>}
                                </div>
                                
                                <div className="md:col-span-1">
                                    <label className={labelStyle}>Banner Hero (16:9)</label>
                                    <div className="relative aspect-video bg-slate-50 rounded-[0.25rem] overflow-hidden border border-slate-200 hover:border-slate-300 transition-all group flex items-center justify-center shadow-sm">
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
                                    <label className={labelStyle}>Ikon/Logo (1:1)</label>
                                    <div className="relative aspect-square w-32 mx-auto bg-slate-50 rounded-[0.25rem] overflow-hidden border border-slate-200 hover:border-slate-300 transition-all group flex items-center justify-center shadow-sm">
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
                                <button type="submit" disabled={processing} className="bg-brand-primary text-white py-3 px-12 text-[10px] font-bold uppercase tracking-widest rounded-[0.25rem] hover:bg-slate-900 transition-all shadow-xl shadow-brand-primary/25 disabled:opacity-50">
                                    {processing ? 'Menyimpan...' : (editingLembaga ? 'Update Data' : 'Tambah Data')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </IndukAdminLayout>
    );
}
