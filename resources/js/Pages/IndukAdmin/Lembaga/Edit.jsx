import React from 'react';
import IndukAdminLayout from '@/Layouts/Induk/IndukAdminLayout';
import { useForm, Link } from '@inertiajs/react';
import { 
    AcademicCapIcon, 
    ArrowLeftIcon,
    SparklesIcon,
    StarIcon,
    RectangleStackIcon,
    DocumentTextIcon,
    CheckCircleIcon
} from '@heroicons/react/24/outline';

export default function Edit({ lembaga }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'put',
        nama: lembaga.nama,
        slug: lembaga.slug,
        deskripsi: lembaga.deskripsi || '',
        summary: lembaga.summary || '',
        visi: lembaga.visi || '',
        misi: lembaga.misi || '',
        struktur_pendidikan: lembaga.struktur_pendidikan || '',
        keunggulan: lembaga.keunggulan || '',
        image_url: lembaga.image_url || '',
        ikon_url: lembaga.ikon_url || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.lembaga.update', lembaga.id));
    };

    return (
        <IndukAdminLayout title={`Detail: ${lembaga.nama}`}>
            <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
                
                {/* Header Navigation */}
                <div className="mb-10 flex items-center justify-between">
                    <Link 
                        href={route('admin.lembaga.index')}
                        className="text-[10px] font-bold text-slate-400 hover:text-brand-primary uppercase tracking-widest flex items-center gap-2 transition-colors"
                    >
                        <ArrowLeftIcon className="h-3 w-3" /> Kembali ke Master Data
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-brand-primary/5 rounded flex items-center justify-center">
                            <AcademicCapIcon className="h-4 w-4 text-brand-primary" />
                        </div>
                        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-tight">{lembaga.nama}</h2>
                    </div>
                </div>

                {/* Page Title */}
                <div className="mb-12">
                    <h2 className="text-[10px] font-bold text-brand-accent uppercase tracking-[0.4em] mb-3">Konten & Informasi Unit</h2>
                    <h1 className="text-4xl font-semibold text-slate-900 tracking-tighter uppercase leading-none">Manajemen Detail <br /><span className="text-brand-primary">Lembaga</span></h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-10">
                    
                    {/* Section 1: Profil & Narasi */}
                    <div className="bg-white border border-slate-200 rounded-[0.25rem] overflow-hidden">
                        <div className="px-8 py-6 border-b border-slate-100 bg-slate-50 flex items-center gap-3">
                            <DocumentTextIcon className="h-5 w-5 text-brand-primary" />
                            <h3 className="font-bold text-slate-900 uppercase tracking-widest text-xs">Profil & Narasi Utama</h3>
                        </div>
                        <div className="p-8 space-y-8">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Deskripsi Lengkap (Akan tampil di halaman profil unit)</label>
                                <textarea 
                                    className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-4 text-sm focus:ring-1 focus:ring-brand-primary outline-none min-h-[200px] leading-relaxed"
                                    placeholder="Tuliskan sejarah, latar belakang, dan profil lengkap unit pendidikan ini..."
                                    value={data.deskripsi}
                                    onChange={e => setData('deskripsi', e.target.value)}
                                ></textarea>
                                {errors.deskripsi && <p className="text-red-500 text-[10px] mt-2 font-bold uppercase tracking-widest">{errors.deskripsi}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                        <SparklesIcon className="h-4 w-4 text-brand-accent" /> Visi Unit
                                    </label>
                                    <textarea 
                                        className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-4 text-sm focus:ring-1 focus:ring-brand-primary outline-none min-h-[120px]"
                                        value={data.visi}
                                        onChange={e => setData('visi', e.target.value)}
                                    ></textarea>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                        <StarIcon className="h-4 w-4 text-brand-accent" /> Misi Unit
                                    </label>
                                    <textarea 
                                        className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-4 text-sm focus:ring-1 focus:ring-brand-primary outline-none min-h-[120px]"
                                        placeholder="— Poin misi 1&#10;— Poin misi 2..."
                                        value={data.misi}
                                        onChange={e => setData('misi', e.target.value)}
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Struktur & Keunggulan */}
                    <div className="bg-white border border-slate-200 rounded-[0.25rem] overflow-hidden">
                        <div className="px-8 py-6 border-b border-slate-100 bg-slate-50 flex items-center gap-3">
                            <RectangleStackIcon className="h-5 w-5 text-brand-primary" />
                            <h3 className="font-bold text-slate-900 uppercase tracking-widest text-xs">Struktur & Keunggulan Program</h3>
                        </div>
                        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Struktur Pendidikan / Kurikulum</label>
                                <textarea 
                                    className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-4 text-sm focus:ring-1 focus:ring-brand-primary outline-none min-h-[150px]"
                                    placeholder="Jelaskan metode pengajaran, kurikulum yang digunakan, dan sistem pendidikan..."
                                    value={data.struktur_pendidikan}
                                    onChange={e => setData('struktur_pendidikan', e.target.value)}
                                ></textarea>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Keunggulan Utama (Daftar Poin)</label>
                                <textarea 
                                    className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-4 text-sm focus:ring-1 focus:ring-brand-primary outline-none min-h-[150px]"
                                    placeholder="Contoh:&#10;Fasilitas Lengkap&#10;Tahfidz Qur'an&#10;Program Bahasa..."
                                    value={data.keunggulan}
                                    onChange={e => setData('keunggulan', e.target.value)}
                                ></textarea>
                                <p className="text-[9px] text-slate-400 mt-3 italic">Gunakan baris baru untuk setiap poin keunggulan.</p>
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Preview Info Card (Read Only) */}
                    <div className="bg-brand-primary/5 p-8 border border-brand-primary/10 rounded-[0.25rem]">
                        <div className="flex items-center gap-2 mb-4">
                            <CheckCircleIcon className="h-4 w-4 text-brand-primary" />
                            <h4 className="text-[10px] font-bold text-brand-primary uppercase tracking-widest">Informasi Terintegrasi</h4>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-relaxed max-w-2xl">
                            Perubahan pada halaman ini akan langsung memperbarui tampilan detail di halaman publik unit <strong>{lembaga.nama}</strong>. Pastikan narasi yang Anda masukkan profesional dan sesuai dengan visi Yayasan Al-Hikmah.
                        </p>
                    </div>

                    {/* Action Bar */}
                    <div className="pt-6 flex justify-between items-center border-t border-slate-100">
                        <Link 
                            href={`/${lembaga.slug}`} 
                            target="_blank"
                            className="text-[10px] font-bold text-slate-400 hover:text-brand-primary uppercase tracking-[0.2em] flex items-center gap-2 transition-colors"
                        >
                            Preview Halaman Publik <ArrowLeftIcon className="h-3 w-3 rotate-180" />
                        </Link>
                        <button 
                            type="submit" 
                            disabled={processing}
                            className="bg-brand-primary text-white py-4 px-12 text-[10px] font-bold uppercase tracking-widest rounded-[0.25rem] hover:bg-slate-900 transition-all shadow-xl shadow-brand-primary/20 disabled:opacity-50"
                        >
                            {processing ? 'Menyimpan...' : 'Simpan Seluruh Perubahan'}
                        </button>
                    </div>
                </form>
            </div>
        </IndukAdminLayout>
    );
}
