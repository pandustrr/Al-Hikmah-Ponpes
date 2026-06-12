import React, { useState, useEffect } from 'react';
import IndukAdminLayout from '@/Layouts/Induk/IndukAdminLayout';
import { useForm, router } from '@inertiajs/react';
import {
    Cog6ToothIcon,
    ChatBubbleLeftRightIcon,
    NewspaperIcon,
    PlusIcon,
    PencilSquareIcon,
    TrashIcon,
    PhotoIcon,
    VideoCameraIcon,
    BuildingLibraryIcon
} from '@heroicons/react/24/outline';
import ImageInputWithCrop from '@/Components/ImageInputWithCrop';

export default function Index({ settings, testimonials, beritaList = [], categories = [], lembagas = [], fasilitas = [] }) {
    const [activeTab, setActiveTab] = useState('hero');

    // Facilities States & Forms
    const [isFasilitasModalOpen, setIsFasilitasModalOpen] = useState(false);
    const [editingFasilitas, setEditingFasilitas] = useState(null);
    const [fasilitasPreview, setFasilitasPreview] = useState(null);

    const fasilitasForm = useForm({
        lembaga_id: '',
        nama: '',
        kategori: '',
        deskripsi: '',
        image: null,
        is_utama: true,
    });

    const openAddFasilitas = () => {
        setEditingFasilitas(null);
        fasilitasForm.reset();
        fasilitasForm.setData({
            lembaga_id: lembagas.length > 0 ? lembagas[0].id : '',
            nama: '',
            kategori: '',
            deskripsi: '',
            image: null,
            is_utama: true,
        });
        setFasilitasPreview(null);
        setIsFasilitasModalOpen(true);
    };

    const openEditFasilitas = (f) => {
        setEditingFasilitas(f);
        fasilitasForm.setData({
            lembaga_id: f.lembaga_id || '',
            nama: f.nama,
            kategori: f.kategori || '',
            deskripsi: f.deskripsi || '',
            image: null,
            is_utama: true,
        });
        setFasilitasPreview(f.image_url);
        galeriForm.setData('fasilitas_id', f.id);
        setIsFasilitasModalOpen(true);
    };

    const closeFasilitasModal = () => {
        setIsFasilitasModalOpen(false);
        setEditingFasilitas(null);
        fasilitasForm.reset();
        setFasilitasPreview(null);
    };

    const submitFasilitas = (e) => {
        e.preventDefault();
        if (editingFasilitas) {
            fasilitasForm.post(route('admin.fasilitas.update', editingFasilitas.id), {
                onSuccess: () => closeFasilitasModal(),
            });
        } else {
            fasilitasForm.post(route('admin.fasilitas.store'), {
                onSuccess: () => closeFasilitasModal(),
            });
        }
    };

    const deleteFasilitas = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus fasilitas ini? Foto-foto di dalam galeri fasilitas ini juga akan terhapus.')) {
            router.delete(route('admin.fasilitas.destroy', id));
        }
    };

    // Galeri States & Forms
    const [galeriPreview, setGaleriPreview] = useState(null);
    const [editingGaleri, setEditingGaleri] = useState(null);
    const galeriForm = useForm({
        fasilitas_id: '',
        judul: '',
        deskripsi: '',
        image: null,
    });

    const startEditGaleri = (g) => {
        setEditingGaleri(g);
        galeriForm.setData({
            fasilitas_id: g.fasilitas_id,
            judul: g.judul || '',
            deskripsi: g.deskripsi || '',
            image: null,
        });
        setGaleriPreview(g.image_url);
    };

    const cancelEditGaleri = () => {
        setEditingGaleri(null);
        galeriForm.reset();
        if (editingFasilitas) galeriForm.setData('fasilitas_id', editingFasilitas.id);
        setGaleriPreview(null);
    };

    const submitGaleri = (e) => {
        e.preventDefault();
        const payload = {
            fasilitas_id: editingFasilitas.id,
            judul: galeriForm.data.judul || '',
            deskripsi: galeriForm.data.deskripsi || '',
            image: galeriForm.data.image,
        };

        if (editingGaleri) {
            router.post(route('admin.galeri.update', editingGaleri.id), {
                ...payload,
                _method: 'POST'
            }, {
                onSuccess: () => cancelEditGaleri(),
            });
        } else {
            router.post(route('admin.galeri.store'), payload, {
                onSuccess: () => cancelEditGaleri(),
            });
        }
    };

    const deleteGaleri = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus foto dari galeri fasilitas ini?')) {
            router.delete(route('admin.galeri.destroy', id));
        }
    };

    // Testimonial States & Form
    const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false);
    const [editingTestimonial, setEditingTestimonial] = useState(null);
    const [testimonialImagePreview, setTestimonialImagePreview] = useState(null);

    const testimonialForm = useForm({
        _method: 'POST',
        name: '',
        info: '',
        quote: '',
        stars: 5,
        image_file: null,
        is_active: true,
    });

    const openAddTestimonial = () => {
        setEditingTestimonial(null);
        testimonialForm.reset();
        testimonialForm.setData({
            _method: 'POST',
            name: '',
            info: '',
            quote: '',
            stars: 5,
            image_file: null,
            is_active: true,
        });
        setTestimonialImagePreview(null);
        setIsTestimonialModalOpen(true);
    };

    const openEditTestimonial = (t) => {
        setEditingTestimonial(t);
        testimonialForm.setData({
            _method: 'PUT',
            name: t.name,
            info: t.info,
            quote: t.quote,
            stars: t.stars || 5,
            image_file: null,
            is_active: t.is_active === undefined ? true : !!t.is_active,
        });
        setTestimonialImagePreview(t.image_url);
        setIsTestimonialModalOpen(true);
    };

    const closeTestimonialModal = () => {
        setIsTestimonialModalOpen(false);
        setEditingTestimonial(null);
        testimonialForm.reset();
        setTestimonialImagePreview(null);
    };

    const submitTestimonial = (e) => {
        e.preventDefault();
        if (editingTestimonial) {
            testimonialForm.post(route('admin.testimonials.update', editingTestimonial.id), {
                onSuccess: () => closeTestimonialModal(),
            });
        } else {
            testimonialForm.post(route('admin.testimonials.store'), {
                onSuccess: () => closeTestimonialModal(),
            });
        }
    };

    const deleteTestimonial = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus testimoni ini?')) {
            router.delete(route('admin.testimonials.destroy', id));
        }
    };
    const [heroBgPreview, setHeroBgPreview] = useState(settings.hero_bg || null);
    const [heroBgMobilePreview, setHeroBgMobilePreview] = useState(settings.hero_bg_mobile || null);
    const [aboutImagePreview, setAboutImagePreview] = useState(settings.about_image || null);
    const [facilityPreviews, setFacilityPreviews] = useState(() => {
        const initial = {};
        fasilitas.forEach(f => {
            initial[f.id] = f.image_url;
        });
        return initial;
    });

    const getInitialData = () => {
        const base = {
            hero_bg: null,
            hero_bg_mobile: null,
            hero_subtitle: settings.hero_subtitle || '',
            hero_news_category_id: settings.hero_news_category_id || '',
            sticky_announcement_category_id: settings.sticky_announcement_category_id || '',
            sticky_article_category_id: settings.sticky_article_category_id || '',
            about_title_small: settings.about_title_small || '',
            about_title_large: settings.about_title_large || '',
            about_description_short: settings.about_description_short || '',
            about_description: settings.about_description || '',
            about_lembaga_tagline: settings.about_lembaga_tagline || 'Program Unggulan',
            about_lembaga_title: settings.about_lembaga_title || 'Lembaga Pendidikan',
            active_lembaga_ids: settings.active_lembaga_ids && Array.isArray(settings.active_lembaga_ids)
                ? settings.active_lembaga_ids
                : lembagas.map(l => l.id),
            about_image: null,
            about_method_desc: settings.about_method_desc || '',
            about_env_desc: settings.about_env_desc || '',
            about_features: settings.about_features && settings.about_features.length > 0
                ? settings.about_features
                : [
                    { title: 'Metode Pendidikan', desc: settings.about_method_desc || 'Holistik — mengintegrasikan sains, teknologi, dan ilmu agama.' },
                    { title: 'Lingkungan Siswa', desc: settings.about_env_desc || 'Asrama nyaman dengan pembiasaan adab harian yang terstruktur.' }
                ],
            about_stat_1_val: settings.about_stat_1_val || '',
            about_stat_1_lbl: settings.about_stat_1_lbl || '',
            about_stat_2_val: settings.about_stat_2_val || '',
            about_stat_2_lbl: settings.about_stat_2_lbl || '',
            about_stat_3_val: settings.about_stat_3_val || '',
            about_stat_3_lbl: settings.about_stat_3_lbl || '',
            about_stat_4_val: settings.about_stat_4_val || '',
            about_stat_4_lbl: settings.about_stat_4_lbl || '',
            ppdb_cta_title: settings.ppdb_cta_title || '',
            ppdb_wave_1: settings.ppdb_wave_1 || '',
            ppdb_wave_2: settings.ppdb_wave_2 || '',
            ppdb_requirements: settings.ppdb_requirements || '',
            youtube_video_badge: settings.youtube_video_badge || 'Galeri Video Resmi',
            youtube_video_title: settings.youtube_video_title || 'Dokumentasi & Video Profil YPDS Al-Hikmah',
            youtube_video_desc: settings.youtube_video_desc || 'Simak video profil resmi serta dokumentasi kegiatan kami untuk melihat lingkungan belajar dan pembiasaan nilai adab santri.',
            youtube_video_urls: Array.isArray(settings.youtube_video_urls)
                ? JSON.stringify(settings.youtube_video_urls)
                : (typeof settings.youtube_video_urls === 'string' && settings.youtube_video_urls.trim().startsWith('['))
                    ? settings.youtube_video_urls
                    : JSON.stringify(settings.youtube_video_urls ? settings.youtube_video_urls.split('\n').map(u => u.trim()).filter(Boolean) : []),
            bottom_news_category_id: settings.bottom_news_category_id || '',
            fasilitas_tagline: settings.fasilitas_tagline || '',
            fasilitas_title: settings.fasilitas_title || '',
            fasilitas_desc: settings.fasilitas_desc || '',
            fasilitas_btn_text: settings.fasilitas_btn_text || '',
            warta_tagline: settings.warta_tagline || '',
            warta_title_1: settings.warta_title_1 || '',
            warta_title_2: settings.warta_title_2 || '',
            warta_btn_text: settings.warta_btn_text || '',
        };
        fasilitas.forEach(f => {
            base[`fasilitas_nama_${f.id}`] = f.nama || '';
            base[`fasilitas_img_${f.id}`] = null;
        });
        return base;
    };

    const { data, setData, post, processing, errors } = useForm(getInitialData());

    const [videoList, setVideoList] = useState(() => {
        try {
            if (Array.isArray(settings.youtube_video_urls)) {
                return settings.youtube_video_urls;
            }
            if (typeof settings.youtube_video_urls === 'string') {
                const trimmed = settings.youtube_video_urls.trim();
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
    const handleSettingsSubmit = (e) => {
        e.preventDefault();
        post(route('admin.landing.settings.update'));
    };

    return (
        <IndukAdminLayout title="Pengaturan Beranda">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="mb-10">
                    <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-accent mb-2">Manajemen Konten</h2>
                    <h1 className="text-4xl font-semibold uppercase tracking-tighter text-slate-900 leading-none">Pengaturan <br /><span className="text-brand-primary">Halaman Beranda</span></h1>
                </div>                {/* Tabs */}
                <div className="flex items-center gap-1.5 mb-6 border-b border-slate-200 overflow-x-auto whitespace-nowrap scrollbar-none pb-0.5">
                    <button
                        onClick={() => setActiveTab('hero')}
                        className={`px-3.5 py-2.5 text-[10px] font-semibold uppercase tracking-widest transition-all border-b-2 flex items-center gap-1.5 shrink-0 ${activeTab === 'hero'
                                ? 'border-brand-primary text-brand-primary'
                                : 'border-transparent text-slate-400 hover:text-brand-primary'
                            }`}
                    >
                        <PhotoIcon className="h-3.5 w-3.5" />
                        Bagian Hero
                    </button>

                    <button
                        onClick={() => setActiveTab('about')}
                        className={`px-3.5 py-2.5 text-[10px] font-semibold uppercase tracking-widest transition-all border-b-2 flex items-center gap-1.5 shrink-0 ${activeTab === 'about'
                                ? 'border-brand-primary text-brand-primary'
                                : 'border-transparent text-slate-400 hover:text-brand-primary'
                            }`}
                    >
                        <Cog6ToothIcon className="h-3.5 w-3.5" />
                        Tentang Kami
                    </button>

                    <button
                        onClick={() => setActiveTab('lembaga')}
                        className={`px-3.5 py-2.5 text-[10px] font-semibold uppercase tracking-widest transition-all border-b-2 flex items-center gap-1.5 shrink-0 ${activeTab === 'lembaga'
                                ? 'border-brand-primary text-brand-primary'
                                : 'border-transparent text-slate-400 hover:text-brand-primary'
                            }`}
                    >
                        <Cog6ToothIcon className="h-3.5 w-3.5" />
                        Lembaga Pendidikan
                    </button>

                    <button
                        onClick={() => setActiveTab('youtube_videos')}
                        className={`px-3.5 py-2.5 text-[10px] font-semibold uppercase tracking-widest transition-all border-b-2 flex items-center gap-1.5 shrink-0 ${activeTab === 'youtube_videos'
                                ? 'border-brand-primary text-brand-primary'
                                : 'border-transparent text-slate-400 hover:text-brand-primary'
                            }`}
                    >
                        <VideoCameraIcon className="h-3.5 w-3.5" />
                        Video Beranda
                    </button>

                    <button
                        onClick={() => setActiveTab('fasilitas')}
                        className={`px-3.5 py-2.5 text-[10px] font-semibold uppercase tracking-widest transition-all border-b-2 flex items-center gap-1.5 shrink-0 ${activeTab === 'fasilitas'
                                ? 'border-brand-primary text-brand-primary'
                                : 'border-transparent text-slate-400 hover:text-brand-primary'
                            }`}
                    >
                        <PhotoIcon className="h-3.5 w-3.5" />
                        Fasilitas Keunggulan
                    </button>

                    <button
                        onClick={() => setActiveTab('ppdb_cta')}
                        className={`px-3.5 py-2.5 text-[10px] font-semibold uppercase tracking-widest transition-all border-b-2 flex items-center gap-1.5 shrink-0 ${activeTab === 'ppdb_cta'
                                ? 'border-brand-primary text-brand-primary'
                                : 'border-transparent text-slate-400 hover:text-brand-primary'
                            }`}
                    >
                        <Cog6ToothIcon className="h-3.5 w-3.5" />
                        PPDB CTA
                    </button>

                    <button
                        onClick={() => setActiveTab('berita')}
                        className={`px-3.5 py-2.5 text-[10px] font-semibold uppercase tracking-widest transition-all border-b-2 flex items-center gap-1.5 shrink-0 ${activeTab === 'berita'
                                ? 'border-brand-primary text-brand-primary'
                                : 'border-transparent text-slate-400 hover:text-brand-primary'
                            }`}
                    >
                        <NewspaperIcon className="h-3.5 w-3.5" />
                        Berita Terbaru
                    </button>

                    <button
                        onClick={() => setActiveTab('testimonials')}
                        className={`px-3.5 py-2.5 text-[10px] font-semibold uppercase tracking-widest transition-all border-b-2 flex items-center gap-1.5 shrink-0 ${activeTab === 'testimonials'
                                ? 'border-brand-primary text-brand-primary'
                                : 'border-transparent text-slate-400 hover:text-brand-primary'
                            }`}
                    >
                        <ChatBubbleLeftRightIcon className="h-3.5 w-3.5" />
                        Testimoni
                    </button>
                </div>

                {/* Content Sections */}
                <div className="bg-white rounded-[0.25rem] border border-slate-200 shadow-sm overflow-hidden">

                    {/* 1. Hero Tab */}
                    {activeTab === 'hero' && (
                        <form onSubmit={handleSettingsSubmit} className="p-8 space-y-10">

                            {/* Hero Section */}
                            <div className="space-y-6">
                                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest border-l-4 border-brand-primary pl-4">Bagian Hero</h3>

                                {/* Background Image Upload */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Desktop Background (21:9) */}
                                    <div className="space-y-3">
                                        <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-2">Gambar Background Desktop (21:9)</label>
                                        <div className="relative aspect-[21/9] w-full bg-slate-50 rounded-[0.25rem] overflow-hidden border border-slate-200 group flex items-center justify-center shadow-sm">
                                            {heroBgPreview ? (
                                                <img src={heroBgPreview} className="w-full h-full object-cover" alt="Preview Hero Background" />
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
                                                aspectRatio={21 / 9}
                                                title="Potong Gambar Hero Beranda (21:9)"
                                                onChange={(file) => {
                                                    setData('hero_bg', file);
                                                    if (file) setHeroBgPreview(URL.createObjectURL(file));
                                                }}
                                            />
                                        </div>
                                        <p className="text-[9px] text-slate-400 italic">
                                            Rasio ideal 21:9. Tampilan hero beranda versi lebar monitor.
                                        </p>
                                    </div>

                                    {/* Mobile Background (3:4) */}
                                    <div className="space-y-3">
                                        <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-2">Gambar Background Mobile (3:4)</label>
                                        <div className="relative aspect-[3/4] w-full max-w-[150px] bg-slate-50 rounded-[0.25rem] overflow-hidden border border-slate-200 group flex items-center justify-center shadow-sm">
                                            {heroBgMobilePreview ? (
                                                <img src={heroBgMobilePreview} className="w-full h-full object-cover" alt="Preview Hero Background Mobile" />
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
                                                aspectRatio={3 / 4}
                                                title="Potong Gambar Hero Beranda Mobile (3:4)"
                                                onChange={(file) => {
                                                    setData('hero_bg_mobile', file);
                                                    if (file) setHeroBgMobilePreview(URL.createObjectURL(file));
                                                }}
                                            />
                                        </div>
                                        <p className="text-[9px] text-slate-400 italic">
                                            Rasio ideal 3:4. Tampilan hero beranda versi mobile layar HP tegak.
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-2">Subtitle Hero</label>
                                    <input
                                        type="text"
                                        value={data.hero_subtitle}
                                        onChange={e => setData('hero_subtitle', e.target.value)}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-[0.25rem] text-sm focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                                        placeholder="Pusat Pendidikan & Dakwah Sosial"
                                    />
                                </div>

                                <div className="space-y-2 max-w-md pt-2">
                                    <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                                        Kategori Slide Berita Utama (Hero Slider)
                                    </label>
                                    <p className="text-xs text-slate-400">
                                        Pilih kategori berita yang ingin ditampilkan secara otomatis pada slider utama (Hero) di beranda.
                                    </p>
                                    <select
                                        value={data.hero_news_category_id}
                                        onChange={e => setData('hero_news_category_id', e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-brand-primary"
                                    >
                                        <option value="">Semua Kategori (Terbaru)</option>
                                        {categories.map(c => (
                                            <option key={c.id} value={c.id}>{c.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="pt-6">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-brand-primary hover:bg-slate-900 text-white text-xs font-semibold uppercase tracking-widest px-10 py-4 transition-all rounded-[0.25rem] shadow-xl shadow-brand-primary/20 disabled:opacity-50"
                                >
                                    Simpan Perubahan
                                </button>
                            </div>
                        </form>
                    )}

                    {/* 2. Tentang Kami Tab */}
                    {activeTab === 'about' && (
                        <form onSubmit={handleSettingsSubmit} className="p-8 space-y-10">
                            {/* About Section */}
                            <div className="space-y-6">
                                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest border-l-4 border-brand-primary pl-4">Bagian Tentang Kami</h3>

                                {/* About Image Upload (3:4) */}
                                <div className="space-y-3 bg-slate-50/50 p-4 rounded-[0.25rem] border border-slate-200 max-w-md">
                                    <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-2">Foto Profil "Mengenal Lebih Dekat" (3:4)</label>
                                    <div className="relative aspect-[3/4] w-full max-w-[140px] bg-slate-50 rounded-[0.25rem] overflow-hidden border border-slate-200 group flex items-center justify-center shadow-sm">
                                        {aboutImagePreview ? (
                                            <img src={aboutImagePreview} className="w-full h-full object-cover" alt="Preview About Image" />
                                        ) : (
                                            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-350 bg-slate-100/50">
                                                <PhotoIcon className="h-8 w-8 mb-1" />
                                                <span className="text-[8px] font-bold uppercase tracking-widest text-center px-2">Pilih Foto</span>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                                            <span className="text-white text-[8px] font-bold uppercase tracking-[0.2em] border border-white/40 px-3 py-1.5 cursor-pointer">Ganti</span>
                                        </div>
                                        <ImageInputWithCrop
                                            className="absolute inset-0 z-20"
                                            aspectRatio={3 / 4}
                                            title="Potong Foto Profil (3:4)"
                                            onChange={(file) => {
                                                setData('about_image', file);
                                                if (file) setAboutImagePreview(URL.createObjectURL(file));
                                            }}
                                        />
                                    </div>
                                    <p className="text-[9px] text-slate-450 italic">
                                        Rasio ideal 3:4. Foto ini akan tampil di samping teks deskripsi "Tentang Kami".
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-2">Title Kecil</label>
                                        <input
                                            type="text"
                                            value={data.about_title_small}
                                            onChange={e => setData('about_title_small', e.target.value)}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-[0.25rem] text-sm focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-2">Title Besar (Gunakan \n untuk baris baru)</label>
                                        <input
                                            type="text"
                                            value={data.about_title_large}
                                            onChange={e => setData('about_title_large', e.target.value)}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-[0.25rem] text-sm focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-2">Deskripsi Singkat (Italic)</label>
                                    <textarea
                                        rows="2"
                                        value={data.about_description_short}
                                        onChange={e => setData('about_description_short', e.target.value)}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-[0.25rem] text-sm focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                                    ></textarea>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-2">Deskripsi Utama</label>
                                    <textarea
                                        rows="4"
                                        value={data.about_description}
                                        onChange={e => setData('about_description', e.target.value)}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-[0.25rem] text-sm focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                                    ></textarea>
                                </div>

                                {/* Sidebar News Categories Configuration */}
                                <div className="space-y-4 pt-4 border-t border-slate-100/70">
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-650 uppercase tracking-widest">
                                            Pengaturan Kategori Berita Sidebar (Tentang Kami)
                                        </label>
                                        <p className="text-xs text-slate-400 mt-1">
                                            Pilih kategori berita untuk kedua widget berita yang tampil di sidebar samping section Tentang Kami di halaman beranda.
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-2">Widget 1: Kategori Sticky 1 (Sidebar)</label>
                                            <select
                                                value={data.sticky_announcement_category_id}
                                                onChange={e => setData('sticky_announcement_category_id', e.target.value)}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-brand-primary"
                                            >
                                                <option value="">Pilih Kategori...</option>
                                                {categories.map(c => (
                                                    <option key={c.id} value={c.id}>{c.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-2">Widget 2: Kategori Sticky 2 (Sidebar)</label>
                                            <select
                                                value={data.sticky_article_category_id}
                                                onChange={e => setData('sticky_article_category_id', e.target.value)}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-brand-primary"
                                            >
                                                <option value="">Pilih Kategori...</option>
                                                {categories.map(c => (
                                                    <option key={c.id} value={c.id}>{c.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Cards CRUD for About Section */}
                                <div className="space-y-4 pt-4 border-t border-slate-100/70">
                                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                                        <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-primary">Kartu Fitur Tentang Kami (Metode Pendidikan, dll.)</label>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setData('about_features', [...data.about_features, { title: '', desc: '' }]);
                                            }}
                                            className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-brand-primary bg-brand-primary/5 hover:bg-brand-primary hover:text-white border border-brand-primary/15 py-2 px-3 rounded-[0.25rem] transition-all"
                                        >
                                            <PlusIcon className="w-3.5 h-3.5" /> Tambah Kartu
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {data.about_features.map((card, index) => (
                                            <div key={index} className="flex items-start gap-3 bg-slate-50/50 p-4 rounded-[0.25rem] border border-slate-200 group hover:border-slate-300 transition-all relative">
                                                <div className="flex-1 space-y-3">
                                                    <div className="space-y-1.5">
                                                        <label className="block text-[8px] font-bold text-slate-400 uppercase tracking-widest">Judul Kartu</label>
                                                        <input
                                                            type="text"
                                                            value={card.title}
                                                            onChange={e => {
                                                                const newCards = [...data.about_features];
                                                                newCards[index].title = e.target.value;
                                                                setData('about_features', newCards);
                                                            }}
                                                            className="w-full text-xs text-slate-800 bg-white border border-slate-200 rounded-[0.25rem] py-2.5 px-3.5 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/20 outline-none font-semibold"
                                                            placeholder="Metode Pendidikan"
                                                        />
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <label className="block text-[8px] font-bold text-slate-400 uppercase tracking-widest">Deskripsi Kartu</label>
                                                        <textarea
                                                            rows={2}
                                                            value={card.desc}
                                                            onChange={e => {
                                                                const newCards = [...data.about_features];
                                                                newCards[index].desc = e.target.value;
                                                                setData('about_features', newCards);
                                                            }}
                                                            className="w-full text-xs text-slate-800 bg-white border border-slate-200 rounded-[0.25rem] py-2.5 px-3.5 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/20 outline-none font-medium leading-relaxed"
                                                            placeholder="Pendekatan holistik yang mengintegrasikan..."
                                                        />
                                                    </div>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        if (confirm('Apakah Anda yakin ingin menghapus kartu ini?')) {
                                                            const newCards = data.about_features.filter((_, i) => i !== index);
                                                            setData('about_features', newCards);
                                                        }
                                                    }}
                                                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors mt-1 shrink-0"
                                                    title="Hapus Kartu"
                                                >
                                                    <TrashIcon className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Statistik Section */}
                                <div className="space-y-4 pt-4 border-t border-slate-100/70">
                                    <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-widest">Statistik Pencapaian Yayasan</label>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="p-3 bg-slate-50 border border-slate-200 rounded-[0.25rem] space-y-2">
                                            <label className="block text-[8px] font-bold text-slate-400 uppercase tracking-wider">Statistik 1 (Nilai)</label>
                                            <input type="text" value={data.about_stat_1_val} onChange={e => setData('about_stat_1_val', e.target.value)} className="w-full px-2 py-1.5 bg-white border border-slate-200 rounded-[0.15rem] text-xs outline-none" placeholder="30+" />
                                            <label className="block text-[8px] font-bold text-slate-400 uppercase tracking-wider">Label</label>
                                            <input type="text" value={data.about_stat_1_lbl} onChange={e => setData('about_stat_1_lbl', e.target.value)} className="w-full px-2 py-1.5 bg-white border border-slate-200 rounded-[0.15rem] text-xs outline-none" placeholder="Tahun Berdiri" />
                                        </div>
                                        <div className="p-3 bg-slate-50 border border-slate-200 rounded-[0.25rem] space-y-2">
                                            <label className="block text-[8px] font-bold text-slate-400 uppercase tracking-wider">Statistik 2 (Nilai)</label>
                                            <input type="text" value={data.about_stat_2_val} onChange={e => setData('about_stat_2_val', e.target.value)} className="w-full px-2 py-1.5 bg-white border border-slate-200 rounded-[0.15rem] text-xs outline-none" placeholder="3" />
                                            <label className="block text-[8px] font-bold text-slate-400 uppercase tracking-wider">Label</label>
                                            <input type="text" value={data.about_stat_2_lbl} onChange={e => setData('about_stat_2_lbl', e.target.value)} className="w-full px-2 py-1.5 bg-white border border-slate-200 rounded-[0.15rem] text-xs outline-none" placeholder="Jenjang" />
                                        </div>
                                        <div className="p-3 bg-slate-50 border border-slate-200 rounded-[0.25rem] space-y-2">
                                            <label className="block text-[8px] font-bold text-slate-400 uppercase tracking-wider">Statistik 3 (Nilai)</label>
                                            <input type="text" value={data.about_stat_3_val} onChange={e => setData('about_stat_3_val', e.target.value)} className="w-full px-2 py-1.5 bg-white border border-slate-200 rounded-[0.15rem] text-xs outline-none" placeholder="5000+" />
                                            <label className="block text-[8px] font-bold text-slate-400 uppercase tracking-wider">Label</label>
                                            <input type="text" value={data.about_stat_3_lbl} onChange={e => setData('about_stat_3_lbl', e.target.value)} className="w-full px-2 py-1.5 bg-white border border-slate-200 rounded-[0.15rem] text-xs outline-none" placeholder="Alumni" />
                                        </div>
                                        <div className="p-3 bg-slate-50 border border-slate-200 rounded-[0.25rem] space-y-2">
                                            <label className="block text-[8px] font-bold text-slate-400 uppercase tracking-wider">Statistik 4 (Nilai)</label>
                                            <input type="text" value={data.about_stat_4_val} onChange={e => setData('about_stat_4_val', e.target.value)} className="w-full px-2 py-1.5 bg-white border border-slate-200 rounded-[0.15rem] text-xs outline-none" placeholder="100%" />
                                            <label className="block text-[8px] font-bold text-slate-400 uppercase tracking-wider">Label</label>
                                            <input type="text" value={data.about_stat_4_lbl} onChange={e => setData('about_stat_4_lbl', e.target.value)} className="w-full px-2 py-1.5 bg-white border border-slate-200 rounded-[0.15rem] text-xs outline-none" placeholder="Berasrama" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-6">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-brand-primary hover:bg-slate-900 text-white text-xs font-semibold uppercase tracking-widest px-10 py-4 transition-all rounded-[0.25rem] shadow-xl shadow-brand-primary/20 disabled:opacity-50"
                                >
                                    Simpan Perubahan
                                </button>
                            </div>
                        </form>
                    )}

                    {/* 3. Lembaga Pendidikan Tab */}
                    {activeTab === 'lembaga' && (
                        <form onSubmit={handleSettingsSubmit} className="p-8 space-y-10">
                            {/* Program Unggulan Section */}
                            <div className="space-y-6">
                                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest border-l-4 border-brand-primary pl-4">Bagian Lembaga Pendidikan</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-2">Tagline Section</label>
                                        <input
                                            type="text"
                                            value={data.about_lembaga_tagline}
                                            onChange={e => setData('about_lembaga_tagline', e.target.value)}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-[0.25rem] text-sm focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                                            placeholder="Program Unggulan"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-2">Judul Section</label>
                                        <input
                                            type="text"
                                            value={data.about_lembaga_title}
                                            onChange={e => setData('about_lembaga_title', e.target.value)}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-[0.25rem] text-sm focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                                            placeholder="Lembaga Pendidikan"
                                        />
                                    </div>
                                </div>

                                {/* Lembaga Cards Monitor & Toggle */}
                                <div className="space-y-3 pt-2">
                                    <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                                        Monitoring & Status Tampilan Kartu Lembaga di Beranda
                                    </label>
                                    <p className="text-xs text-slate-400">
                                        Aktifkan lembaga di bawah ini untuk menampilkan kartu profilnya pada section Program Unggulan di halaman beranda. Lembaga yang dinonaktifkan akan masuk ke draft (disembunyikan dari beranda).
                                    </p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                                        {lembagas.map(lembaga => {
                                            const isActive = data.active_lembaga_ids.includes(lembaga.id);
                                            return (
                                                <div
                                                    key={lembaga.id}
                                                    className={`p-4 border rounded-[0.25rem] flex items-center justify-between transition-all ${isActive
                                                            ? 'bg-emerald-50/40 border-emerald-200 shadow-sm'
                                                            : 'bg-slate-50 border-slate-200 opacity-75'
                                                        }`}
                                                >
                                                    <div className="space-y-1 pr-3">
                                                        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide leading-tight">
                                                            {lembaga.nama}
                                                        </h4>
                                                        <p className="text-[10px] text-slate-400 uppercase tracking-wider">
                                                            Pendidikan Formal
                                                        </p>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const newActiveIds = isActive
                                                                ? data.active_lembaga_ids.filter(id => id !== lembaga.id)
                                                                : [...data.active_lembaga_ids, lembaga.id];
                                                            setData('active_lembaga_ids', newActiveIds);
                                                        }}
                                                        className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${isActive ? 'bg-emerald-600' : 'bg-slate-200'
                                                            }`}
                                                    >
                                                        <span
                                                            className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isActive ? 'translate-x-5' : 'translate-x-0'
                                                                }`}
                                                        />
                                                    </button>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className="pt-6">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-brand-primary hover:bg-slate-900 text-white text-xs font-semibold uppercase tracking-widest px-10 py-4 transition-all rounded-[0.25rem] shadow-xl shadow-brand-primary/20 disabled:opacity-50"
                                >
                                    Simpan Perubahan
                                </button>
                            </div>
                        </form>
                    )}

                    {/* 5. Fasilitas Keunggulan Tab */}
                    {activeTab === 'fasilitas' && (
                        <form onSubmit={handleSettingsSubmit} className="p-8 space-y-10">
                            {/* Fasilitas Section */}
                            <div className="space-y-6">
                                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest border-l-4 border-brand-primary pl-4">Bagian Fasilitas Unggulan</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-2">Tagline Section (Fasilitas)</label>
                                        <input
                                            type="text"
                                            value={data.fasilitas_tagline}
                                            onChange={e => setData('fasilitas_tagline', e.target.value)}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-[0.25rem] text-sm focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                                            placeholder="Fasilitas Unggulan"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-2">Text Tombol Section</label>
                                        <input
                                            type="text"
                                            value={data.fasilitas_btn_text}
                                            onChange={e => setData('fasilitas_btn_text', e.target.value)}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-[0.25rem] text-sm focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                                            placeholder="Jelajahi Fasilitas Selengkapnya"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-2">Judul Besar</label>
                                        <input
                                            type="text"
                                            value={data.fasilitas_title}
                                            onChange={e => setData('fasilitas_title', e.target.value)}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-[0.25rem] text-sm focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                                            placeholder="Mendukung Perkembangan \n Potensi Siswa"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-2">Deskripsi / Kutipan Singkat (Italic)</label>
                                    <textarea
                                        rows="3"
                                        value={data.fasilitas_desc}
                                        onChange={e => setData('fasilitas_desc', e.target.value)}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-[0.25rem] text-sm focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                                        placeholder='"Fasilitas modern mulai dari laboratorium terpadu, asrama yang nyaman, hingga lapangan olahraga yang luas disediakan untuk memastikan kenyamanan belajar para siswa."'
                                    ></textarea>
                                </div>                                {/* 4 Fasilitas Utama */}
                                <div className="space-y-4 pt-4 border-t border-slate-100/70">
                                    <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                                        Data Gambar Fasilitas Utama (Rasio Gambar 4:3)
                                    </label>
                                    <p className="text-xs text-slate-400">
                                        Unggah gambar dan beri nama untuk fasilitas utama yayasan yang akan tampil di halaman depan beranda.
                                    </p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                                        {fasilitas.map((fRecord, idx) => {
                                            const previewState = facilityPreviews[fRecord.id];
                                            const setPreviewState = (newUrl) => {
                                                setFacilityPreviews(prev => ({
                                                    ...prev,
                                                    [fRecord.id]: newUrl
                                                }));
                                            };

                                            return (
                                                <div key={fRecord.id} className="p-4 bg-slate-50/50 border border-slate-200 rounded-[0.25rem] space-y-4 relative group">
                                                    <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                                        <span>Slot Fasilitas {idx + 1}</span>
                                                        
                                                        {/* Delete button (only if more than 1 facility to avoid breaking layout) */}
                                                        {fasilitas.length > 1 && (
                                                            <button
                                                                type="button"
                                                                onClick={() => deleteFasilitas(fRecord.id)}
                                                                className="text-red-500 hover:text-red-700 transition-colors"
                                                                title="Hapus fasilitas utama ini"
                                                            >
                                                                <TrashIcon className="h-3.5 w-3.5" />
                                                            </button>
                                                        )}
                                                    </div>
                                                    
                                                    {/* Image upload with crop */}
                                                    <div className="relative aspect-[4/3] bg-slate-100 border border-slate-200 rounded-[0.25rem] overflow-hidden group/img">
                                                        {previewState ? (
                                                            <img src={previewState} alt={fRecord.nama} className="w-full h-full object-cover" />
                                                        ) : (
                                                            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-350 bg-slate-100/50">
                                                                <PhotoIcon className="h-8 w-8 mb-1" />
                                                                <span className="text-[8px] font-bold uppercase tracking-widest text-center px-2">Pilih Foto</span>
                                                            </div>
                                                        )}
                                                        <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center z-10">
                                                            <span className="text-white text-[8px] font-bold uppercase tracking-[0.2em] border border-white/40 px-3 py-1.5 cursor-pointer">Ganti</span>
                                                        </div>
                                                        <ImageInputWithCrop 
                                                            className="absolute inset-0 z-20"
                                                            aspectRatio={4/3}
                                                            title={`Potong Foto Fasilitas ${idx + 1} (4:3)`}
                                                            onChange={(file) => {
                                                                setData(`fasilitas_img_${fRecord.id}`, file);
                                                                if (file) setPreviewState(URL.createObjectURL(file));
                                                            }}
                                                        />
                                                    </div>
                                                    
                                                    {/* Name input */}
                                                    <div className="space-y-1.5">
                                                        <label className="block text-[8px] font-bold text-slate-400 uppercase tracking-widest">Nama Fasilitas</label>
                                                        <input
                                                            type="text"
                                                            value={data[`fasilitas_nama_${fRecord.id}`] || ''}
                                                            onChange={e => setData(`fasilitas_nama_${fRecord.id}`, e.target.value)}
                                                            className="w-full text-xs text-slate-800 bg-white border border-slate-200 rounded-[0.25rem] py-2 px-2.5 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/20 outline-none font-semibold"
                                                            placeholder={`Nama Fasilitas`}
                                                        />
                                                    </div>

                                                    {/* Gallery access */}
                                                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                                                        <span className="text-[9px] text-slate-400 font-semibold">Galeri: {fRecord.galeris?.length || 0} Foto</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => openEditFasilitas(fRecord)}
                                                            className="text-brand-primary hover:text-slate-900 text-[9px] font-bold uppercase tracking-wider transition-colors flex items-center gap-1"
                                                        >
                                                            <PhotoIcon className="h-3 w-3" />
                                                            <span>+ Kelola Galeri</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            );
                                        })}

                                        {/* Dotted add card */}
                                        <div 
                                            onClick={openAddFasilitas}
                                            className="border-2 border-dashed border-slate-200 hover:border-brand-primary bg-slate-50/25 hover:bg-slate-50/50 rounded-[0.25rem] flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-all aspect-[4/3] group"
                                        >
                                            <div className="p-3 bg-white border border-slate-200 rounded-full text-slate-400 group-hover:text-brand-primary shadow-sm mb-3">
                                                <PlusIcon className="h-6 w-6" />
                                            </div>
                                            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider group-hover:text-brand-primary transition-colors">Tambah Fasilitas</span>
                                            <span className="text-[9px] text-slate-400 mt-1">Tambahkan slot fasilitas utama baru</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-6">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-brand-primary hover:bg-slate-900 text-white text-xs font-semibold uppercase tracking-widest px-10 py-4 transition-all rounded-[0.25rem] shadow-xl shadow-brand-primary/20 disabled:opacity-50"
                                >
                                    Simpan Perubahan
                                </button>
                            </div>
                        </form>
                    )}

                    {/* 6. PPDB CTA Tab */}
                    {activeTab === 'ppdb_cta' && (
                        <form onSubmit={handleSettingsSubmit} className="p-8 space-y-10">
                            {/* PPDB CTA */}
                            <div className="space-y-6">
                                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest border-l-4 border-brand-primary pl-4">Bagian PPDB CTA</h3>
                                <div>
                                    <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-2">Title CTA</label>
                                    <input
                                        type="text"
                                        value={data.ppdb_cta_title}
                                        onChange={e => setData('ppdb_cta_title', e.target.value)}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-[0.25rem] text-sm focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-2">Info Gelombang 1</label>
                                        <input
                                            type="text"
                                            value={data.ppdb_wave_1}
                                            onChange={e => setData('ppdb_wave_1', e.target.value)}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-[0.25rem] text-sm focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-2">Info Gelombang 2</label>
                                        <input
                                            type="text"
                                            value={data.ppdb_wave_2}
                                            onChange={e => setData('ppdb_wave_2', e.target.value)}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-[0.25rem] text-sm focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-2">Persyaratan Umum (Tulis satu syarat per baris)</label>
                                    <textarea
                                        rows="5"
                                        value={data.ppdb_requirements}
                                        onChange={e => setData('ppdb_requirements', e.target.value)}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-[0.25rem] text-sm focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                                        placeholder="Fotokopi Kartu Keluarga & Akta Kelahiran&#10;Pas Foto Terbaru ukuran 3x4 (4 lembar)&#10;Fotokopi Ijazah & Raport terakhir"
                                    ></textarea>
                                </div>
                            </div>
                            <div className="pt-6">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-brand-primary hover:bg-slate-900 text-white text-xs font-semibold uppercase tracking-widest px-10 py-4 transition-all rounded-[0.25rem] shadow-xl shadow-brand-primary/20 disabled:opacity-50"
                                >
                                    Simpan Perubahan
                                </button>
                            </div>
                        </form>
                    )}

                    {/* 7. Berita Terbaru Tab */}
                    {activeTab === 'berita' && (
                        <form onSubmit={handleSettingsSubmit} className="p-8 space-y-10">
                            {/* Bagian Warta & Berita Terbaru */}
                            <div className="space-y-6">
                                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest border-l-4 border-brand-primary pl-4">Bagian Warta & Berita Terbaru</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-2">Tagline Section (Badge)</label>
                                        <input
                                            type="text"
                                            value={data.warta_tagline}
                                            onChange={e => setData('warta_tagline', e.target.value)}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-[0.25rem] text-sm focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                                            placeholder="Warta Yayasan"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-2">Text Tombol / Link Selengkapnya</label>
                                        <input
                                            type="text"
                                            value={data.warta_btn_text}
                                            onChange={e => setData('warta_btn_text', e.target.value)}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-[0.25rem] text-sm focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                                            placeholder="Lihat Semua Berita"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-2">Judul Baris 1 (Teks Biasa)</label>
                                        <input
                                            type="text"
                                            value={data.warta_title_1}
                                            onChange={e => setData('warta_title_1', e.target.value)}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-[0.25rem] text-sm focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                                            placeholder="Informasi"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-2">Judul Baris 2 (Italic / Miring)</label>
                                        <input
                                            type="text"
                                            value={data.warta_title_2}
                                            onChange={e => setData('warta_title_2', e.target.value)}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-[0.25rem] text-sm focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                                            placeholder="Terbaru"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Pilihan Berita Beranda Bawah */}
                            <div className="space-y-6 pt-6 border-t border-slate-100">
                                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest border-l-4 border-brand-primary pl-4">Kategori Berita Beranda Bawah</h3>
                                <div>
                                    <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-2">Pilih Kategori</label>
                                    <p className="text-xs text-slate-400 mb-3">Menampilkan berita terbaru dari kategori yang dipilih pada section khusus di bagian paling bawah beranda (di bawah Informasi Terbaru).</p>
                                    <select
                                        value={data.bottom_news_category_id}
                                        onChange={e => setData('bottom_news_category_id', e.target.value)}
                                        className="max-w-md w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-brand-primary"
                                    >
                                        <option value="">Jangan Tampilkan / Kosong</option>
                                        <option value="all">Semua Kategori (Terbaru)</option>
                                        {categories.map(c => (
                                            <option key={c.id} value={c.id}>{c.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="pt-6">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-brand-primary hover:bg-slate-900 text-white text-xs font-semibold uppercase tracking-widest px-10 py-4 transition-all rounded-[0.25rem] shadow-xl shadow-brand-primary/20 disabled:opacity-50"
                                >
                                    Simpan Perubahan
                                </button>
                            </div>
                        </form>
                    )}

                    {/* 1b. YouTube Videos Tab */}
                    {activeTab === 'youtube_videos' && (
                        <form onSubmit={handleSettingsSubmit} className="p-8 space-y-10">
                            <div className="space-y-6">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-4">
                                    <div>
                                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest border-l-4 border-brand-primary pl-4">Pengaturan Galeri Video Beranda</h3>
                                        <p className="text-xs text-slate-400 mt-1">Kelola judul, deskripsi, dan link video YouTube yang tampil di halaman beranda utama.</p>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-brand-primary hover:bg-slate-900 text-white text-xs font-semibold uppercase tracking-widest px-8 py-3 transition-all rounded-[0.25rem] shadow-lg shadow-brand-primary/15 disabled:opacity-50 shrink-0 self-start sm:self-auto"
                                    >
                                        Simpan Perubahan
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-2">Badge Video</label>
                                        <input
                                            type="text"
                                            value={data.youtube_video_badge}
                                            onChange={e => setData('youtube_video_badge', e.target.value)}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-[0.25rem] text-sm focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                                            placeholder="Contoh: Galeri Video Resmi"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-2">Judul Section Video</label>
                                        <input
                                            type="text"
                                            value={data.youtube_video_title}
                                            onChange={e => setData('youtube_video_title', e.target.value)}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-[0.25rem] text-sm focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                                            placeholder="Contoh: Dokumentasi & Video Profil YPDS Al-Hikmah"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-2">Deskripsi Section Video</label>
                                    <textarea
                                        rows="2"
                                        value={data.youtube_video_desc}
                                        onChange={e => setData('youtube_video_desc', e.target.value)}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-[0.25rem] text-sm focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                                        placeholder="Contoh: Simak video profil resmi..."
                                    ></textarea>
                                </div>

                                <div className="flex items-center justify-between pt-6 border-t border-slate-100/70">
                                    <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-widest">Daftar Tautan Video YouTube</label>
                                    <button
                                        type="button"
                                        onClick={addVideoInput}
                                        className="inline-flex items-center gap-2 bg-brand-primary hover:bg-slate-900 text-white text-[10px] font-semibold uppercase tracking-widest px-4 py-2 transition-all rounded-[0.25rem]"
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
                                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-[0.25rem] text-sm focus:ring-1 focus:ring-brand-primary outline-none transition-all"
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
                                        Masukkan link video YouTube profil yayasan / pesantren. Anda dapat menambahkan beberapa video sekaligus dan menghapusnya secara interaktif.
                                    </p>
                                </div>

                                <div className="pt-6 border-t border-slate-100 mt-6">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-brand-primary hover:bg-slate-900 text-white text-xs font-semibold uppercase tracking-widest px-10 py-4 transition-all rounded-[0.25rem] shadow-xl shadow-brand-primary/20 disabled:opacity-50"
                                    >
                                        Simpan Perubahan
                                    </button>
                                </div>
                            </div>
                        </form>
                    )}


                    {/* 3. Testimonials Tab */}
                    {activeTab === 'testimonials' && (
                        <div className="p-8">
                            <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-4">
                                <div>
                                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Daftar Testimoni</h3>
                                    <p className="text-xs text-slate-400 mt-1">Kelola testimoni wali santri, tokoh, alumni, atau asatidzah yang tampil di halaman depan.</p>
                                </div>
                                <button 
                                    onClick={openAddTestimonial}
                                    className="inline-flex items-center gap-2 bg-brand-primary hover:bg-slate-900 text-white text-[10px] font-semibold uppercase tracking-widest px-4 py-2 transition-all rounded-[0.25rem] shadow-md shadow-brand-primary/10"
                                >
                                    <PlusIcon className="h-3.5 w-3.5" />
                                    Tambah Testimoni
                                </button>
                            </div>

                            {testimonials.length === 0 ? (
                                <div className="py-16 text-center text-slate-350 bg-slate-50 border border-slate-100 rounded-[0.25rem]">
                                    <ChatBubbleLeftRightIcon className="h-10 w-10 mx-auto mb-2 opacity-50" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">Belum ada testimoni</span>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
                                    {testimonials.map(testi => (
                                        <div key={testi.id} className="p-6 border border-slate-150 rounded-[0.25rem] bg-white hover:border-slate-300 transition-all relative group shadow-sm flex flex-col justify-between">
                                            <div>
                                                <div className="flex items-center justify-between mb-4">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0">
                                                            {testi.image_url ? (
                                                                <img src={testi.image_url} alt={testi.name} className="w-full h-full object-cover" />
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center bg-brand-primary/5 text-brand-primary font-bold text-sm">
                                                                    {testi.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                                                                {testi.name}
                                                                {!testi.is_active && (
                                                                    <span className="text-[7px] font-bold uppercase tracking-widest bg-slate-100 border border-slate-250 text-slate-400 px-1.5 py-0.5 rounded-[0.15rem]">
                                                                        Draft
                                                                    </span>
                                                                )}
                                                            </h4>
                                                            <p className="text-[10px] text-slate-450 uppercase tracking-widest mt-0.5">{testi.info}</p>
                                                            <div className="flex items-center gap-0.5 mt-1">
                                                                {[...Array(5)].map((_, i) => (
                                                                    <span key={i} className={`text-xs ${i < testi.stars ? 'text-amber-400' : 'text-slate-250'}`}>★</span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="text-xs text-slate-600 italic leading-relaxed">"{testi.quote}"</p>
                                            </div>

                                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1.5">
                                                <button 
                                                    onClick={() => openEditTestimonial(testi)}
                                                    className="p-2 bg-white border border-slate-200 rounded text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors shadow-sm"
                                                    title="Edit Testimoni"
                                                >
                                                    <PencilSquareIcon className="h-4 w-4" />
                                                </button>
                                                <button 
                                                    onClick={() => deleteTestimonial(testi.id)}
                                                    className="p-2 bg-white border border-slate-200 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors shadow-sm"
                                                    title="Hapus Testimoni"
                                                >
                                                    <TrashIcon className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                </div>
            </div>

            {/* Testimonial Modal */}
            {isTestimonialModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white w-full max-w-md rounded-[0.25rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                        
                        {/* Header */}
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                            <div>
                                <span className="text-[8px] font-black text-brand-primary uppercase tracking-[0.2em]">
                                    Manajemen Testimoni
                                </span>
                                <h3 className="font-bold uppercase tracking-tight text-slate-900 text-sm mt-0.5">
                                    {editingTestimonial ? 'Ubah Testimoni' : 'Tambah Testimoni Baru'}
                                </h3>
                            </div>
                            <button 
                                onClick={closeTestimonialModal} 
                                className="text-slate-455 hover:text-slate-900 text-2xl leading-none"
                            >
                                &times;
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={submitTestimonial} className="flex-1 overflow-y-auto min-h-0 p-8 space-y-5">
                            <div>
                                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Nama Pengirim</label>
                                <input 
                                    type="text" 
                                    className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-3 text-xs focus:ring-1 focus:ring-brand-primary outline-none"
                                    value={testimonialForm.data.name}
                                    onChange={e => testimonialForm.setData('name', e.target.value)}
                                    required
                                    placeholder="Contoh: Budi Santoso"
                                />
                                {testimonialForm.errors.name && <p className="text-[10px] text-red-500 mt-1">{testimonialForm.errors.name}</p>}
                            </div>

                            <div>
                                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Info / Jabatan / Hubungan</label>
                                <input 
                                    type="text" 
                                    className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-3 text-xs focus:ring-1 focus:ring-brand-primary outline-none"
                                    value={testimonialForm.data.info}
                                    onChange={e => testimonialForm.setData('info', e.target.value)}
                                    required
                                    placeholder="Contoh: Wali Santri SD, Alumni Angkatan 2020"
                                />
                                {testimonialForm.errors.info && <p className="text-[10px] text-red-500 mt-1">{testimonialForm.errors.info}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Rating Bintang</label>
                                    <select 
                                        className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-3 text-xs focus:ring-1 focus:ring-brand-primary outline-none"
                                        value={testimonialForm.data.stars}
                                        onChange={e => testimonialForm.setData('stars', parseInt(e.target.value))}
                                        required
                                    >
                                        <option value={5}>⭐⭐⭐⭐⭐ (5 Bintang)</option>
                                        <option value={4}>⭐⭐⭐⭐ (4 Bintang)</option>
                                        <option value={3}>⭐⭐⭐ (3 Bintang)</option>
                                        <option value={2}>⭐⭐ (2 Bintang)</option>
                                        <option value={1}>⭐ (1 Bintang)</option>
                                    </select>
                                    {testimonialForm.errors.stars && <p className="text-[10px] text-red-500 mt-1">{testimonialForm.errors.stars}</p>}
                                </div>

                                {editingTestimonial && (
                                    <div>
                                        <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Status Tampilan</label>
                                        <select 
                                            className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-3 text-xs focus:ring-1 focus:ring-brand-primary outline-none"
                                            value={testimonialForm.data.is_active ? '1' : '0'}
                                            onChange={e => testimonialForm.setData('is_active', e.target.value === '1')}
                                            required
                                        >
                                            <option value="1">Aktif (Tampilkan)</option>
                                            <option value="0">Draft (Sembunyikan)</option>
                                        </select>
                                        {testimonialForm.errors.is_active && <p className="text-[10px] text-red-500 mt-1">{testimonialForm.errors.is_active}</p>}
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">Foto Profil (Rasio 1:1)</label>
                                <div className="relative aspect-square w-24 bg-slate-50 rounded-full overflow-hidden border border-dashed border-slate-200 group hover:border-brand-primary transition-colors flex items-center justify-center mx-auto">
                                    {testimonialImagePreview ? (
                                        <img src={testimonialImagePreview} className="w-full h-full object-cover pointer-events-none" alt="Preview" />
                                    ) : (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-350 pointer-events-none">
                                            <PhotoIcon className="h-6 w-6 mb-1" />
                                            <span className="text-[8px] font-bold uppercase tracking-widest text-center px-1">Pilih Foto</span>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10 pointer-events-none">
                                        <span className="text-white text-[8px] font-bold uppercase tracking-[0.2em] border border-white/40 px-2 py-1 cursor-pointer">Ganti</span>
                                    </div>
                                    <ImageInputWithCrop 
                                        className="absolute inset-0 z-20"
                                        aspectRatio={1}
                                        title="Potong Foto Profil (1:1)"
                                        onChange={(file) => {
                                            testimonialForm.setData('image_file', file);
                                            if (file) setTestimonialImagePreview(URL.createObjectURL(file));
                                        }}
                                    />
                                </div>
                                {testimonialForm.errors.image_file && <p className="text-[10px] text-red-500 text-center mt-1">{testimonialForm.errors.image_file}</p>}
                            </div>

                            <div>
                                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Kutipan Testimoni</label>
                                <textarea 
                                    className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-3 text-xs focus:ring-1 focus:ring-brand-primary outline-none min-h-[80px]"
                                    value={testimonialForm.data.quote}
                                    onChange={e => testimonialForm.setData('quote', e.target.value)}
                                    required
                                    placeholder="Tulis testimoni/kesan pesan..."
                                />
                                {testimonialForm.errors.quote && <p className="text-[10px] text-red-500 mt-1">{testimonialForm.errors.quote}</p>}
                            </div>

                            <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
                                <button 
                                    type="button" 
                                    onClick={closeTestimonialModal} 
                                    className="px-4 py-2.5 text-[9px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors"
                                >
                                    Batal
                                </button>
                                <button 
                                    type="submit" 
                                    disabled={testimonialForm.processing}
                                    className="bg-brand-primary text-white py-2.5 px-6 text-[9px] font-bold uppercase tracking-widest rounded-[0.25rem] hover:bg-slate-900 transition-all shadow-xl shadow-brand-primary/20"
                                >
                                    {testimonialForm.processing ? 'Menyimpan...' : 'Simpan Testimoni'}
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
                        <div className={`bg-white w-full ${isEditing ? 'max-w-6xl' : 'max-w-md'} rounded-[0.25rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]`}>
                            
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
                                    className="text-slate-450 hover:text-slate-900 text-2xl leading-none"
                                >
                                    &times;
                                </button>
                            </div>

                            {/* Content Body */}
                            <div className="flex-1 overflow-y-auto min-h-0">
                                <div className={`grid grid-cols-1 ${isEditing ? 'md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-slate-100' : ''}`}>
                                    
                                    {/* LEFT COLUMN: BASIC DATA & MAIN IMAGE */}
                                    {(!isEditing || !activeFasilitas?.is_utama) && (
                                        <div className={`${isEditing ? 'md:col-span-5 p-8' : 'p-8'} space-y-6`}>
                                            <form onSubmit={submitFasilitas} className="space-y-5">
                                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">
                                                    Informasi Utama & Gambar Sampul
                                                </h4>
                                                
                                                {!fasilitasForm.data.is_utama && (
                                                    <div>
                                                        <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Pilih Unit (Lembaga)</label>
                                                        <select 
                                                            className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-3 text-xs focus:ring-1 focus:ring-brand-primary outline-none"
                                                            value={fasilitasForm.data.lembaga_id}
                                                            onChange={e => fasilitasForm.setData('lembaga_id', e.target.value)}
                                                            required={!fasilitasForm.data.is_utama}
                                                        >
                                                            <option value="" disabled>-- Pilih Unit --</option>
                                                            {lembagas.map(l => (
                                                                <option key={l.id} value={l.id}>{l.nama}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                )}

                                                <div>
                                                    <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Nama Fasilitas</label>
                                                    <input 
                                                        type="text" 
                                                        className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-3 text-xs focus:ring-1 focus:ring-brand-primary outline-none"
                                                        value={fasilitasForm.data.nama}
                                                        onChange={e => fasilitasForm.setData('nama', e.target.value)}
                                                        required
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Kategori Fasilitas</label>
                                                    <input 
                                                        type="text" 
                                                        className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-3 text-xs focus:ring-1 focus:ring-brand-primary outline-none"
                                                        value={fasilitasForm.data.kategori}
                                                        onChange={e => fasilitasForm.setData('kategori', e.target.value)}
                                                        placeholder="Contoh: Gedung, Laboratorium, Lapangan"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Deskripsi Fasilitas</label>
                                                    <textarea 
                                                        className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-3 text-xs focus:ring-1 focus:ring-brand-primary outline-none min-h-[60px]"
                                                        value={fasilitasForm.data.deskripsi}
                                                        onChange={e => fasilitasForm.setData('deskripsi', e.target.value)}
                                                        placeholder="Deskripsi singkat..."
                                                    />
                                                </div>

                                                <div>
                                                     <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">Gambar Sampul Utama (Rasio 4:3)</label>
                                                     <div className="relative aspect-[4/3] w-full bg-slate-50 rounded-[0.25rem] overflow-hidden border border-dashed border-slate-200 group hover:border-brand-primary transition-colors flex items-center justify-center">
                                                         {fasilitasPreview ? (
                                                             <img src={fasilitasPreview} className="w-full h-full object-cover pointer-events-none" alt="Preview" />
                                                         ) : (
                                                             <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-350 pointer-events-none">
                                                                 <PhotoIcon className="h-8 w-8 mb-1" />
                                                                 <span className="text-[8px] font-bold uppercase tracking-widest">Pilih Gambar</span>
                                                             </div>
                                                         )}
                                                         <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10 pointer-events-none">
                                                             <span className="text-white text-[8px] font-bold uppercase tracking-[0.2em] border border-white/40 px-3 py-1.5 cursor-pointer">Ganti Sampul</span>
                                                         </div>
                                                         <ImageInputWithCrop 
                                                             className="absolute inset-0 z-20"
                                                             aspectRatio={4/3}
                                                             title="Potong Gambar Sampul (4:3)"
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
                                                        className="bg-brand-primary text-white py-2.5 px-6 text-[9px] font-bold uppercase tracking-widest rounded-[0.25rem] hover:bg-slate-900 transition-all shadow-xl shadow-brand-primary/20"
                                                    >
                                                        {fasilitasForm.processing ? 'Menyimpan...' : 'Simpan Fasilitas'}
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    )}

                                    {/* RIGHT COLUMN: INTEGRATED PHOTO GALLERY (ONLY WHEN EDITING) */}
                                    {isEditing && (
                                        <div className={`${activeFasilitas?.is_utama ? 'md:col-span-12' : 'md:col-span-7'} p-8 flex flex-col min-h-0 bg-slate-50/50 space-y-6`}>
                                            
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
                                                    <div className="flex-1 relative h-16 bg-slate-50 border border-dashed border-slate-200 rounded flex items-center justify-center group overflow-hidden">
                                                        {galeriPreview ? (
                                                            <>
                                                                <img src={galeriPreview} className="w-full h-full object-cover pointer-events-none" alt="Preview" />
                                                                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10 pointer-events-none">
                                                                    <span className="text-white text-[8px] font-bold uppercase tracking-wider border border-white/40 px-2.5 py-1">Ganti</span>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <div className="flex flex-col items-center justify-center text-slate-350 pointer-events-none">
                                                                <PhotoIcon className="h-4 w-4 mb-0.5" />
                                                                <span className="text-[8px] font-bold uppercase tracking-wider">Pilih Foto Galeri</span>
                                                            </div>
                                                        )}
                                                        <ImageInputWithCrop 
                                                            className="absolute inset-0 z-20"
                                                            aspectRatio={4/3}
                                                            title="Potong Foto Galeri (4:3)"
                                                            onChange={(file) => {
                                                                galeriForm.setData('image', file);
                                                                if (file) setGaleriPreview(URL.createObjectURL(file));
                                                            }}
                                                        />
                                                    </div>
                                                    <button 
                                                        type="submit" 
                                                        disabled={galeriForm.processing}
                                                        className="bg-slate-900 hover:bg-brand-primary text-white text-[8px] font-bold uppercase tracking-widest px-6 h-16 rounded-[0.25rem] transition-colors"
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
                                                
                                                <div className="flex-1 overflow-y-auto pr-1">
                                                    {activePhotos.length === 0 ? (
                                                        <div className="py-12 text-center text-slate-350">
                                                            <PhotoIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
                                                            <span className="text-[8px] font-bold uppercase tracking-widest">Belum ada foto galeri</span>
                                                        </div>
                                                    ) : (
                                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                                            {activePhotos.map((g) => (
                                                                <div key={g.id} className="bg-white border border-slate-200 rounded overflow-hidden relative group/gal shadow-sm">
                                                                    <div className="aspect-[4/3] w-full bg-slate-100 overflow-hidden relative">
                                                                        <img src={g.image_url} className="w-full h-full object-cover" alt="Galeri" />
                                                                        <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover/gal:opacity-100 transition-opacity flex items-center justify-center gap-1.5">
                                                                            <button 
                                                                                type="button" 
                                                                                onClick={() => startEditGaleri(g)} 
                                                                                className="p-1 rounded bg-white/20 hover:bg-brand-primary text-white transition-colors"
                                                                                title="Edit"
                                                                            >
                                                                                <PencilSquareIcon className="h-3.5 w-3.5" />
                                                                            </button>
                                                                            <button 
                                                                                type="button" 
                                                                                onClick={() => deleteGaleri(g.id)} 
                                                                                className="p-1 rounded bg-white/20 hover:bg-red-600 text-white transition-colors"
                                                                                title="Hapus"
                                                                            >
                                                                                <TrashIcon className="h-3.5 w-3.5" />
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                    <div className="p-2 bg-white">
                                                                        <h5 className="text-[9px] font-bold uppercase tracking-widest text-slate-900 truncate">{g.judul || 'Tanpa Judul'}</h5>
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
                        </div>
                    </div>
                );
            })()}
        </IndukAdminLayout>
    );
}
