import React from 'react';
import IndukAdminLayout from '@/Layouts/Induk/IndukAdminLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { 
    PhoneIcon, 
    CheckCircleIcon
} from '@heroicons/react/24/outline';

export default function Index({ settings }) {
    const { flash } = usePage().props;

    // Flatten all settings into form state
    const initialSettings = [];
    if (settings) {
        Object.entries(settings).forEach(([group, groupSettings]) => {
            groupSettings.forEach(s => {
                initialSettings.push({ id: s.id, key: s.key, value: s.value || '', label: s.label, group: s.group, type: s.type });
            });
        });
    }

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

    const getSettingByKey = (key) => form.data.settings.find(s => s.key === key);

    const contactKeys = ['portal_email_kontak'];
    const socialKeys = ['sosmed_instagram', 'sosmed_facebook', 'sosmed_youtube', 'sosmed_tiktok', 'sosmed_whatsapp'];

    return (
        <IndukAdminLayout title="Kelola Kontak & Sosial Media">
            <Head title="Kelola Kontak & Sosial Media" />
            
            <div className="max-w-6xl mx-auto pt-6 pb-16 px-4 sm:px-6 lg:px-8">
                
                <div className="mb-6 flex items-center justify-between">
                    <div></div>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-brand-primary/5 rounded flex items-center justify-center">
                            <PhoneIcon className="h-4 w-4 text-brand-primary" />
                        </div>
                        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-tight">Kelola Kontak</h2>
                    </div>
                </div>

                <div className="mb-8">
                    <h2 className="text-[10px] font-bold text-brand-accent uppercase tracking-[0.4em] mb-3">Pusat Yayasan</h2>
                    <h1 className="text-4xl font-semibold text-slate-900 tracking-tighter uppercase leading-none">Kelola Kontak <br /><span className="text-brand-primary">& Sosial Media</span></h1>
                </div>

                {flash?.success && (
                    <div className="mb-8 p-4 bg-emerald-50 border-l-4 border-emerald-500 text-emerald-700 text-xs font-black uppercase tracking-widest flex items-center justify-between rounded-[0.15rem]">
                        <span>{flash.success}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in">
                    
                    {/* Section 1: Kontak Dasar */}
                    <div className="bg-white border border-slate-200 rounded-[0.25rem] p-8 space-y-6">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="h-[2px] w-5 bg-brand-primary"></span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Kontak Dasar</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {contactKeys.map(key => {
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

                    {/* Section 2: Sosial Media */}
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

                    <div className="mt-8 flex justify-end">
                        <button 
                            type="submit" 
                            disabled={form.processing}
                            className="bg-brand-primary text-white py-4 px-12 text-[10px] font-bold uppercase tracking-[0.2em] rounded-[0.25rem] hover:bg-slate-900 transition-all shadow-xl shadow-brand-primary/20 flex items-center gap-3"
                        >
                            {form.processing ? 'Sedang Menyimpan...' : (
                                <>Simpan Pengaturan Kontak <CheckCircleIcon className="h-4 w-4" /></>
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
