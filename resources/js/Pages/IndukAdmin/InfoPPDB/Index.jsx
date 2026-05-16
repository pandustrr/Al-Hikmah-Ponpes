import React, { useState } from 'react';
import IndukAdminLayout from '@/Layouts/Induk/IndukAdminLayout';
import { useForm, router } from '@inertiajs/react';
import { 
    AcademicCapIcon, 
    ChatBubbleBottomCenterTextIcon, 
    PlusIcon, 
    PencilSquareIcon, 
    TrashIcon,
    CheckCircleIcon,
    XCircleIcon,
    GlobeAltIcon,
    PhoneIcon
} from '@heroicons/react/24/outline';

export default function Index({ ppdbInfos = [], lembagas = [], faqs = [], settings = {} }) {
    const [activeTab, setActiveTab] = useState('units');

    // State for Modals/Forms
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
    const [editingInfo, setEditingInfo] = useState(null);

    const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);
    const [editingFaq, setEditingFaq] = useState(null);

    // Form for PPDB Info
    const infoForm = useForm({
        lembaga_id: '',
        description: '',
        contact_number: '',
        registration_link: '',
        is_active: true,
    });

    // Form for FAQ
    const faqForm = useForm({
        lembaga_id: '',
        question: '',
        answer: '',
        order: 0,
        is_active: true,
    });

    const openEditInfo = (info) => {
        setEditingInfo(info);
        infoForm.setData({
            lembaga_id: info.lembaga_id,
            description: info.description || '',
            contact_number: info.contact_number || '',
            registration_link: info.registration_link || '',
            is_active: info.is_active,
        });
        setIsInfoModalOpen(true);
    };

    const handleInfoSubmit = (e) => {
        e.preventDefault();
        if (editingInfo) {
            infoForm.put(route('admin.ppdb-info.update', editingInfo.id), {
                onSuccess: () => setIsInfoModalOpen(false)
            });
        } else {
            infoForm.post(route('admin.ppdb-info.store'), {
                onSuccess: () => setIsInfoModalOpen(false)
            });
        }
    };

    return (
        <IndukAdminLayout title="Kelola PPDB">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                
                {/* Header */}
                <div className="mb-10 flex justify-between items-end">
                    <div>
                        <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-accent mb-2">Penerimaan Siswa Baru</h2>
                        <h1 className="text-4xl font-semibold uppercase tracking-tighter text-slate-900 leading-none">Kelola Informasi <br /><span className="text-brand-primary">PPDB & FAQ</span></h1>
                    </div>
                    {activeTab === 'faqs' && (
                        <button className="bg-brand-primary text-white text-xs font-semibold uppercase tracking-widest px-6 py-3 rounded-[0.25rem] flex items-center gap-2 hover:bg-slate-900 transition-all">
                            <PlusIcon className="h-4 w-4" />
                            Tambah FAQ
                        </button>
                    )}
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-2 mb-8 border-b border-slate-200">
                    <button 
                        onClick={() => setActiveTab('units')}
                        className={`px-6 py-4 text-xs font-semibold uppercase tracking-widest transition-all border-b-2 flex items-center gap-2 ${
                            activeTab === 'units' 
                            ? 'border-brand-primary text-brand-primary' 
                            : 'border-transparent text-slate-400 hover:text-brand-primary'
                        }`}
                    >
                        <AcademicCapIcon className="h-4 w-4" />
                        Info Unit Pendidikan
                    </button>
                    <button 
                        onClick={() => setActiveTab('faqs')}
                        className={`px-6 py-4 text-xs font-semibold uppercase tracking-widest transition-all border-b-2 flex items-center gap-2 ${
                            activeTab === 'faqs' 
                            ? 'border-brand-primary text-brand-primary' 
                            : 'border-transparent text-slate-400 hover:text-brand-primary'
                        }`}
                    >
                        <ChatBubbleBottomCenterTextIcon className="h-4 w-4" />
                        Manajemen FAQ
                    </button>
                    <button 
                        onClick={() => setActiveTab('settings')}
                        className={`px-6 py-4 text-xs font-semibold uppercase tracking-widest transition-all border-b-2 flex items-center gap-2 ${
                            activeTab === 'settings' 
                            ? 'border-brand-primary text-brand-primary' 
                            : 'border-transparent text-slate-400 hover:text-brand-primary'
                        }`}
                    >
                        <GlobeAltIcon className="h-4 w-4" />
                        Konfigurasi Page
                    </button>
                </div>

                {/* Units Info Grid */}
                {activeTab === 'units' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {lembagas.map(lembaga => {
                            const info = ppdbInfos.find(i => i.lembaga_id === lembaga.id);
                            return (
                                <div key={lembaga.id} className="bg-white border border-slate-200 rounded-[0.25rem] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                    <div className="p-6 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                                        <h3 className="font-bold text-slate-900 uppercase tracking-tight">{lembaga.nama}</h3>
                                        {info ? (
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${info.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                {info.is_active ? 'Aktif' : 'Non-Aktif'}
                                            </span>
                                        ) : (
                                            <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-slate-100 text-slate-400">
                                                Belum Diatur
                                            </span>
                                        )}
                                    </div>
                                    <div className="p-6 space-y-6">
                                        {info ? (
                                            <>
                                                <div className="grid grid-cols-1 gap-4">
                                                    <div className="flex items-center gap-3">
                                                        <PhoneIcon className="h-4 w-4 text-slate-400" />
                                                        <span className="text-sm text-slate-600">{info.contact_number || '-'}</span>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <GlobeAltIcon className="h-4 w-4 text-slate-400" />
                                                        <span className="text-sm text-slate-600 truncate max-w-xs">{info.registration_link || '-'}</span>
                                                    </div>
                                                </div>
                                                <p className="text-xs text-slate-500 italic line-clamp-2">
                                                    "{info.description || 'Belum ada deskripsi khusus PPDB.'}"
                                                </p>
                                            </>
                                        ) : (
                                            <p className="text-sm text-slate-400 italic">Silakan klik tombol di bawah untuk melengkapi informasi PPDB unit ini.</p>
                                        )}
                                        
                                        <button 
                                            onClick={() => openEditInfo(info || { lembaga_id: lembaga.id })}
                                            className="w-full py-3 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-[0.25rem] flex items-center justify-center gap-2 hover:bg-brand-primary transition-all"
                                        >
                                            <PencilSquareIcon className="h-4 w-4" />
                                            Update Info PPDB
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* FAQ Management */}
                {activeTab === 'faqs' && (
                    <div className="bg-white border border-slate-200 rounded-[0.25rem] shadow-sm overflow-hidden">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                    <th className="px-6 py-4">Unit</th>
                                    <th className="px-6 py-4">Pertanyaan</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {faqs.map(faq => (
                                    <tr key={faq.id} className="text-sm hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <span className="bg-slate-100 px-2 py-1 rounded text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                                {faq.lembaga?.slug || 'UMUM'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-slate-700">{faq.question}</td>
                                        <td className="px-6 py-4">
                                            {faq.is_active ? (
                                                <CheckCircleIcon className="h-5 w-5 text-green-500" />
                                            ) : (
                                                <XCircleIcon className="h-5 w-5 text-red-400" />
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-2">
                                            <button className="p-2 text-slate-400 hover:text-brand-primary transition-colors"><PencilSquareIcon className="h-5 w-5" /></button>
                                            <button className="p-2 text-slate-400 hover:text-red-500 transition-colors"><TrashIcon className="h-5 w-5" /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* 3. Page Settings */}
                {activeTab === 'settings' && (
                    <div className="bg-white border border-slate-200 rounded-[0.25rem] shadow-sm p-8">
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest border-l-4 border-brand-primary pl-4 mb-8">Pengaturan Visual Halaman</h3>
                        
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.target);
                            router.post(route('admin.landing.settings.update'), formData, {
                                forceFormData: true,
                            });
                        }} className="max-w-2xl space-y-8">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Hero Background (Halaman Publik PPDB)</label>
                                
                                <div className="flex flex-col md:flex-row gap-8 items-center">
                                    <div className="relative w-full md:w-80 aspect-video bg-slate-100 rounded-[0.25rem] overflow-hidden border-2 border-dashed border-slate-200 group">
                                        <img 
                                            id="ppdb-hero-preview"
                                            src={settings.ppdb_hero_bg || 'https://images.unsplash.com/photo-1523050335392-93851179ae22?w=1600'} 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                                            alt="Preview"
                                        />
                                        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <PhotoIcon className="h-8 w-8 text-white mb-2" />
                                            <span className="text-white text-[8px] font-bold uppercase tracking-widest">Ganti Background</span>
                                        </div>
                                        <input 
                                            type="file" 
                                            name="ppdb_hero_bg"
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file = e.target.files[0];
                                                if (file) {
                                                    const reader = new FileReader();
                                                    reader.onload = (e) => {
                                                        const img = document.querySelector('#ppdb-hero-preview');
                                                        if (img) img.src = e.target.result;
                                                    };
                                                    reader.readAsDataURL(file);
                                                }
                                            }}
                                        />
                                    </div>
                                    
                                    <div className="flex-grow">
                                        <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest mb-1">Panduan Hero Background</p>
                                        <p className="text-[9px] text-slate-400 italic leading-relaxed">
                                            Klik kotak untuk mengupload file background baru. <br />
                                            Gunakan gambar resolusi tinggi (min. 1920x1080) <br />
                                            untuk hasil visual terbaik di layar lebar.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-slate-100">
                                <button 
                                    type="submit" 
                                    className="bg-brand-primary text-white py-4 px-8 text-xs font-bold uppercase tracking-widest rounded-[0.25rem] hover:bg-slate-900 transition-all shadow-xl shadow-brand-primary/20"
                                >
                                    Simpan Konfigurasi
                                </button>
                            </div>
                        </form>
                    </div>
                )}

            </div>

            {/* Simple Info Edit Overlay (Mental Mockup) */}
            {isInfoModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-xl rounded-[0.25rem] shadow-2xl overflow-hidden">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="font-bold uppercase tracking-widest text-slate-900">Update Data PPDB</h3>
                            <button onClick={() => setIsInfoModalOpen(false)} className="text-slate-400 hover:text-slate-900">&times;</button>
                        </div>
                        <form onSubmit={handleInfoSubmit} className="p-8 space-y-6">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Deskripsi Pendaftaran</label>
                                <textarea 
                                    className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-4 text-sm focus:ring-1 focus:ring-brand-primary outline-none"
                                    rows="4"
                                    value={infoForm.data.description}
                                    onChange={e => infoForm.setData('description', e.target.value)}
                                ></textarea>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">WhatsApp Admin</label>
                                    <input 
                                        type="text" 
                                        className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-3 text-sm focus:ring-1 focus:ring-brand-primary outline-none"
                                        placeholder="0812-xxxx-xxxx"
                                        value={infoForm.data.contact_number}
                                        onChange={e => infoForm.setData('contact_number', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Link Registrasi</label>
                                    <input 
                                        type="text" 
                                        className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-3 text-sm focus:ring-1 focus:ring-brand-primary outline-none"
                                        placeholder="https://..."
                                        value={infoForm.data.registration_link}
                                        onChange={e => infoForm.setData('registration_link', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="pt-4">
                                <button 
                                    type="submit" 
                                    disabled={infoForm.processing}
                                    className="w-full bg-brand-primary text-white py-4 text-xs font-bold uppercase tracking-widest rounded-[0.25rem] hover:bg-slate-900 transition-all shadow-xl shadow-brand-primary/20"
                                >
                                    Simpan Perubahan Data
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </IndukAdminLayout>
    );
}
