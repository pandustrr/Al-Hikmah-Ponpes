import React from 'react';
import IndukAdminLayout from '@/Layouts/Induk/IndukAdminLayout';
import { Head, useForm, usePage, Link } from '@inertiajs/react';
import { 
    NewspaperIcon, 
    ArrowLeftIcon,
    CheckCircleIcon,
    PhotoIcon
} from '@heroicons/react/24/outline';

export default function Settings({ settings }) {
    const { flash } = usePage().props;

    // Flatten all settings into form state
    const initialSettings = [];
    Object.entries(settings).forEach(([group, groupSettings]) => {
        groupSettings.forEach(s => {
            initialSettings.push({ id: s.id, key: s.key, value: s.value || '', label: s.label, group: s.group, type: s.type });
        });
    });

    const form = useForm({
        _method: 'put',
        settings: initialSettings
    });

    const handleFieldChange = (id, value) => {
        const newSettings = form.data.settings.map(s => 
            s.id === id ? { ...s, value } : s
        );
        form.setData('settings', newSettings);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        form.post(route('admin.settings.update'), {
            preserveScroll: true,
            forceFormData: true
        });
    };

    // Filter settings into functional categories for premium layout
    const getSettingByKey = (key) => form.data.settings.find(s => s.key === key);

    const newsHeroBgSetting = initialSettings.find(s => s.key === 'news_hero_bg');
    const [imagePreview, setImagePreview] = React.useState(newsHeroBgSetting?.value || '');

    // Group 1: Informasi Dasar Portal
    const portalBasicKeys = ['news_portal_title', 'news_portal_badge', 'portal_tagline', 'portal_deskripsi', 'portal_email_kontak', 'news_search_placeholder'];
    // Group 2: Judul Bagian Halaman Berita
    const portalSectionKeys = ['news_other_title', 'news_multimedia_title', 'news_popular_title', 'news_tags_title'];
    // Group 3: Langganan & Integrasi
    const integrationKeys = ['news_newsletter_title', 'news_newsletter_desc', 'news_ig_title'];
    // Group 4: Sosial Media
    const socialKeys = ['sosmed_instagram', 'sosmed_facebook', 'sosmed_youtube', 'sosmed_tiktok', 'sosmed_whatsapp'];

    return (
        <IndukAdminLayout title="Pengaturan Portal Berita">
            <Head title="Pengaturan Portal Berita & Sosial Media" />
            
            <div className="max-w-6xl mx-auto pt-6 pb-16 px-4 sm:px-6 lg:px-8">
                
                {/* Header Navigation */}
                <div className="mb-6 flex items-center justify-between">
                    <Link 
                        href={route('admin.berita.index')}
                        className="text-[10px] font-bold text-slate-400 hover:text-brand-primary uppercase tracking-widest flex items-center gap-2 transition-colors"
                    >
                        <ArrowLeftIcon className="h-3 w-3" /> Kembali ke Kelola Berita
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-brand-primary/5 rounded flex items-center justify-center">
                            <NewspaperIcon className="h-4 w-4 text-brand-primary" />
                        </div>
                        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-tight">Kustomisasi Berita</h2>
                    </div>
                </div>

                {/* Page Title */}
                <div className="mb-8">
                    <h2 className="text-[10px] font-bold text-brand-accent uppercase tracking-[0.4em] mb-3">Panel Kustomisasi Portal</h2>
                    <h1 className="text-4xl font-semibold text-slate-900 tracking-tighter uppercase leading-none">Pengaturan <br /><span className="text-brand-primary">Portal Berita & Sosial Media</span></h1>
                </div>

                {/* Flash Message */}
                {flash?.success && (
                    <div className="mb-8 p-4 bg-emerald-50 border-l-4 border-emerald-500 text-emerald-700 text-xs font-black uppercase tracking-widest flex items-center justify-between rounded-[0.15rem]">
                        <span>{flash.success}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in">
                    
                    {/* Section: Kustomisasi Halaman Berita (Hero Background Upload) */}
                    <div className="bg-white border border-slate-200 rounded-[0.25rem] p-8 space-y-6">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="h-[2px] w-5 bg-brand-primary"></span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Kustomisasi Halaman Berita</span>
                        </div>

                        <div className="space-y-4">
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Gambar Background Header Halaman Berita</label>
                            <p className="text-[11px] text-slate-400 font-medium leading-relaxed -mt-2">
                                Latar belakang ini ditampilkan di bagian atas halaman portal berita yayasan publik. Gunakan gambar dengan resolusi landscape yang tajam.
                            </p>

                            <div className="relative aspect-[21/9] max-w-4xl bg-slate-50 rounded-[0.25rem] overflow-hidden border border-slate-200 group">
                                {imagePreview ? (
                                    <img src={imagePreview} className="w-full h-full object-cover" alt="Preview Background" />
                                ) : (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300">
                                        <PhotoIcon className="h-10 w-10 mb-2" />
                                        <span className="text-[10px] font-bold uppercase tracking-widest">Belum Ada Gambar - Menggunakan Warna Solid</span>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <span className="text-white text-[10px] font-bold uppercase tracking-[0.2em] border border-white/40 px-4 py-2 cursor-pointer">Pilih Gambar Baru</span>
                                </div>
                                <input 
                                    type="file" 
                                    accept="image/*"
                                    className="absolute inset-0 opacity-0 cursor-pointer" 
                                    onChange={e => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            const bgSetting = form.data.settings.find(s => s.key === 'news_hero_bg');
                                            if (bgSetting) {
                                                handleFieldChange(bgSetting.id, file);
                                            }
                                            setImagePreview(URL.createObjectURL(file));
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Section 1: Informasi Utama Portal */}
                    <div className="bg-white border border-slate-200 rounded-[0.25rem] p-8 space-y-6">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="h-[2px] w-5 bg-brand-primary"></span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Informasi Utama Portal Berita</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {portalBasicKeys.map(key => {
                                const s = getSettingByKey(key);
                                if (!s) return null;
                                return (
                                    <div key={s.id} className={s.key === 'portal_deskripsi' ? 'md:col-span-2' : ''}>
                                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">{s.label}</label>
                                        {s.type === 'textarea' || s.key === 'portal_deskripsi' ? (
                                            <textarea
                                                rows="3"
                                                className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-4 text-sm focus:ring-1 focus:ring-brand-primary outline-none min-h-[100px]"
                                                value={s.value}
                                                onChange={(e) => handleFieldChange(s.id, e.target.value)}
                                            />
                                        ) : (
                                            <input
                                                type="text"
                                                className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-3 text-sm focus:ring-1 focus:ring-brand-primary outline-none"
                                                value={s.value}
                                                onChange={(e) => handleFieldChange(s.id, e.target.value)}
                                            />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Section 2: Judul Bagian Halaman */}
                    <div className="bg-white border border-slate-200 rounded-[0.25rem] p-8 space-y-6">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="h-[2px] w-5 bg-brand-primary"></span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Judul & Label Bagian Depan Halaman</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {portalSectionKeys.map(key => {
                                const s = getSettingByKey(key);
                                if (!s) return null;
                                return (
                                    <div key={s.id}>
                                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">{s.label}</label>
                                        <input
                                            type="text"
                                            className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-3 text-sm focus:ring-1 focus:ring-brand-primary outline-none"
                                            value={s.value}
                                            onChange={(e) => handleFieldChange(s.id, e.target.value)}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Section 3: Warta & Integrasi Feed */}
                    <div className="bg-white border border-slate-200 rounded-[0.25rem] p-8 space-y-6">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="h-[2px] w-5 bg-brand-primary"></span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Langganan Warta & Integrasi Instagram</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {integrationKeys.map(key => {
                                const s = getSettingByKey(key);
                                if (!s) return null;
                                return (
                                    <div key={s.id} className={s.key === 'news_newsletter_desc' ? 'md:col-span-2' : ''}>
                                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">{s.label}</label>
                                        {s.type === 'textarea' || s.key === 'news_newsletter_desc' ? (
                                            <textarea
                                                rows="2"
                                                className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-4 text-sm focus:ring-1 focus:ring-brand-primary outline-none min-h-[80px]"
                                                value={s.value}
                                                onChange={(e) => handleFieldChange(s.id, e.target.value)}
                                            />
                                        ) : (
                                            <input
                                                type="text"
                                                className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-3 text-sm focus:ring-1 focus:ring-brand-primary outline-none"
                                                value={s.value}
                                                onChange={(e) => handleFieldChange(s.id, e.target.value)}
                                            />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Section 4: Sosial Media */}
                    <div className="bg-white border border-slate-200 rounded-[0.25rem] p-8 space-y-6">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="h-[2px] w-5 bg-brand-primary"></span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tautan Sosial Media Resmi</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {socialKeys.map(key => {
                                const s = getSettingByKey(key);
                                if (!s) return null;
                                return (
                                    <div key={s.id}>
                                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">{s.label}</label>
                                        <input
                                            type="text"
                                            className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-3 text-sm focus:ring-1 focus:ring-brand-primary outline-none"
                                            value={s.value}
                                            placeholder={s.key === 'sosmed_whatsapp' ? '6281234567890' : 'https://...'}
                                            onChange={(e) => handleFieldChange(s.id, e.target.value)}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Action Button */}
                    <div className="mt-8 flex justify-end">
                        <button 
                            type="submit" 
                            disabled={form.processing}
                            className="bg-brand-primary text-white py-4 px-12 text-[10px] font-bold uppercase tracking-[0.2em] rounded-[0.25rem] hover:bg-slate-900 transition-all shadow-xl shadow-brand-primary/20 flex items-center gap-3"
                        >
                            {form.processing ? 'Sedang Menyimpan...' : (
                                <>Simpan Semua Pengaturan <CheckCircleIcon className="h-4 w-4" /></>
                            )}
                        </button>
                    </div>
                </form>
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
