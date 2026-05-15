import React from 'react';
import { useForm } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { PhotoIcon } from '@heroicons/react/24/outline';

export default function BeritaForm({ berita = null, categories, lembagas, submitLabel = 'Simpan Berita' }) {
    const [preview, setPreview] = React.useState(null);

    const { data, setData, post, processing, errors, progress } = useForm({
        judul: berita?.judul || '',
        konten: berita?.konten || '',
        category_id: berita?.category_id || '',
        lembaga_id: berita?.lembaga_id || '',
        tanggal: berita?.tanggal || new Date().toISOString().split('T')[0],
        status: berita?.status || 'published',
        image: null,
        _method: berita ? 'PUT' : 'POST', // For spoofing PUT with multipart/form-data
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (berita) {
            post(route('admin.berita.update', berita.id));
        } else {
            post(route('admin.berita.store'));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 border border-slate-200 rounded-[0.25rem] shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Left Column: Main Info */}
                <div className="space-y-6">
                    <div>
                        <InputLabel htmlFor="judul" value="Judul Berita" className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2" />
                        <TextInput
                            id="judul"
                            type="text"
                            value={data.judul}
                            className="mt-1 block w-full border-slate-200 focus:border-brand-primary focus:ring-brand-primary rounded-[0.25rem] text-sm font-bold text-slate-900"
                            onChange={(e) => setData('judul', e.target.value)}
                            required
                        />
                        <InputError message={errors.judul} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="konten" value="Isi Berita" className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2" />
                        <textarea
                            id="konten"
                            value={data.konten}
                            className="mt-1 block w-full border-slate-200 focus:border-brand-primary focus:ring-brand-primary rounded-[0.25rem] text-sm leading-relaxed text-slate-700 min-h-[300px]"
                            onChange={(e) => setData('konten', e.target.value)}
                            required
                        />
                        <InputError message={errors.konten} className="mt-2" />
                    </div>
                </div>

                {/* Right Column: Metadata & Image */}
                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <InputLabel htmlFor="category_id" value="Kategori" className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2" />
                            <select
                                id="category_id"
                                value={data.category_id}
                                className="mt-1 block w-full border-slate-200 focus:border-brand-primary focus:ring-brand-primary rounded-[0.25rem] text-xs font-bold text-slate-900"
                                onChange={(e) => setData('category_id', e.target.value)}
                                required
                            >
                                <option value="">Pilih Kategori</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                            <InputError message={errors.category_id} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="status" value="Status" className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2" />
                            <select
                                id="status"
                                value={data.status}
                                className="mt-1 block w-full border-slate-200 focus:border-brand-primary focus:ring-brand-primary rounded-[0.25rem] text-xs font-bold text-slate-900"
                                onChange={(e) => setData('status', e.target.value)}
                                required
                            >
                                <option value="published">Published</option>
                                <option value="draft">Draft</option>
                            </select>
                            <InputError message={errors.status} className="mt-2" />
                        </div>
                    </div>

                    <div>
                        <InputLabel htmlFor="lembaga_id" value="Lembaga (Opsional)" className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2" />
                        <select
                            id="lembaga_id"
                            value={data.lembaga_id}
                            className="mt-1 block w-full border-slate-200 focus:border-brand-primary focus:ring-brand-primary rounded-[0.25rem] text-xs font-bold text-slate-900"
                            onChange={(e) => setData('lembaga_id', e.target.value)}
                        >
                            <option value="">Pusat Yayasan (Global)</option>
                            {lembagas.map(lembaga => (
                                <option key={lembaga.id} value={lembaga.id}>{lembaga.name}</option>
                            ))}
                        </select>
                        <InputError message={errors.lembaga_id} className="mt-2" />
                        <p className="mt-1 text-[10px] text-slate-400 italic">Biarkan kosong jika berita untuk umum/yayasan.</p>
                    </div>

                    <div>
                        <InputLabel htmlFor="tanggal" value="Tanggal Publikasi" className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2" />
                        <TextInput
                            id="tanggal"
                            type="date"
                            value={data.tanggal}
                            className="mt-1 block w-full border-slate-200 focus:border-brand-primary focus:ring-brand-primary rounded-[0.25rem] text-xs font-bold text-slate-900"
                            onChange={(e) => setData('tanggal', e.target.value)}
                            required
                        />
                        <InputError message={errors.tanggal} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel value="Gambar Utama" className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2" />
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-200 border-dashed rounded-[0.25rem] hover:border-brand-primary transition-colors cursor-pointer relative group">
                            <div className="space-y-1 text-center">
                                <PhotoIcon className="mx-auto h-12 w-12 text-slate-300 group-hover:text-brand-primary transition-colors" />
                                <div className="flex text-xs text-slate-600">
                                    <label htmlFor="image" className="relative cursor-pointer bg-white rounded-md font-black text-brand-primary hover:text-slate-900 transition-colors">
                                        <span>Upload file gambar</span>
                                        <input 
                                            id="image" 
                                            name="image" 
                                            type="file" 
                                            className="sr-only" 
                                            onChange={(e) => {
                                                const file = e.target.files[0];
                                                setData('image', file);
                                                if (file) {
                                                    setPreview(URL.createObjectURL(file));
                                                }
                                            }}
                                        />
                                    </label>
                                </div>
                                <p className="text-[10px] text-slate-400 uppercase tracking-widest">PNG, JPG, GIF sampai 2MB</p>
                                {preview && (
                                   <div className="mt-4">
                                       <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-2">Pratinjau Gambar:</p>
                                       <img src={preview} alt="Preview" className="h-32 w-full object-cover rounded-[0.25rem] border-2 border-emerald-500" />
                                   </div>
                                )}
                                {!preview && data.image && (
                                    <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mt-2">File Terpilih: {data.image.name}</p>
                                )}
                            </div>
                        </div>
                        {berita?.image_url && !preview && (
                            <div className="mt-4">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Gambar Saat Ini:</p>
                                <img src={berita.image_url} alt="" className="h-32 w-full object-cover rounded-[0.25rem] border border-slate-200" />
                            </div>
                        )}
                        <InputError message={errors.image} className="mt-2" />
                        {progress && (
                            <progress value={progress.percentage} max="100" className="w-full h-1 mt-2">
                                {progress.percentage}%
                            </progress>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-end gap-4 pt-8 border-t border-slate-100">
                <SecondaryButton 
                    type="button" 
                    onClick={() => window.history.back()}
                    className="text-xs font-black uppercase tracking-widest px-6 py-4 rounded-[0.25rem] border-slate-200"
                >
                    Batal
                </SecondaryButton>
                <PrimaryButton 
                    disabled={processing}
                    className="bg-brand-primary hover:bg-slate-900 text-white text-xs font-black uppercase tracking-widest px-10 py-4 transition-all rounded-[0.25rem] shadow-xl shadow-brand-primary/20"
                >
                    {processing ? 'Memproses...' : submitLabel}
                </PrimaryButton>
            </div>
        </form>
    );
}
