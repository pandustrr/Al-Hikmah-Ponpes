import React, { useState, useEffect } from 'react';
import IndukAdminLayout from '@/Layouts/Induk/IndukAdminLayout';
import { Head, useForm, Link, usePage } from '@inertiajs/react';
import { 
    Cog6ToothIcon, 
    KeyIcon, 
    PhotoIcon, 
    ArrowUpTrayIcon,
    ShieldCheckIcon,
    ArrowLeftIcon,
    CheckCircleIcon
} from '@heroicons/react/24/outline';
import Toast from '@/Components/Toast';
import ConfirmationModal from '@/Components/ConfirmationModal';

export default function Index({ settings, authUser }) {
    const { flash } = usePage().props;

    // Persist activeTab state
    const [activeTab, setActiveTab] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('activeSettingsTab') || 'general';
        }
        return 'general';
    });

    const handleSetActiveTab = (tab) => {
        setActiveTab(tab);
        if (typeof window !== 'undefined') {
            localStorage.setItem('activeSettingsTab', tab);
        }
    };

    // Toast State
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

    // Confirmation Modal State (Ready for future actions)
    const [confirmModal, setConfirmModal] = useState({
        show: false,
        title: '',
        message: '',
        type: 'danger',
        onConfirm: null
    });

    // 1. FORM 1: GENERAL SETTINGS FORM (ONLY SEO)
    const initialSettings = [];
    if (settings.seo) {
        settings.seo.forEach(s => {
            initialSettings.push({ id: s.id, key: s.key, value: s.value || '', label: s.label, group: s.group });
        });
    }

    const generalForm = useForm({
        _method: 'put',
        settings: initialSettings
    });

    const handleGeneralChange = (id, value) => {
        const newSettings = generalForm.data.settings.map(s => 
            s.id === id ? { ...s, value } : s
        );
        generalForm.setData('settings', newSettings);
    };

    const handleGeneralSubmit = (e) => {
        e.preventDefault();
        generalForm.post(route('admin.settings.update'), {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                setToastMessage('Pengaturan SEO berhasil diperbarui.');
                setToastType('success');
                setShowToast(true);
            }
        });
    };

    // 2. FORM 2: LOGIN PORTAL FORM
    const loginBgSetting = settings.site_settings?.find(s => s.key === 'login_bg');
    const loginPortalForm = useForm({
        login_bg_url: loginBgSetting?.value || '',
        login_bg_file: null
    });

    const [filePreview, setFilePreview] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            loginPortalForm.setData('login_bg_file', file);
            setFilePreview(URL.createObjectURL(file));
        }
    };

    const handleLoginPortalSubmit = (e) => {
        e.preventDefault();
        loginPortalForm.post(route('admin.settings.login-bg.update'), {
            preserveScroll: true,
            onSuccess: () => {
                loginPortalForm.reset('login_bg_file');
                setFilePreview(null);
                setToastMessage('Latar portal login berhasil diperbarui.');
                setToastType('success');
                setShowToast(true);
            }
        });
    };

    // 3. FORM 3: ACCOUNT & SECURITY FORM
    const accountForm = useForm({
        username: authUser?.username || '',
        current_password: '',
        password: '',
        password_confirmation: ''
    });

    const handleAccountSubmit = (e) => {
        e.preventDefault();
        accountForm.put(route('admin.settings.account.update'), {
            preserveScroll: true,
            onSuccess: () => {
                accountForm.reset('current_password', 'password', 'password_confirmation');
                setToastMessage('Akun & Keamanan kredensial berhasil disimpan.');
                setToastType('success');
                setShowToast(true);
            }
        });
    };

    const tabs = [
        { id: 'general',      name: 'Pengaturan SEO',     icon: Cog6ToothIcon },
        { id: 'login_portal', name: 'Kustomisasi Login',   icon: PhotoIcon },
        { id: 'security',     name: 'Akun & Keamanan',     icon: KeyIcon },
    ];

    const groupLabels = {
        seo: { title: 'Optimasi Mesin Pencari (SEO)', icon: Cog6ToothIcon },
    };

    return (
        <IndukAdminLayout title="Pengaturan Sistem">
            <Head title="Pengaturan Umum & Keamanan" />

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

            <div className="max-w-6xl mx-auto pt-6 pb-16 px-4 sm:px-6 lg:px-8 space-y-8">
                
                {/* Header Navigation */}
                <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-6">
                    <Link 
                        href={route('admin.dashboard')}
                        className="text-[10px] font-bold text-slate-400 hover:text-brand-primary uppercase tracking-widest flex items-center gap-2 transition-colors"
                    >
                        <ArrowLeftIcon className="h-3.5 w-3.5" /> Kembali ke Dashboard
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-brand-primary/5 rounded flex items-center justify-center">
                            <Cog6ToothIcon className="h-4 w-4 text-brand-primary" />
                        </div>
                        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-tight">Kustomisasi Sistem</h2>
                    </div>
                </div>

                {/* Page Title */}
                <div className="mb-8">
                    <h2 className="text-[10px] font-bold text-brand-accent uppercase tracking-[0.4em] mb-3">Panel Kustomisasi</h2>
                    <h1 className="text-4xl font-semibold text-slate-900 tracking-tighter uppercase leading-none">Pengaturan <br /><span className="text-brand-primary">Sistem & Keamanan</span></h1>
                </div>

                {/* Tabs Navigation */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 bg-slate-50/30 p-2.5 rounded-[0.25rem]">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => handleSetActiveTab(tab.id)}
                            className={`px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-all rounded-[0.25rem] ${
                                activeTab === tab.id 
                                ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/10' 
                                : 'text-slate-500 hover:text-brand-primary hover:bg-slate-100'
                            }`}
                        >
                            <tab.icon className="h-3.5 w-3.5 shrink-0 inline-block mr-1.5" />
                            {tab.name}
                        </button>
                    ))}
                </div>

                {/* Content Section */}
                <div className="space-y-8 animate-fade-in">
                    
                    {/* TAB 1: PENGATURAN UMUM */}
                    {activeTab === 'general' && (
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                            {/* Left Side: SEO Edit Form */}
                            <form onSubmit={handleGeneralSubmit} className="lg:col-span-7 space-y-6">
                                {Object.entries(settings)
                                    .filter(([group]) => group === 'seo')
                                    .map(([group, groupSettings]) => {
                                        const labelInfo = groupLabels[group] || { title: group, icon: Cog6ToothIcon };
                                        return (
                                            <div key={group} className="bg-white border border-slate-200 rounded-[0.25rem] p-8 space-y-6 shadow-sm">
                                                <div className="flex items-center gap-2 mb-4">
                                                    <span className="h-[2px] w-5 bg-brand-primary"></span>
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{labelInfo.title}</span>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    {groupSettings.map((s) => {
                                                        const formItem = generalForm.data.settings.find(item => item.id === s.id);
                                                        if (!formItem) return null;
                                                        return (
                                                            <div key={s.id} className={s.type === 'textarea' ? 'md:col-span-2' : ''}>
                                                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">{s.label}</label>
                                                                {s.type === 'textarea' ? (
                                                                    <textarea
                                                                        rows="3"
                                                                        className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-4 text-sm focus:ring-1 focus:ring-brand-primary outline-none min-h-[100px]"
                                                                        value={formItem.value}
                                                                        onChange={(e) => handleGeneralChange(s.id, e.target.value)}
                                                                    />
                                                                ) : (
                                                                    <input
                                                                        type="text"
                                                                        className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-3 text-sm focus:ring-1 focus:ring-brand-primary outline-none"
                                                                        value={typeof formItem.value === 'string' ? formItem.value : ''}
                                                                        onChange={(e) => handleGeneralChange(s.id, e.target.value)}
                                                                    />
                                                                )}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        );
                                    })}

                                <div className="flex justify-end">
                                    <button 
                                        type="submit" 
                                        disabled={generalForm.processing}
                                        className="w-full sm:w-auto bg-brand-primary text-white py-4 px-12 text-[10px] font-bold uppercase tracking-[0.2em] rounded-[0.25rem] hover:bg-slate-900 transition-all shadow-xl shadow-brand-primary/20 flex items-center justify-center gap-3"
                                    >
                                        {generalForm.processing ? 'Sedang Menyimpan...' : (
                                            <>Simpan Pengaturan SEO <CheckCircleIcon className="h-4 w-4" /></>
                                        )}
                                    </button>
                                </div>
                            </form>

                            {/* Right Side: Real-Time SEO Live Debugger & Previewer */}
                            <div className="lg:col-span-5 space-y-6">
                                <div className="bg-white border border-slate-200 rounded-[0.25rem] p-8 space-y-6 shadow-sm">
                                    <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                                        <div className="flex items-center gap-2">
                                            <span className="h-[2px] w-5 bg-brand-primary"></span>
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">SEO Preview & Debugger</span>
                                        </div>
                                        <a 
                                            href="/sitemap.xml" 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-[9px] font-black uppercase tracking-wider text-brand-primary hover:underline transition-colors flex items-center gap-1.5"
                                        >
                                            Buka Sitemap.xml ↗
                                        </a>
                                    </div>

                                    {/* 1. Google Search Mockup */}
                                    <div className="space-y-3">
                                        <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Pratinjau Hasil Pencarian Google</h4>
                                        <div className="bg-[#f8f9fa] border border-[#dadce0] rounded-[8px] p-5 shadow-sm space-y-1.5 font-sans">
                                            <div className="flex items-center gap-2">
                                                <div className="w-[26px] h-[26px] bg-white border border-[#dadce0] rounded-full flex items-center justify-center text-[10px] text-brand-primary font-black">
                                                    AH
                                                </div>
                                                <div className="flex flex-col text-[12px] leading-tight">
                                                    <span className="text-[#202124] font-medium truncate max-w-[200px]">Yayasan Al-Hikmah Ambulu</span>
                                                    <span className="text-[#5f6368] text-[10px] truncate max-w-[200px]">https://ypdsalhikmahjbr.com</span>
                                                </div>
                                            </div>
                                            <h3 className="text-[#1a0dab] hover:underline text-[18px] leading-tight font-medium cursor-pointer">
                                                Yayasan Al-Hikmah Ambulu - Portal & Informasi
                                            </h3>
                                            <p className="text-[#4d5156] text-[13px] leading-relaxed line-clamp-2">
                                                {generalForm.data.settings.find(s => s.key === 'seo_meta_description')?.value || 'Portal berita resmi Yayasan Al-Hikmah Ambulu. Dapatkan informasi terbaru seputar pendidikan, prestasi, dan kegiatan santri.'}
                                            </p>
                                        </div>
                                    </div>

                                    {/* 2. WhatsApp Share Mockup */}
                                    <div className="space-y-3">
                                        <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Pratinjau Bagikan Link di WhatsApp</h4>
                                        <div className="bg-[#DCF8C6]/20 border border-[#DCF8C6]/50 rounded-[10px] p-4 max-w-[340px] shadow-sm font-sans space-y-2">
                                            <div className="bg-[#f0f0f0] rounded-[8px] overflow-hidden border border-slate-200">
                                                <div className="aspect-[16/9] bg-brand-secondary flex items-center justify-center text-[10px] text-brand-accent/50 uppercase tracking-[0.2em] font-bold relative">
                                                    <img 
                                                        src="https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?w=600" 
                                                        className="absolute inset-0 w-full h-full object-cover opacity-90" 
                                                        alt="WhatsApp preview card cover image"
                                                    />
                                                    <div className="absolute inset-0 bg-brand-primary/10"></div>
                                                </div>
                                                <div className="p-3 bg-[#e9ebec]">
                                                    <h5 className="text-[12px] font-bold text-[#1e293b] leading-snug truncate">
                                                        Yayasan Al-Hikmah Ambulu - Portal & Informasi
                                                    </h5>
                                                    <p className="text-[10px] text-[#64748b] leading-relaxed line-clamp-2 mt-0.5">
                                                        {generalForm.data.settings.find(s => s.key === 'seo_meta_description')?.value || 'Portal berita resmi Yayasan Al-Hikmah Ambulu. Dapatkan informasi terbaru seputar pendidikan, prestasi, dan kegiatan santri.'}
                                                    </p>
                                                    <span className="text-[9px] text-[#94a3b8] uppercase tracking-wider mt-1 block">
                                                        ypdsalhikmahjbr.com
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 3. Schema JSON-LD Structured Data Validator */}
                                    <div className="space-y-3">
                                        <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest">JSON-LD Structured Data Schema</h4>
                                        <div className="bg-[#0f172a] rounded-[0.25rem] p-4 text-[10px] font-mono text-emerald-400 overflow-x-auto max-h-[160px] border border-slate-800">
                                            <pre>{JSON.stringify({
                                                "@context": "https://schema.org",
                                                "@type": "EducationalOrganization",
                                                "name": "Yayasan Al-Hikmah Ambulu",
                                                "url": "https://ypdsalhikmahjbr.com",
                                                "logo": "https://ypdsalhikmahjbr.com/logo.png",
                                                "subOrganization": [
                                                    { "@type": "School", "name": "SD NU 22 Full Day" },
                                                    { "@type": "School", "name": "SMP Unggulan Al-Hikmah" },
                                                    { "@type": "School", "name": "SMK Al-Hikmah Ambulu" }
                                                ]
                                            }, null, 2)}</pre>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* TAB 2: PORTAL LOGIN CUSTOMIZATION */}
                    {activeTab === 'login_portal' && (
                        <div className="space-y-8">
                            <div className="bg-white border border-slate-200 rounded-[0.25rem] p-8 space-y-6 shadow-sm">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="h-[2px] w-5 bg-brand-primary"></span>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Preview Latar Portal Login Saat Ini</span>
                                </div>
                                <div 
                                    className="w-full h-48 rounded-[0.25rem] overflow-hidden bg-cover bg-center relative border border-slate-200 flex items-center justify-center shadow-inner"
                                    style={{ 
                                        backgroundImage: `url('${filePreview || loginPortalForm.data.login_bg_url || 'https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?w=1600'}')` 
                                    }}
                                >
                                    <div className="absolute inset-0 bg-brand-primary/70 backdrop-blur-[1px] z-0"></div>
                                    <div className="relative z-10 text-center text-white px-4">
                                        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-brand-secondary opacity-90">Preview Latar Portal</p>
                                        <h4 className="text-xl font-serif font-semibold mt-1">YAYASAN PDS AL-HIKMAH</h4>
                                    </div>
                                </div>
                            </div>

                            <form onSubmit={handleLoginPortalSubmit} className="space-y-8">
                                <div className="bg-white border border-slate-200 rounded-[0.25rem] p-8 space-y-6 shadow-sm">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="h-[2px] w-5 bg-brand-primary"></span>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sumber Gambar Latar Login</span>
                                    </div>

                                    <div className="grid grid-cols-1 gap-6">
                                        <div className="space-y-2">
                                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Opsi 1: Tautan / URL Gambar Online</label>
                                            <input
                                                type="text"
                                                placeholder="Contoh: https://images.unsplash.com/photo-..."
                                                className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-3 text-sm focus:ring-1 focus:ring-brand-primary outline-none"
                                                value={loginPortalForm.data.login_bg_url}
                                                onChange={(e) => {
                                                    loginPortalForm.setData('login_bg_url', e.target.value);
                                                    setFilePreview(null);
                                                }}
                                            />
                                            {loginPortalForm.errors.login_bg_url && (
                                                <p className="text-[10px] text-red-500 italic mt-1">{loginPortalForm.errors.login_bg_url}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Opsi 2: Unggah Gambar Langsung</label>
                                            <div className="relative border-2 border-dashed border-slate-200 rounded-[0.25rem] p-8 bg-slate-50/50 text-center hover:bg-slate-50 transition-all cursor-pointer">
                                                <input 
                                                    type="file" 
                                                    accept="image/*"
                                                    onChange={handleFileChange}
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                                                />
                                                <div className="flex flex-col items-center justify-center gap-2">
                                                    <ArrowUpTrayIcon className="h-8 w-8 text-slate-400" />
                                                    <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">
                                                        {loginPortalForm.data.login_bg_file 
                                                            ? loginPortalForm.data.login_bg_file.name 
                                                            : 'Klik atau Seret Berkas Gambar Ke Sini'}
                                                    </span>
                                                    <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wide">
                                                        Maksimal file 5MB (Format: JPG, JPEG, PNG, WEBP)
                                                    </span>
                                                </div>
                                            </div>
                                            {loginPortalForm.errors.login_bg_file && (
                                                <p className="text-[10px] text-red-500 italic mt-1">{loginPortalForm.errors.login_bg_file}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 flex justify-end">
                                    <button 
                                        type="submit" 
                                        disabled={loginPortalForm.processing}
                                        className="bg-brand-primary text-white py-4 px-12 text-[10px] font-bold uppercase tracking-[0.2em] rounded-[0.25rem] hover:bg-slate-900 transition-all shadow-xl shadow-brand-primary/20 flex items-center gap-3"
                                    >
                                        {loginPortalForm.processing ? 'Sedang Menyimpan...' : (
                                            <>Perbarui Latar Login <CheckCircleIcon className="h-4 w-4" /></>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* TAB 3: ACCOUNT & SECURITY */}
                    {activeTab === 'security' && (
                        <form onSubmit={handleAccountSubmit} className="space-y-8">
                            <div className="bg-[#fef3c7] border-l-4 border-amber-500 p-4 rounded-r shadow-sm">
                                <div className="flex gap-3">
                                    <ShieldCheckIcon className="h-5 w-5 text-amber-600 shrink-0" />
                                    <div>
                                        <h4 className="text-xs font-black uppercase tracking-wider text-slate-800">
                                            Penting Mengenai Kredensial Admin Induk
                                        </h4>
                                        <p className="text-[11px] font-bold text-slate-600 leading-relaxed mt-1">
                                            Gunakan kombinasi username dan password yang aman. Perubahan ini akan segera memutus akses sesi masuk Anda saat ini jika Anda mengubah password, mewajibkan Anda untuk login kembali menggunakan detail kredensial baru.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white border border-slate-200 rounded-[0.25rem] p-8 space-y-6 shadow-sm">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="h-[2px] w-5 bg-brand-primary"></span>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Kredensial Akun</span>
                                </div>

                                <div className="grid grid-cols-1 gap-6">
                                    <div className="space-y-2">
                                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Username Admin Utama</label>
                                        <input
                                            type="text"
                                            className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-3 text-sm focus:ring-1 focus:ring-brand-primary outline-none"
                                            value={accountForm.data.username}
                                            onChange={(e) => accountForm.setData('username', e.target.value)}
                                            required
                                        />
                                        {accountForm.errors.username && (
                                            <p className="text-[10px] text-red-500 italic mt-1">{accountForm.errors.username}</p>
                                        )}
                                    </div>

                                    <div className="border-t border-slate-100 my-4"></div>

                                    <div className="space-y-2">
                                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Password Saat Ini (Masukkan jika ingin mengganti password)</label>
                                        <input
                                            type="password"
                                            placeholder="••••••••"
                                            className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-3 text-sm focus:ring-1 focus:ring-brand-primary outline-none"
                                            value={accountForm.data.current_password}
                                            onChange={(e) => accountForm.setData('current_password', e.target.value)}
                                        />
                                        {accountForm.errors.current_password && (
                                            <p className="text-[10px] text-red-500 italic mt-1">{accountForm.errors.current_password}</p>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Password Baru</label>
                                            <input
                                                type="password"
                                                placeholder="••••••••"
                                                className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-3 text-sm focus:ring-1 focus:ring-brand-primary outline-none"
                                                value={accountForm.data.password}
                                                onChange={(e) => accountForm.setData('password', e.target.value)}
                                            />
                                            {accountForm.errors.password && (
                                                <p className="text-[10px] text-red-500 italic mt-1">{accountForm.errors.password}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Konfirmasi Password Baru</label>
                                            <input
                                                type="password"
                                                placeholder="••••••••"
                                                className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-3 text-sm focus:ring-1 focus:ring-brand-primary outline-none"
                                                value={accountForm.data.password_confirmation}
                                                onChange={(e) => accountForm.setData('password_confirmation', e.target.value)}
                                            />
                                            {accountForm.errors.password_confirmation && (
                                                <p className="text-[10px] text-red-500 italic mt-1">{accountForm.errors.password_confirmation}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 flex justify-end">
                                <button 
                                    type="submit" 
                                    disabled={accountForm.processing}
                                    className="bg-brand-primary text-white py-4 px-12 text-[10px] font-bold uppercase tracking-[0.2em] rounded-[0.25rem] hover:bg-slate-900 transition-all shadow-xl shadow-brand-primary/20 flex items-center gap-3"
                                >
                                    {accountForm.processing ? 'Sedang Menyimpan...' : (
                                        <>Perbarui Akun & Kredensial <CheckCircleIcon className="h-4 w-4" /></>
                                    )}
                                </button>
                            </div>
                        </form>
                    )}

                </div>
            </div>
        </IndukAdminLayout>
    );
}
