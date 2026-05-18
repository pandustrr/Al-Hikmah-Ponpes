import React, { useState, useEffect } from 'react';
import IndukAdminLayout from '@/Layouts/Induk/IndukAdminLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { 
    PhoneIcon, 
    CheckCircleIcon,
    PhotoIcon,
    AcademicCapIcon,
    TrashIcon,
    PlusIcon,
    EnvelopeIcon
} from '@heroicons/react/24/outline';
import Toast from '@/Components/Toast';
import ConfirmationModal from '@/Components/ConfirmationModal';
import ImageInputWithCrop from '@/Components/ImageInputWithCrop';

export default function Index({ settings, lembagas = [] }) {
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
        settings: initialSettings,
        lembagas: lembagas.map(l => ({
            id: l.id,
            nama: l.nama,
            ikon_url: l.ikon_url,
            summary: l.summary,
            ppdb_info: {
                id: l.ppdb_info?.id || null,
                contact_number: l.ppdb_info?.contact_number || '',
                contact_name: l.ppdb_info?.contact_name || '',
                contact_persons: l.ppdb_info?.contact_persons || []
            }
        }))
    });

    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('success');

    // Image previews and files
    const [contactHeroBgPreview, setContactHeroBgPreview] = useState(() => {
        const s = settings ? Object.values(settings).flat().find(x => x.key === 'contact_hero_bg') : null;
        return s?.value || '';
    });
    const [contactHeroBgMobilePreview, setContactHeroBgMobilePreview] = useState(() => {
        const s = settings ? Object.values(settings).flat().find(x => x.key === 'contact_hero_bg_mobile') : null;
        return s?.value || '';
    });

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

    const getSettingIndexByKey = (key) => form.data.settings.findIndex(s => s.key === key);

    const handleFileChangeByKey = (key, file) => {
        const index = getSettingIndexByKey(key);
        if (index !== -1) {
            const newSettings = [...form.data.settings];
            newSettings[index] = { ...newSettings[index], value: file };
            form.setData('settings', newSettings);
        }
    };

    const handleLembagaContactNumberChange = (lembagaId, val) => {
        const updated = form.data.lembagas.map(l => 
            l.id === lembagaId ? { ...l, ppdb_info: { ...l.ppdb_info, contact_number: val } } : l
        );
        form.setData('lembagas', updated);
    };

    const handleLembagaContactNameChange = (lembagaId, val) => {
        const updated = form.data.lembagas.map(l => 
            l.id === lembagaId ? { ...l, ppdb_info: { ...l.ppdb_info, contact_name: val } } : l
        );
        form.setData('lembagas', updated);
    };

    const addLembagaContactPerson = (lembagaId) => {
        const updated = form.data.lembagas.map(l => 
            l.id === lembagaId ? { 
                ...l, 
                ppdb_info: { 
                    ...l.ppdb_info, 
                    contact_persons: [...l.ppdb_info.contact_persons, { name: '', number: '' }] 
                } 
            } : l
        );
        form.setData('lembagas', updated);
    };

    const removeLembagaContactPerson = (lembagaId, personIndex) => {
        const updated = form.data.lembagas.map(l => 
            l.id === lembagaId ? { 
                ...l, 
                ppdb_info: { 
                    ...l.ppdb_info, 
                    contact_persons: l.ppdb_info.contact_persons.filter((_, idx) => idx !== personIndex) 
                } 
            } : l
        );
        form.setData('lembagas', updated);
    };

    const updateLembagaContactPerson = (lembagaId, personIndex, field, value) => {
        const updated = form.data.lembagas.map(l => {
            if (l.id === lembagaId) {
                const updatedPersons = l.ppdb_info.contact_persons.map((p, idx) => 
                    idx === personIndex ? { ...p, [field]: value } : p
                );
                return { ...l, ppdb_info: { ...l.ppdb_info, contact_persons: updatedPersons } };
            }
            return l;
        });
        form.setData('lembagas', updated);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        form.post(route('admin.kontak.update'), {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                setToastMessage('Seluruh kontak & sosial media berhasil disimpan secara terpusat.');
                setToastType('success');
                setShowToast(true);
            }
        });
    };

    const getSettingByKey = (key) => form.data.settings.find(s => s.key === key);

    const contactKeys = ['portal_email_kontak', 'contact_alamat', 'contact_footer_tagline'];
    const socialKeys = ['sosmed_instagram', 'sosmed_facebook', 'sosmed_youtube', 'sosmed_tiktok', 'sosmed_whatsapp'];
    const mapsKeys = ['contact_google_maps_iframe', 'contact_google_maps_link'];

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
                    
                    {/* Section 3: Visual Halaman Kontak (Moved to very top) */}
                    <div className="bg-white border border-slate-200 rounded-[0.25rem] p-8 space-y-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="h-[2px] w-5 bg-brand-primary"></span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Visual & Hero Background</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Desktop Background (21:9) */}
                            <div className="space-y-3">
                                <span className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest">Tampilan Desktop (Cinematic 21:9)</span>
                                <div className="relative aspect-[21/9] bg-slate-50 rounded-[0.25rem] overflow-hidden border border-slate-200 group flex items-center justify-center shadow-sm">
                                    {contactHeroBgPreview ? (
                                        <img src={contactHeroBgPreview} className="w-full h-full object-cover" alt="Preview Desktop" />
                                    ) : (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-350 bg-slate-100/50">
                                            <PhotoIcon className="h-8 w-8 mb-1" />
                                            <span className="text-[8px] font-bold uppercase tracking-widest">Pilih Gambar Desktop</span>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                                        <span className="text-white text-[8px] font-bold uppercase tracking-[0.2em] border border-white/40 px-3 py-1.5 cursor-pointer">Ganti</span>
                                    </div>
                                    <ImageInputWithCrop 
                                        className="absolute inset-0 z-20"
                                        aspectRatio={21/9}
                                        title="Potong Gambar Hero Desktop (21:9)"
                                        onChange={(file) => {
                                            handleFileChangeByKey('contact_hero_bg', file);
                                            if (file) setContactHeroBgPreview(URL.createObjectURL(file));
                                        }}
                                    />
                                </div>
                                <p className="text-[9px] text-slate-400 italic">
                                    Rasio ideal 21:9. Tampilan hero halaman kontak versi lebar monitor.
                                </p>
                            </div>

                            {/* Mobile Background (3:4) */}
                            <div className="space-y-3">
                                <span className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest">Tampilan Mobile (Portrait 3:4)</span>
                                <div className="relative aspect-[3/4] w-full max-w-[130px] bg-slate-50 rounded-[0.25rem] overflow-hidden border border-slate-200 group flex items-center justify-center shadow-sm">
                                    {contactHeroBgMobilePreview ? (
                                        <img src={contactHeroBgMobilePreview} className="w-full h-full object-cover" alt="Preview Mobile" />
                                    ) : (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-350 bg-slate-100/50">
                                            <PhotoIcon className="h-8 w-8 mb-1" />
                                            <span className="text-[8px] font-bold uppercase tracking-widest">Pilih Gambar Mobile</span>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                                        <span className="text-white text-[8px] font-bold uppercase tracking-[0.2em] border border-white/40 px-3 py-1.5 cursor-pointer">Ganti</span>
                                    </div>
                                    <ImageInputWithCrop 
                                        className="absolute inset-0 z-20"
                                        aspectRatio={3/4}
                                        title="Potong Gambar Hero Mobile (3:4)"
                                        onChange={(file) => {
                                            handleFileChangeByKey('contact_hero_bg_mobile', file);
                                            if (file) setContactHeroBgMobilePreview(URL.createObjectURL(file));
                                        }}
                                    />
                                </div>
                                <p className="text-[9px] text-slate-400 italic">
                                    Rasio ideal 3:4. Tampilan hero halaman kontak versi mobile layar HP tegak.
                                </p>
                            </div>
                        </div>
                    </div>

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

                    {/* Section 1.5: Google Maps */}
                    <div className="bg-white border border-slate-200 rounded-[0.25rem] p-8 space-y-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-4">
                            <span className="h-[2px] w-5 bg-brand-primary"></span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pengaturan Peta Lokasi (Google Maps)</span>
                        </div>

                        <div className="space-y-6">
                            {mapsKeys.map(key => {
                                const s = getSettingByKey(key);
                                if (!s) return null;
                                return (
                                    <div key={s.id}>
                                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">{s.label}</label>
                                        {s.type === 'textarea' ? (
                                            <textarea
                                                className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-3 text-sm focus:ring-1 focus:ring-brand-primary outline-none min-h-[100px]"
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
                                        <p className="text-[9px] text-slate-400 italic mt-2">
                                            {s.key === 'contact_google_maps_iframe' 
                                                ? 'Masukkan URL Embed Google Maps (hanya bagian src="..." di dalam tag iframe). Contoh: https://maps.google.com/maps?q=...&output=embed'
                                                : 'Masukkan URL Share Google Maps untuk tombol pintasan navigasi. Contoh: https://maps.app.goo.gl/...'}
                                        </p>
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

                    {/* Section 4: Kontak Masing-Masing Unit Pendidikan */}
                    <div className="bg-white border border-slate-200 rounded-[0.25rem] p-8 space-y-8 shadow-sm">
                        <div className="flex items-center gap-2 mb-2 border-b border-slate-100 pb-4">
                            <span className="h-[2px] w-5 bg-brand-primary"></span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Kontak Masing-Masing Unit Pendidikan</span>
                        </div>

                        {form.data.lembagas && form.data.lembagas.length > 0 ? (
                            <div className="space-y-8 divide-y divide-slate-100">
                                {form.data.lembagas.map((lembaga, idx) => (
                                    <div key={lembaga.id} className={`pt-8 ${idx === 0 ? 'pt-0' : ''} space-y-6`}>
                                        <div className="flex items-center gap-3">
                                            {lembaga.ikon_url ? (
                                                <div className="w-10 h-10 p-1.5 bg-slate-50 border border-slate-150 rounded flex items-center justify-center shrink-0">
                                                    <img src={lembaga.ikon_url} alt={lembaga.nama} className="w-full h-full object-contain" />
                                                </div>
                                            ) : (
                                                <div className="w-10 h-10 bg-brand-primary/5 text-brand-primary rounded flex items-center justify-center shrink-0">
                                                    <AcademicCapIcon className="h-5 w-5" />
                                                </div>
                                            )}
                                            <div>
                                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Unit Pendidikan</span>
                                                <h3 className="text-sm font-bold uppercase tracking-tight text-slate-900 leading-none mt-1">{lembaga.nama}</h3>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                                            {/* WhatsApp Center Unit */}
                                            <div className="md:col-span-4 space-y-4">
                                                <div className="space-y-2">
                                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Atas Nama WA Utama</label>
                                                    <input
                                                        type="text"
                                                        className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-3 text-sm focus:ring-1 focus:ring-brand-primary outline-none"
                                                        placeholder="Contoh: Admin PPDB / Ibu Laila"
                                                        value={lembaga.ppdb_info?.contact_name || ''}
                                                        onChange={(e) => handleLembagaContactNameChange(lembaga.id, e.target.value)}
                                                    />
                                                    <p className="text-[9px] text-slate-400 italic">Nama pemegang nomor WA Utama (opsional).</p>
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">WhatsApp Utama Unit</label>
                                                    <input
                                                        type="text"
                                                        className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-3 text-sm focus:ring-1 focus:ring-brand-primary outline-none"
                                                        placeholder="6281234567890"
                                                        value={lembaga.ppdb_info?.contact_number || ''}
                                                        onChange={(e) => handleLembagaContactNumberChange(lembaga.id, e.target.value)}
                                                    />
                                                </div>
                                            </div>

                                            {/* Multi Contact Persons */}
                                            <div className="md:col-span-8 space-y-4 border-l border-slate-100 md:pl-6">
                                                <div className="flex items-center justify-between">
                                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Daftar Narahubung Unit (Panitia, Admisi, dll)</label>
                                                    <button
                                                        type="button"
                                                        onClick={() => addLembagaContactPerson(lembaga.id)}
                                                        className="text-[9px] font-bold text-brand-primary uppercase tracking-widest hover:text-slate-900 transition-colors flex items-center gap-1"
                                                    >
                                                        <PlusIcon className="h-3.5 w-3.5 shrink-0" /> Tambah Narahubung
                                                    </button>
                                                </div>

                                                {lembaga.ppdb_info.contact_persons.length === 0 ? (
                                                    <p className="text-[10px] text-slate-400 italic text-center py-4 border-2 border-dashed border-slate-100 rounded-[0.25rem] bg-slate-50/50">
                                                        Belum ada narahubung untuk unit ini.
                                                    </p>
                                                ) : (
                                                    <div className="space-y-3">
                                                        {lembaga.ppdb_info.contact_persons.map((contact, i) => (
                                                            <div key={i} className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-[0.25rem] p-3">
                                                                <span className="text-[10px] font-black text-slate-350 w-5 shrink-0 text-center">{i + 1}</span>
                                                                
                                                                {/* Contact Person Name */}
                                                                <input
                                                                    type="text"
                                                                    className="flex-1 bg-white border border-slate-200 rounded p-2 text-sm focus:ring-1 focus:ring-brand-primary outline-none"
                                                                    placeholder="Nama (mis. Admisi SMA)"
                                                                    value={contact.name}
                                                                    onChange={(e) => updateLembagaContactPerson(lembaga.id, i, 'name', e.target.value)}
                                                                    required
                                                                />

                                                                {/* Contact Person Number */}
                                                                <input
                                                                    type="text"
                                                                    className="flex-1 bg-white border border-slate-200 rounded p-2 text-sm focus:ring-1 focus:ring-brand-primary outline-none"
                                                                    placeholder="Nomor WA (628...)"
                                                                    value={contact.number}
                                                                    onChange={(e) => updateLembagaContactPerson(lembaga.id, i, 'number', e.target.value)}
                                                                    required
                                                                />

                                                                {/* Delete Button */}
                                                                <button
                                                                    type="button"
                                                                    onClick={() => removeLembagaContactPerson(lembaga.id, i)}
                                                                    className="p-1.5 text-slate-300 hover:text-red-500 transition-colors shrink-0"
                                                                    title="Hapus Kontak Person"
                                                                >
                                                                    <TrashIcon className="h-4 w-4" />
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-slate-400 text-xs italic text-center py-6">Tidak ada unit pendidikan formal yang terdaftar.</p>
                        )}
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
