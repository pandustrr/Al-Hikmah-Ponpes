import React, { useState, useEffect } from 'react';
import IndukAdminLayout from '@/Layouts/Induk/IndukAdminLayout';
import { useForm, usePage, Head } from '@inertiajs/react';
import { 
    PhotoIcon, 
    PlusIcon, 
    TrashIcon, 
    SparklesIcon
} from '@heroicons/react/24/outline';
import Toast from '@/Components/Toast';
import ConfirmationModal from '@/Components/ConfirmationModal';
import ImageInputWithCrop from '@/Components/ImageInputWithCrop';

export default function Index({ settings = {} }) {
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

    const [heroBgPreview, setHeroBgPreview] = useState(settings.profil_hero_bg);
    const [heroBgMobilePreview, setHeroBgMobilePreview] = useState(settings.profil_hero_bg_mobile);
    const [profilImagePreview, setProfilImagePreview] = useState(settings.profil_image);

    const { data, setData, post, processing, errors } = useForm({
        // Hero Section
        profil_hero_tagline: settings.profil_hero_tagline || 'Mengenal Lebih Dekat',
        profil_hero_title: settings.profil_hero_title || 'PROFIL YPDS AL-HIKMAH',
        profil_hero_desc: settings.profil_hero_desc || 'Membangun Adab dan Ilmu Sejak Dini. YPDS Al-Hikmah adalah lembaga pendidikan Islam terpadu yang berdedikasi untuk mencetak generasi yang cerdas secara intelektual dan kokoh secara spiritual di Jember.',
        profil_hero_btn1: settings.profil_hero_btn1 || 'Sejarah Lembaga',
        profil_hero_btn2: settings.profil_hero_btn2 || 'Visi & Misi',
        hero_bg_file: null,
        hero_bg_mobile_file: null,

        // Stats Section
        profil_stat1_value: settings.profil_stat1_value || '25+',
        profil_stat1_label: settings.profil_stat1_label || 'Tahun Mengabdi',
        profil_stat2_value: settings.profil_stat2_value || '4',
        profil_stat2_label: settings.profil_stat2_label || 'Unit Pendidikan',
        profil_stat3_value: settings.profil_stat3_value || '1500+',
        profil_stat3_label: settings.profil_stat3_label || 'Santri Aktif',
        profil_stat4_value: settings.profil_stat4_value || 'Ribuan',
        profil_stat4_label: settings.profil_stat4_label || 'Alumni Tersebar',

        // Profil Section
        profil_tentang_tagline: settings.profil_tentang_tagline || 'Tentang Kami',
        profil_tentang_title: settings.profil_tentang_title || 'Harmoni Tradisi & Inovasi Modern',
        profil_tentang_desc: settings.profil_tentang_desc || 'Berdiri di jantung Ambulu, Jember, lembaga kami telah menjadi rumah bagi ribuan siswa untuk menimba ilmu...',
        profil_tentang_years: settings.profil_tentang_years || '25+',
        profil_image_file: null,

        // Visi & Misi
        profil_visi_text: settings.profil_visi_text || 'Menjadi lembaga pendidikan Islam terkemuka yang melahirkan generasi beradab, berilmu, dan bermanfaat bagi semesta alam.',
        profil_misi_list: settings.profil_misi_list || [
            'Menyelenggarakan pendidikan berbasis adab dan akhlak mulia sesuai nilai-nilai Islam.',
            'Mengembangkan potensi intelektual siswa melalui kurikulum yang integratif dan komprehensif.'
        ],

        // Sejarah
        profil_sejarah_tagline: settings.profil_sejarah_tagline || 'Sejarah Perjalanan',
        profil_sejarah_title: settings.profil_sejarah_title || 'Jejak Langkah',
        profil_sejarah_desc: settings.profil_sejarah_desc || 'Membangun Peradaban Sejak 1995',
        profil_sejarah_timeline: settings.profil_sejarah_timeline || [
            { year: '1995', title: 'Peletakan Batu Pertama', desc: 'YPDS Al-Hikmah didirikan...' }
        ],
    });

    const [activeTab, setActiveTab] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('tentang_active_tab') || 'hero';
        }
        return 'hero';
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.tentang.update'), {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                setToastMessage('Pengaturan profil berhasil diperbarui!');
                setToastType('success');
                setShowToast(true);
            }
        });
    };

    // Helper for handling dynamic array fields (Misi)
    const handleMisiChange = (index, value) => {
        const newMisi = [...data.profil_misi_list];
        newMisi[index] = value;
        setData('profil_misi_list', newMisi);
    };

    const addMisi = () => {
        setData('profil_misi_list', [...data.profil_misi_list, '']);
        setToastMessage('Butir misi baru ditambahkan ke daftar sementara.');
        setToastType('info');
        setShowToast(true);
    };

    const triggerRemoveMisi = (index) => {
        setConfirmModal({
            show: true,
            title: 'Hapus Butir Misi?',
            message: 'Apakah Anda yakin ingin menghapus butir misi ini? Perubahan baru akan tersimpan permanen setelah Anda mengklik tombol "Simpan Perubahan" di bawah.',
            type: 'danger',
            confirmText: 'Ya, Hapus Sementara',
            onConfirm: () => {
                const newMisi = data.profil_misi_list.filter((_, i) => i !== index);
                setData('profil_misi_list', newMisi);
                setConfirmModal(prev => ({ ...prev, show: false }));
                setToastMessage('Butir misi berhasil dihapus dari daftar sementara.');
                setToastType('warning');
                setShowToast(true);
            }
        });
    };

    // Helper for handling dynamic array fields (Sejarah)
    const handleTimelineChange = (index, field, value) => {
        const newTimeline = [...data.profil_sejarah_timeline];
        newTimeline[index][field] = value;
        setData('profil_sejarah_timeline', newTimeline);
    };

    const addTimeline = () => {
        setData('profil_sejarah_timeline', [...data.profil_sejarah_timeline, { year: '', title: '', desc: '' }]);
        setToastMessage('Momen sejarah baru ditambahkan ke linimasa sementara.');
        setToastType('info');
        setShowToast(true);
    };

    const triggerRemoveTimeline = (index) => {
        setConfirmModal({
            show: true,
            title: 'Hapus Momen Sejarah?',
            message: 'Apakah Anda yakin ingin menghapus momen sejarah ini? Perubahan baru akan tersimpan secara permanen setelah Anda mengklik tombol "Simpan Perubahan" di bawah.',
            type: 'danger',
            confirmText: 'Ya, Hapus Sementara',
            onConfirm: () => {
                const newTimeline = data.profil_sejarah_timeline.filter((_, i) => i !== index);
                setData('profil_sejarah_timeline', newTimeline);
                setConfirmModal(prev => ({ ...prev, show: false }));
                setToastMessage('Momen sejarah berhasil dihapus dari linimasa sementara.');
                setToastType('warning');
                setShowToast(true);
            }
        });
    };

    const tabs = [
        { id: 'hero', name: 'Hero & Statistik' },
        { id: 'tentang', name: 'Tentang Kami' },
        { id: 'visimisi', name: 'Visi & Misi' },
        { id: 'sejarah', name: 'Sejarah Lembaga' },
    ];

    // Standard high-end luxury earthy form style classes
    const labelStyle = "block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2";
    const inputStyle = "w-full text-xs text-slate-800 bg-white border border-slate-200 rounded-[0.25rem] py-2.5 px-3.5 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/20 hover:border-slate-300 transition-all outline-none placeholder-slate-400 font-semibold";
    const textareaStyle = "w-full text-xs text-slate-800 bg-white border border-slate-200 rounded-[0.25rem] py-2.5 px-3.5 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/20 hover:border-slate-300 transition-all outline-none placeholder-slate-400 font-semibold leading-relaxed";

    return (
        <IndukAdminLayout title="Pengaturan Profil">
            <Head title="Pengaturan Profil & Tentang Kami" />

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

            <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8 animate-fade-in">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-100 pb-6">
                    <div>
                        <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-accent mb-2">Pusat Yayasan</h2>
                        <h1 className="text-3xl font-semibold uppercase tracking-tighter text-slate-900 leading-none">Pengaturan <br /><span className="text-brand-primary">Profil & Tentang</span></h1>
                    </div>
                </div>

                <div className="bg-white rounded-[0.25rem] border border-slate-200 shadow-sm overflow-hidden">
                    {/* Modern Pill Shaped Tabs */}
                    <div className="border-b border-slate-200 bg-slate-50/50 p-3 flex gap-2 overflow-x-auto">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                type="button"
                                onClick={() => {
                                    setActiveTab(tab.id);
                                    localStorage.setItem('tentang_active_tab', tab.id);
                                }}
                                className={`px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-all rounded-[0.25rem] ${
                                    activeTab === tab.id 
                                        ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/10' 
                                        : 'text-slate-500 hover:text-brand-primary hover:bg-slate-100'
                                }`}
                            >
                                {tab.name}
                            </button>
                        ))}
                    </div>

                    {/* Form */}
                    <form onSubmit={submit} className="p-6 md:p-8">
                        
                        {/* HERO TAB */}
                        <div className={activeTab === 'hero' ? 'block space-y-8 animate-fade-in' : 'hidden'}>
                            <div>
                                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-3 mb-6">Bagian Banner Hero</h3>
                                
                                <div className="space-y-6">
                                    <div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-6">
                                            {/* Desktop Hero BG */}
                                            <div className="space-y-4">
                                                <label className={labelStyle}>Latar Belakang Hero Desktop (Lanskap 21:9)</label>
                                                <div className="relative aspect-video bg-slate-100 rounded overflow-hidden border-2 border-dashed border-slate-200 group">
                                                    {heroBgPreview ? (
                                                        <img src={heroBgPreview} className="w-full h-full object-cover" alt="Hero BG Desktop Preview" />
                                                    ) : (
                                                        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300">
                                                            <PhotoIcon className="h-10 w-10 mb-2" />
                                                            <span className="text-[10px] font-bold uppercase tracking-widest">Pilih Gambar Lanskap</span>
                                                        </div>
                                                    )}
                                                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                        <span className="text-white text-[10px] font-bold uppercase tracking-[0.2em] border border-white/40 px-4 py-2">Ganti Gambar</span>
                                                    </div>
                                                    <ImageInputWithCrop 
                                                        className="absolute inset-0 z-10"
                                                        aspectRatio={21/9}
                                                        title="Potong Background Hero Desktop"
                                                        onChange={(file) => {
                                                            setData('hero_bg_file', file);
                                                            if (file) setHeroBgPreview(URL.createObjectURL(file));
                                                        }}
                                                    />
                                                </div>
                                                {errors.hero_bg_file && (
                                                    <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider">{errors.hero_bg_file}</p>
                                                )}
                                                <p className="text-[9px] text-slate-400 uppercase tracking-widest italic leading-relaxed">
                                                    Format: JPG/PNG. Rekomendasi rasio lanskap 21:9 untuk layar desktop.
                                                </p>
                                            </div>

                                            {/* Mobile Hero BG */}
                                            <div className="space-y-4">
                                                <label className={labelStyle}>Latar Belakang Hero Mobile (Potret 3:4)</label>
                                                <div className="relative aspect-[3/4] max-w-[200px] bg-slate-100 rounded overflow-hidden border-2 border-dashed border-slate-200 group">
                                                    {heroBgMobilePreview ? (
                                                        <img src={heroBgMobilePreview} className="w-full h-full object-cover" alt="Hero BG Mobile Preview" />
                                                    ) : (
                                                        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300">
                                                            <PhotoIcon className="h-10 w-10 mb-2" />
                                                            <span className="text-[10px] font-bold uppercase tracking-widest">Pilih Gambar Potret</span>
                                                        </div>
                                                    )}
                                                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                        <span className="text-white text-[10px] font-bold uppercase tracking-[0.2em] border border-white/40 px-4 py-2">Ganti Gambar</span>
                                                    </div>
                                                    <ImageInputWithCrop 
                                                        className="absolute inset-0 z-10"
                                                        aspectRatio={3/4}
                                                        title="Potong Background Hero Mobile"
                                                        onChange={(file) => {
                                                            setData('hero_bg_mobile_file', file);
                                                            if (file) setHeroBgMobilePreview(URL.createObjectURL(file));
                                                        }}
                                                    />
                                                </div>
                                                {errors.hero_bg_mobile_file && (
                                                    <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider">{errors.hero_bg_mobile_file}</p>
                                                )}
                                                <p className="text-[9px] text-slate-400 uppercase tracking-widest italic leading-relaxed">
                                                    Format: JPG/PNG. Rekomendasi rasio potret 3:4 untuk layar HP/ponsel.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-1.5">
                                            <label className={labelStyle}>Tagline (Teks Emas Kecil)</label>
                                            <input 
                                                type="text" 
                                                value={data.profil_hero_tagline} 
                                                onChange={e => setData('profil_hero_tagline', e.target.value)} 
                                                className={inputStyle} 
                                                placeholder="Mengenal Lebih Dekat"
                                            />
                                            {errors.profil_hero_tagline && <span className="text-[10px] text-rose-500 font-semibold">{errors.profil_hero_tagline}</span>}
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className={labelStyle}>Judul Utama Banner</label>
                                            <input 
                                                type="text" 
                                                value={data.profil_hero_title} 
                                                onChange={e => setData('profil_hero_title', e.target.value)} 
                                                className={inputStyle} 
                                                placeholder="PROFIL YPDS AL-HIKMAH"
                                            />
                                            {errors.profil_hero_title && <span className="text-[10px] text-rose-500 font-semibold">{errors.profil_hero_title}</span>}
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className={labelStyle}>Deskripsi Singkat Banner</label>
                                        <textarea 
                                            rows={3} 
                                            value={data.profil_hero_desc} 
                                            onChange={e => setData('profil_hero_desc', e.target.value)} 
                                            className={textareaStyle}
                                            placeholder="Deskripsikan profil singkat yayasan di sini..."
                                        />
                                        {errors.profil_hero_desc && <span className="text-[10px] text-rose-500 font-semibold">{errors.profil_hero_desc}</span>}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-1.5">
                                            <label className={labelStyle}>Teks Tombol Kiri (Button 1)</label>
                                            <input 
                                                type="text" 
                                                value={data.profil_hero_btn1} 
                                                onChange={e => setData('profil_hero_btn1', e.target.value)} 
                                                className={inputStyle} 
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className={labelStyle}>Teks Tombol Kanan (Button 2)</label>
                                            <input 
                                                type="text" 
                                                value={data.profil_hero_btn2} 
                                                onChange={e => setData('profil_hero_btn2', e.target.value)} 
                                                className={inputStyle} 
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-3 mb-6">Nilai Statistik Yayasan</h3>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {[1, 2, 3, 4].map(num => (
                                        <div key={num} className="bg-slate-50/50 p-5 border border-slate-200 rounded-[0.25rem] space-y-4">
                                            <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                                                <span className="w-1.5 h-1.5 bg-brand-gold rounded-full"></span>
                                                <h4 className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Metrik Statistik {num}</h4>
                                            </div>
                                            <div className="space-y-3">
                                                <div>
                                                    <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Nilai Angka (contoh: 25+ / 1500+)</label>
                                                    <input 
                                                        type="text" 
                                                        value={data[`profil_stat${num}_value`]} 
                                                        onChange={e => setData(`profil_stat${num}_value`, e.target.value)} 
                                                        className={inputStyle} 
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Keterangan Label (contoh: Santri Mengabdi)</label>
                                                    <input 
                                                        type="text" 
                                                        value={data[`profil_stat${num}_label`]} 
                                                        onChange={e => setData(`profil_stat${num}_label`, e.target.value)} 
                                                        className={inputStyle} 
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* TENTANG KAMI TAB */}
                        <div className={activeTab === 'tentang' ? 'block space-y-6 animate-fade-in' : 'hidden'}>
                            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-3 mb-6">Harmoni Profil Lembaga</h3>
                            
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-1.5">
                                        <label className={labelStyle}>Tagline Atas Tentang Kami</label>
                                        <input 
                                            type="text" 
                                            value={data.profil_tentang_tagline} 
                                            onChange={e => setData('profil_tentang_tagline', e.target.value)} 
                                            className={inputStyle} 
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className={labelStyle}>Judul Utama Tentang Kami</label>
                                        <input 
                                            type="text" 
                                            value={data.profil_tentang_title} 
                                            onChange={e => setData('profil_tentang_title', e.target.value)} 
                                            className={inputStyle} 
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className={labelStyle}>Paragraf Utama Profil Lengkap</label>
                                    <textarea 
                                        rows={6} 
                                        value={data.profil_tentang_desc} 
                                        onChange={e => setData('profil_tentang_desc', e.target.value)} 
                                        className={textareaStyle}
                                        placeholder="Tuliskan cerita komprehensif profil yayasan..."
                                    />
                                </div>

                                <div className="space-y-4 max-w-sm">
                                    <label className={labelStyle}>Gambar Pendukung Profil Samping (Potret 3:4)</label>
                                    <div className="relative aspect-[3/4] max-w-[200px] bg-slate-100 rounded overflow-hidden border-2 border-dashed border-slate-200 group">
                                        {profilImagePreview ? (
                                            <img src={profilImagePreview} className="w-full h-full object-cover" alt="Profil Side Preview" />
                                        ) : (
                                            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300">
                                                <PhotoIcon className="h-10 w-10 mb-2" />
                                                <span className="text-[10px] font-bold uppercase tracking-widest">Pilih Gambar Potret</span>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <span className="text-white text-[10px] font-bold uppercase tracking-[0.2em] border border-white/40 px-4 py-2">Ganti Gambar</span>
                                        </div>
                                        <ImageInputWithCrop 
                                            className="absolute inset-0 z-10"
                                            aspectRatio={3/4}
                                            title="Potong Gambar Pendukung Profil"
                                            onChange={(file) => {
                                                setData('profil_image_file', file);
                                                if (file) setProfilImagePreview(URL.createObjectURL(file));
                                            }}
                                        />
                                    </div>
                                    {errors.profil_image_file && (
                                        <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider">{errors.profil_image_file}</p>
                                    )}
                                    <p className="text-[9px] text-slate-400 uppercase tracking-widest italic leading-relaxed">
                                        Format: JPG/PNG. Rekomendasi rasio potret 3:4 untuk hasil terbaik.
                                    </p>
                                </div>

                                <div className="space-y-1.5">
                                    <label className={labelStyle}>Badge Tahun Pengalaman (Tampil melayang di gambar)</label>
                                    <input 
                                        type="text" 
                                        value={data.profil_tentang_years} 
                                        onChange={e => setData('profil_tentang_years', e.target.value)} 
                                        className={`${inputStyle} max-w-xs`} 
                                        placeholder="misal: 25+ Tahun"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* VISI MISI TAB */}
                        <div className={activeTab === 'visimisi' ? 'block space-y-8 animate-fade-in' : 'hidden'}>
                            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-3 mb-6">Pernyataan Visi & Misi Yayasan</h3>
                            
                            <div className="space-y-6">
                                <div className="space-y-1.5">
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-primary mb-2">Pernyataan Visi Utama</label>
                                    <textarea 
                                        rows={4} 
                                        value={data.profil_visi_text} 
                                        onChange={e => setData('profil_visi_text', e.target.value)} 
                                        className="w-full text-xs text-slate-800 bg-white border border-slate-200 rounded-[0.25rem] py-3.5 px-4 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/20 hover:border-slate-300 transition-all outline-none font-serif leading-relaxed italic font-semibold"
                                        placeholder="Menjadi yayasan..."
                                    />
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                                        <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-primary">Daftar Misi Operasional</label>
                                        <button 
                                            type="button" 
                                            onClick={addMisi} 
                                            className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-brand-primary bg-brand-primary/5 hover:bg-brand-primary hover:text-white border border-brand-primary/15 py-2 px-3 rounded-[0.25rem] transition-all"
                                        >
                                            <PlusIcon className="w-3.5 h-3.5" /> Tambah Misi Baru
                                        </button>
                                    </div>
                                    
                                    <div className="space-y-3">
                                        {data.profil_misi_list.map((misi, index) => (
                                            <div key={index} className="flex items-start gap-3 bg-slate-50/50 p-4 rounded-[0.25rem] border border-slate-200 group hover:border-slate-300 transition-all">
                                                <div className="w-6 h-6 rounded-full bg-brand-primary/10 text-brand-primary flex flex-col items-center justify-center font-bold text-[10px] shrink-0 mt-1 shadow-sm">
                                                    {index + 1}
                                                </div>
                                                <textarea 
                                                    rows={2} 
                                                    value={misi} 
                                                    onChange={(e) => handleMisiChange(index, e.target.value)} 
                                                    className={textareaStyle}
                                                    placeholder="Tuliskan misi operasional secara konkret..."
                                                />
                                                <button 
                                                    type="button" 
                                                    onClick={() => triggerRemoveMisi(index)} 
                                                    className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors mt-0.5 shrink-0"
                                                    title="Hapus Misi"
                                                >
                                                    <TrashIcon className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* SEJARAH TAB */}
                        <div className={activeTab === 'sejarah' ? 'block space-y-8 animate-fade-in' : 'hidden'}>
                            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-3 mb-6">Linimasa Jejak Langkah</h3>
                            
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="space-y-1.5">
                                        <label className={labelStyle}>Tagline Sejarah</label>
                                        <input type="text" value={data.profil_sejarah_tagline} onChange={e => setData('profil_sejarah_tagline', e.target.value)} className={inputStyle} />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className={labelStyle}>Judul Sejarah</label>
                                        <input type="text" value={data.profil_sejarah_title} onChange={e => setData('profil_sejarah_title', e.target.value)} className={inputStyle} />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className={labelStyle}>Deskripsi Sejarah Singkat</label>
                                        <input type="text" value={data.profil_sejarah_desc} onChange={e => setData('profil_sejarah_desc', e.target.value)} className={inputStyle} />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                                        <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-primary">Poin Linimasa Perjalanan</label>
                                        <button 
                                            type="button" 
                                            onClick={addTimeline} 
                                            className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-brand-primary bg-brand-primary/5 hover:bg-brand-primary hover:text-white border border-brand-primary/15 py-2 px-3 rounded-[0.25rem] transition-all"
                                        >
                                            <PlusIcon className="w-3.5 h-3.5" /> Tambah Momen Sejarah
                                        </button>
                                    </div>
                                    
                                    <div className="space-y-4">
                                        {data.profil_sejarah_timeline.map((item, index) => (
                                            <div key={index} className="flex items-start gap-4 bg-slate-50/50 p-5 rounded-[0.25rem] border border-slate-200 group hover:border-slate-300 transition-all">
                                                <div className="flex-1 space-y-4">
                                                    <div className="grid grid-cols-4 gap-4">
                                                        <div className="col-span-1 space-y-1.5">
                                                            <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest">Tahun</label>
                                                            <input 
                                                                type="text" 
                                                                value={item.year} 
                                                                onChange={(e) => handleTimelineChange(index, 'year', e.target.value)} 
                                                                className={inputStyle} 
                                                                placeholder="Mulai: 1995" 
                                                            />
                                                        </div>
                                                        <div className="col-span-3 space-y-1.5">
                                                            <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest">Judul Momen Sejarah</label>
                                                            <input 
                                                                type="text" 
                                                                value={item.title} 
                                                                onChange={(e) => handleTimelineChange(index, 'title', e.target.value)} 
                                                                className={inputStyle} 
                                                                placeholder="Peletakan Batu Pertama" 
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest">Penjelasan Ringkas Momen</label>
                                                        <textarea 
                                                            rows={2} 
                                                            value={item.desc} 
                                                            onChange={(e) => handleTimelineChange(index, 'desc', e.target.value)} 
                                                            className={textareaStyle}
                                                            placeholder="Jelaskan secara ringkas peristiwa sejarah ini..."
                                                        />
                                                    </div>
                                                </div>
                                                <button 
                                                    type="button" 
                                                    onClick={() => triggerRemoveTimeline(index)} 
                                                    className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors mt-6 shrink-0"
                                                    title="Hapus Momen"
                                                >
                                                    <TrashIcon className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* SUBMIT BUTTON */}
                        <div className="mt-10 pt-6 border-t border-slate-200 flex justify-end">
                            <button
                                type="submit"
                                disabled={processing}
                                className={`px-8 py-3 bg-brand-primary text-white text-[10px] font-bold uppercase tracking-widest rounded-[0.25rem] transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary ${
                                    processing ? 'opacity-75 cursor-not-allowed' : 'hover:bg-slate-900 shadow-xl shadow-brand-primary/25 hover:-translate-y-0.5'
                                }`}
                            >
                                {processing ? 'Menyimpan Perubahan...' : 'Simpan Perubahan'}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </IndukAdminLayout>
    );
}
