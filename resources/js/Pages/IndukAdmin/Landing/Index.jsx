import React, { useState } from 'react';
import IndukAdminLayout from '@/Layouts/Induk/IndukAdminLayout';
import { useForm, router } from '@inertiajs/react';
import { 
    Cog6ToothIcon, 
    ChatBubbleLeftRightIcon, 
    CalendarDaysIcon,
    PlusIcon,
    PencilSquareIcon,
    TrashIcon,
    PhotoIcon
} from '@heroicons/react/24/outline';
import ImageInputWithCrop from '@/Components/ImageInputWithCrop';

export default function Index({ settings, testimonials, events }) {
    const [activeTab, setActiveTab] = useState('settings');
    const [heroBgPreview, setHeroBgPreview] = useState(settings.hero_bg || null);
    const [heroBgMobilePreview, setHeroBgMobilePreview] = useState(settings.hero_bg_mobile || null);

    const { data, setData, post, processing, errors } = useForm({
        hero_bg: null,
        hero_bg_mobile: null,
        hero_subtitle: settings.hero_subtitle || '',
        about_title_small: settings.about_title_small || '',
        about_title_large: settings.about_title_large || '',
        about_description_short: settings.about_description_short || '',
        about_description: settings.about_description || '',
        ppdb_cta_title: settings.ppdb_cta_title || '',
        ppdb_wave_1: settings.ppdb_wave_1 || '',
        ppdb_wave_2: settings.ppdb_wave_2 || '',
    });

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
                        onClick={() => setActiveTab('events')}
                        className={`px-6 py-4 text-xs font-semibold uppercase tracking-widest transition-all border-b-2 flex items-center gap-2 ${
                            activeTab === 'events' 
                            ? 'border-brand-primary text-brand-primary' 
                            : 'border-transparent text-slate-400 hover:text-brand-primary'
                        }`}
                    >
                        <CalendarDaysIcon className="h-4 w-4" />
                        Agenda & Event
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

                    {/* 2. Events Tab */}
                    {activeTab === 'events' && (
                        <div className="p-8">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Daftar Event Mendatang</h3>
                                <button className="inline-flex items-center gap-2 bg-brand-primary hover:bg-slate-900 text-white text-[10px] font-semibold uppercase tracking-widest px-4 py-2 transition-all rounded-[0.25rem]">
                                    <PlusIcon className="h-3 w-3" />
                                    Tambah Event
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-slate-50 text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
                                            <th className="px-6 py-4">Event</th>
                                            <th className="px-6 py-4">Tanggal</th>
                                            <th className="px-6 py-4">Lembaga</th>
                                            <th className="px-6 py-4">Lokasi</th>
                                            <th className="px-6 py-4 text-right">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {events.map(event => (
                                            <tr key={event.id} className="text-sm hover:bg-slate-50/50">
                                                <td className="px-6 py-4 font-semibold text-slate-700">{event.title}</td>
                                                <td className="px-6 py-4 text-slate-500">{event.date}</td>
                                                <td className="px-6 py-4 text-slate-500">{event.lembaga}</td>
                                                <td className="px-6 py-4 text-slate-500">{event.lokasi}</td>
                                                <td className="px-6 py-4 text-right space-x-2">
                                                    <button className="p-1.5 text-slate-400 hover:text-brand-primary"><PencilSquareIcon className="h-4 w-4" /></button>
                                                    <button className="p-1.5 text-slate-400 hover:text-red-500"><TrashIcon className="h-4 w-4" /></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
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
