import React from 'react';
import IndukAdminLayout from '@/Layouts/Induk/IndukAdminLayout';
import { useForm, Link } from '@inertiajs/react';
import { 
    AcademicCapIcon, 
    ArrowLeftIcon,
    SparklesIcon,
    StarIcon,
    RectangleStackIcon,
    DocumentTextIcon,
    CheckCircleIcon,
    UserGroupIcon,
    PencilSquareIcon,
    TrashIcon,
    PhotoIcon,
    ArrowRightIcon,
    BuildingLibraryIcon,
    InformationCircleIcon
} from '@heroicons/react/24/outline';

export default function Edit({ lembaga, pengajars = [] }) {
    const [activeTab, setActiveTab] = React.useState('visual');
    
    const { data, setData, put, processing, errors } = useForm({
        nama: lembaga.nama,
        slug: lembaga.slug,
        deskripsi: lembaga.deskripsi || '',
        summary: lembaga.summary || '',
        running_text: lembaga.running_text || '',
        visi: lembaga.visi || '',
        misi: lembaga.misi || '',
        struktur_pendidikan: lembaga.struktur_pendidikan || '',
        keunggulan: lembaga.keunggulan || '',
        image: null,
        ikon: null,
    });

    const [imagePreview, setImagePreview] = React.useState(lembaga.image_url);
    const [iconPreview, setIconPreview] = React.useState(lembaga.ikon_url);

    const [isPengajarModalOpen, setIsPengajarModalOpen] = React.useState(false);
    const [editingPengajar, setEditingPengajar] = React.useState(null);
    const pengajarForm = useForm({
        lembaga_id: lembaga.id,
        nama: '',
        jabatan: '',
        image: null,
    });

    const [pengajarPreview, setPengajarPreview] = React.useState(null);

    const openAddPengajar = () => {
        setEditingPengajar(null);
        pengajarForm.reset();
        setPengajarPreview(null);
        setIsPengajarModalOpen(true);
    };

    const openEditPengajar = (p) => {
        setEditingPengajar(p);
        pengajarForm.setData({
            nama: p.nama,
            jabatan: p.jabatan,
            image: null,
        });
        setPengajarPreview(p.image_url);
        setIsPengajarModalOpen(true);
    };

    const submitPengajar = (e) => {
        e.preventDefault();
        if (editingPengajar) {
            pengajarForm.put(route('admin.pengajar.update', editingPengajar.id), {
                forceFormData: true,
                onSuccess: () => setIsPengajarModalOpen(false),
            });
        } else {
            pengajarForm.post(route('admin.pengajar.store'), {
                onSuccess: () => {
                    setIsPengajarModalOpen(false);
                    pengajarForm.reset();
                }
            });
        }
    };

    const deletePengajar = (id) => {
        if (confirm('Hapus pengajar ini?')) {
            pengajarForm.delete(route('admin.pengajar.destroy', id));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('admin.lembaga.update', lembaga.id));
    };

    const tabs = [
        { id: 'visual', name: 'Identitas Visual', icon: PhotoIcon },
        { id: 'profil', name: 'Profil & Narasi', icon: DocumentTextIcon },
        { id: 'visi', name: 'Visi, Misi & Kurikulum', icon: SparklesIcon },
        { id: 'keunggulan', name: 'Keunggulan Unit', icon: StarIcon },
        { id: 'pengajar', name: 'Tenaga Pendidik', icon: UserGroupIcon },
    ];

    return (
        <IndukAdminLayout title={`Detail: ${lembaga.nama}`}>
            <div className="max-w-6xl mx-auto pt-6 pb-16 px-4 sm:px-6 lg:px-8">
                
                {/* Header Navigation */}
                <div className="mb-6 flex items-center justify-between">
                    <Link 
                        href={route('admin.lembaga.index')}
                        className="text-[10px] font-bold text-slate-400 hover:text-brand-primary uppercase tracking-widest flex items-center gap-2 transition-colors"
                    >
                        <ArrowLeftIcon className="h-3 w-3" /> Kembali ke Kelola Pendidikan
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-brand-primary/5 rounded flex items-center justify-center">
                            <AcademicCapIcon className="h-4 w-4 text-brand-primary" />
                        </div>
                        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-tight">{lembaga.nama}</h2>
                    </div>
                </div>

                {/* Page Title */}
                <div className="mb-8">
                    <h2 className="text-[10px] font-bold text-brand-accent uppercase tracking-[0.4em] mb-3">Panel Manajemen Unit</h2>
                    <h1 className="text-4xl font-semibold text-slate-900 tracking-tighter uppercase leading-none">Kelola Detail <br /><span className="text-brand-primary">Lembaga</span></h1>
                </div>

                {/* Tabs Navigation */}
                <div className="flex flex-wrap gap-2 mb-8 border-b border-slate-200 pb-px">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-6 py-4 text-[10px] font-bold uppercase tracking-widest transition-all relative ${
                                activeTab === tab.id 
                                ? 'text-brand-primary' 
                                : 'text-slate-400 hover:text-slate-600'
                            }`}
                        >
                            <tab.icon className="h-4 w-4" />
                            {tab.name}
                            {activeTab === tab.id && (
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-brand-primary rounded-t-full"></div>
                            )}
                        </button>
                    ))}
                </div>

                {/* Main Form Wrapper */}
                <form onSubmit={handleSubmit}>
                    
                    {/* Tab 1: Profil & Narasi Utama */}
                    {activeTab === 'profil' && (
                        <div className="space-y-8 animate-fade-in">
                            <div className="bg-white border border-slate-200 rounded-[0.25rem] p-8 space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="md:col-span-2">
                                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Ringkasan Singkat (Summary)</label>
                                        <textarea 
                                            className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-4 text-sm focus:ring-1 focus:ring-brand-primary outline-none min-h-[80px]"
                                            value={data.summary}
                                            onChange={e => setData('summary', e.target.value)}
                                            placeholder="Muncul di kartu tingkat pendidikan..."
                                        ></textarea>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Narasi Beranda (Running Text)</label>
                                        <textarea 
                                            className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-4 text-sm focus:ring-1 focus:ring-brand-primary outline-none min-h-[80px]"
                                            value={data.running_text}
                                            onChange={e => setData('running_text', e.target.value)}
                                            placeholder="Kalimat yang berjalan di bawah statistik..."
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Tab 2: Visi & Misi */}
                    {activeTab === 'visi' && (
                        <div className="space-y-8 animate-fade-in">
                            <div className="bg-white border border-slate-200 rounded-[0.25rem] p-8 space-y-8">
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                        <SparklesIcon className="h-3 w-3 text-brand-primary" /> Visi Unit
                                    </label>
                                    <textarea 
                                        className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-4 text-sm focus:ring-1 focus:ring-brand-primary outline-none min-h-[80px]"
                                        value={data.visi}
                                        onChange={e => setData('visi', e.target.value)}
                                    ></textarea>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Misi Unit</label>
                                    <textarea 
                                        className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-4 text-sm focus:ring-1 focus:ring-brand-primary outline-none min-h-[150px]"
                                        value={data.misi}
                                        onChange={e => setData('misi', e.target.value)}
                                        placeholder="Gunakan baris baru untuk setiap poin misi..."
                                    ></textarea>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Struktur Pendidikan / Kurikulum</label>
                                    <textarea 
                                        className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-4 text-sm focus:ring-1 focus:ring-brand-primary outline-none min-h-[150px]"
                                        value={data.struktur_pendidikan}
                                        onChange={e => setData('struktur_pendidikan', e.target.value)}
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Tab 3: Identitas Visual */}
                    {activeTab === 'visual' && (
                        <div className="space-y-8 animate-fade-in">
                            <div className="bg-white border border-slate-200 rounded-[0.25rem] p-8 space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Hero Banner (Latar Belakang Utama)</label>
                                        <div className="relative aspect-video bg-slate-100 rounded overflow-hidden border-2 border-dashed border-slate-200 group">
                                            {imagePreview ? (
                                                <img src={imagePreview} className="w-full h-full object-cover" alt="Preview" />
                                            ) : (
                                                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300">
                                                    <PhotoIcon className="h-10 w-10 mb-2" />
                                                    <span className="text-[10px] font-bold uppercase tracking-widest">Pilih Gambar Banner</span>
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <span className="text-white text-[10px] font-bold uppercase tracking-[0.2em] border border-white/40 px-4 py-2">Ganti Gambar</span>
                                            </div>
                                            <input 
                                                type="file" 
                                                className="absolute inset-0 opacity-0 cursor-pointer" 
                                                onChange={e => {
                                                    const file = e.target.files[0];
                                                    setData('image', file);
                                                    if (file) setImagePreview(URL.createObjectURL(file));
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Ikon Logo Unit (Seal of Identity)</label>
                                        <div className="relative w-40 h-40 bg-slate-100 rounded-xl overflow-hidden border-2 border-dashed border-slate-200 group mx-auto md:mx-0">
                                            {iconPreview ? (
                                                <img src={iconPreview} className="w-full h-full object-contain p-4" alt="Icon Preview" />
                                            ) : (
                                                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300">
                                                    <BuildingLibraryIcon className="h-10 w-10 mb-2" />
                                                    <span className="text-[8px] font-bold uppercase tracking-widest">Pilih Ikon</span>
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <span className="text-white text-[8px] font-bold uppercase tracking-[0.2em]">Ganti</span>
                                            </div>
                                            <input 
                                                type="file" 
                                                className="absolute inset-0 opacity-0 cursor-pointer" 
                                                onChange={e => {
                                                    const file = e.target.files[0];
                                                    setData('ikon', file);
                                                    if (file) setIconPreview(URL.createObjectURL(file));
                                                }}
                                            />
                                        </div>
                                        <p className="mt-4 text-[9px] text-slate-400 uppercase tracking-widest text-center md:text-left italic">Direkomendasikan format PNG transparan 1:1</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Tab 4: Keunggulan */}
                    {activeTab === 'keunggulan' && (
                        <div className="space-y-8 animate-fade-in">
                            <div className="bg-white border border-slate-200 rounded-[0.25rem] p-8">
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                    <StarIcon className="h-3 w-3 text-brand-primary" /> Keunggulan Unit
                                </label>
                                <textarea 
                                    className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-4 text-sm focus:ring-1 focus:ring-brand-primary outline-none min-h-[250px]"
                                    value={data.keunggulan}
                                    onChange={e => setData('keunggulan', e.target.value)}
                                    placeholder="Tuliskan poin-poin keunggulan unit di sini..."
                                ></textarea>
                                <div className="mt-4 flex items-center gap-2 text-[10px] text-slate-400 uppercase tracking-widest italic font-medium">
                                    <InformationCircleIcon className="h-3 w-3" /> Gunakan baris baru untuk memisahkan poin keunggulan.
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Tab 5: Tenaga Pendidik */}
                    {activeTab === 'pengajar' && (
                        <div className="space-y-8 animate-fade-in">
                            <div className="bg-white border border-slate-200 rounded-[0.25rem] overflow-hidden">
                                <div className="px-8 py-6 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <UserGroupIcon className="h-5 w-5 text-brand-primary" />
                                        <h3 className="font-bold text-slate-900 uppercase tracking-widest text-xs">Manajemen Tenaga Pendidik</h3>
                                    </div>
                                    <button 
                                        type="button"
                                        onClick={openAddPengajar}
                                        className="text-[10px] font-bold uppercase tracking-widest text-brand-primary hover:text-slate-900 transition-colors flex items-center gap-2"
                                    >
                                        Tambah Pengajar <ArrowRightIcon className="h-3 w-3" />
                                    </button>
                                </div>
                                <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {pengajars.map(p => (
                                        <div key={p.id} className="p-4 border border-slate-100 rounded flex items-center gap-4 group">
                                            <div className="w-12 h-12 rounded-full bg-slate-100 overflow-hidden flex-shrink-0">
                                                {p.image_url && <img src={p.image_url} className="w-full h-full object-cover" />}
                                            </div>
                                            <div className="flex-grow">
                                                <div className="text-[11px] font-bold text-slate-900 uppercase tracking-tight">{p.nama}</div>
                                                <div className="text-[9px] text-slate-400 uppercase tracking-widest">{p.jabatan}</div>
                                            </div>
                                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button type="button" onClick={() => openEditPengajar(p)} className="p-1.5 text-slate-400 hover:text-brand-primary"><PencilSquareIcon className="h-4 w-4" /></button>
                                                <button type="button" onClick={() => deletePengajar(p.id)} className="p-1.5 text-slate-400 hover:text-red-500"><TrashIcon className="h-4 w-4" /></button>
                                            </div>
                                        </div>
                                    ))}
                                    {pengajars.length === 0 && (
                                        <div className="col-span-full py-12 text-center text-slate-300 text-[10px] font-bold uppercase tracking-widest border-2 border-dashed border-slate-50 rounded">
                                            Belum ada data tenaga pendidik.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Floating Submit Button (Only for form tabs) */}
                    {activeTab !== 'pengajar' && (
                        <div className="mt-8 flex justify-end">
                            <button 
                                type="submit" 
                                disabled={processing}
                                className="bg-brand-primary text-white py-4 px-12 text-[10px] font-bold uppercase tracking-[0.2em] rounded-[0.25rem] hover:bg-slate-900 transition-all shadow-xl shadow-brand-primary/20 flex items-center gap-3"
                            >
                                {processing ? 'Sedang Menyimpan...' : (
                                    <>Simpan Perubahan {tabs.find(t => t.id === activeTab)?.name} <CheckCircleIcon className="h-4 w-4" /></>
                                )}
                            </button>
                        </div>
                    )}
                </form>

                {/* --- MODAL PENGAJAR (TETAP SAMA) --- */}
                {isPengajarModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                        <div className="bg-white w-full max-w-md rounded-[0.25rem] shadow-2xl overflow-hidden">
                            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                                <h3 className="font-bold uppercase tracking-widest text-slate-900 text-xs">{editingPengajar ? 'Edit Data Pengajar' : 'Tambah Pengajar Baru'}</h3>
                                <button onClick={() => setIsPengajarModalOpen(false)} className="text-slate-400 hover:text-slate-900 text-2xl leading-none">&times;</button>
                            </div>
                            <form onSubmit={submitPengajar} className="p-8 space-y-6">
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Nama Lengkap</label>
                                    <input 
                                        type="text" 
                                        className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-3 text-sm focus:ring-1 focus:ring-brand-primary outline-none"
                                        value={pengajarForm.data.nama}
                                        onChange={e => pengajarForm.setData('nama', e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Jabatan / Guru Mapel</label>
                                    <input 
                                        type="text" 
                                        className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-3 text-sm focus:ring-1 focus:ring-brand-primary outline-none"
                                        value={pengajarForm.data.jabatan}
                                        onChange={e => pengajarForm.setData('jabatan', e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Foto Profile (1:1)</label>
                                    <div className="relative aspect-square w-32 mx-auto bg-slate-100 rounded overflow-hidden border-2 border-dashed border-slate-200 group">
                                        {pengajarPreview ? (
                                            <img src={pengajarPreview} className="w-full h-full object-cover" alt="Preview" />
                                        ) : (
                                            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300">
                                                <PhotoIcon className="h-8 w-8 mb-2" />
                                                <span className="text-[8px] font-bold uppercase tracking-widest">Pilih Foto</span>
                                            </div>
                                        )}
                                        <input 
                                            type="file" 
                                            className="absolute inset-0 opacity-0 cursor-pointer" 
                                            onChange={e => {
                                                const file = e.target.files[0];
                                                pengajarForm.setData('image', file);
                                                if (file) setPengajarPreview(URL.createObjectURL(file));
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="pt-6 border-t border-slate-100 flex justify-end gap-3">
                                    <button type="button" onClick={() => setIsPengajarModalOpen(false)} className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors">Batal</button>
                                    <button 
                                        type="submit" 
                                        disabled={pengajarForm.processing}
                                        className="bg-brand-primary text-white py-3 px-8 text-[10px] font-bold uppercase tracking-widest rounded-[0.25rem] hover:bg-slate-900 transition-all"
                                    >
                                        {pengajarForm.processing ? 'Menyimpan...' : 'Simpan Data'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
            
            <style dangerouslySetInnerHTML={{ __html: `
                .animate-fade-in {
                    animation: fadeIn 0.4s ease-out forwards;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}} />
        </IndukAdminLayout>
    );
}
