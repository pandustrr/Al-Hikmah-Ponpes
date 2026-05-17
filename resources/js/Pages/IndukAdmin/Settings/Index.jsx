import React, { useState } from 'react';
import IndukAdminLayout from '@/Layouts/Induk/IndukAdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { 
    Cog6ToothIcon, 
    KeyIcon, 
    PhotoIcon, 
    ArrowUpTrayIcon,
    ShieldCheckIcon,
    ArrowLeftIcon,
    CheckCircleIcon
} from '@heroicons/react/24/outline';

export default function Index({ settings, authUser }) {
    const [activeTab, setActiveTab] = useState('general');

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
            forceFormData: true
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

            <div className="max-w-6xl mx-auto pt-6 pb-16 px-4 sm:px-6 lg:px-8">
                
                {/* Header Navigation */}
                <div className="mb-6 flex items-center justify-between">
                    <Link 
                        href={route('admin.dashboard')}
                        className="text-[10px] font-bold text-slate-400 hover:text-brand-primary uppercase tracking-widest flex items-center gap-2 transition-colors"
                    >
                        <ArrowLeftIcon className="h-3 w-3" /> Kembali ke Dashboard
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
                <div className="flex flex-wrap gap-1.5 mb-8 border-b border-slate-200 pb-px">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-1.5 px-4 py-3 text-[9px] font-black uppercase tracking-wider transition-all relative ${
                                activeTab === tab.id 
                                ? 'text-brand-primary bg-slate-50/50' 
                                : 'text-slate-400 hover:text-slate-600'
                            }`}
                        >
                            <tab.icon className="h-3.5 w-3.5 shrink-0" />
                            {tab.name}
                            {activeTab === tab.id && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary rounded-t-full"></div>
                            )}
                        </button>
                    ))}
                </div>

                {/* Content Section */}
                <div className="space-y-8 animate-fade-in">
                    
                    {/* TAB 1: PENGATURAN UMUM */}
                    {activeTab === 'general' && (
                        <form onSubmit={handleGeneralSubmit} className="space-y-8">
                            {Object.entries(settings)
                                .filter(([group]) => group === 'seo')
                                .map(([group, groupSettings]) => {
                                    const labelInfo = groupLabels[group] || { title: group, icon: Cog6ToothIcon };
                                    return (
                                        <div key={group} className="bg-white border border-slate-200 rounded-[0.25rem] p-8 space-y-6">
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

                            <div className="mt-8 flex justify-end">
                                <button 
                                    type="submit" 
                                    disabled={generalForm.processing}
                                    className="bg-brand-primary text-white py-4 px-12 text-[10px] font-bold uppercase tracking-[0.2em] rounded-[0.25rem] hover:bg-slate-900 transition-all shadow-xl shadow-brand-primary/20 flex items-center gap-3"
                                >
                                    {generalForm.processing ? 'Sedang Menyimpan...' : (
                                        <>Simpan Pengaturan SEO <CheckCircleIcon className="h-4 w-4" /></>
                                    )}
                                </button>
                            </div>
                        </form>
                    )}

                    {/* TAB 2: PORTAL LOGIN CUSTOMIZATION */}
                    {activeTab === 'login_portal' && (
                        <div className="space-y-8">
                            <div className="bg-white border border-slate-200 rounded-[0.25rem] p-8 space-y-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="h-[2px] w-5 bg-brand-primary"></span>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Preview Latar Portal Login Saat Ini</span>
                                </div>
                                <div 
                                    className="w-full h-48 rounded-[0.25rem] overflow-hidden bg-cover bg-center relative border border-slate-200 flex items-center justify-center"
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
                                <div className="bg-white border border-slate-200 rounded-[0.25rem] p-8 space-y-6">
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
                            <div className="bg-brand-secondary/20 border-l-4 border-brand-accent p-4 rounded-r mb-6">
                                <div className="flex gap-3">
                                    <ShieldCheckIcon className="h-5 w-5 text-brand-primary" />
                                    <div>
                                        <h4 className="text-xs font-black uppercase tracking-wider text-slate-800">
                                            Penting Mengenai Kredensial Admin Induk
                                        </h4>
                                        <p className="text-[11px] font-bold text-slate-500 leading-relaxed mt-1">
                                            Gunakan kombinasi username dan password yang aman. Perubahan ini akan segera memutus akses sesi masuk Anda saat ini jika Anda mengubah password, mewajibkan Anda untuk login kembali menggunakan detail kredensial baru.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white border border-slate-200 rounded-[0.25rem] p-8 space-y-6">
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
