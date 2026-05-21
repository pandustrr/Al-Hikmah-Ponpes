import React, { useState, useEffect } from 'react';
import IndukAdminLayout from '@/Layouts/Induk/IndukAdminLayout';
import { useForm, usePage, Head } from '@inertiajs/react';
import Toast from '@/Components/Toast';
import ConfirmationModal from '@/Components/ConfirmationModal';

// Tab Components
import HeroTab from './tabs/HeroTab';
import TentangTab from './tabs/TentangTab';
import VisiMisiTab from './tabs/VisiMisiTab';
import SejarahTab from './tabs/SejarahTab';

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
        profil_tentang_badge_label1: settings.profil_tentang_badge_label1 || 'Pengalaman Kami',
        profil_tentang_badge_label2: settings.profil_tentang_badge_label2 || 'Tahun Mengabdi',
        profil_tentang_cards: settings.profil_tentang_cards && settings.profil_tentang_cards.length > 0
            ? settings.profil_tentang_cards
            : [
                { title: 'Metode Pendidikan', desc: 'Pendekatan holistik yang mengintegrasikan sains, teknologi, dan ilmu agama dalam lingkungan yang kondusif.' },
                { title: 'Lingkungan Santri', desc: 'Fasilitas asrama yang nyaman dan pembiasaan adab harian ketat untuk membentuk karakter santri yang tangguh.' },
            ],
        profil_image_file: null,

        // Visi & Misi
        profil_visi_tagline: settings.profil_visi_tagline || 'Arah & Tujuan',
        profil_visi_title: settings.profil_visi_title || 'Visi & Misi Lembaga',
        profil_visi_text: settings.profil_visi_text || 'Menjadi lembaga pendidikan Islam terkemuka yang melahirkan generasi beradab, berilmu, dan bermanfaat bagi semesta alam.',
        profil_misi_list: settings.profil_misi_list && settings.profil_misi_list.length > 0
            ? settings.profil_misi_list
            : [
                'Menyelenggarakan pendidikan berbasis adab dan akhlak mulia sesuai nilai-nilai Islam.',
                'Mengembangkan potensi intelektual siswa melalui kurikulum yang integratif dan komprehensif.',
                'Membekali siswa dengan keterampilan abad 21, kemandirian, dan jiwa kewirausahaan.',
                'Membangun lingkungan yayasan yang modern, bersih, aman, dan asri.',
                'Menjalin kemitraan strategis dengan berbagai lembaga pendidikan tingkat nasional dan internasional.',
            ],

        // Sejarah
        profil_sejarah_tagline: settings.profil_sejarah_tagline || 'Sejarah Perjalanan',
        profil_sejarah_title: settings.profil_sejarah_title || 'Jejak Langkah',
        profil_sejarah_desc: settings.profil_sejarah_desc || 'Membangun Peradaban Sejak 1995',
        profil_sejarah_timeline: settings.profil_sejarah_timeline && settings.profil_sejarah_timeline.length > 0
            ? settings.profil_sejarah_timeline
            : [
                { year: '1995', title: 'Peletakan Batu Pertama', desc: 'YPDS Al-Hikmah didirikan dengan modal semangat dan tekad untuk memajukan pendidikan di wilayah Jember Selatan. Bangunan pertama berupa madrasah sederhana.' },
                { year: '2005', title: 'Pengembangan Fasilitas', desc: 'Merespon minat masyarakat yang tinggi, dilakukan pembangunan asrama putra dan putri serta gedung laboratorium terpadu untuk mendukung sains.' },
                { year: '2015', title: 'Akreditasi A', desc: 'Seluruh jenjang pendidikan di bawah naungan YPDS Al-Hikmah meraih predikat Akreditasi A, membuktikan komitmen pada kualitas mutu pengajaran.' },
                { year: '2023', title: 'Digitalisasi Pesantren', desc: 'Implementasi sistem administrasi dan pembelajaran berbasis digital secara menyeluruh, bersiap menghadapi tantangan era modern.' },
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

    // ── Misi Handlers ──────────────────────────────────────────────────────────
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

    // ── Timeline Handlers ──────────────────────────────────────────────────────
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

    // ── Card Handlers ──────────────────────────────────────────────────────────
    const handleCardChange = (index, field, value) => {
        const newCards = [...data.profil_tentang_cards];
        newCards[index][field] = value;
        setData('profil_tentang_cards', newCards);
    };

    const addCard = () => {
        setData('profil_tentang_cards', [...data.profil_tentang_cards, { title: '', desc: '' }]);
        setToastMessage('Kartu fitur baru ditambahkan.');
        setToastType('info');
        setShowToast(true);
    };

    const triggerRemoveCard = (index) => {
        setConfirmModal({
            show: true,
            title: 'Hapus Kartu Fitur?',
            message: 'Apakah Anda yakin ingin menghapus kartu ini?',
            type: 'danger',
            confirmText: 'Ya, Hapus',
            onConfirm: () => {
                const newCards = data.profil_tentang_cards.filter((_, i) => i !== index);
                setData('profil_tentang_cards', newCards);
                setConfirmModal(prev => ({ ...prev, show: false }));
                setToastMessage('Kartu fitur berhasil dihapus.');
                setToastType('warning');
                setShowToast(true);
            }
        });
    };

    // ── Shared Style Constants ─────────────────────────────────────────────────
    const labelStyle = "block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2";
    const inputStyle = "w-full text-xs text-slate-800 bg-white border border-slate-200 rounded-[0.25rem] py-2.5 px-3.5 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/20 hover:border-slate-300 transition-all outline-none placeholder-slate-400 font-semibold";
    const textareaStyle = "w-full text-xs text-slate-800 bg-white border border-slate-200 rounded-[0.25rem] py-2.5 px-3.5 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/20 hover:border-slate-300 transition-all outline-none placeholder-slate-400 font-semibold leading-relaxed";

    const tabs = [
        { id: 'hero',     name: 'Hero & Statistik' },
        { id: 'tentang',  name: 'Tentang Kami' },
        { id: 'visimisi', name: 'Visi & Misi' },
        { id: 'sejarah',  name: 'Sejarah Lembaga' },
    ];

    // Shared props passed to every tab
    const sharedTabProps = { data, setData, errors, labelStyle, inputStyle, textareaStyle };

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
                        <h1 className="text-3xl font-semibold uppercase tracking-tighter text-slate-900 leading-none">Pengaturan <br /><span className="text-brand-primary">Profil &amp; Tentang</span></h1>
                    </div>
                </div>

                <div className="bg-white rounded-[0.25rem] border border-slate-200 shadow-sm overflow-hidden">
                    {/* Tab Navigation */}
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

                        {activeTab === 'hero' && (
                            <HeroTab
                                {...sharedTabProps}
                                heroBgPreview={heroBgPreview}
                                setHeroBgPreview={setHeroBgPreview}
                                heroBgMobilePreview={heroBgMobilePreview}
                                setHeroBgMobilePreview={setHeroBgMobilePreview}
                            />
                        )}

                        {activeTab === 'tentang' && (
                            <TentangTab
                                {...sharedTabProps}
                                profilImagePreview={profilImagePreview}
                                setProfilImagePreview={setProfilImagePreview}
                                addCard={addCard}
                                handleCardChange={handleCardChange}
                                triggerRemoveCard={triggerRemoveCard}
                            />
                        )}

                        {activeTab === 'visimisi' && (
                            <VisiMisiTab
                                {...sharedTabProps}
                                addMisi={addMisi}
                                handleMisiChange={handleMisiChange}
                                triggerRemoveMisi={triggerRemoveMisi}
                            />
                        )}

                        {activeTab === 'sejarah' && (
                            <SejarahTab
                                {...sharedTabProps}
                                addTimeline={addTimeline}
                                handleTimelineChange={handleTimelineChange}
                                triggerRemoveTimeline={triggerRemoveTimeline}
                            />
                        )}

                        {/* Submit Button */}
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
