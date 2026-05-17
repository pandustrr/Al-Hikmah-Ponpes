import React, { useState } from 'react';
import IndukAdminLayout from '@/Layouts/Induk/IndukAdminLayout';
import { useForm, usePage } from '@inertiajs/react';
import { 
    PhotoIcon, 
    PlusIcon, 
    TrashIcon, 
    CheckCircleIcon 
} from '@heroicons/react/24/outline';

export default function Index({ settings = {} }) {
    const { flash } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        // Hero Section
        profil_hero_tagline: settings.profil_hero_tagline || 'Mengenal Lebih Dekat',
        profil_hero_title: settings.profil_hero_title || 'PROFIL YPDS AL-HIKMAH',
        profil_hero_desc: settings.profil_hero_desc || 'Membangun Adab dan Ilmu Sejak Dini. YPDS Al-Hikmah adalah lembaga pendidikan Islam terpadu yang berdedikasi untuk mencetak generasi yang cerdas secara intelektual dan kokoh secara spiritual di Jember.',
        profil_hero_btn1: settings.profil_hero_btn1 || 'Sejarah Lembaga',
        profil_hero_btn2: settings.profil_hero_btn2 || 'Visi & Misi',
        hero_bg_file: null,

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
        profil_image_file: null,

        // Visi & Misi
        profil_visi_text: settings.profil_visi_text || 'Menjadi lembaga pendidikan Islam terkemuka yang melahirkan generasi beradab, berilmu, dan bermanfaat bagi semesta alam.',
        profil_misi_list: settings.profil_misi_list || [
            'Menyelenggarakan pendidikan berbasis adab dan akhlak mulia sesuai nilai-nilai Islam.',
            'Mengembangkan potensi intelektual siswa melalui kurikulum yang integratif dan komprehensif.'
        ],

        // Sejarah
        profil_sejarah_tagline: settings.profil_sejarah_tagline || 'Sejarah Perjalanan',
        profil_sejarah_title: settings.profil_sejarah_title || 'Jejak Langkah',
        profil_sejarah_desc: settings.profil_sejarah_desc || 'Membangun Peradaban Sejak 1995',
        profil_sejarah_timeline: settings.profil_sejarah_timeline || [
            { year: '1995', title: 'Peletakan Batu Pertama', desc: 'YPDS Al-Hikmah didirikan...' }
        ],
    });

    const [activeTab, setActiveTab] = useState('hero');

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.tentang.update'), {
            preserveScroll: true,
            forceFormData: true,
        });
    };

    // Helper for handling dynamic array fields
    const handleMisiChange = (index, value) => {
        const newMisi = [...data.profil_misi_list];
        newMisi[index] = value;
        setData('profil_misi_list', newMisi);
    };

    const addMisi = () => {
        setData('profil_misi_list', [...data.profil_misi_list, '']);
    };

    const removeMisi = (index) => {
        const newMisi = data.profil_misi_list.filter((_, i) => i !== index);
        setData('profil_misi_list', newMisi);
    };

    const handleTimelineChange = (index, field, value) => {
        const newTimeline = [...data.profil_sejarah_timeline];
        newTimeline[index][field] = value;
        setData('profil_sejarah_timeline', newTimeline);
    };

    const addTimeline = () => {
        setData('profil_sejarah_timeline', [...data.profil_sejarah_timeline, { year: '', title: '', desc: '' }]);
    };

    const removeTimeline = (index) => {
        const newTimeline = data.profil_sejarah_timeline.filter((_, i) => i !== index);
        setData('profil_sejarah_timeline', newTimeline);
    };

    const tabs = [
        { id: 'hero', name: 'Hero & Statistik' },
        { id: 'tentang', name: 'Tentang Kami' },
        { id: 'visimisi', name: 'Visi & Misi' },
        { id: 'sejarah', name: 'Sejarah Lembaga' },
    ];

    return (
        <IndukAdminLayout title="Pengaturan Profil">
            <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                
                {flash.success && (
                    <div className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-[0.25rem] flex items-center gap-3">
                        <CheckCircleIcon className="w-5 h-5" />
                        <span className="text-sm font-medium">{flash.success}</span>
                    </div>
                )}

                <div className="mb-8">
                    <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-accent mb-2">Pusat Yayasan</h2>
                    <h1 className="text-3xl font-semibold uppercase tracking-tighter text-slate-900">Pengaturan Profil</h1>
                </div>

                <div className="bg-white rounded-[0.25rem] border border-slate-200 shadow-sm overflow-hidden">
                    {/* Tabs */}
                    <div className="border-b border-slate-200 bg-slate-50 flex overflow-x-auto">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-6 py-4 text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-colors ${
                                    activeTab === tab.id 
                                        ? 'bg-white text-brand-primary border-t-2 border-t-brand-primary border-x border-x-slate-200 -mb-px' 
                                        : 'text-slate-500 hover:text-brand-primary hover:bg-slate-100'
                                }`}
                            >
                                {tab.name}
                            </button>
                        ))}
                    </div>

                    {/* Form */}
                    <form onSubmit={submit} className="p-6 md:p-8">
                        
                        {/* HERO TAB */}
                        <div className={activeTab === 'hero' ? 'block' : 'hidden'}>
                            <h3 className="text-lg font-serif font-bold text-slate-900 mb-6 uppercase tracking-tight">Bagian Hero Atas</h3>
                            
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Latar Belakang Hero (Gambar)</label>
                                    <div className="flex items-center gap-6">
                                        <div className="w-32 h-20 bg-slate-100 border border-slate-200 rounded-[0.25rem] overflow-hidden flex items-center justify-center shrink-0">
                                            {settings.profil_hero_bg ? (
                                                <img src={settings.profil_hero_bg} alt="Hero" className="w-full h-full object-cover" />
                                            ) : (
                                                <PhotoIcon className="w-8 h-8 text-slate-300" />
                                            )}
                                        </div>
                                        <input
                                            type="file"
                                            onChange={e => setData('hero_bg_file', e.target.files[0])}
                                            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-[0.25rem] file:border-0 file:text-xs file:font-semibold file:bg-brand-primary/10 file:text-brand-primary hover:file:bg-brand-primary/20 transition-colors"
                                            accept="image/*"
                                        />
                                    </div>
                                    <p className="text-[10px] text-slate-400 mt-2">Format: JPG/PNG, Max: 2MB. Resolusi ideal: 1920x1080px.</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Tagline (Teks Kecil)</label>
                                        <input type="text" value={data.profil_hero_tagline} onChange={e => setData('profil_hero_tagline', e.target.value)} className="w-full rounded-[0.25rem] border-slate-300 text-sm focus:border-brand-primary focus:ring-brand-primary shadow-sm" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Judul Utama</label>
                                        <input type="text" value={data.profil_hero_title} onChange={e => setData('profil_hero_title', e.target.value)} className="w-full rounded-[0.25rem] border-slate-300 text-sm focus:border-brand-primary focus:ring-brand-primary shadow-sm" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Deskripsi Singkat</label>
                                    <textarea rows={3} value={data.profil_hero_desc} onChange={e => setData('profil_hero_desc', e.target.value)} className="w-full rounded-[0.25rem] border-slate-300 text-sm focus:border-brand-primary focus:ring-brand-primary shadow-sm"></textarea>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Teks Tombol 1</label>
                                        <input type="text" value={data.profil_hero_btn1} onChange={e => setData('profil_hero_btn1', e.target.value)} className="w-full rounded-[0.25rem] border-slate-300 text-sm focus:border-brand-primary focus:ring-brand-primary shadow-sm" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Teks Tombol 2</label>
                                        <input type="text" value={data.profil_hero_btn2} onChange={e => setData('profil_hero_btn2', e.target.value)} className="w-full rounded-[0.25rem] border-slate-300 text-sm focus:border-brand-primary focus:ring-brand-primary shadow-sm" />
                                    </div>
                                </div>

                                <hr className="border-slate-100 my-8" />
                                <h3 className="text-lg font-serif font-bold text-slate-900 mb-6 uppercase tracking-tight">Statistik Bar</h3>

                                <div className="grid grid-cols-2 gap-6">
                                    {[1, 2, 3, 4].map(num => (
                                        <div key={num} className="bg-slate-50 p-4 border border-slate-100 rounded-[0.25rem]">
                                            <h4 className="text-[10px] font-bold text-brand-primary uppercase tracking-widest mb-4">Statistik {num}</h4>
                                            <div className="space-y-4">
                                                <div>
                                                    <label className="block text-[10px] font-bold text-slate-500 mb-1">Nilai (misal: 25+)</label>
                                                    <input type="text" value={data[`profil_stat${num}_value`]} onChange={e => setData(`profil_stat${num}_value`, e.target.value)} className="w-full rounded-[0.25rem] border-slate-300 text-sm focus:border-brand-primary focus:ring-brand-primary" />
                                                </div>
                                                <div>
                                                    <label className="block text-[10px] font-bold text-slate-500 mb-1">Label (misal: Tahun Mengabdi)</label>
                                                    <input type="text" value={data[`profil_stat${num}_label`]} onChange={e => setData(`profil_stat${num}_label`, e.target.value)} className="w-full rounded-[0.25rem] border-slate-300 text-sm focus:border-brand-primary focus:ring-brand-primary" />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* TENTANG KAMI TAB */}
                        <div className={activeTab === 'tentang' ? 'block' : 'hidden'}>
                            <h3 className="text-lg font-serif font-bold text-slate-900 mb-6 uppercase tracking-tight">Bagian Tentang Kami</h3>
                            
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Tagline Atas</label>
                                        <input type="text" value={data.profil_tentang_tagline} onChange={e => setData('profil_tentang_tagline', e.target.value)} className="w-full rounded-[0.25rem] border-slate-300 text-sm focus:border-brand-primary focus:ring-brand-primary shadow-sm" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Judul Bagian</label>
                                        <input type="text" value={data.profil_tentang_title} onChange={e => setData('profil_tentang_title', e.target.value)} className="w-full rounded-[0.25rem] border-slate-300 text-sm focus:border-brand-primary focus:ring-brand-primary shadow-sm" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Paragraf Deskripsi</label>
                                    <textarea rows={5} value={data.profil_tentang_desc} onChange={e => setData('profil_tentang_desc', e.target.value)} className="w-full rounded-[0.25rem] border-slate-300 text-sm focus:border-brand-primary focus:ring-brand-primary shadow-sm"></textarea>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Gambar Samping</label>
                                    <div className="flex items-center gap-6">
                                        <div className="w-24 h-32 bg-slate-100 border border-slate-200 rounded-[0.25rem] overflow-hidden flex items-center justify-center shrink-0">
                                            {settings.profil_image ? (
                                                <img src={settings.profil_image} alt="Profil" className="w-full h-full object-cover" />
                                            ) : (
                                                <PhotoIcon className="w-8 h-8 text-slate-300" />
                                            )}
                                        </div>
                                        <input
                                            type="file"
                                            onChange={e => setData('profil_image_file', e.target.files[0])}
                                            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-[0.25rem] file:border-0 file:text-xs file:font-semibold file:bg-brand-primary/10 file:text-brand-primary hover:file:bg-brand-primary/20 transition-colors"
                                            accept="image/*"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Badge Tahun (Tampil di Gambar)</label>
                                    <input type="text" value={data.profil_tentang_years} onChange={e => setData('profil_tentang_years', e.target.value)} className="w-64 rounded-[0.25rem] border-slate-300 text-sm focus:border-brand-primary focus:ring-brand-primary shadow-sm" />
                                </div>
                            </div>
                        </div>

                        {/* VISI MISI TAB */}
                        <div className={activeTab === 'visimisi' ? 'block' : 'hidden'}>
                            <h3 className="text-lg font-serif font-bold text-slate-900 mb-6 uppercase tracking-tight">Visi & Misi</h3>
                            
                            <div className="space-y-8">
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-primary mb-2">Teks Visi Utama</label>
                                    <textarea rows={4} value={data.profil_visi_text} onChange={e => setData('profil_visi_text', e.target.value)} className="w-full rounded-[0.25rem] border-slate-300 text-sm focus:border-brand-primary focus:ring-brand-primary shadow-sm text-lg font-serif"></textarea>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-primary">Daftar Misi</label>
                                        <button type="button" onClick={addMisi} className="flex items-center gap-1.5 text-[10px] font-bold text-white bg-brand-primary px-3 py-1.5 rounded-[0.25rem] hover:bg-slate-900 transition-colors">
                                            <PlusIcon className="w-3 h-3" /> Tambah Misi
                                        </button>
                                    </div>
                                    
                                    <div className="space-y-3">
                                        {data.profil_misi_list.map((misi, index) => (
                                            <div key={index} className="flex items-start gap-3 bg-slate-50 p-3 rounded-[0.25rem] border border-slate-100">
                                                <div className="w-6 h-6 rounded bg-brand-primary/10 text-brand-primary flex flex-col items-center justify-center font-bold text-xs shrink-0 mt-1">
                                                    {index + 1}
                                                </div>
                                                <textarea 
                                                    rows={2} 
                                                    value={misi} 
                                                    onChange={(e) => handleMisiChange(index, e.target.value)} 
                                                    className="w-full rounded-[0.25rem] border-slate-300 text-sm focus:border-brand-primary focus:ring-brand-primary shadow-sm"
                                                    placeholder="Tuliskan misi..."
                                                ></textarea>
                                                <button type="button" onClick={() => removeMisi(index)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors mt-1">
                                                    <TrashIcon className="w-5 h-5" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* SEJARAH TAB */}
                        <div className={activeTab === 'sejarah' ? 'block' : 'hidden'}>
                            <h3 className="text-lg font-serif font-bold text-slate-900 mb-6 uppercase tracking-tight">Sejarah Perjalanan</h3>
                            
                            <div className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Tagline</label>
                                        <input type="text" value={data.profil_sejarah_tagline} onChange={e => setData('profil_sejarah_tagline', e.target.value)} className="w-full rounded-[0.25rem] border-slate-300 text-sm focus:border-brand-primary focus:ring-brand-primary shadow-sm" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Judul Utama</label>
                                        <input type="text" value={data.profil_sejarah_title} onChange={e => setData('profil_sejarah_title', e.target.value)} className="w-full rounded-[0.25rem] border-slate-300 text-sm focus:border-brand-primary focus:ring-brand-primary shadow-sm" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Deskripsi Singkat</label>
                                        <input type="text" value={data.profil_sejarah_desc} onChange={e => setData('profil_sejarah_desc', e.target.value)} className="w-full rounded-[0.25rem] border-slate-300 text-sm focus:border-brand-primary focus:ring-brand-primary shadow-sm" />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-primary">Garis Waktu (Timeline)</label>
                                        <button type="button" onClick={addTimeline} className="flex items-center gap-1.5 text-[10px] font-bold text-white bg-brand-primary px-3 py-1.5 rounded-[0.25rem] hover:bg-slate-900 transition-colors">
                                            <PlusIcon className="w-3 h-3" /> Tambah Momen
                                        </button>
                                    </div>
                                    
                                    <div className="space-y-4">
                                        {data.profil_sejarah_timeline.map((item, index) => (
                                            <div key={index} className="flex items-start gap-4 bg-slate-50 p-4 rounded-[0.25rem] border border-slate-200">
                                                <div className="flex-1 space-y-4">
                                                    <div className="grid grid-cols-4 gap-4">
                                                        <div className="col-span-1">
                                                            <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Tahun</label>
                                                            <input type="text" value={item.year} onChange={(e) => handleTimelineChange(index, 'year', e.target.value)} className="w-full rounded-[0.25rem] border-slate-300 text-sm" placeholder="Misal: 1995" />
                                                        </div>
                                                        <div className="col-span-3">
                                                            <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Judul Momen</label>
                                                            <input type="text" value={item.title} onChange={(e) => handleTimelineChange(index, 'title', e.target.value)} className="w-full rounded-[0.25rem] border-slate-300 text-sm" placeholder="Peletakan Batu Pertama" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Deskripsi Momen</label>
                                                        <textarea rows={2} value={item.desc} onChange={(e) => handleTimelineChange(index, 'desc', e.target.value)} className="w-full rounded-[0.25rem] border-slate-300 text-sm"></textarea>
                                                    </div>
                                                </div>
                                                <button type="button" onClick={() => removeTimeline(index)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors mt-6">
                                                    <TrashIcon className="w-5 h-5" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* SUBMIT BUTTON */}
                        <div className="mt-10 pt-6 border-t border-slate-200 flex justify-end">
                            <button
                                type="submit"
                                disabled={processing}
                                className={`px-8 py-3 bg-brand-primary text-white text-xs font-bold uppercase tracking-widest rounded-[0.25rem] transition-all ${
                                    processing ? 'opacity-75 cursor-not-allowed' : 'hover:bg-slate-900 shadow-xl shadow-brand-primary/20 hover:-translate-y-0.5'
                                }`}
                            >
                                {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </IndukAdminLayout>
    );
}
