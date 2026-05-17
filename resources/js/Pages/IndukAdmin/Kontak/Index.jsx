import React, { useState, useEffect } from 'react';
import IndukAdminLayout from '@/Layouts/Induk/IndukAdminLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { 
    PhoneIcon, 
    CheckCircleIcon
} from '@heroicons/react/24/outline';
import Toast from '@/Components/Toast';
import ConfirmationModal from '@/Components/ConfirmationModal';

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
            forceFormData: true,
            onSuccess: () => {
                setToastMessage('Pengaturan kontak & sosial media berhasil disimpan.');
                setToastType('success');
                setShowToast(true);
            }
        });
    };

    const getSettingByKey = (key) => form.data.settings.find(s => s.key === key);

    const contactKeys = ['portal_email_kontak'];
    const socialKeys = ['sosmed_instagram', 'sosmed_facebook', 'sosmed_youtube', 'sosmed_tiktok', 'sosmed_whatsapp'];

    return (
        <IndukAdminLayout title="Kelola Kontak & Sosial Media">
            <Head title="Kelola Kontak & Sosial Media" />

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
                
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-100 pb-6">
                    <div>
                        <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-accent mb-2">Pusat Yayasan</h2>
                        <h1 className="text-3xl font-semibold uppercase tracking-tighter text-slate-900 leading-none">Kelola Kontak <br /><span className="text-brand-primary">& Sosial Media</span></h1>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in">
                    
                    {/* Section 1: Kontak Dasar */}
                    <div className="bg-white border border-slate-200 rounded-[0.25rem] p-8 space-y-6 shadow-sm">
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
                    <div className="bg-white border border-slate-200 rounded-[0.25rem] p-8 space-y-6 shadow-sm">
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
        </IndukAdminLayout>
    );
}
