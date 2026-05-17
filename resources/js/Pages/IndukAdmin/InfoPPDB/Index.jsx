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
    PhoneIcon,
    PhotoIcon
} from '@heroicons/react/24/outline';

export default function Index({ ppdbInfos = [], lembagas = [], faqs = [], settings = {} }) {
    const [activeTab, setActiveTab] = useState('settings');

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
        contact_persons: [],
        registration_link: '',
        is_active: true,
        is_open: true,
    });

    // Form for FAQ
    const faqForm = useForm({
        lembaga_id: '',
        question: '',
        answer: '',
        order: 0,
        is_active: true,
    });

    const addContact = () => {
        infoForm.setData('contact_persons', [...infoForm.data.contact_persons, { name: '', number: '' }]);
    };

    const removeContact = (i) => {
        infoForm.setData('contact_persons', infoForm.data.contact_persons.filter((_, idx) => idx !== i));
    };

    const updateContact = (i, field, value) => {
        const updated = infoForm.data.contact_persons.map((c, idx) =>
            idx === i ? { ...c, [field]: value } : c
        );
        infoForm.setData('contact_persons', updated);
    };

    const openEditInfo = (info) => {
        setEditingInfo(info);
        
        // Migrate legacy contact_number to contact_persons if empty
        const initialContacts = (info.contact_persons && info.contact_persons.length > 0)
            ? info.contact_persons
            : (info.contact_number ? [{ name: 'Panitia PPDB', number: info.contact_number }] : []);

        infoForm.setData({
            lembaga_id: info.lembaga_id,
            description: info.description || '',
            contact_number: info.contact_number || '',
            contact_persons: initialContacts,
            registration_link: info.registration_link || '',
            is_active: info.is_active ?? true,
            is_open: info.is_open ?? true,
        });
        setIsInfoModalOpen(true);
    };

    const handleInfoSubmit = (e) => {
        e.preventDefault();
        if (editingInfo && editingInfo.id) {
            infoForm.put(route('admin.ppdb-info.update', editingInfo.id), {
                onSuccess: () => setIsInfoModalOpen(false)
            });
        } else {
            infoForm.post(route('admin.ppdb-info.store'), {
                onSuccess: () => setIsInfoModalOpen(false)
            });
        }
    };

    const openCreateFaq = () => {
        setEditingFaq(null);
        faqForm.reset();
        faqForm.setData({
            lembaga_id: '',
            question: '',
            answer: '',
            order: 0,
            is_active: true,
        });
        setIsFaqModalOpen(true);
    };

    const openEditFaq = (faq) => {
        setEditingFaq(faq);
        faqForm.setData({
            lembaga_id: faq.lembaga_id || '',
            question: faq.question || '',
            answer: faq.answer || '',
            order: faq.order || 0,
            is_active: faq.is_active ?? true,
        });
        setIsFaqModalOpen(true);
    };

    const handleFaqSubmit = (e) => {
        e.preventDefault();
        if (editingFaq && editingFaq.id) {
            faqForm.put(route('admin.ppdb-faq.update', editingFaq.id), {
                onSuccess: () => setIsFaqModalOpen(false)
            });
        } else {
            faqForm.post(route('admin.ppdb-faq.store'), {
                onSuccess: () => setIsFaqModalOpen(false)
            });
        }
    };

    const handleDeleteFaq = (faq) => {
        if (confirm('Apakah Anda yakin ingin menghapus FAQ ini?')) {
            router.delete(route('admin.ppdb-faq.destroy', faq.id));
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
                        <button 
                            onClick={openCreateFaq}
                            className="bg-brand-primary text-white text-xs font-semibold uppercase tracking-widest px-6 py-3 rounded-[0.25rem] flex items-center gap-2 hover:bg-slate-900 transition-all"
                        >
                            <PlusIcon className="h-4 w-4" />
                            Tambah FAQ
                        </button>
                    )}
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-2 mb-8 border-b border-slate-200">
                    <button 
                        onClick={() => setActiveTab('settings')}
                        className={`px-6 py-4 text-xs font-semibold uppercase tracking-widest transition-all border-b-2 flex items-center gap-2 ${
                            activeTab === 'settings' 
                            ? 'border-brand-primary text-brand-primary' 
                            : 'border-transparent text-slate-400 hover:text-brand-primary'
                        }`}
                    >
                        <GlobeAltIcon className="h-4 w-4" />
                        Background
                    </button>
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
                        onClick={() => setActiveTab('help')}
                        className={`px-6 py-4 text-xs font-semibold uppercase tracking-widest transition-all border-b-2 flex items-center gap-2 ${
                            activeTab === 'help' 
                            ? 'border-brand-primary text-brand-primary' 
                            : 'border-transparent text-slate-400 hover:text-brand-primary'
                        }`}
                    >
                        <PhoneIcon className="h-4 w-4" />
                        Banner Bantuan
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
                    <div className="space-y-8 animate-fade-in">
                        {/* FAQ Header Text Settings Form */}
                        <div className="bg-white border border-slate-200 rounded-[0.25rem] shadow-sm p-8">
                            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-l-4 border-brand-primary pl-4 mb-6">Pengaturan Judul & Deskripsi FAQ</h3>
                            
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.target);
                                router.post(route('admin.landing.settings.update'), formData, {
                                    forceFormData: true,
                                });
                            }} className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                                <div className="space-y-4 md:col-span-2">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Tagline FAQ (Teks Kecil Paling Atas)</label>
                                            <input 
                                                type="text" 
                                                name="ppdb_faq_tagline"
                                                defaultValue={settings.ppdb_faq_tagline || 'Informasi Umum'}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] px-4 py-3 text-sm focus:ring-1 focus:ring-brand-primary outline-none"
                                                placeholder="Informasi Umum"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Judul FAQ (FAQ Title)</label>
                                            <input 
                                                type="text" 
                                                name="ppdb_faq_title"
                                                defaultValue={settings.ppdb_faq_title || 'Tanya Jawab Seputar PPDB'}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] px-4 py-3 text-sm focus:ring-1 focus:ring-brand-primary outline-none"
                                                placeholder="Tanya Jawab Seputar PPDB"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Deskripsi FAQ (FAQ Description)</label>
                                        <textarea 
                                            name="ppdb_faq_description"
                                            defaultValue={settings.ppdb_faq_description || 'Temukan jawaban dari berbagai pertanyaan umum yang sering diajukan seputar proses penerimaan, administrasi, syarat masuk, dan sistem pengajaran terpadu di Yayasan Al-Hikmah Jember.'}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-4 text-sm focus:ring-1 focus:ring-brand-primary outline-none min-h-[80px]"
                                            placeholder="Tulis deskripsi FAQ di sini..."
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="md:col-span-2 flex justify-end">
                                    <button 
                                        type="submit" 
                                        className="bg-brand-primary text-white py-3 px-6 text-xs font-bold uppercase tracking-widest rounded-[0.25rem] hover:bg-slate-900 transition-all shadow-md"
                                    >
                                        Simpan Teks FAQ
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* FAQ List Table */}
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
                                            <button 
                                                onClick={() => openEditFaq(faq)}
                                                className="p-2 text-slate-400 hover:text-brand-primary transition-colors"
                                            >
                                                <PencilSquareIcon className="h-5 w-5" />
                                            </button>
                                            <button 
                                                onClick={() => handleDeleteFaq(faq)}
                                                className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                                            >
                                                <TrashIcon className="h-5 w-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
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

                            {/* Text Inputs for Hero Area */}
                            <div className="space-y-6 pt-6 border-t border-slate-100 animate-fade-in">
                                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Konten Teks Hero Section</h4>
                                
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Tagline (Teks Kecil Paling Atas)</label>
                                    <input 
                                        type="text" 
                                        name="ppdb_hero_tagline"
                                        defaultValue={settings.ppdb_hero_tagline || 'Portal Pendaftaran Terpadu'}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] px-4 py-3 text-sm focus:ring-1 focus:ring-brand-primary outline-none"
                                        placeholder="Portal Pendaftaran Terpadu"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Judul Utama Hero (Hero Title)</label>
                                    <input 
                                        type="text" 
                                        name="ppdb_hero_title"
                                        defaultValue={settings.ppdb_hero_title || 'Mulai Perjalanan Masa Depan Rabbani Di Sini'}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] px-4 py-3 text-sm focus:ring-1 focus:ring-brand-primary outline-none"
                                        placeholder="Mulai Perjalanan Masa Depan Rabbani Di Sini"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Deskripsi Hero (Hero Description)</label>
                                    <textarea 
                                        name="ppdb_hero_description"
                                        defaultValue={settings.ppdb_hero_description || 'Selamat datang di pusat Penerimaan Peserta Didik Baru (PPDB) Yayasan Pendidikan dan Dakwah Sosial Al-Hikmah Jember. Kami berkomitmen menyelenggarakan pendidikan berkualitas terintegrasi nilai-nilai keislaman demi mencetak generasi bertakwa dan berakhlak mulia.'}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-4 text-sm focus:ring-1 focus:ring-brand-primary outline-none min-h-[120px]"
                                        placeholder="Tulis deskripsi selamat datang di sini..."
                                    ></textarea>
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

                {/* 4. Help CTA Settings Form Tab */}
                {activeTab === 'help' && (
                    <div className="bg-white border border-slate-200 rounded-[0.25rem] shadow-sm p-8 animate-fade-in">
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest border-l-4 border-brand-primary pl-4 mb-8">Pengaturan Banner Bantuan (CTA Kontak)</h3>
                        
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.target);
                            router.post(route('admin.landing.settings.update'), formData, {
                                forceFormData: true,
                            });
                        }} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Judul Banner Bantuan (CTA Title)</label>
                                    <input 
                                        type="text" 
                                        name="ppdb_help_title"
                                        defaultValue={settings.ppdb_help_title || 'Butuh Bantuan Lebih Lanjut?'}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] px-4 py-3 text-sm focus:ring-1 focus:ring-brand-primary outline-none"
                                        placeholder="Butuh Bantuan Lebih Lanjut?"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Teks Tombol Bantuan (Button Text)</label>
                                    <input 
                                        type="text" 
                                        name="ppdb_help_button"
                                        defaultValue={settings.ppdb_help_button || 'Hubungi Layanan Bantuan'}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] px-4 py-3 text-sm focus:ring-1 focus:ring-brand-primary outline-none"
                                        placeholder="Hubungi Layanan Bantuan"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Deskripsi Banner Bantuan (CTA Description)</label>
                                <textarea 
                                    name="ppdb_help_description"
                                    defaultValue={settings.ppdb_help_description || 'Jangan ragu untuk menghubungi layanan informasi pusat Yayasan Al-Hikmah jika Anda memerlukan panduan atau penjelasan seputar pendaftaran.'}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-4 text-sm focus:ring-1 focus:ring-brand-primary outline-none min-h-[120px]"
                                    placeholder="Tulis deskripsi bantuan di sini..."
                                ></textarea>
                            </div>
                            <div className="flex justify-end pt-4 border-t border-slate-100">
                                <button 
                                    type="submit" 
                                    className="bg-brand-primary text-white py-4 px-8 text-xs font-bold uppercase tracking-widest rounded-[0.25rem] hover:bg-slate-900 transition-all shadow-xl shadow-brand-primary/20"
                                >
                                    Simpan Pengaturan Banner
                                </button>
                            </div>
                        </form>
                    </div>
                )}

            </div>

            {/* Simple Info Edit Overlay (Mental Mockup) */}
            {isInfoModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-2xl rounded-[0.25rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
                            <h3 className="font-bold uppercase tracking-widest text-slate-900 text-sm">Update Data PPDB</h3>
                            <button onClick={() => setIsInfoModalOpen(false)} className="text-slate-400 hover:text-slate-900 text-2xl font-light">&times;</button>
                        </div>
                        <form onSubmit={handleInfoSubmit} className="p-8 space-y-6 overflow-y-auto flex-1">
                            
                            {/* Toggle Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 border border-slate-100 p-4 rounded">
                                {/* Toggle: Aktifkan PPDB */}
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs font-bold text-slate-800">Tampilkan Section PPDB</p>
                                        <p className="text-[9px] text-slate-400 mt-0.5">Muncul di halaman unit</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => infoForm.setData('is_active', !infoForm.data.is_active)}
                                        className={`w-10 h-5 rounded-full transition-colors duration-300 relative ${
                                            infoForm.data.is_active ? 'bg-brand-primary' : 'bg-slate-200'
                                        }`}
                                    >
                                        <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${
                                            infoForm.data.is_active ? 'left-5.5' : 'left-0.5'
                                        }`} />
                                    </button>
                                </div>

                                {/* Toggle: Status Buka/Tutup */}
                                <div className="flex items-center justify-between border-t md:border-t-0 md:border-l border-slate-200 pt-4 md:pt-0 md:pl-6">
                                    <div>
                                        <p className="text-xs font-bold text-slate-800">Status Pendaftaran</p>
                                        <p className="text-[9px] text-slate-400 mt-0.5">Label "Dibuka" atau "Ditutup"</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className={`text-[9px] font-bold uppercase tracking-widest ${
                                            infoForm.data.is_open ? 'text-emerald-500' : 'text-red-400'
                                        }`}>
                                            {infoForm.data.is_open ? 'Dibuka' : 'Ditutup'}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => infoForm.setData('is_open', !infoForm.data.is_open)}
                                            className={`w-10 h-5 rounded-full transition-colors duration-300 relative ${
                                                infoForm.data.is_open ? 'bg-emerald-500' : 'bg-red-400'
                                            }`}
                                        >
                                            <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${
                                                infoForm.data.is_open ? 'left-5.5' : 'left-0.5'
                                            }`} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Deskripsi */}
                            <div>
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Deskripsi Pendaftaran</label>
                                <textarea 
                                    className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-4 text-sm focus:ring-1 focus:ring-brand-primary outline-none"
                                    rows="3"
                                    value={infoForm.data.description}
                                    onChange={e => infoForm.setData('description', e.target.value)}
                                    placeholder="Tuliskan deskripsi singkat mengenai informasi PPDB di unit ini..."
                                ></textarea>
                                {infoForm.errors.description && (
                                    <p className="text-[10px] text-red-500 italic mt-1">{infoForm.errors.description}</p>
                                )}
                            </div>

                            {/* Kontak WhatsApp — Multi */}
                            <div className="pt-2">
                                <div className="flex items-center justify-between mb-3">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Kontak WhatsApp PPDB</label>
                                    <button
                                        type="button"
                                        onClick={addContact}
                                        className="text-[9px] font-bold text-brand-primary uppercase tracking-widest hover:text-slate-900 transition-colors flex items-center gap-1"
                                    >
                                        + Tambah Kontak
                                    </button>
                                </div>

                                {infoForm.data.contact_persons.length === 0 && (
                                    <p className="text-[10px] text-slate-300 italic text-center py-4 border-2 border-dashed border-slate-100 rounded">
                                        Belum ada kontak WhatsApp. Klik "Tambah Kontak" untuk menambahkan.
                                    </p>
                                )}

                                <div className="space-y-3">
                                    {infoForm.data.contact_persons.map((contact, i) => {
                                        const nameError = infoForm.errors[`contact_persons.${i}.name`];
                                        const numberError = infoForm.errors[`contact_persons.${i}.number`];

                                        return (
                                            <div key={i} className="space-y-1">
                                                <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-[0.25rem] p-3">
                                                    <span className="text-[10px] font-black text-slate-300 w-5 shrink-0 text-center">{i + 1}</span>
                                                    <input
                                                        type="text"
                                                        className={`flex-1 bg-white border rounded p-2 text-sm focus:ring-1 focus:ring-brand-primary outline-none ${
                                                            nameError ? 'border-red-400' : 'border-slate-200'
                                                        }`}
                                                        placeholder="Nama Panitia (mis. Panitia PPDB)"
                                                        value={contact.name}
                                                        onChange={e => updateContact(i, 'name', e.target.value)}
                                                    />
                                                    <input
                                                        type="text"
                                                        className={`flex-1 bg-white border rounded p-2 text-sm focus:ring-1 focus:ring-brand-primary outline-none ${
                                                            numberError ? 'border-red-400' : 'border-slate-200'
                                                        }`}
                                                        placeholder="Nomor WA (mis. 6281234567)"
                                                        value={contact.number}
                                                        onChange={e => updateContact(i, 'number', e.target.value)}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeContact(i)}
                                                        className="p-1.5 text-slate-300 hover:text-red-400 transition-colors shrink-0"
                                                    >
                                                        <TrashIcon className="h-4 w-4" />
                                                    </button>
                                                </div>
                                                {(nameError || numberError) && (
                                                    <div className="pl-8 text-[9px] text-red-500 italic space-x-2">
                                                        {nameError && <span>* {nameError}</span>}
                                                        {numberError && <span>* {numberError}</span>}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                                <p className="mt-2 text-[9px] text-slate-400 italic">Nomor WhatsApp harus diawali kode negara (62...) tanpa tanda +. Contoh: 6281234567890</p>
                            </div>

                            {/* Link Registrasi */}
                            <div>
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Link Formulir Online (Google Form dll)</label>
                                <input 
                                    type="text" 
                                    className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-3 text-sm focus:ring-1 focus:ring-brand-primary outline-none"
                                    placeholder="https://forms.google.com/..."
                                    value={infoForm.data.registration_link}
                                    onChange={e => infoForm.setData('registration_link', e.target.value)}
                                />
                                {infoForm.errors.registration_link && (
                                    <p className="text-[10px] text-red-500 italic mt-1">{infoForm.errors.registration_link}</p>
                                )}
                            </div>
                            
                            <div className="pt-6 border-t border-slate-100 flex justify-end gap-3 shrink-0">
                                <button
                                    type="button"
                                    onClick={() => setIsInfoModalOpen(false)}
                                    className="px-6 py-3 border border-slate-200 hover:bg-slate-50 text-[10px] font-bold uppercase tracking-widest text-slate-500 rounded-[0.25rem] transition-colors"
                                >
                                    Batal
                                </button>
                                <button 
                                    type="submit" 
                                    disabled={infoForm.processing}
                                    className="bg-brand-primary text-white py-3 px-8 text-[10px] font-bold uppercase tracking-widest rounded-[0.25rem] hover:bg-slate-900 transition-all shadow-xl shadow-brand-primary/20 flex items-center gap-2"
                                >
                                    {infoForm.processing ? 'Menyimpan...' : 'Simpan Perubahan Data'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {isFaqModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white w-full max-w-2xl rounded-[0.25rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col scale-100 transition-all duration-300">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
                            <h3 className="font-bold uppercase tracking-widest text-slate-900 text-sm">
                                {editingFaq ? 'Update FAQ PPDB' : 'Tambah FAQ Baru'}
                            </h3>
                            <button onClick={() => setIsFaqModalOpen(false)} className="text-slate-400 hover:text-slate-900 text-2xl font-light">&times;</button>
                        </div>
                        
                        <form onSubmit={handleFaqSubmit} className="p-8 space-y-6 overflow-y-auto flex-1">
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Unit/Lembaga Selection */}
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Unit / Lembaga Pendidikan</label>
                                    <select
                                        className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-3 text-sm focus:ring-1 focus:ring-brand-primary outline-none"
                                        value={faqForm.data.lembaga_id}
                                        onChange={e => faqForm.setData('lembaga_id', e.target.value)}
                                    >
                                        <option value="">UMUM (Semua Unit)</option>
                                        {lembagas.map(lembaga => (
                                            <option key={lembaga.id} value={lembaga.id}>{lembaga.name}</option>
                                        ))}
                                    </select>
                                    {faqForm.errors.lembaga_id && (
                                        <p className="text-[10px] text-red-500 italic mt-1">{faqForm.errors.lembaga_id}</p>
                                    )}
                                </div>

                                {/* Order */}
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Urutan Tampil (Visual Order)</label>
                                    <input 
                                        type="number" 
                                        className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-3 text-sm focus:ring-1 focus:ring-brand-primary outline-none"
                                        value={faqForm.data.order}
                                        onChange={e => faqForm.setData('order', e.target.value)}
                                        placeholder="0"
                                    />
                                    {faqForm.errors.order && (
                                        <p className="text-[10px] text-red-500 italic mt-1">{faqForm.errors.order}</p>
                                    )}
                                </div>
                            </div>

                            {/* Status Aktif Toggle */}
                            <div className="flex items-center justify-between bg-slate-50 border border-slate-100 p-4 rounded-[0.25rem]">
                                <div>
                                    <p className="text-xs font-bold text-slate-800">Status FAQ</p>
                                    <p className="text-[9px] text-slate-400 mt-0.5">Tampilkan FAQ di halaman umum</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={`text-[9px] font-bold uppercase tracking-widest ${
                                        faqForm.data.is_active ? 'text-brand-primary' : 'text-slate-400'
                                    }`}>
                                        {faqForm.data.is_active ? 'Aktif' : 'Nonaktif'}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => faqForm.setData('is_active', !faqForm.data.is_active)}
                                        className={`w-10 h-5 rounded-full transition-colors duration-300 relative ${
                                            faqForm.data.is_active ? 'bg-brand-primary' : 'bg-slate-200'
                                        }`}
                                    >
                                        <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${
                                            faqForm.data.is_active ? 'left-5.5' : 'left-0.5'
                                        }`} />
                                    </button>
                                </div>
                            </div>

                            {/* Pertanyaan */}
                            <div>
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Pertanyaan FAQ (Question)</label>
                                <input 
                                    type="text" 
                                    className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-3 text-sm focus:ring-1 focus:ring-brand-primary outline-none"
                                    placeholder="Tuliskan pertanyaan..."
                                    value={faqForm.data.question}
                                    onChange={e => faqForm.setData('question', e.target.value)}
                                    required
                                />
                                {faqForm.errors.question && (
                                    <p className="text-[10px] text-red-500 italic mt-1">{faqForm.errors.question}</p>
                                )}
                            </div>

                            {/* Jawaban */}
                            <div>
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Jawaban FAQ (Answer)</label>
                                <textarea 
                                    className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-4 text-sm focus:ring-1 focus:ring-brand-primary outline-none"
                                    rows="5"
                                    value={faqForm.data.answer}
                                    onChange={e => faqForm.setData('answer', e.target.value)}
                                    placeholder="Tuliskan jawaban lengkap atas pertanyaan..."
                                    required
                                ></textarea>
                                {faqForm.errors.answer && (
                                    <p className="text-[10px] text-red-500 italic mt-1">{faqForm.errors.answer}</p>
                                )}
                            </div>
                            
                            <div className="pt-6 border-t border-slate-100 flex justify-end gap-3 shrink-0">
                                <button
                                    type="button"
                                    onClick={() => setIsFaqModalOpen(false)}
                                    className="px-6 py-3 border border-slate-200 hover:bg-slate-50 text-[10px] font-bold uppercase tracking-widest text-slate-500 rounded-[0.25rem] transition-colors"
                                >
                                    Batal
                                </button>
                                <button 
                                    type="submit" 
                                    disabled={faqForm.processing}
                                    className="bg-brand-primary text-white py-3 px-8 text-[10px] font-bold uppercase tracking-widest rounded-[0.25rem] hover:bg-slate-900 transition-all shadow-xl shadow-brand-primary/20 flex items-center gap-2"
                                >
                                    {faqForm.processing ? 'Menyimpan...' : 'Simpan FAQ'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </IndukAdminLayout>
    );
}
