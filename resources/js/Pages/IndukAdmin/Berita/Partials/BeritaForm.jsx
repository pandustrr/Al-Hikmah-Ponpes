import React from 'react';
import { useForm } from '@inertiajs/react';
import { PhotoIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import ImageInputWithCrop from '@/Components/ImageInputWithCrop';

export default function BeritaForm({ berita = null, categories, lembagas, submitLabel = 'Simpan Berita' }) {
    const [preview, setPreview] = React.useState(null);
    const [previewMobile, setPreviewMobile] = React.useState(null);

    const { data, setData, post, processing, errors, progress } = useForm({
        judul: berita?.judul || '',
        ringkasan: berita?.ringkasan || '',
        konten: berita?.konten || '',
        category_id: berita?.category_id || '',
        lembaga_id: berita?.lembaga_id || '',
        tanggal: berita?.tanggal || new Date().toISOString().split('T')[0],
        status: berita?.status || 'published',
        is_multimedia: !!berita?.is_multimedia || false,
        is_sticky: !!berita?.is_sticky || false,
        image: null,
        image_mobile: null,
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
        <form onSubmit={handleSubmit} className="space-y-8 bg-white border border-slate-200 rounded-[0.25rem] p-8 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Left Column: Main Info */}
                <div className="space-y-6">
                    <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Judul Berita</label>
                        <input
                            type="text"
                            value={data.judul}
                            className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-3 text-sm focus:ring-1 focus:ring-brand-primary outline-none font-bold text-slate-900"
                            onChange={(e) => setData('judul', e.target.value)}
                            required
                        />
                        {errors.judul && (
                            <p className="text-[10px] text-red-500 italic mt-1">{errors.judul}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Ringkasan Berita (Singkat)</label>
                        <textarea
                            value={data.ringkasan}
                            className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-4 text-sm focus:ring-1 focus:ring-brand-primary outline-none min-h-[100px] text-slate-700 leading-relaxed"
                            onChange={(e) => setData('ringkasan', e.target.value)}
                            placeholder="Tulis ringkasan singkat berita..."
                        />
                        {errors.ringkasan && (
                            <p className="text-[10px] text-red-500 italic mt-1">{errors.ringkasan}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Isi Berita Lengkap</label>
                        <div className="mt-1 bg-white border border-slate-200 rounded-[0.25rem] overflow-hidden">
                            <ReactQuill
                                theme="snow"
                                value={data.konten}
                                onChange={(content) => setData('konten', content)}
                                className="h-[300px] mb-12"
                                modules={{
                                    toolbar: [
                                        [{ 'header': [1, 2, 3, false] }],
                                        ['bold', 'italic', 'underline', 'strike'],
                                        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                                        ['link', 'clean']
                                    ],
                                }}
                            />
                        </div>
                        {errors.konten && (
                            <p className="text-[10px] text-red-500 italic mt-1">{errors.konten}</p>
                        )}
                    </div>
                </div>

                {/* Right Column: Metadata & Image */}
                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Kategori</label>
                            <select
                                value={data.category_id}
                                className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-3 text-sm focus:ring-1 focus:ring-brand-primary outline-none font-semibold text-slate-700"
                                onChange={(e) => setData('category_id', e.target.value)}
                                required
                            >
                                <option value="">Pilih Kategori</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                            {errors.category_id && (
                                <p className="text-[10px] text-red-500 italic mt-1">{errors.category_id}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Status</label>
                            <select
                                value={data.status}
                                className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-3 text-sm focus:ring-1 focus:ring-brand-primary outline-none font-semibold text-slate-700"
                                onChange={(e) => setData('status', e.target.value)}
                                required
                            >
                                <option value="published">Published</option>
                                <option value="draft">Draft</option>
                            </select>
                            {errors.status && (
                                <p className="text-[10px] text-red-500 italic mt-1">{errors.status}</p>
                            )}
                        </div>
                    </div>

                    {/* Toggle: Tampilkan di Multimedia */}
                    <div className="flex items-center justify-between py-4 border-b border-slate-100">
                        <div>
                            <p className="text-sm font-bold text-slate-800">Tampilkan di Multimedia</p>
                            <p className="text-[10px] text-slate-400 mt-0.5">Tampilkan berita ini di section multimedia Al-Hikmah</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => setData('is_multimedia', !data.is_multimedia)}
                            className={`w-12 h-6 rounded-full transition-colors duration-300 relative ${
                                data.is_multimedia ? 'bg-brand-primary' : 'bg-slate-200'
                            }`}
                        >
                            <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${
                                data.is_multimedia ? 'left-7' : 'left-1'
                            }`} />
                        </button>
                    </div>

                    {/* Toggle: Sematkan Berita (Sticky News) */}
                    <div className="flex items-center justify-between py-4 border-b border-slate-100">
                        <div>
                            <p className="text-sm font-bold text-slate-800">Sematkan Berita (Sticky News)</p>
                            <p className="text-[10px] text-slate-400 mt-0.5">Sematkan berita ini di posisi teratas halaman utama</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => setData('is_sticky', !data.is_sticky)}
                            className={`w-12 h-6 rounded-full transition-colors duration-300 relative ${
                                data.is_sticky ? 'bg-brand-primary' : 'bg-slate-200'
                            }`}
                        >
                            <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${
                                data.is_sticky ? 'left-7' : 'left-1'
                            }`} />
                        </button>
                    </div>

                    <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Lembaga (Opsional)</label>
                        <select
                            value={data.lembaga_id}
                            className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-3 text-sm focus:ring-1 focus:ring-brand-primary outline-none font-semibold text-slate-700"
                            onChange={(e) => setData('lembaga_id', e.target.value)}
                        >
                            <option value="">Pusat Yayasan (Global)</option>
                            {lembagas.map(lembaga => (
                                <option key={lembaga.id} value={lembaga.id}>{lembaga.nama}</option>
                            ))}
                        </select>
                        <p className="mt-2 text-[9px] text-slate-400 italic">Biarkan kosong jika berita untuk umum/yayasan.</p>
                        {errors.lembaga_id && (
                            <p className="text-[10px] text-red-500 italic mt-1">{errors.lembaga_id}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Tanggal Publikasi</label>
                        <input
                            type="date"
                            value={data.tanggal}
                            className="w-full bg-slate-50 border border-slate-200 rounded-[0.25rem] p-3 text-sm focus:ring-1 focus:ring-brand-primary outline-none font-semibold text-slate-700"
                            onChange={(e) => setData('tanggal', e.target.value)}
                            required
                        />
                        {errors.tanggal && (
                            <p className="text-[10px] text-red-500 italic mt-1">{errors.tanggal}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Berkas Gambar Utama Berita</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            
                            {/* Desktop Image (Lanskap 16:9) */}
                            <div className="space-y-3">
                                <span className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest">Gambar Desktop (16:9)</span>
                                <div className="relative aspect-video bg-slate-50 rounded-[0.25rem] overflow-hidden border border-slate-200 group flex items-center justify-center shadow-sm">
                                    {preview || berita?.image_url ? (
                                        <img src={preview || berita.image_url} className="w-full h-full object-cover pointer-events-none" alt="Preview Lanskap" />
                                    ) : (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300 pointer-events-none">
                                            <PhotoIcon className="h-8 w-8 mb-1" />
                                            <span className="text-[8px] font-bold uppercase tracking-widest">Pilih Gambar Lanskap</span>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                        <span className="text-white text-[8px] font-bold uppercase tracking-[0.2em] border border-white/40 px-3 py-1.5 cursor-pointer">Ganti</span>
                                    </div>
                                    <ImageInputWithCrop 
                                        className="absolute inset-0 z-10"
                                        aspectRatio={16/9}
                                        title="Potong Gambar Desktop"
                                        onChange={(file) => {
                                            setData('image', file);
                                            if (file) setPreview(URL.createObjectURL(file));
                                        }}
                                    />
                                </div>
                                <p className="text-[8px] text-slate-400 italic">PNG, JPG, JPEG, WEBP sampai 2MB</p>
                                {errors.image && (
                                    <p className="text-[10px] text-red-500 italic mt-1">{errors.image}</p>
                                )}
                            </div>

                            {/* Mobile Image (Potret 3:4) */}
                            <div className="space-y-3">
                                <span className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest">Gambar Mobile (3:4)</span>
                                <div className="relative aspect-[3/4] w-full max-w-[130px] mx-auto bg-slate-50 rounded-[0.25rem] overflow-hidden border border-slate-200 group flex items-center justify-center shadow-sm">
                                    {previewMobile || berita?.image_mobile_url ? (
                                        <img src={previewMobile || berita.image_mobile_url} className="w-full h-full object-cover pointer-events-none" alt="Preview Potret" />
                                    ) : (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300 pointer-events-none">
                                            <PhotoIcon className="h-8 w-8 mb-1" />
                                            <span className="text-[8px] font-bold uppercase tracking-widest">Pilih Gambar Potret</span>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                        <span className="text-white text-[8px] font-bold uppercase tracking-[0.2em] border border-white/40 px-3 py-1.5 cursor-pointer">Ganti</span>
                                    </div>
                                    <ImageInputWithCrop 
                                        className="absolute inset-0 z-10"
                                        aspectRatio={3/4}
                                        title="Potong Gambar Mobile"
                                        onChange={(file) => {
                                            setData('image_mobile', file);
                                            if (file) setPreviewMobile(URL.createObjectURL(file));
                                        }}
                                    />
                                </div>
                                <p className="text-[8px] text-slate-400 italic">PNG, JPG, JPEG, WEBP sampai 2MB</p>
                                {errors.image_mobile && (
                                    <p className="text-[10px] text-red-500 italic mt-1">{errors.image_mobile}</p>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons Footer */}
            <div className="mt-8 flex justify-end gap-3 bg-slate-50 p-6 border-t border-slate-100 rounded-b-[0.25rem] -mx-8 -mb-8">
                <button 
                    type="button" 
                    onClick={() => window.history.back()}
                    className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold uppercase tracking-widest rounded-[0.25rem] transition-colors"
                >
                    Batal
                </button>
                <button 
                    type="submit" 
                    disabled={processing}
                    className="bg-brand-primary text-white py-3 px-12 text-[10px] font-bold uppercase tracking-[0.2em] rounded-[0.25rem] hover:bg-slate-900 transition-all shadow-xl shadow-brand-primary/20 flex items-center gap-3"
                >
                    {processing ? 'Sedang Menyimpan...' : (
                        <>{submitLabel} <CheckCircleIcon className="h-4 w-4" /></>
                    )}
                </button>
            </div>
        </form>
    );
}
