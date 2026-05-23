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
    PhotoIcon
} from '@heroicons/react/24/outline';
import ImageInputWithCrop from '@/Components/ImageInputWithCrop';

export default function Index({ settings, testimonials, beritaList = [], categories = [] }) {
    const [activeTab, setActiveTab] = useState('settings');
    const [heroBgPreview, setHeroBgPreview] = useState(settings.hero_bg || null);
    const [heroBgMobilePreview, setHeroBgMobilePreview] = useState(settings.hero_bg_mobile || null);
    const [aboutImagePreview, setAboutImagePreview] = useState(settings.about_image || null);

    const { data, setData, post, processing, errors } = useForm({
        hero_bg: null,
        hero_bg_mobile: null,
        hero_subtitle: settings.hero_subtitle || '',
        about_title_small: settings.about_title_small || '',
        about_title_large: settings.about_title_large || '',
        about_description_short: settings.about_description_short || '',
        about_description: settings.about_description || '',
        about_image: null,
        about_method_desc: settings.about_method_desc || '',
        about_env_desc: settings.about_env_desc || '',
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
        youtube_video_urls: settings.youtube_video_urls && settings.youtube_video_urls.trim().startsWith('[') 
            ? settings.youtube_video_urls 
            : JSON.stringify(settings.youtube_video_urls ? settings.youtube_video_urls.split('\n').map(u => u.trim()).filter(Boolean) : []),
    });

    const [videoList, setVideoList] = useState(() => {
        try {
            if (settings.youtube_video_urls) {
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

    const { data: newsData, setData: setNewsData, post: postNews, processing: newsProcessing } = useForm({
        hero_news_category_id: settings.hero_news_category_id || '',
        sticky_announcement_category_id: settings.sticky_announcement_category_id || '',
        sticky_article_category_id: settings.sticky_article_category_id || '',
        bottom_news_category_id: settings.bottom_news_category_id || '',
    });

    const handleSettingsSubmit = (e) => {
        e.preventDefault();
        post(route('admin.landing.settings.update'));
    };

    const handleNewsSubmit = (e) => {
        e.preventDefault();
        postNews(route('admin.landing.settings.update'), {
            onSuccess: () => {
                alert('Pilihan kategori berita beranda berhasil disimpan!');
            }
        });
    };

    return (
        <IndukAdminLayout title="Pengaturan Beranda">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                
                {/* Header */}
                <div className="mb-10">
                    <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-accent mb-2">Manajemen Konten</h2>
                    <h1 className="text-4xl font-semibold uppercase tracking-tighter text-slate-900 leading-none">Pengaturan <br /><span className="text-brand-primary">Halaman Beranda</span></h1>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-2 mb-8 border-b border-slate-200">
                    <button 
                        onClick={() => setActiveTab('settings')}
                        className={`px-6 py-4 text-xs font-semibold uppercase tracking-widest transition-all border-b-2 flex items-center gap-2 ${
                            activeTab === 'settings' 
                            ? 'border-brand-primary text-brand-primary' 
                            : 'border-transparent text-slate-400 hover:text-brand-primary'
                        }`}
                    >
                        <Cog6ToothIcon className="h-4 w-4" />
                        Konfigurasi Teks
                    </button>
                    <button 
                        onClick={() => setActiveTab('news_selection')}
                        className={`px-6 py-4 text-xs font-semibold uppercase tracking-widest transition-all border-b-2 flex items-center gap-2 ${
                            activeTab === 'news_selection' 
                            ? 'border-brand-primary text-brand-primary' 
                            : 'border-transparent text-slate-400 hover:text-brand-primary'
                        }`}
                    >
                        <NewspaperIcon className="h-4 w-4" />
                        Pilihan Berita
                    </button>
                    <button 
                        onClick={() => setActiveTab('testimonials')}
                        className={`px-6 py-4 text-xs font-semibold uppercase tracking-widest transition-all border-b-2 flex items-center gap-2 ${
                            activeTab === 'testimonials' 
                            ? 'border-brand-primary text-brand-primary' 
                            : 'border-transparent text-slate-400 hover:text-brand-primary'
                        }`}
                    >
                        <ChatBubbleLeftRightIcon className="h-4 w-4" />
                        Testimoni
                    </button>
                </div>

                {/* Content Sections */}
                <div className="bg-white rounded-[0.25rem] border border-slate-200 shadow-sm overflow-hidden">
                    
                    {/* 1. Settings Tab */}
                    {activeTab === 'settings' && (
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
                                                aspectRatio={21/9}
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
                                                aspectRatio={3/4}
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
                            </div>

                            {/* About Section */}
                            <div className="space-y-6 pt-6 border-t border-slate-100">
                                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest border-l-4 border-brand-primary pl-4">Bagian Tentang Kami</h3>
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

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-2">Pendidikan (Holistik/Metode)</label>
                                        <textarea 
                                            rows="2"
                                            value={data.about_method_desc} 
                                            onChange={e => setData('about_method_desc', e.target.value)}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-[0.25rem] text-sm focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                                            placeholder="Contoh: Holistik — mengintegrasikan sains, teknologi, dan ilmu agama."
                                        ></textarea>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-2">Lingkungan Siswa (Asrama/Adab)</label>
                                        <textarea 
                                            rows="2"
                                            value={data.about_env_desc} 
                                            onChange={e => setData('about_env_desc', e.target.value)}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-[0.25rem] text-sm focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                                            placeholder="Contoh: Asrama nyaman dengan pembiasaan adab harian yang terstruktur."
                                        ></textarea>
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
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* About Image Upload (3:4) */}
                                <div className="space-y-3">
                                    <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-2">Foto Profil "Mengenal Lebih Dekat" (3:4)</label>
                                    <div className="relative aspect-[3/4] w-full max-w-[160px] bg-slate-50 rounded-[0.25rem] overflow-hidden border border-slate-200 group flex items-center justify-center shadow-sm">
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
                                            aspectRatio={3/4}
                                            title="Potong Foto Profil (3:4)"
                                            onChange={(file) => {
                                                setData('about_image', file);
                                                if (file) setAboutImagePreview(URL.createObjectURL(file));
                                            }}
                                        />
                                    </div>
                                    <p className="text-[9px] text-slate-400 italic">
                                        Rasio ideal 3:4. Foto yang tampil di section "Mengenal Lebih Dekat" beranda.
                                    </p>
                                </div>
                            </div>

                            {/* PPDB CTA */}
                            <div className="space-y-6 pt-6 border-t border-slate-100">
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

                            {/* Video YouTube Section */}
                            <div className="space-y-6 pt-6 border-t border-slate-100">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest border-l-4 border-brand-primary pl-4">Bagian Video YouTube (Beranda)</h3>
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

                    {/* 2. News Selection Tab */}
                    {activeTab === 'news_selection' && (
                        <form onSubmit={handleNewsSubmit} className="p-8 space-y-10">
                            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                                <div>
                                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Pilihan Kategori Berita Beranda</h3>
                                    <p className="text-xs text-slate-400 mt-1">Pilih kategori berita yang ingin ditampilkan pada slide utama (Hero) dan sidebar beranda.</p>
                                </div>
                                <button 
                                    type="submit" 
                                    disabled={newsProcessing}
                                    className="bg-brand-primary hover:bg-slate-900 text-white text-xs font-semibold uppercase tracking-widest px-8 py-3 transition-all rounded-[0.25rem] shadow-lg shadow-brand-primary/15 disabled:opacity-50"
                                >
                                    Simpan Pilihan
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                {/* Section 1: Hero News Category */}
                                <div className="bg-slate-50 p-6 rounded-[0.25rem] border border-slate-100 space-y-4">
                                    <div>
                                        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                                            1. Kategori Hero Slider
                                        </h4>
                                        <p className="text-[11px] text-slate-400 mt-1">Daftar slide berita utama akan diisi otomatis dari berita terbaru dengan kategori yang dipilih.</p>
                                    </div>
                                    <select
                                        value={newsData.hero_news_category_id}
                                        onChange={e => setNewsData('hero_news_category_id', e.target.value)}
                                        className="w-full bg-white border border-slate-200 rounded-[0.25rem] px-3 py-2 text-xs outline-none focus:ring-1 focus:ring-brand-primary"
                                    >
                                        <option value="">Semua Kategori (Terbaru)</option>
                                        {categories.map(c => (
                                            <option key={c.id} value={c.id}>{c.name}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Section 2: Sticky 1 Category */}
                                <div className="bg-slate-50 p-6 rounded-[0.25rem] border border-slate-100 space-y-4">
                                    <div>
                                        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                                            2. Kategori Sticky 1 (Sidebar)
                                        </h4>
                                        <p className="text-[11px] text-slate-400 mt-1">Menampilkan berita terbaru dari kategori ini pada widget pertama di sidebar kanan (default: Pengumuman).</p>
                                    </div>
                                    <select
                                        value={newsData.sticky_announcement_category_id}
                                        onChange={e => setNewsData('sticky_announcement_category_id', e.target.value)}
                                        className="w-full bg-white border border-slate-200 rounded-[0.25rem] px-3 py-2 text-xs outline-none focus:ring-1 focus:ring-brand-primary"
                                    >
                                        <option value="">Pilih Kategori...</option>
                                        {categories.map(c => (
                                            <option key={c.id} value={c.id}>{c.name}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Section 3: Sticky 2 Category */}
                                <div className="bg-slate-50 p-6 rounded-[0.25rem] border border-slate-100 space-y-4">
                                    <div>
                                        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                                            3. Kategori Sticky 2 (Sidebar)
                                        </h4>
                                        <p className="text-[11px] text-slate-400 mt-1">Menampilkan berita terbaru dari kategori ini pada widget kedua di sidebar kanan (default: Artikel).</p>
                                    </div>
                                    <select
                                        value={newsData.sticky_article_category_id}
                                        onChange={e => setNewsData('sticky_article_category_id', e.target.value)}
                                        className="w-full bg-white border border-slate-200 rounded-[0.25rem] px-3 py-2 text-xs outline-none focus:ring-1 focus:ring-brand-primary"
                                    >
                                        <option value="">Pilih Kategori...</option>
                                        {categories.map(c => (
                                            <option key={c.id} value={c.id}>{c.name}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Section 4: Bottom News Category */}
                                <div className="bg-slate-50 p-6 rounded-[0.25rem] border border-slate-100 space-y-4">
                                    <div>
                                        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                                            4. Kategori Beranda Bawah
                                        </h4>
                                        <p className="text-[11px] text-slate-400 mt-1">Menampilkan berita terbaru dari kategori ini pada section khusus di bawah Informasi Terbaru.</p>
                                    </div>
                                    <select
                                        value={newsData.bottom_news_category_id}
                                        onChange={e => setNewsData('bottom_news_category_id', e.target.value)}
                                        className="w-full bg-white border border-slate-200 rounded-[0.25rem] px-3 py-2 text-xs outline-none focus:ring-1 focus:ring-brand-primary"
                                    >
                                        <option value="">Jangan Tampilkan / Kosong</option>
                                        {categories.map(c => (
                                            <option key={c.id} value={c.id}>{c.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </form>
                    )}

                    {/* 3. Testimonials Tab */}
                    {activeTab === 'testimonials' && (
                        <div className="p-8">
                             <div className="flex justify-between items-center mb-8">
                                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Daftar Testimoni</h3>
                                <button className="inline-flex items-center gap-2 bg-brand-primary hover:bg-slate-900 text-white text-[10px] font-semibold uppercase tracking-widest px-4 py-2 transition-all rounded-[0.25rem]">
                                    <PlusIcon className="h-3 w-3" />
                                    Tambah Testimoni
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {testimonials.map(testi => (
                                    <div key={testi.id} className="p-6 border border-slate-100 rounded-[0.25rem] bg-slate-50 relative group">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-200">
                                                <img src={testi.image_url} alt="" className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-900 text-sm">{testi.name}</h4>
                                                <p className="text-[10px] text-slate-400 uppercase tracking-widest">{testi.info}</p>
                                            </div>
                                        </div>
                                        <p className="text-sm text-slate-600 italic">"{testi.quote}"</p>
                                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                                            <button className="p-1.5 bg-white border border-slate-200 rounded text-slate-400 hover:text-brand-primary"><PencilSquareIcon className="h-3.5 w-3.5" /></button>
                                            <button className="p-1.5 bg-white border border-slate-200 rounded text-slate-400 hover:text-red-500"><TrashIcon className="h-3.5 w-3.5" /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </IndukAdminLayout>
    );
}
