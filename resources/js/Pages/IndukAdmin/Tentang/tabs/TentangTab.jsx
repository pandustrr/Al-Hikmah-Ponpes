import React from 'react';
import { PhotoIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import ImageInputWithCrop from '@/Components/ImageInputWithCrop';

export default function TentangTab({
    data, setData, errors,
    profilImagePreview, setProfilImagePreview,
    addCard, handleCardChange, triggerRemoveCard,
    labelStyle, inputStyle, textareaStyle,
}) {
    return (
        <div className="block space-y-6 animate-fade-in">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-3 mb-6">Harmoni Profil Lembaga</h3>

            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                        <label className={labelStyle}>Tagline Atas Tentang Kami</label>
                        <input
                            type="text"
                            value={data.profil_tentang_tagline}
                            onChange={e => setData('profil_tentang_tagline', e.target.value)}
                            className={inputStyle}
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className={labelStyle}>Judul Utama Tentang Kami</label>
                        <input
                            type="text"
                            value={data.profil_tentang_title}
                            onChange={e => setData('profil_tentang_title', e.target.value)}
                            className={inputStyle}
                        />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label className={labelStyle}>Paragraf Utama Profil Lengkap</label>
                    <textarea
                        rows={6}
                        value={data.profil_tentang_desc}
                        onChange={e => setData('profil_tentang_desc', e.target.value)}
                        className={textareaStyle}
                        placeholder="Tuliskan cerita komprehensif profil yayasan..."
                    />
                </div>

                <div className="space-y-4 max-w-sm">
                    <label className={labelStyle}>Gambar Pendukung Profil Samping (Potret 3:4)</label>
                    <div className="relative aspect-[3/4] max-w-[200px] bg-slate-100 rounded overflow-hidden border-2 border-dashed border-slate-200 group">
                        {profilImagePreview ? (
                            <img src={profilImagePreview} className="w-full h-full object-cover" alt="Profil Side Preview" />
                        ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300">
                                <PhotoIcon className="h-10 w-10 mb-2" />
                                <span className="text-[10px] font-bold uppercase tracking-widest">Pilih Gambar Potret</span>
                            </div>
                        )}
                        <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="text-white text-[10px] font-bold uppercase tracking-[0.2em] border border-white/40 px-4 py-2">Ganti Gambar</span>
                        </div>
                        <ImageInputWithCrop
                            className="absolute inset-0 z-10"
                            aspectRatio={3/4}
                            title="Potong Gambar Pendukung Profil"
                            onChange={(file) => {
                                setData('profil_image_file', file);
                                if (file) setProfilImagePreview(URL.createObjectURL(file));
                            }}
                        />
                    </div>
                    {errors.profil_image_file && (
                        <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider">{errors.profil_image_file}</p>
                    )}
                    <p className="text-[9px] text-slate-400 uppercase tracking-widest italic leading-relaxed">
                        Format: JPG/PNG. Rekomendasi rasio potret 3:4 untuk hasil terbaik.
                    </p>
                </div>

                <div className="space-y-1.5">
                    <label className={labelStyle}>Badge Tahun Pengalaman (Tampil melayang di gambar)</label>
                    <input
                        type="text"
                        value={data.profil_tentang_years}
                        onChange={e => setData('profil_tentang_years', e.target.value)}
                        className={`${inputStyle} max-w-xs`}
                        placeholder="misal: 25+ Tahun"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                        <label className={labelStyle}>Teks Atas Badge (contoh: Pengalaman Kami)</label>
                        <input
                            type="text"
                            value={data.profil_tentang_badge_label1}
                            onChange={e => setData('profil_tentang_badge_label1', e.target.value)}
                            className={inputStyle}
                            placeholder="Pengalaman Kami"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className={labelStyle}>Teks Bawah Badge (contoh: Tahun Mengabdi)</label>
                        <input
                            type="text"
                            value={data.profil_tentang_badge_label2}
                            onChange={e => setData('profil_tentang_badge_label2', e.target.value)}
                            className={inputStyle}
                            placeholder="Tahun Mengabdi"
                        />
                    </div>
                </div>

                {/* Cards CRUD */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-primary">Kartu Fitur (Tampil di bawah teks kiri)</label>
                        <button
                            type="button"
                            onClick={addCard}
                            className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-brand-primary bg-brand-primary/5 hover:bg-brand-primary hover:text-white border border-brand-primary/15 py-2 px-3 rounded-[0.25rem] transition-all"
                        >
                            <PlusIcon className="w-3.5 h-3.5" /> Tambah Kartu
                        </button>
                    </div>
                    <div className="space-y-3">
                        {data.profil_tentang_cards.map((card, index) => (
                            <div key={index} className="flex items-start gap-3 bg-slate-50/50 p-4 rounded-[0.25rem] border border-slate-200 group hover:border-slate-300 transition-all">
                                <div className="flex-1 space-y-3">
                                    <div className="space-y-1.5">
                                        <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest">Judul Kartu</label>
                                        <input
                                            type="text"
                                            value={card.title}
                                            onChange={e => handleCardChange(index, 'title', e.target.value)}
                                            className={inputStyle}
                                            placeholder="Metode Pendidikan"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest">Deskripsi Kartu</label>
                                        <textarea
                                            rows={2}
                                            value={card.desc}
                                            onChange={e => handleCardChange(index, 'desc', e.target.value)}
                                            className={textareaStyle}
                                            placeholder="Pendekatan holistik yang mengintegrasikan..."
                                        />
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => triggerRemoveCard(index)}
                                    className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors mt-1 shrink-0"
                                    title="Hapus Kartu"
                                >
                                    <TrashIcon className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
