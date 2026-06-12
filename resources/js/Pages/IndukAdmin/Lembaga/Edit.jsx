import React, { useState, useEffect } from 'react';
import IndukAdminLayout from '@/Layouts/Induk/IndukAdminLayout';
import { useForm, Link, usePage } from '@inertiajs/react';
import Toast from '@/Components/Toast';
import ConfirmationModal from '@/Components/ConfirmationModal';
import { 
    AcademicCapIcon, 
    ArrowLeftIcon,
    SparklesIcon,
    StarIcon,
    RectangleStackIcon,
    DocumentTextIcon,
    CheckCircleIcon,
    UserGroupIcon,
    PencilSquareIcon,
    TrashIcon,
    PhotoIcon,
    ArrowRightIcon,
    BuildingLibraryIcon,
    InformationCircleIcon,
    VideoCameraIcon,
    PlusIcon
} from '@heroicons/react/24/outline';
import ImageInputWithCrop from '@/Components/ImageInputWithCrop';

export default function Edit({ lembaga, pengajars = [], ppdbInfo = null, fasilitas = [], galeris = [], beritaCategories = [], beritas = [] }) {
    const { flash } = usePage().props;

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

    // Modal Confirmation State
    const [confirmModal, setConfirmModal] = useState({
        show: false,
        title: '',
        message: '',
        type: 'danger',
        onConfirm: null
    });

    const [activeTab, setActiveTab] = React.useState('visual');
    
    const { data, setData, post, processing, errors } = useForm({
        nama: lembaga.nama,
        slug: lembaga.slug,
        deskripsi: lembaga.deskripsi || '',
        summary: lembaga.summary || '',
        running_text: lembaga.running_text || '',
        jumlah_siswa: lembaga.jumlah_siswa || '',
        jumlah_pengajar: lembaga.jumlah_pengajar || '',
        jumlah_fasilitas: lembaga.jumlah_fasilitas || '',
        akreditasi: lembaga.akreditasi || '',
        program_tags: lembaga.program_tags || '',
        visi: lembaga.visi || '',
        misi: lembaga.misi || '',
        struktur_pendidikan: lembaga.struktur_pendidikan || '',
        keunggulan: lembaga.keunggulan || '',
        image: null,
        image_mobile: null,
        ikon: null,
        profil_image: null,
        profil_image_mobile: null,
        filosofi_tagline: lembaga.filosofi_tagline || '',
        filosofi_title: lembaga.filosofi_title || '',
        sidebar_category_id: lembaga.sidebar_category_id || '',
        sidebar_berita_id: lembaga.sidebar_berita_id || '',
        sidebar_categories: lembaga.sidebar_categories || [],
        youtube_video_badge: lembaga.youtube_video_badge || 'Galeri Video Resmi',
        youtube_video_title: lembaga.youtube_video_title || 'Dokumentasi & Video Profil',
        youtube_video_desc: lembaga.youtube_video_desc || 'Simak video profil resmi serta dokumentasi kegiatan kami.',
        youtube_video_urls: Array.isArray(lembaga.youtube_video_urls)
            ? JSON.stringify(lembaga.youtube_video_urls)
            : (typeof lembaga.youtube_video_urls === 'string' && lembaga.youtube_video_urls.trim().startsWith('['))
                ? lembaga.youtube_video_urls
                : JSON.stringify(lembaga.youtube_video_urls ? lembaga.youtube_video_urls.split('\n').map(u => u.trim()).filter(Boolean) : []),
        
        // Custom section titles / taglines
        hero_badge: lembaga.hero_badge || 'Unit Pendidikan Formal',
        tenaga_pendidik_tagline: lembaga.tenaga_pendidik_tagline || 'Tenaga Pendidik',
        tenaga_pendidik_title: lembaga.tenaga_pendidik_title || 'Mengenal Para',
        tenaga_pendidik_subtitle: lembaga.tenaga_pendidik_subtitle || 'Asatidzah Kami',
        program_title: lembaga.program_title || 'Program & Keunggulan',
        adab_title: lembaga.adab_title || 'Adab & Kompetensi',
        struktur_title: lembaga.struktur_title || 'Struktur Pendidikan',
        galeri_title: lembaga.galeri_title || 'Galeri Unit',
        berita_title: lembaga.berita_title || 'Berita & Kegiatan Unit',
        berita_section_category_id: lembaga.berita_section_category_id || '',
        ppdb_tagline: lembaga.ppdb_tagline || 'Penerimaan Peserta Didik Baru',
        ppdb_title: lembaga.ppdb_title || 'Bergabunglah Bersama',
        ppdb_subtitle: lembaga.ppdb_subtitle || 'SD NU 22 Full Day Al-Hikmah',
        ppdb_points: lembaga.ppdb_points || 'Gedung Milik Sendiri\nTenaga Pendidik Lulusan S1\nLingkungan Aman & Nyaman\nProgram Tahfidz Intensif',
        ppdb_bottom_title: lembaga.ppdb_bottom_title || 'Mulai Perjalanan Pendidikan di SD NU 22 Full Day Al-Hikmah',
        ppdb_bottom_subtitle: lembaga.ppdb_bottom_subtitle || 'Pendaftaran Peserta Didik Baru.',
    });

    // Local UI state for sidebar multi-category manager
    const [sidebarCats, setSidebarCats] = React.useState(
        lembaga.sidebar_categories && lembaga.sidebar_categories.length > 0
            ? lembaga.sidebar_categories.map(id => parseInt(id))
            : (lembaga.sidebar_category_id ? [parseInt(lembaga.sidebar_category_id)] : [])
    );

    const addSidebarCat = (catId) => {
        if (!catId || sidebarCats.includes(parseInt(catId))) return;
        const next = [...sidebarCats, parseInt(catId)];
        setSidebarCats(next);
        setData('sidebar_categories', next);
    };

    const removeSidebarCat = (catId) => {
        const next = sidebarCats.filter(id => id !== parseInt(catId));
        setSidebarCats(next);
        setData('sidebar_categories', next);
    };

    const moveSidebarCat = (index, dir) => {
        const next = [...sidebarCats];
        const swap = index + dir;
        if (swap < 0 || swap >= next.length) return;
        [next[index], next[swap]] = [next[swap], next[index]];
        setSidebarCats(next);
        setData('sidebar_categories', next);
    };

    const [imagePreview, setImagePreview] = React.useState(lembaga.image_url);
    const [imageMobilePreview, setImageMobilePreview] = React.useState(lembaga.image_mobile_url);
    const [iconPreview, setIconPreview] = React.useState(lembaga.ikon_url);
    const [profilImagePreview, setProfilImagePreview] = React.useState(lembaga.profil_image_url);
    const [profilImageMobilePreview, setProfilImageMobilePreview] = React.useState(lembaga.profil_image_mobile_url);

    const [videoList, setVideoList] = React.useState(() => {
        try {
            if (Array.isArray(lembaga.youtube_video_urls)) {
                return lembaga.youtube_video_urls;
            }
            if (typeof lembaga.youtube_video_urls === 'string') {
                const trimmed = lembaga.youtube_video_urls.trim();
                if (trimmed.startsWith('[')) {
                    return JSON.parse(trimmed);
                } else if (trimmed) {
                    return trimmed.split('\n').map(u => u.trim()).filter(Boolean);
                }
            }
        } catch (e) {
            console.error("Error parsing youtube_video_urls:", e);
        }
        return [];
    });

    const handleVideoUrlChange = (index, value) => {
        const newList = [...videoList];
        newList[index] = value;
        setVideoList(newList);
        setData('youtube_video_urls', JSON.stringify(newList));
    };

    const addVideoInput = () => {
        const newList = [...videoList, ''];
        setVideoList(newList);
        setData('youtube_video_urls', JSON.stringify(newList));
    };

    const removeVideoInput = (index) => {
        const newList = videoList.filter((_, i) => i !== index);
        setVideoList(newList);
        setData('youtube_video_urls', JSON.stringify(newList));
    };

    // Keunggulan Cards State & Handlers
    const [keunggulanCards, setKeunggulanCards] = React.useState(() => {
        try {
            if (lembaga.keunggulan) {
                const decoded = JSON.parse(lembaga.keunggulan);
                if (Array.isArray(decoded)) {
                    return decoded;
                }
            }
        } catch (e) {}
        
        // Fallback to split newline
        const lines = (lembaga.keunggulan || '').split('\n').filter(Boolean);
        if (lines.length > 0) {
            return lines.map(line => ({
                title: line.trim(),
                desc: 'Layanan pendidikan terbaik untuk masa depan santri.'
            }));
        }
        return [];
    });

    const handleAddKeunggulanCard = () => {
        const newCard = { title: 'Keunggulan Baru', desc: 'Deskripsi keunggulan baru unit.' };
        const next = [...keunggulanCards, newCard];
        setKeunggulanCards(next);
        setData('keunggulan', JSON.stringify(next));
    };

    const handleUpdateKeunggulanCard = (index, field, value) => {
        const next = [...keunggulanCards];
        next[index] = { ...next[index], [field]: value };
        setKeunggulanCards(next);
        setData('keunggulan', JSON.stringify(next));
    };

    const handleRemoveKeunggulanCard = (index) => {
        const next = keunggulanCards.filter((_, i) => i !== index);
        setKeunggulanCards(next);
        setData('keunggulan', JSON.stringify(next));
    };

    const handleMoveKeunggulanCard = (index, dir) => {
        const next = [...keunggulanCards];
        const swap = index + dir;
        if (swap < 0 || swap >= next.length) return;
        [next[index], next[swap]] = [next[swap], next[index]];
        setKeunggulanCards(next);
        setData('keunggulan', JSON.stringify(next));
    };

    // PPDB Form
    const ppdbForm = useForm({
        description:       ppdbInfo?.description       || '',
        registration_link: ppdbInfo?.registration_link || '',
        is_active:         ppdbInfo?.is_active         ?? true,
        is_open:           ppdbInfo?.is_open           ?? true,
        is_link_active:     ppdbInfo?.is_link_active     ?? true,
    });

    const submitPpdb = (e) => {
        e.preventDefault();
        ppdbForm.put(route('admin.lembaga.ppdb.upsert', lembaga.id));
    };

    // Pengajar CRUD State & Handlers
    const [isPengajarModalOpen, setIsPengajarModalOpen] = React.useState(false);
    const [editingPengajar, setEditingPengajar] = React.useState(null);
    const pengajarForm = useForm({
        lembaga_id: lembaga.id,
        nama: '',
        jabatan: '',
        image: null,
    });

    const [pengajarPreview, setPengajarPreview] = React.useState(null);

    const openAddPengajar = () => {
        setEditingPengajar(null);
        pengajarForm.reset();
        setPengajarPreview(null);
        setIsPengajarModalOpen(true);
    };

    const openEditPengajar = (p) => {
        setEditingPengajar(p);
        pengajarForm.setData({
            nama: p.nama,
            jabatan: p.jabatan,
            image: null,
        });
        setPengajarPreview(p.image_url);
        setIsPengajarModalOpen(true);
    };

    const submitPengajar = (e) => {
        e.preventDefault();
        if (editingPengajar) {
            pengajarForm.post(route('admin.pengajar.update-post', editingPengajar.id), {
                onSuccess: () => setIsPengajarModalOpen(false),
            });
        } else {
            pengajarForm.post(route('admin.pengajar.store'), {
                onSuccess: () => {
                    setIsPengajarModalOpen(false);
                    pengajarForm.reset();
                }
            });
        }
    };

    const deletePengajar = (id) => {
        setConfirmModal({
            show: true,
            title: 'Hapus Pengajar?',
            message: 'Apakah Anda yakin ingin menghapus pengajar ini? Tindakan ini tidak dapat dibatalkan.',
            type: 'danger',
            confirmText: 'Ya, Hapus',
            onConfirm: () => {
                pengajarForm.delete(route('admin.pengajar.destroy', id), {
                    onSuccess: () => {
                        setConfirmModal(prev => ({ ...prev, show: false }));
                    }
                });
            }
        });
    };

    // Fasilitas CRUD State & Handlers
    const [isFasilitasModalOpen, setIsFasilitasModalOpen] = React.useState(false);
    const [editingFasilitas, setEditingFasilitas] = React.useState(null);
    const fasilitasForm = useForm({
        lembaga_id: lembaga.id,
        nama: '',
        kategori: '',
        deskripsi: '',
        image: null,
    });

    const [fasilitasPreview, setFasilitasPreview] = React.useState(null);

    const openAddFasilitas = () => {
        setEditingFasilitas(null);
        setSelectedFasilitasForGaleri(null);
        fasilitasForm.reset();
        setFasilitasPreview(null);
        setIsFasilitasModalOpen(true);
    };

    const openEditFasilitas = (f) => {
        setEditingFasilitas(f);
        setSelectedFasilitasForGaleri(f);
        fasilitasForm.setData({
            nama: f.nama,
            kategori: f.kategori || '',
            deskripsi: f.deskripsi || '',
            image: null,
        });
        galeriForm.setData({
            fasilitas_id: f.id,
            judul: '',
            deskripsi: '',
            image: null,
        });
        setGaleriPreview(null);
        setEditingGaleri(null);
        setFasilitasPreview(f.image_url);
        setIsFasilitasModalOpen(true);
    };

    const closeFasilitasModal = () => {
        setIsFasilitasModalOpen(false);
        setEditingFasilitas(null);
        setSelectedFasilitasForGaleri(null);
        setFasilitasPreview(null);
        setGaleriPreview(null);
        setEditingGaleri(null);
    };

    const submitFasilitas = (e) => {
        e.preventDefault();
        if (editingFasilitas) {
            fasilitasForm.post(route('admin.fasilitas.update', editingFasilitas.id), {
                forceFormData: true,
                onSuccess: () => closeFasilitasModal(),
            });
        } else {
            fasilitasForm.post(route('admin.fasilitas.store'), {
                onSuccess: () => {
                    closeFasilitasModal();
                }
            });
        }
    };

    const deleteFasilitas = (id) => {
        setConfirmModal({
            show: true,
            title: 'Hapus Fasilitas?',
            message: 'Apakah Anda yakin ingin menghapus fasilitas ini? Tindakan ini tidak dapat dibatalkan.',
            type: 'danger',
            confirmText: 'Ya, Hapus',
            onConfirm: () => {
                fasilitasForm.delete(route('admin.fasilitas.destroy', id), {
                    onSuccess: () => {
                        setConfirmModal(prev => ({ ...prev, show: false }));
                    }
                });
            }
        });
    };

    // Galeri Fasilitas CRUD State & Handlers
    const [selectedFasilitasForGaleri, setSelectedFasilitasForGaleri] = React.useState(null);
    const [isGaleriModalOpen, setIsGaleriModalOpen] = React.useState(false);
    const [editingGaleri, setEditingGaleri] = React.useState(null);
    const galeriForm = useForm({
        fasilitas_id: '',
        judul: '',
        deskripsi: '',
        image: null,
    });

    const [galeriPreview, setGaleriPreview] = React.useState(null);

    const openManageGaleri = (f) => {
        setSelectedFasilitasForGaleri(f);
        galeriForm.setData({
            fasilitas_id: f.id,
            judul: '',
            deskripsi: '',
            image: null,
        });
        setGaleriPreview(null);
        setEditingGaleri(null);
        setIsGaleriModalOpen(true);
    };

    const submitGaleri = (e) => {
        e.preventDefault();
        if (editingGaleri) {
            galeriForm.post(route('admin.galeri.update', editingGaleri.id), {
                forceFormData: true,
                onSuccess: () => {
                    setEditingGaleri(null);
                    galeriForm.reset('judul', 'deskripsi', 'image');
                    setGaleriPreview(null);
                },
            });
        } else {
            galeriForm.post(route('admin.galeri.store'), {
                onSuccess: () => {
                    galeriForm.reset('judul', 'deskripsi', 'image');
                    setGaleriPreview(null);
                }
            });
        }
    };

    const startEditGaleri = (g) => {
        setEditingGaleri(g);
        galeriForm.setData({
            fasilitas_id: selectedFasilitasForGaleri.id,
            judul: g.judul || '',
            deskripsi: g.deskripsi || '',
            image: null,
        });
        setGaleriPreview(g.image_url);
    };

    const cancelEditGaleri = () => {
        setEditingGaleri(null);
        galeriForm.reset('judul', 'deskripsi', 'image');
        setGaleriPreview(null);
    };

    const deleteGaleri = (id) => {
        setConfirmModal({
            show: true,
            title: 'Hapus Foto Galeri?',
            message: 'Apakah Anda yakin ingin menghapus foto galeri ini? Tindakan ini tidak dapat dibatalkan.',
            type: 'danger',
            confirmText: 'Ya, Hapus',
            onConfirm: () => {
                galeriForm.delete(route('admin.galeri.destroy', id), {
                    onSuccess: () => {
                        setConfirmModal(prev => ({ ...prev, show: false }));
                    }
                });
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.lembaga.update-post', lembaga.id));
    };

    const tabs = [
        { id: 'visual',     name: 'Identitas Visual',     icon: PhotoIcon },
        { id: 'profil',     name: 'Profil & Narasi',       icon: DocumentTextIcon },
        { id: 'pengajar',   name: 'Tenaga Pendidik',       icon: UserGroupIcon },
        { id: 'keunggulan', name: 'Keunggulan Unit',     icon: StarIcon },
        { id: 'youtube_videos', name: 'Video Unit',        icon: VideoCameraIcon },
        { id: 'ppdb',       name: 'Info PPDB',             icon: InformationCircleIcon },
        { id: 'fasilitas',  name: 'Fasilitas Unit',       icon: BuildingLibraryIcon },
    ];

    return (
        <IndukAdminLayout title={`Detail: ${lembaga.nama}`}>
            <div className="max-w-6xl mx-auto pt-6 pb-16 px-4 sm:px-6 lg:px-8">
                
                {/* Header Navigation */}
                <div className="mb-6 flex items-center justify-between">
                    <Link 
                        href={route('admin.lembaga.index')}
                        className="text-[10px] font-bold text-slate-400 hover:text-brand-primary uppercase tracking-widest flex items-center gap-2 transition-colors"
                    >
                        <ArrowLeftIcon className="h-3 w-3" /> Kembali ke Kelola Pendidikan
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-brand-primary/5 rounded flex items-center justify-center">
                            <AcademicCapIcon className="h-4 w-4 text-brand-primary" />
                        </div>
                        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-tight">{lembaga.nama}</h2>
                    </div>
                </div>

                {/* Page Title */}
                <div className="mb-8">
                    <h2 className="text-[10px] font-bold text-brand-accent uppercase tracking-[0.4em] mb-3">Panel Manajemen Unit</h2>
                    <h1 className="text-4xl font-semibold text-slate-900 tracking-tighter uppercase leading-none">Kelola Detail <br /><span className="text-brand-primary">Lembaga</span></h1>
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

                {/* Main Form Wrapper */}
                <form onSubmit={handleSubmit}>
                    {errors.error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded text-xs font-bold uppercase tracking-wider">
                            {errors.error}
                        </div>
                    )}
                    
                    {/* Tab: YouTube Videos */}
                    {activeTab === 'youtube_videos' && (
                        <div className="space-y-8 animate-fade-in">
                            <div className="bg-white border border-slate-200 rounded-[0.25rem] p-8 space-y-6">
                                <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
                                    <span className="h-[2px] w-5 bg-brand-primary"></span>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pengaturan Galeri Video Unit</span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Badge Video</label>
                                        <input
                                            type="text"
                                            value={data.youtube_video_badge}
                                            onChange={e => setData('youtube_video_badge', e.target.value)}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-4 text-sm focus:ring-1 focus:ring-brand-primary outline-none"
                                            placeholder="Contoh: Galeri Video Resmi"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Judul Section Video</label>
                                        <input
                                            type="text"
                                            value={data.youtube_video_title}
                                            onChange={e => setData('youtube_video_title', e.target.value)}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-4 text-sm focus:ring-1 focus:ring-brand-primary outline-none"
                                            placeholder="Contoh: Dokumentasi & Video Kegiatan Unit"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Deskripsi Section Video</label>
                                    <textarea
                                        rows="2"
                                        value={data.youtube_video_desc}
                                        onChange={e => setData('youtube_video_desc', e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-4 text-sm focus:ring-1 focus:ring-brand-primary outline-none"
                                        placeholder="Contoh: Simak video kegiatan resmi..."
                                    ></textarea>
                                </div>

                                <div className="flex items-center justify-between pt-6 border-t border-slate-100/70">
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Daftar Tautan Video YouTube</label>
                                    <button
                                        type="button"
                                        onClick={addVideoInput}
                                        className="inline-flex items-center gap-2 bg-brand-primary hover:bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 transition-all rounded-[0.25rem]"
                                    >
                                        <PlusIcon className="h-3.5 w-3.5" />
                                        Tambah Link Video
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {videoList.length === 0 ? (
                                        <p className="text-xs text-slate-400 italic">Belum ada link video. Klik "Tambah Link Video" untuk menambahkan.</p>
                                    ) : (
                                        videoList.map((url, idx) => (
                                            <div key={idx} className="flex items-center gap-3">
                                                <div className="flex-1">
                                                    <input
                                                        type="text"
                                                        value={url}
                                                        onChange={e => handleVideoUrlChange(idx, e.target.value)}
                                                        className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-3 text-sm focus:ring-1 focus:ring-brand-primary outline-none"
                                                        placeholder="Contoh: https://www.youtube.com/watch?v=xxxxxx"
                                                    />
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeVideoInput(idx)}
                                                    className="p-3 bg-red-50 text-red-500 hover:bg-red-100 border border-red-200 rounded-[0.25rem] transition-colors"
                                                    title="Hapus Link Video"
                                                >
                                                    <TrashIcon className="h-4 w-4" />
                                                </button>
                                            </div>
                                        ))
                                    )}
                                    <p className="text-[9px] text-slate-400 italic mt-2">
                                        Masukkan link video YouTube profil unit pendidikan. Anda dapat menambahkan beberapa video sekaligus dan menghapusnya secara interaktif.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {/* Tab 1: Profil & Narasi Utama */}
                    {activeTab === 'profil' && (
                        <div className="space-y-8 animate-fade-in">
                            <div className="bg-white border border-slate-200 rounded-[0.25rem] p-8 space-y-8">
                                
                                {/* Section 1: Filosofi Pendidikan */}
                                <div>
                                    <div className="flex items-center gap-2 mb-6">
                                        <span className="h-[2px] w-5 bg-brand-primary"></span>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Filosofi &amp; Narasi Utama</span>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        <div>
                                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Tagline Filosofi</label>
                                            <input 
                                                type="text" 
                                                className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-4 text-sm focus:ring-1 focus:ring-brand-primary outline-none"
                                                value={data.filosofi_tagline}
                                                onChange={e => setData('filosofi_tagline', e.target.value)}
                                                placeholder="Membangun Generasi"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Judul Filosofi</label>
                                            <input 
                                                type="text" 
                                                className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-4 text-sm focus:ring-1 focus:ring-brand-primary outline-none"
                                                value={data.filosofi_title}
                                                onChange={e => setData('filosofi_title', e.target.value)}
                                                placeholder="Filosofi Pendidikan di..."
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-6">
                                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Deskripsi/Tulisan Filosofi</label>
                                        <textarea 
                                            className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-4 text-sm focus:ring-1 focus:ring-brand-primary outline-none min-h-[120px]"
                                            value={data.deskripsi}
                                            onChange={e => setData('deskripsi', e.target.value)}
                                            placeholder="Sekolah Dasar dengan sistem Full Day yang mengedepankan adab dan ilmu..."
                                        ></textarea>
                                    </div>
                                    
                                    {/* Gambar Filosofi / Profil */}
                                    <div className="mb-6">
                                        <div className="flex items-center gap-2 mb-6">
                                            <span className="h-[2px] w-5 bg-brand-primary"></span>
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-serif">Gambar &amp; Ikon Visual Filosofi</span>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            {/* Profil Image Desktop */}
                                            <div className="space-y-4 max-w-md">
                                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                                    Gambar Profil Desktop (Lanskap 16:9)
                                                </label>
                                                <div className="relative aspect-video bg-slate-100 rounded overflow-hidden border-2 border-dashed border-slate-200 group">
                                                    {profilImagePreview ? (
                                                        <img src={profilImagePreview} className="w-full h-full object-cover" alt="Profil Preview" />
                                                    ) : (
                                                        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300">
                                                            <PhotoIcon className="h-10 w-10 mb-2" />
                                                            <span className="text-[10px] font-bold uppercase tracking-widest text-center px-4">Pilih Gambar Profil Desktop</span>
                                                        </div>
                                                    )}
                                                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                        <span className="text-white text-[10px] font-bold uppercase tracking-[0.2em] border border-white/40 px-4 py-2">Ganti Gambar</span>
                                                    </div>
                                                    <ImageInputWithCrop 
                                                        className="absolute inset-0 z-10"
                                                        aspectRatio={16/9}
                                                        title="Potong Gambar Profil Desktop"
                                                        onChange={(file) => {
                                                            setData('profil_image', file);
                                                            if (file) setProfilImagePreview(URL.createObjectURL(file));
                                                        }}
                                                    />
                                                </div>
                                                {errors.profil_image && (
                                                    <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider">{errors.profil_image}</p>
                                                )}
                                                <p className="text-[9px] text-slate-400 uppercase tracking-widest italic leading-relaxed">
                                                    Gambar ini akan ditampilkan pada resolusi layar monitor/laptop.
                                                </p>
                                            </div>

                                            {/* Profil Image Mobile */}
                                            <div className="space-y-4">
                                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                                    Gambar Profil Mobile (Potret 3:4)
                                                </label>
                                                <div className="relative aspect-[3/4] max-w-[200px] bg-slate-100 rounded overflow-hidden border-2 border-dashed border-slate-200 group">
                                                    {profilImageMobilePreview ? (
                                                        <img src={profilImageMobilePreview} className="w-full h-full object-cover" alt="Profil Mobile Preview" />
                                                    ) : (
                                                        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300">
                                                            <PhotoIcon className="h-10 w-10 mb-2" />
                                                            <span className="text-[10px] font-bold uppercase tracking-widest text-center px-4">Pilih Gambar Profil Mobile</span>
                                                        </div>
                                                    )}
                                                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                        <span className="text-white text-[10px] font-bold uppercase tracking-[0.2em] border border-white/40 px-4 py-2">Ganti Gambar</span>
                                                    </div>
                                                    <ImageInputWithCrop 
                                                        className="absolute inset-0 z-10"
                                                        aspectRatio={3/4}
                                                        title="Potong Gambar Profil Mobile"
                                                        onChange={(file) => {
                                                            setData('profil_image_mobile', file);
                                                            if (file) setProfilImageMobilePreview(URL.createObjectURL(file));
                                                        }}
                                                    />
                                                </div>
                                                {errors.profil_image_mobile && (
                                                    <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider mt-2">{errors.profil_image_mobile}</p>
                                                )}
                                                <p className="text-[9px] text-slate-400 uppercase tracking-widest italic leading-relaxed">
                                                    Gambar ini akan ditampilkan pada resolusi layar HP/tablet.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Section 2: Sidebar News Categories */}
                                <div className="border-t border-slate-100 pt-6">
                                    <div className="flex items-center gap-2 mb-6">
                                        <span className="h-[2px] w-5 bg-brand-primary"></span>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sidebar Berita — Multi Kategori</span>
                                    </div>
                                    <p className="text-[9px] text-slate-400 italic mb-6">
                                        Tambahkan satu atau beberapa kategori berita yang tampil sebagai widget sticky di sidebar kanan halaman unit. Urutan bisa diatur dengan tombol ↑ ↓.
                                    </p>

                                    {/* Active sidebar categories */}
                                    <div className="space-y-2 mb-4">
                                        {sidebarCats.length === 0 && (
                                            <div className="text-[10px] text-slate-300 italic border border-dashed border-slate-200 rounded p-4 text-center">
                                                Belum ada kategori sidebar. Tambahkan di bawah.
                                            </div>
                                        )}
                                        {sidebarCats.map((catId, idx) => {
                                            const cat = beritaCategories.find(c => c.id === catId);
                                            return (
                                                <div key={catId} className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-[0.25rem] px-4 py-3">
                                                    <span className="flex-1 text-sm font-semibold text-slate-700">{cat ? cat.name : `Kategori #${catId}`}</span>
                                                    <div className="flex items-center gap-1">
                                                        <button type="button" onClick={() => moveSidebarCat(idx, -1)} disabled={idx === 0}
                                                            className="px-2 py-1 text-[10px] font-bold text-slate-400 hover:text-brand-primary disabled:opacity-30 transition-colors">↑</button>
                                                        <button type="button" onClick={() => moveSidebarCat(idx, 1)} disabled={idx === sidebarCats.length - 1}
                                                            className="px-2 py-1 text-[10px] font-bold text-slate-400 hover:text-brand-primary disabled:opacity-30 transition-colors">↓</button>
                                                        <button type="button" onClick={() => removeSidebarCat(catId)}
                                                            className="px-2 py-1 text-[10px] font-bold text-red-400 hover:text-red-600 transition-colors ml-1">✕ Hapus</button>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Add new category picker */}
                                    <div className="flex items-center gap-3">
                                        <select
                                            id="sidebar-cat-add"
                                            className="flex-1 bg-slate-50 border border-slate-200 rounded-[0.25rem] p-3 text-sm focus:ring-1 focus:ring-brand-primary outline-none"
                                            defaultValue=""
                                            onChange={e => { addSidebarCat(e.target.value); e.target.value = ''; }}
                                        >
                                            <option value="">+ Pilih kategori untuk ditambahkan...</option>
                                            {beritaCategories
                                                .filter(c => !sidebarCats.includes(c.id))
                                                .map(c => (
                                                    <option key={c.id} value={c.id}>{c.name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>

                                {/* Section 3: Visi & Misi */}
                                <div className="border-t border-slate-100 pt-6 space-y-6">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="h-[2px] w-5 bg-brand-primary"></span>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Visi &amp; Misi Unit</span>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                            <SparklesIcon className="h-3 w-3 text-brand-primary" /> Visi Unit
                                        </label>
                                        <textarea 
                                            className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-4 text-sm focus:ring-1 focus:ring-brand-primary outline-none min-h-[80px]"
                                            value={data.visi}
                                            onChange={e => setData('visi', e.target.value)}
                                        ></textarea>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Misi Unit</label>
                                        <textarea 
                                            className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-4 text-sm focus:ring-1 focus:ring-brand-primary outline-none min-h-[150px]"
                                            value={data.misi}
                                            onChange={e => setData('misi', e.target.value)}
                                            placeholder="Gunakan baris baru untuk setiap poin misi..."
                                        ></textarea>
                                    </div>
                                </div>

                            </div>
                        </div>
                    )}

                    {/* Tab 3: Identitas Visual */}
                    {activeTab === 'visual' && (
                        <div className="space-y-8 animate-fade-in">
                            <div className="bg-white border border-slate-200 rounded-[0.25rem] p-8 space-y-8">
                                
                                {/* Gambar & Ikon Visual */}
                                <div>
                                    <div className="flex items-center gap-2 mb-6">
                                        <span className="h-[2px] w-5 bg-brand-primary"></span>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Gambar &amp; Ikon Visual</span>
                                    </div>
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                                        {/* Desktop Banner */}
                                        <div className="space-y-4">
                                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                                Hero Banner Desktop (Lanskap 21:9)
                                            </label>
                                            <div className="relative aspect-video bg-slate-100 rounded overflow-hidden border-2 border-dashed border-slate-200 group">
                                                {imagePreview ? (
                                                    <img src={imagePreview} className="w-full h-full object-cover" alt="Desktop Preview" />
                                                ) : (
                                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300">
                                                        <PhotoIcon className="h-10 w-10 mb-2" />
                                                        <span className="text-[10px] font-bold uppercase tracking-widest">Pilih Lanskap Banner</span>
                                                    </div>
                                                )}
                                                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <span className="text-white text-[10px] font-bold uppercase tracking-[0.2em] border border-white/40 px-4 py-2">Ganti Gambar</span>
                                                </div>
                                                <ImageInputWithCrop 
                                                    className="absolute inset-0 z-10"
                                                    aspectRatio={21/9}
                                                    title="Potong Hero Banner Desktop"
                                                    onChange={(file) => {
                                                        setData('image', file);
                                                        if (file) setImagePreview(URL.createObjectURL(file));
                                                    }}
                                                />
                                            </div>
                                            {errors.image && (
                                                <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider">{errors.image}</p>
                                            )}
                                            <p className="text-[9px] text-slate-400 uppercase tracking-widest italic leading-relaxed">
                                                Digunakan sebagai latar belakang utama pada resolusi layar monitor/laptop.
                                            </p>
                                        </div>

                                        {/* Mobile Banner */}
                                        <div className="space-y-4">
                                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                                Hero Banner Mobile (Potret 3:4)
                                            </label>
                                            <div className="relative aspect-[3/4] max-w-[200px] bg-slate-100 rounded overflow-hidden border-2 border-dashed border-slate-200 group">
                                                {imageMobilePreview ? (
                                                    <img src={imageMobilePreview} className="w-full h-full object-cover" alt="Mobile Preview" />
                                                ) : (
                                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300">
                                                        <PhotoIcon className="h-10 w-10 mb-2" />
                                                        <span className="text-[10px] font-bold uppercase tracking-widest">Pilih Potret Banner</span>
                                                    </div>
                                                )}
                                                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <span className="text-white text-[10px] font-bold uppercase tracking-[0.2em] border border-white/40 px-4 py-2">Ganti Gambar</span>
                                                </div>
                                                <ImageInputWithCrop 
                                                    className="absolute inset-0 z-10"
                                                    aspectRatio={3/4}
                                                    title="Potong Hero Banner Mobile"
                                                    onChange={(file) => {
                                                        setData('image_mobile', file);
                                                        if (file) setImageMobilePreview(URL.createObjectURL(file));
                                                    }}
                                                />
                                            </div>
                                            {errors.image_mobile && (
                                                <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider">{errors.image_mobile}</p>
                                            )}
                                            <p className="text-[9px] text-slate-400 uppercase tracking-widest italic leading-relaxed">
                                                Digunakan sebagai latar belakang utama khusus pada tampilan HP/ponsel pintar.
                                            </p>
                                        </div>

                                        {/* Ikon Logo */}
                                        <div className="space-y-4">
                                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                                Ikon Logo Unit (Rasio 1:1)
                                            </label>
                                            <div className="relative w-40 h-40 bg-slate-100 rounded-xl overflow-hidden border-2 border-dashed border-slate-200 group">
                                                {iconPreview ? (
                                                    <img src={iconPreview} className="w-full h-full object-contain p-4" alt="Icon Preview" />
                                                ) : (
                                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300">
                                                        <BuildingLibraryIcon className="h-10 w-10 mb-2" />
                                                        <span className="text-[8px] font-bold uppercase tracking-widest">Pilih Ikon</span>
                                                    </div>
                                                )}
                                                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <span className="text-white text-[8px] font-bold uppercase tracking-[0.2em]">Ganti</span>
                                                </div>
                                                <ImageInputWithCrop 
                                                    className="absolute inset-0 z-10"
                                                    aspectRatio={1}
                                                    title="Potong Ikon/Logo Unit"
                                                    onChange={(file) => {
                                                        setData('ikon', file);
                                                        if (file) setIconPreview(URL.createObjectURL(file));
                                                    }}
                                                />
                                            </div>
                                            {errors.ikon && (
                                                <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider">{errors.ikon}</p>
                                            )}
                                            <p className="text-[9px] text-slate-400 uppercase tracking-widest italic leading-relaxed">
                                                Direkomendasikan format PNG transparan berukuran 1:1 untuk hasil terbaik.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="border-t border-slate-100 pt-6">
                                    <div className="flex items-center gap-2 mb-6">
                                        <span className="h-[2px] w-5 bg-brand-primary"></span>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Informasi Teks &amp; Statistik</span>
                                    </div>
                                    <div className="mb-6">
                                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Badge Tagline Hero (Di atas Judul Unit)</label>
                                        <input
                                            type="text"
                                            className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-4 text-sm focus:ring-1 focus:ring-brand-primary outline-none"
                                            value={data.hero_badge}
                                            onChange={e => setData('hero_badge', e.target.value)}
                                            placeholder="Contoh: Unit Pendidikan Formal"
                                        />
                                        {errors.hero_badge && (
                                            <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider mt-2">{errors.hero_badge}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Ringkasan & Running Text */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Ringkasan Singkat (Summary)</label>
                                        <textarea 
                                            className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-4 text-sm focus:ring-1 focus:ring-brand-primary outline-none min-h-[80px]"
                                            value={data.summary}
                                            onChange={e => setData('summary', e.target.value)}
                                            placeholder="Muncul di kartu tingkat pendidikan..."
                                        ></textarea>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Narasi Beranda (Running Text)</label>
                                        <textarea 
                                            className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-4 text-sm focus:ring-1 focus:ring-brand-primary outline-none min-h-[80px]"
                                            value={data.running_text}
                                            onChange={e => setData('running_text', e.target.value)}
                                            placeholder="Kalimat yang berjalan di bawah statistik..."
                                        ></textarea>
                                    </div>
                                </div>

                                {/* Statistik Unit */}
                                <div>
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="h-[2px] w-5 bg-brand-primary"></span>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Statistik Unit (Ditampilkan di Kartu Angka)</span>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div>
                                            <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">Jumlah Siswa</label>
                                            <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-3 text-sm focus:ring-1 focus:ring-brand-primary outline-none" value={data.jumlah_siswa} onChange={e => setData('jumlah_siswa', e.target.value)} placeholder="320+" />
                                        </div>
                                        <div>
                                            <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">Tenaga Pendidik</label>
                                            <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-3 text-sm focus:ring-1 focus:ring-brand-primary outline-none" value={data.jumlah_pengajar} onChange={e => setData('jumlah_pengajar', e.target.value)} placeholder="24" />
                                        </div>
                                        <div>
                                            <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">Fasilitas Unggulan</label>
                                            <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-3 text-sm focus:ring-1 focus:ring-brand-primary outline-none" value={data.jumlah_fasilitas} onChange={e => setData('jumlah_fasilitas', e.target.value)} placeholder="10+" />
                                        </div>
                                        <div>
                                            <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">Akreditasi</label>
                                            <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-3 text-sm focus:ring-1 focus:ring-brand-primary outline-none" value={data.akreditasi} onChange={e => setData('akreditasi', e.target.value)} placeholder="A" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Tab: Keunggulan */}
                    {activeTab === 'keunggulan' && (
                        <div className="space-y-8 animate-fade-in">
                            <div className="bg-white border border-slate-200 rounded-[0.25rem] p-8 space-y-8">
                                
                                {/* Section Titles Config */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-2 mb-2 border-b border-slate-100 pb-4">
                                        <span className="h-[2px] w-5 bg-brand-primary"></span>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pengaturan Judul Section</span>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div>
                                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Judul Program &amp; Keunggulan</label>
                                            <input
                                                type="text"
                                                value={data.program_title}
                                                onChange={e => setData('program_title', e.target.value)}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-4 text-sm focus:ring-1 focus:ring-brand-primary outline-none"
                                                placeholder="Program &amp; Keunggulan"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Judul Adab &amp; Kompetensi</label>
                                            <input
                                                type="text"
                                                value={data.adab_title}
                                                onChange={e => setData('adab_title', e.target.value)}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-4 text-sm focus:ring-1 focus:ring-brand-primary outline-none"
                                                placeholder="Adab &amp; Kompetensi"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Judul Struktur Pendidikan</label>
                                            <input
                                                type="text"
                                                value={data.struktur_title}
                                                onChange={e => setData('struktur_title', e.target.value)}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-4 text-sm focus:ring-1 focus:ring-brand-primary outline-none"
                                                placeholder="Struktur Pendidikan"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Tag Program Unggulan */}
                                <div className="border-t border-slate-100 pt-6">
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Tag Program Unggulan</label>
                                    <input 
                                        type="text" 
                                        className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-4 text-sm focus:ring-1 focus:ring-brand-primary outline-none"
                                        value={data.program_tags}
                                        onChange={e => setData('program_tags', e.target.value)}
                                        placeholder="Kurikulum Merdeka|Tahfidz Juz 30|Adab & Akhlak|Full Day School"
                                    />
                                    <p className="mt-2 text-[9px] text-slate-400 italic">Pisahkan setiap tag dengan tanda | (pipe). Contoh: Kurikulum Merdeka|Tahfidz|Bilingual</p>
                                </div>

                                {/* Struktur Pendidikan / Kurikulum */}
                                <div className="border-t border-slate-100 pt-6">
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Struktur Pendidikan &amp; Kurikulum</label>
                                    <textarea 
                                        className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-4 text-sm focus:ring-1 focus:ring-brand-primary outline-none min-h-[150px]"
                                        value={data.struktur_pendidikan}
                                        onChange={e => setData('struktur_pendidikan', e.target.value)}
                                        placeholder="Tuliskan detail kurikulum atau program pendidikan di sini..."
                                    ></textarea>
                                </div>

                                {/* Keunggulan Unit (CRUD Cards) */}
                                <div className="border-t border-slate-100 pt-6 space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <StarIcon className="h-4 w-4 text-brand-primary" />
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Daftar Keunggulan Unit (Cards)</span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={handleAddKeunggulanCard}
                                            className="bg-brand-primary text-white text-[9px] font-bold uppercase tracking-widest px-4 py-2 rounded-[0.25rem] hover:bg-slate-900 transition-colors"
                                        >
                                            + Tambah Card Keunggulan
                                        </button>
                                    </div>

                                    <div className="space-y-4">
                                        {keunggulanCards.length === 0 ? (
                                            <p className="text-xs text-slate-400 italic">Belum ada card keunggulan. Klik "+ Tambah Card Keunggulan" untuk menambahkan.</p>
                                        ) : (
                                            keunggulanCards.map((card, idx) => (
                                                <div key={idx} className="flex gap-4 p-5 bg-slate-50 border border-slate-200 rounded-[0.25rem] relative group">
                                                    <div className="text-lg font-serif font-bold text-brand-primary/40 mt-1">
                                                        {String(idx + 1).padStart(2, '0')}
                                                    </div>
                                                    <div className="flex-1 space-y-3">
                                                        <div>
                                                            <label className="block text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1">Judul Card</label>
                                                            <input
                                                                type="text"
                                                                value={card.title}
                                                                onChange={e => handleUpdateKeunggulanCard(idx, 'title', e.target.value)}
                                                                className="w-full bg-white border border-slate-200 rounded-[0.25rem] p-3 text-xs focus:ring-1 focus:ring-brand-primary outline-none"
                                                                placeholder="Contoh: Gedung Milik Sendiri"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1">Deskripsi Card</label>
                                                            <textarea
                                                                rows="2"
                                                                value={card.desc || ''}
                                                                onChange={e => handleUpdateKeunggulanCard(idx, 'desc', e.target.value)}
                                                                className="w-full bg-white border border-slate-200 rounded-[0.25rem] p-3 text-xs focus:ring-1 focus:ring-brand-primary outline-none"
                                                                placeholder="Contoh: Layanan pendidikan terbaik untuk masa depan santri."
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col items-center justify-between">
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveKeunggulanCard(idx)}
                                                            className="p-2 text-red-400 hover:text-red-600 transition-colors"
                                                            title="Hapus Card"
                                                        >
                                                            <TrashIcon className="h-4 w-4" />
                                                        </button>
                                                        <div className="flex flex-col gap-1">
                                                            <button
                                                                type="button"
                                                                onClick={() => handleMoveKeunggulanCard(idx, -1)}
                                                                disabled={idx === 0}
                                                                className="px-2 py-1 text-slate-400 hover:text-brand-primary disabled:opacity-30 text-[10px] font-bold"
                                                                title="Pindah ke Atas"
                                                            >
                                                                ↑
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => handleMoveKeunggulanCard(idx, 1)}
                                                                disabled={idx === keunggulanCards.length - 1}
                                                                className="px-2 py-1 text-slate-400 hover:text-brand-primary disabled:opacity-30 text-[10px] font-bold"
                                                                title="Pindah ke Bawah"
                                                            >
                                                                ↓
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>

                            </div>
                        </div>
                    )}

                    {/* Tab: Info PPDB */}
                    {activeTab === 'ppdb' && (
                        <div className="space-y-6 animate-fade-in">
                            <div>
                                <div className="bg-white border border-slate-200 rounded-[0.25rem] p-8 space-y-6">
                                    <div className="flex items-center gap-2 mb-2">
                                        <InformationCircleIcon className="h-4 w-4 text-brand-primary" />
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pengaturan PPDB Unit Ini</span>
                                    </div>

                                    {/* Toggle: Aktifkan PPDB */}
                                    <div className="flex items-center justify-between py-4 border-b border-slate-100">
                                        <div>
                                            <p className="text-sm font-bold text-slate-800">Tampilkan Section PPDB</p>
                                            <p className="text-[10px] text-slate-400 mt-0.5">Jika nonaktif, section PPDB tidak muncul di halaman unit</p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => ppdbForm.setData('is_active', !ppdbForm.data.is_active)}
                                            className={`w-12 h-6 rounded-full transition-colors duration-300 relative ${
                                                ppdbForm.data.is_active ? 'bg-brand-primary' : 'bg-slate-200'
                                            }`}
                                        >
                                            <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${
                                                ppdbForm.data.is_active ? 'left-7' : 'left-1'
                                            }`} />
                                        </button>
                                    </div>

                                    {/* Toggle: Status Buka/Tutup */}
                                    <div className="flex items-center justify-between py-4 border-b border-slate-100">
                                        <div>
                                            <p className="text-sm font-bold text-slate-800">Status Pendaftaran</p>
                                            <p className="text-[10px] text-slate-400 mt-0.5">Tampilkan status "Sedang Dibuka" atau "Sudah Ditutup"</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className={`text-[10px] font-bold uppercase tracking-widest ${
                                                ppdbForm.data.is_open ? 'text-emerald-500' : 'text-red-400'
                                            }`}>
                                                {ppdbForm.data.is_open ? 'Dibuka' : 'Ditutup'}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => ppdbForm.setData('is_open', !ppdbForm.data.is_open)}
                                                className={`w-12 h-6 rounded-full transition-colors duration-300 relative ${
                                                    ppdbForm.data.is_open ? 'bg-emerald-500' : 'bg-red-400'
                                                }`}
                                            >
                                                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${
                                                    ppdbForm.data.is_open ? 'left-7' : 'left-1'
                                                }`} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Toggle: Link Formulir Online */}
                                    <div className="flex items-center justify-between py-4 border-b border-slate-100">
                                        <div>
                                            <p className="text-sm font-bold text-slate-800">Formulir Online</p>
                                            <p className="text-[10px] text-slate-400 mt-0.5">Tampilkan atau sembunyikan tombol pendaftaran online</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className={`text-[10px] font-bold uppercase tracking-widest ${
                                                ppdbForm.data.is_link_active ? 'text-emerald-500' : 'text-red-400'
                                            }`}>
                                                {ppdbForm.data.is_link_active ? 'Aktif' : 'Non-Aktif'}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => ppdbForm.setData('is_link_active', !ppdbForm.data.is_link_active)}
                                                className={`w-12 h-6 rounded-full transition-colors duration-300 relative ${
                                                    ppdbForm.data.is_link_active ? 'bg-emerald-500' : 'bg-slate-200'
                                                }`}
                                            >
                                                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${
                                                    ppdbForm.data.is_link_active ? 'left-7' : 'left-1'
                                                }`} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Deskripsi */}
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Deskripsi PPDB</label>
                                        <textarea
                                            className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-4 text-sm focus:ring-1 focus:ring-brand-primary outline-none min-h-[120px]"
                                            value={ppdbForm.data.description}
                                            onChange={e => ppdbForm.setData('description', e.target.value)}
                                            placeholder="Deskripsi singkat tentang PPDB unit ini..."
                                        />
                                        {ppdbForm.errors.description && (
                                            <p className="text-[10px] text-red-500 italic mt-1">{ppdbForm.errors.description}</p>
                                        )}
                                    </div>

                                    {/* Link Formulir */}
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Link Formulir Online (Google Form dll)</label>
                                        <input
                                            type="text"
                                            className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-3 text-sm focus:ring-1 focus:ring-brand-primary outline-none"
                                            value={ppdbForm.data.registration_link}
                                            onChange={e => ppdbForm.setData('registration_link', e.target.value)}
                                            placeholder="https://forms.google.com/..."
                                        />
                                        {ppdbForm.errors.registration_link && (
                                            <p className="text-[10px] text-red-500 italic mt-1">{ppdbForm.errors.registration_link}</p>
                                        )}
                                    </div>

                                    <div className="pt-4 flex justify-end">
                                        <button
                                            type="button"
                                            onClick={submitPpdb}
                                            disabled={ppdbForm.processing}
                                            className="bg-brand-primary text-white py-4 px-12 text-[10px] font-bold uppercase tracking-[0.2em] rounded-[0.25rem] hover:bg-slate-900 transition-all shadow-xl shadow-brand-primary/20 flex items-center gap-3"
                                        >
                                            {ppdbForm.processing ? 'Menyimpan...' : <><CheckCircleIcon className="h-4 w-4" /> Simpan Info PPDB</>}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Card 2: Pengaturan Teks & Tampilan PPDB */}
                            <div className="bg-white border border-slate-200 rounded-[0.25rem] p-8 space-y-6">
                                <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
                                    <span className="h-[2px] w-5 bg-brand-primary"></span>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Kustomisasi Teks &amp; Tampilan PPDB</span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Tagline (Kecil di Atas)</label>
                                        <input
                                            type="text"
                                            value={data.ppdb_tagline}
                                            onChange={e => setData('ppdb_tagline', e.target.value)}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-4 text-sm focus:ring-1 focus:ring-brand-primary outline-none"
                                            placeholder="Penerimaan Peserta Didik Baru"
                                        />
                                        {errors.ppdb_tagline && (
                                            <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider mt-2">{errors.ppdb_tagline}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Judul Baris 1</label>
                                        <input
                                            type="text"
                                            value={data.ppdb_title}
                                            onChange={e => setData('ppdb_title', e.target.value)}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-4 text-sm focus:ring-1 focus:ring-brand-primary outline-none"
                                            placeholder="Bergabunglah Bersama"
                                        />
                                        {errors.ppdb_title && (
                                            <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider mt-2">{errors.ppdb_title}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Judul Baris 2 (Hijau)</label>
                                        <input
                                            type="text"
                                            value={data.ppdb_subtitle}
                                            onChange={e => setData('ppdb_subtitle', e.target.value)}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-4 text-sm focus:ring-1 focus:ring-brand-primary outline-none"
                                            placeholder={lembaga.nama}
                                        />
                                        {errors.ppdb_subtitle && (
                                            <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider mt-2">{errors.ppdb_subtitle}</p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Checklist Keunggulan PPDB (Satu per baris)</label>
                                    <textarea
                                        rows="4"
                                        value={data.ppdb_points}
                                        onChange={e => setData('ppdb_points', e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-4 text-sm focus:ring-1 focus:ring-brand-primary outline-none"
                                        placeholder="Gedung Milik Sendiri&#10;Tenaga Pendidik Lulusan S1&#10;Lingkungan Aman &amp; Nyaman&#10;Program Tahfidz Intensif"
                                    />
                                    {errors.ppdb_points && (
                                        <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider mt-2">{errors.ppdb_points}</p>
                                    )}
                                    <p className="text-[9px] text-slate-400 italic mt-1">Satu baris mewakili satu checklist keunggulan di section PPDB. Maksimal 4 baris direkomendasikan.</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100/70">
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Judul Card Bottom CTA</label>
                                        <input
                                            type="text"
                                            value={data.ppdb_bottom_title}
                                            onChange={e => setData('ppdb_bottom_title', e.target.value)}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-4 text-sm focus:ring-1 focus:ring-brand-primary outline-none"
                                            placeholder="Mulai Perjalanan Pendidikan di..."
                                        />
                                        {errors.ppdb_bottom_title && (
                                            <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider mt-2">{errors.ppdb_bottom_title}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Subjudul Card Bottom CTA</label>
                                        <input
                                            type="text"
                                            value={data.ppdb_bottom_subtitle}
                                            onChange={e => setData('ppdb_bottom_subtitle', e.target.value)}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-4 text-sm focus:ring-1 focus:ring-brand-primary outline-none"
                                            placeholder="Pendaftaran Peserta Didik Baru."
                                        />
                                        {errors.ppdb_bottom_subtitle && (
                                            <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider mt-2">{errors.ppdb_bottom_subtitle}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex justify-end pt-4 border-t border-slate-100/70">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-brand-primary text-white py-2 px-6 text-[9px] font-bold uppercase tracking-widest rounded-[0.25rem] hover:bg-slate-900 transition-colors flex items-center gap-2"
                                    >
                                        {processing ? 'Menyimpan...' : 'Simpan Kustomisasi Teks PPDB'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Tab 5: Tenaga Pendidik */}
                    {activeTab === 'pengajar' && (
                        <div className="space-y-8 animate-fade-in">
                            
                            {/* Section Header Settings */}
                            <div className="bg-white border border-slate-200 rounded-[0.25rem] p-8 space-y-6">
                                <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
                                    <span className="h-[2px] w-5 bg-brand-primary"></span>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pengaturan Judul &amp; Tagline Section</span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Tagline (Kecil di Atas)</label>
                                        <input
                                            type="text"
                                            value={data.tenaga_pendidik_tagline}
                                            onChange={e => setData('tenaga_pendidik_tagline', e.target.value)}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-4 text-sm focus:ring-1 focus:ring-brand-primary outline-none"
                                            placeholder="Contoh: Tenaga Pendidik"
                                        />
                                        {errors.tenaga_pendidik_tagline && (
                                            <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider mt-2">{errors.tenaga_pendidik_tagline}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Judul Baris 1</label>
                                        <input
                                            type="text"
                                            value={data.tenaga_pendidik_title}
                                            onChange={e => setData('tenaga_pendidik_title', e.target.value)}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-4 text-sm focus:ring-1 focus:ring-brand-primary outline-none"
                                            placeholder="Contoh: Mengenal Para"
                                        />
                                        {errors.tenaga_pendidik_title && (
                                            <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider mt-2">{errors.tenaga_pendidik_title}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Judul Baris 2 (Highlight Hijau)</label>
                                        <input
                                            type="text"
                                            value={data.tenaga_pendidik_subtitle}
                                            onChange={e => setData('tenaga_pendidik_subtitle', e.target.value)}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-4 text-sm focus:ring-1 focus:ring-brand-primary outline-none"
                                            placeholder="Contoh: Asatidzah Kami"
                                        />
                                        {errors.tenaga_pendidik_subtitle && (
                                            <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider mt-2">{errors.tenaga_pendidik_subtitle}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white border border-slate-200 rounded-[0.25rem] overflow-hidden">
                                <div className="px-8 py-6 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <UserGroupIcon className="h-5 w-5 text-brand-primary" />
                                        <h3 className="font-bold text-slate-900 uppercase tracking-widest text-xs">Manajemen Tenaga Pendidik</h3>
                                    </div>
                                    <button 
                                        type="button"
                                        onClick={openAddPengajar}
                                        className="text-[10px] font-bold uppercase tracking-widest text-brand-primary hover:text-slate-900 transition-colors flex items-center gap-2"
                                    >
                                        Tambah Pengajar <ArrowRightIcon className="h-3 w-3" />
                                    </button>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-slate-50 border-b border-slate-100">
                                                <th className="px-6 py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest w-10">No</th>
                                                <th className="px-4 py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest w-14">Foto</th>
                                                <th className="px-4 py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest">Nama</th>
                                                <th className="px-4 py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest">Jabatan / Mapel</th>
                                                <th className="px-4 py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest text-right w-24">Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {pengajars.length === 0 ? (
                                                <tr>
                                                    <td colSpan={5} className="px-6 py-16 text-center text-slate-300 text-[10px] font-bold uppercase tracking-widest border-2 border-dashed border-slate-100 rounded m-4">
                                                        Belum ada data tenaga pendidik.
                                                    </td>
                                                </tr>
                                            ) : pengajars.map((p, idx) => (
                                                <tr key={p.id} className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors group">
                                                    <td className="px-6 py-3 text-[10px] font-bold text-slate-300">{idx + 1}</td>
                                                    <td className="px-4 py-3">
                                                        <div className="w-9 h-9 rounded-full bg-slate-100 overflow-hidden">
                                                            {p.image_url
                                                                ? <img src={p.image_url} className="w-full h-full object-cover" alt={p.nama} />
                                                                : <div className="w-full h-full flex items-center justify-center text-slate-300 text-[10px] font-bold">{p.nama?.charAt(0)}</div>
                                                            }
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3 text-[11px] font-bold text-slate-900 uppercase tracking-tight">{p.nama}</td>
                                                    <td className="px-4 py-3 text-[10px] text-slate-400 uppercase tracking-widest">{p.jabatan}</td>
                                                    <td className="px-4 py-3 text-right">
                                                        <div className="flex items-center justify-end gap-1">
                                                            <button type="button" onClick={() => openEditPengajar(p)} className="p-1.5 text-slate-400 hover:text-brand-primary transition-colors" title="Edit">
                                                                <PencilSquareIcon className="h-4 w-4" />
                                                            </button>
                                                            <button type="button" onClick={() => deletePengajar(p.id)} className="p-1.5 text-slate-400 hover:text-red-500 transition-colors" title="Hapus">
                                                                <TrashIcon className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Tab 7: Fasilitas Unit */}
                    {activeTab === 'fasilitas' && (
                        <div className="space-y-8 animate-fade-in">
                            <div className="bg-white border border-slate-200 rounded-[0.25rem] overflow-hidden">
                                <div className="px-8 py-6 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <BuildingLibraryIcon className="h-5 w-5 text-brand-primary" />
                                        <h3 className="font-bold text-slate-900 uppercase tracking-widest text-xs">Manajemen Fasilitas Unit</h3>
                                    </div>
                                    <button 
                                        type="button"
                                        onClick={openAddFasilitas}
                                        className="text-[10px] font-bold uppercase tracking-widest text-brand-primary hover:text-slate-900 transition-colors flex items-center gap-2"
                                    >
                                        Tambah Fasilitas <ArrowRightIcon className="h-3 w-3" />
                                    </button>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-slate-50 border-b border-slate-100">
                                                <th className="px-6 py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest w-10">No</th>
                                                <th className="px-4 py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest w-24">Gambar</th>
                                                <th className="px-4 py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest">Nama Fasilitas</th>
                                                <th className="px-4 py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest">Kategori</th>
                                                <th className="px-4 py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest">Galeri Foto</th>
                                                <th className="px-4 py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest">Deskripsi</th>
                                                <th className="px-4 py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest text-right w-24">Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {fasilitas.length === 0 ? (
                                                <tr>
                                                    <td colSpan={7} className="px-6 py-16 text-center text-slate-300 text-[10px] font-bold uppercase tracking-widest border-2 border-dashed border-slate-100 rounded m-4">
                                                        Belum ada data fasilitas unit.
                                                    </td>
                                                </tr>
                                            ) : fasilitas.map((f, idx) => (
                                                <tr key={f.id} className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors group">
                                                    <td className="px-6 py-3 text-[10px] font-bold text-slate-300">{idx + 1}</td>
                                                    <td className="px-4 py-3">
                                                        <div className="w-16 h-12 rounded bg-slate-100 overflow-hidden relative border border-slate-200">
                                                            <img 
                                                                src={f.image_url || `https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600&sig=${idx}`} 
                                                                className="w-full h-full object-cover" 
                                                                alt={f.nama} 
                                                            />
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3 text-[11px] font-bold text-slate-900 uppercase tracking-tight">{f.nama}</td>
                                                    <td className="px-4 py-3">
                                                        <span className="bg-slate-100 text-slate-600 text-[8px] font-bold uppercase tracking-wider px-2 py-1 rounded">
                                                            {f.kategori || 'Fasilitas'}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <div className="flex items-center gap-2">
                                                            <button 
                                                                type="button" 
                                                                onClick={() => openManageGaleri(f)} 
                                                                className="bg-brand-primary/5 hover:bg-brand-primary text-brand-primary hover:text-white px-2.5 py-1.5 rounded text-[8px] font-bold uppercase tracking-wider flex items-center gap-1 transition-all"
                                                            >
                                                                <PhotoIcon className="h-3 w-3" />
                                                                <span>Kelola ({f.galeris?.length || 0})</span>
                                                            </button>
                                                            {f.galeris && f.galeris.length > 0 && (
                                                                <div className="flex -space-x-1.5 overflow-hidden">
                                                                    {f.galeris.slice(0, 3).map((img, i) => (
                                                                        <img 
                                                                            key={img.id || i}
                                                                            className="inline-block h-5 w-5 rounded-full ring-1 ring-white object-cover" 
                                                                            src={img.image_url} 
                                                                            alt="Gallery thumb" 
                                                                        />
                                                                    ))}
                                                                    {f.galeris.length > 3 && (
                                                                        <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-slate-100 text-[7px] font-bold text-slate-500 ring-1 ring-white">
                                                                            +{f.galeris.length - 3}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3 text-[11px] text-slate-400 leading-relaxed max-w-xs truncate italic">"{f.deskripsi}"</td>
                                                    <td className="px-4 py-3 text-right">
                                                        <div className="flex items-center justify-end gap-1">
                                                            <button type="button" onClick={() => openEditFasilitas(f)} className="p-1.5 text-slate-400 hover:text-brand-primary transition-colors" title="Edit">
                                                                <PencilSquareIcon className="h-4 w-4" />
                                                            </button>
                                                            <button type="button" onClick={() => deleteFasilitas(f.id)} className="p-1.5 text-slate-400 hover:text-red-500 transition-colors" title="Hapus">
                                                                <TrashIcon className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Tab 8: Galeri Unit */}
                    {activeTab === 'galeri' && (
                        <div className="space-y-8 animate-fade-in">
                            
                            {/* Section Header & News Filter Settings */}
                            <div className="bg-white border border-slate-200 rounded-[0.25rem] p-8 space-y-6">
                                <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
                                    <span className="h-[2px] w-5 bg-brand-primary"></span>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pengaturan Judul &amp; Filter Berita Beranda</span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Judul Section Galeri</label>
                                        <input
                                            type="text"
                                            value={data.galeri_title}
                                            onChange={e => setData('galeri_title', e.target.value)}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-4 text-sm focus:ring-1 focus:ring-brand-primary outline-none"
                                            placeholder="Contoh: Galeri Unit"
                                        />
                                        {errors.galeri_title && (
                                            <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider mt-2">{errors.galeri_title}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Judul Section Berita</label>
                                        <input
                                            type="text"
                                            value={data.berita_title}
                                            onChange={e => setData('berita_title', e.target.value)}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-4 text-sm focus:ring-1 focus:ring-brand-primary outline-none"
                                            placeholder="Contoh: Berita &amp; Kegiatan Unit"
                                        />
                                        {errors.berita_title && (
                                            <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider mt-2">{errors.berita_title}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Kategori Berita Beranda</label>
                                        <select
                                            value={data.berita_section_category_id}
                                            onChange={e => setData('berita_section_category_id', e.target.value)}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-4 text-sm focus:ring-1 focus:ring-brand-primary outline-none"
                                        >
                                            <option value="">Semua Kategori (Tanpa Filter)</option>
                                            {beritaCategories.map(c => (
                                                <option key={c.id} value={c.id}>{c.name}</option>
                                            ))}
                                        </select>
                                        {errors.berita_section_category_id && (
                                            <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider mt-2">{errors.berita_section_category_id}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex justify-end pt-4 border-t border-slate-100/70">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-brand-primary text-white py-2 px-6 text-[9px] font-bold uppercase tracking-widest rounded-[0.25rem] hover:bg-slate-900 transition-colors flex items-center gap-2"
                                    >
                                        {processing ? 'Menyimpan...' : 'Simpan Pengaturan'}
                                    </button>
                                </div>
                            </div>

                            <div className="bg-white border border-slate-200 rounded-[0.25rem] overflow-hidden">
                                <div className="px-8 py-6 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <RectangleStackIcon className="h-5 w-5 text-brand-primary" />
                                        <h3 className="font-bold text-slate-900 uppercase tracking-widest text-xs">Manajemen Galeri Unit</h3>
                                    </div>
                                    <button 
                                        type="button"
                                        onClick={openAddGaleri}
                                        className="text-[10px] font-bold uppercase tracking-widest text-brand-primary hover:text-slate-900 transition-colors flex items-center gap-2"
                                    >
                                        Tambah Foto Galeri <ArrowRightIcon className="h-3 w-3" />
                                    </button>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-slate-50 border-b border-slate-100">
                                                <th className="px-6 py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest w-10">No</th>
                                                <th className="px-4 py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest w-24">Foto</th>
                                                <th className="px-4 py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest">Judul</th>
                                                <th className="px-4 py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest">Keterangan / Deskripsi</th>
                                                <th className="px-4 py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest text-right w-24">Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {galeris.length === 0 ? (
                                                <tr>
                                                    <td colSpan={5} className="px-6 py-16 text-center text-slate-300 text-[10px] font-bold uppercase tracking-widest border-2 border-dashed border-slate-100 rounded m-4">
                                                        Belum ada foto galeri unit.
                                                    </td>
                                                </tr>
                                            ) : galeris.map((g, idx) => (
                                                <tr key={g.id} className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors group">
                                                    <td className="px-6 py-3 text-[10px] font-bold text-slate-300">{idx + 1}</td>
                                                    <td className="px-4 py-3">
                                                        <div className="w-16 h-12 rounded bg-slate-100 overflow-hidden relative border border-slate-200">
                                                            <img 
                                                                src={g.image_url} 
                                                                className="w-full h-full object-cover" 
                                                                alt={g.judul} 
                                                            />
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3 text-[11px] font-bold text-slate-900 uppercase tracking-tight">{g.judul}</td>
                                                    <td className="px-4 py-3 text-[11px] text-slate-400 leading-relaxed max-w-sm truncate italic">
                                                        {g.deskripsi || '-'}
                                                    </td>
                                                    <td className="px-4 py-3 text-right">
                                                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <button type="button" onClick={() => openEditGaleri(g)} className="p-1.5 text-slate-400 hover:text-brand-primary transition-colors" title="Edit">
                                                                <PencilSquareIcon className="h-4 w-4" />
                                                            </button>
                                                            <button type="button" onClick={() => deleteGaleri(g.id)} className="p-1.5 text-slate-400 hover:text-red-500 transition-colors" title="Hapus">
                                                                <TrashIcon className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Floating Submit Button (Only for form tabs) */}
                    {activeTab !== 'pengajar' && activeTab !== 'fasilitas' && activeTab !== 'galeri' && (
                        <div className="mt-8 flex justify-end">
                            <button 
                                type="submit" 
                                disabled={processing}
                                className="bg-brand-primary text-white py-4 px-12 text-[10px] font-bold uppercase tracking-[0.2em] rounded-[0.25rem] hover:bg-slate-900 transition-all shadow-xl shadow-brand-primary/20 flex items-center gap-3"
                            >
                                {processing ? 'Sedang Menyimpan...' : (
                                    <>Simpan Perubahan {tabs.find(t => t.id === activeTab)?.name} <CheckCircleIcon className="h-4 w-4" /></>
                                )}
                            </button>
                        </div>
                    )}
                </form>

                {/* --- MODAL PENGAJAR --- */}
                {isPengajarModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                        <div className="bg-white w-full max-w-md rounded-[0.25rem] shadow-2xl overflow-hidden">
                            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                                <h3 className="font-bold uppercase tracking-widest text-slate-900 text-xs">{editingPengajar ? 'Edit Data Pengajar' : 'Tambah Pengajar Baru'}</h3>
                                <button onClick={() => setIsPengajarModalOpen(false)} className="text-slate-400 hover:text-slate-900 text-2xl leading-none">&times;</button>
                            </div>
                            <form onSubmit={submitPengajar} className="p-8 space-y-6">
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Nama Lengkap</label>
                                    <input 
                                        type="text" 
                                        className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-3 text-sm focus:ring-1 focus:ring-brand-primary outline-none"
                                        value={pengajarForm.data.nama}
                                        onChange={e => pengajarForm.setData('nama', e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Jabatan / Guru Mapel</label>
                                    <input 
                                        type="text" 
                                        className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-3 text-sm focus:ring-1 focus:ring-brand-primary outline-none"
                                        value={pengajarForm.data.jabatan}
                                        onChange={e => pengajarForm.setData('jabatan', e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Foto Profile (1:1)</label>
                                    <div className="relative aspect-square w-32 mx-auto bg-slate-100 rounded overflow-hidden border-2 border-dashed border-slate-200 group">
                                        {pengajarPreview ? (
                                            <img src={pengajarPreview} className="w-full h-full object-cover" alt="Preview" />
                                        ) : (
                                            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300">
                                                <PhotoIcon className="h-8 w-8 mb-2" />
                                                <span className="text-[8px] font-bold uppercase tracking-widest">Pilih Foto</span>
                                            </div>
                                        )}
                                        <ImageInputWithCrop 
                                            className="absolute inset-0 z-10"
                                            aspectRatio={3/4}
                                            title="Potong Foto Pengajar"
                                            onChange={(file) => {
                                                pengajarForm.setData('image', file);
                                                if (file) setPengajarPreview(URL.createObjectURL(file));
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="pt-6 border-t border-slate-100 flex justify-end gap-3">
                                    <button type="button" onClick={() => setIsPengajarModalOpen(false)} className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors">Batal</button>
                                    <button 
                                        type="submit" 
                                        disabled={pengajarForm.processing}
                                        className="bg-brand-primary text-white py-3 px-8 text-[10px] font-bold uppercase tracking-widest rounded-[0.25rem] hover:bg-slate-900 transition-all"
                                    >
                                        {pengajarForm.processing ? 'Menyimpan...' : 'Simpan Data'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* --- MODAL UNIFIED FASILITAS & GALERI --- */}
                {isFasilitasModalOpen && (() => {
                    const isEditing = !!editingFasilitas;
                    const activeFasilitas = isEditing 
                        ? (fasilitas.find(item => item.id === editingFasilitas.id) || editingFasilitas) 
                        : null;
                    const activePhotos = activeFasilitas ? (activeFasilitas.galeris || []) : [];

                    return (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
                            <div className={`bg-white w-full ${isEditing ? 'max-w-5xl' : 'max-w-md'} rounded-[0.25rem] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]`}>
                                
                                {/* Header */}
                                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                                    <div>
                                        <span className="text-[8px] font-black text-brand-primary uppercase tracking-[0.2em]">
                                            {isEditing ? 'Kelola Unit & Dokumentasi' : 'Manajemen Fasilitas'}
                                        </span>
                                        <h3 className="font-bold uppercase tracking-tight text-slate-900 text-sm mt-0.5">
                                            {isEditing ? `Edit Fasilitas: ${activeFasilitas.nama}` : 'Tambah Fasilitas Baru'}
                                        </h3>
                                    </div>
                                    <button 
                                        onClick={closeFasilitasModal} 
                                        className="text-slate-400 hover:text-slate-900 text-2xl leading-none"
                                    >
                                        &times;
                                    </button>
                                </div>

                                {/* Content Body */}
                                <div className="flex-1 overflow-y-auto min-h-0">
                                    <div className={`grid grid-cols-1 ${isEditing ? 'md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-slate-100' : ''}`}>
                                        
                                        {/* LEFT COLUMN: BASIC DATA & MAIN IMAGE */}
                                        <div className={`${isEditing ? 'md:col-span-6 p-8' : 'p-8'} space-y-6`}>
                                            <form onSubmit={submitFasilitas} className="space-y-5">
                                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">
                                                    Informasi Utama & Gambar Sampul
                                                </h4>
                                                
                                                <div>
                                                    <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Nama Fasilitas</label>
                                                    <input 
                                                        type="text" 
                                                        className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-2.5 text-xs focus:ring-1 focus:ring-brand-primary outline-none"
                                                        value={fasilitasForm.data.nama}
                                                        onChange={e => fasilitasForm.setData('nama', e.target.value)}
                                                        required
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Kategori Fasilitas</label>
                                                    <input 
                                                        type="text" 
                                                        className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-2.5 text-xs focus:ring-1 focus:ring-brand-primary outline-none"
                                                        value={fasilitasForm.data.kategori}
                                                        onChange={e => fasilitasForm.setData('kategori', e.target.value)}
                                                        placeholder="Contoh: Gedung, Laboratorium, Lapangan"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Deskripsi Fasilitas</label>
                                                    <textarea 
                                                        className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-2.5 text-xs focus:ring-1 focus:ring-brand-primary outline-none min-h-[60px]"
                                                        value={fasilitasForm.data.deskripsi}
                                                        onChange={e => fasilitasForm.setData('deskripsi', e.target.value)}
                                                        placeholder="Deskripsi singkat..."
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">Gambar Sampul Utama (16:10 / 4:3)</label>
                                                    <div className="relative aspect-[16/10] w-full bg-slate-50 rounded overflow-hidden border border-dashed border-slate-200 group hover:border-brand-primary transition-colors">
                                                        {fasilitasPreview ? (
                                                            <img src={fasilitasPreview} className="w-full h-full object-cover" alt="Preview" />
                                                        ) : (
                                                            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300">
                                                                <PhotoIcon className="h-8 w-8 mb-1" />
                                                                <span className="text-[8px] font-bold uppercase tracking-widest">Pilih Gambar</span>
                                                            </div>
                                                        )}
                                                        <ImageInputWithCrop 
                                                            className="absolute inset-0 z-10"
                                                            aspectRatio={4/3}
                                                            title="Potong Gambar Fasilitas"
                                                            onChange={(file) => {
                                                                fasilitasForm.setData('image', file);
                                                                if (file) setFasilitasPreview(URL.createObjectURL(file));
                                                            }}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
                                                    <button 
                                                        type="button" 
                                                        onClick={closeFasilitasModal} 
                                                        className="px-4 py-2.5 text-[9px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors"
                                                    >
                                                        Batal
                                                    </button>
                                                    <button 
                                                        type="submit" 
                                                        disabled={fasilitasForm.processing}
                                                        className="bg-brand-primary text-white py-2.5 px-6 text-[9px] font-bold uppercase tracking-widest rounded-[0.25rem] hover:bg-slate-900 transition-all"
                                                    >
                                                        {fasilitasForm.processing ? 'Menyimpan...' : 'Simpan Fasilitas'}
                                                    </button>
                                                </div>
                                            </form>
                                        </div>

                                        {/* RIGHT COLUMN: INTEGRATED PHOTO GALLERY (ONLY WHEN EDITING) */}
                                        {isEditing && (
                                            <div className="md:col-span-6 p-8 flex flex-col min-h-0 bg-slate-50/50 space-y-6">
                                                
                                                {/* Form Add to Gallery */}
                                                <form onSubmit={submitGaleri} className="space-y-4 bg-white border border-slate-200/60 rounded-[0.25rem] p-5 shadow-sm">
                                                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2 flex justify-between items-center">
                                                        <span>{editingGaleri ? 'Ubah Foto Galeri' : 'Unggah Foto Tambahan'}</span>
                                                        {editingGaleri && (
                                                            <button 
                                                                type="button" 
                                                                onClick={cancelEditGaleri} 
                                                                className="text-[8px] text-red-500 font-bold uppercase tracking-wider animate-pulse"
                                                            >
                                                                Batal Edit
                                                            </button>
                                                        )}
                                                    </h4>
                                                    
                                                    <div className="grid grid-cols-2 gap-3">
                                                        <div>
                                                            <label className="block text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1">Judul Foto</label>
                                                            <input 
                                                                type="text" 
                                                                className="w-full bg-slate-50 border border-slate-200 rounded p-2 text-xs focus:ring-1 focus:ring-brand-primary outline-none"
                                                                value={galeriForm.data.judul}
                                                                onChange={e => galeriForm.setData('judul', e.target.value)}
                                                                placeholder="Misal: Tampak Depan"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1">Deskripsi Singkat</label>
                                                            <input 
                                                                type="text" 
                                                                className="w-full bg-slate-50 border border-slate-200 rounded p-2 text-xs focus:ring-1 focus:ring-brand-primary outline-none"
                                                                value={galeriForm.data.deskripsi}
                                                                onChange={e => galeriForm.setData('deskripsi', e.target.value)}
                                                                placeholder="Keterangan foto..."
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-3">
                                                        <div className="flex-1 relative h-10 bg-slate-50 border border-dashed border-slate-200 rounded flex items-center justify-center group overflow-hidden">
                                                            {galeriPreview ? (
                                                                <span className="text-[8px] font-bold text-brand-primary truncate px-3">File Terpilih</span>
                                                            ) : (
                                                                <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">Pilih Foto Galeri</span>
                                                            )}
                                                            <ImageInputWithCrop 
                                                                className="absolute inset-0 z-10"
                                                                aspectRatio={null}
                                                                title="Potong Foto Galeri"
                                                                onChange={(file) => {
                                                                    galeriForm.setData('image', file);
                                                                    if (file) setGaleriPreview(URL.createObjectURL(file));
                                                                }}
                                                                required={!editingGaleri}
                                                            />
                                                        </div>
                                                        <button 
                                                            type="submit" 
                                                            disabled={galeriForm.processing}
                                                            className="bg-slate-900 hover:bg-brand-primary text-white text-[8px] font-bold uppercase tracking-widest px-4 h-10 rounded-[0.25rem] transition-colors"
                                                        >
                                                            {galeriForm.processing ? 'Proses...' : (editingGaleri ? 'Ubah' : 'Unggah')}
                                                        </button>
                                                    </div>
                                                </form>

                                                {/* Gallery Photo List */}
                                                <div className="flex-1 flex flex-col min-h-0">
                                                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2 mb-3">
                                                        Koleksi Foto Galeri ({activePhotos.length})
                                                    </h4>
                                                    
                                                    <div className="flex-1 overflow-y-auto pr-1 max-h-[220px]">
                                                        {activePhotos.length === 0 ? (
                                                            <div className="py-12 text-center text-slate-300">
                                                                <PhotoIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
                                                                <span className="text-[8px] font-bold uppercase tracking-widest">Belum ada foto galeri</span>
                                                            </div>
                                                        ) : (
                                                            <div className="grid grid-cols-3 gap-3">
                                                                {activePhotos.map((g) => (
                                                                    <div key={g.id} className="bg-white border border-slate-200 rounded overflow-hidden relative group/gal shadow-sm">
                                                                        <div className="aspect-[4/3] w-full bg-slate-100 overflow-hidden relative">
                                                                            <img src={g.image_url} className="w-full h-full object-cover" alt="Galeri" />
                                                                            <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover/gal:opacity-100 transition-opacity flex items-center justify-center gap-1.5">
                                                                                <button 
                                                                                    type="button" 
                                                                                    onClick={() => startEditGaleri(g)} 
                                                                                    className="p-1 rounded-full bg-white/20 hover:bg-brand-primary text-white transition-colors"
                                                                                    title="Edit"
                                                                                >
                                                                                    <PencilSquareIcon className="h-3.5 w-3.5" />
                                                                                </button>
                                                                                <button 
                                                                                    type="button" 
                                                                                    onClick={() => deleteGaleri(g.id)} 
                                                                                    className="p-1 rounded-full bg-white/20 hover:bg-red-600 text-white transition-colors"
                                                                                    title="Hapus"
                                                                                >
                                                                                    <TrashIcon className="h-3.5 w-3.5" />
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                        <div className="p-1.5 bg-white">
                                                                            <p className="text-[8px] font-bold text-slate-700 truncate">{g.judul || 'Tanpa Judul'}</p>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                            </div>
                                        )}

                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="p-6 border-t border-slate-100 flex justify-end bg-slate-50">
                                    <button 
                                        type="button" 
                                        onClick={closeFasilitasModal} 
                                        className="px-6 py-2.5 bg-slate-900 text-white hover:bg-brand-primary text-[9px] font-bold uppercase tracking-widest rounded-[0.25rem] transition-colors"
                                    >
                                        Selesai & Tutup
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })()}
            </div>

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
