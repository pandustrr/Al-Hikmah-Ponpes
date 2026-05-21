import React from 'react';
import { PhotoIcon } from '@heroicons/react/24/outline';
import ImageInputWithCrop from '@/Components/ImageInputWithCrop';

export default function HeroTab({
    data, setData, errors,
    heroBgPreview, setHeroBgPreview,
    heroBgMobilePreview, setHeroBgMobilePreview,
    labelStyle, inputStyle, textareaStyle,
}) {
    return (
        <div className="block space-y-8 animate-fade-in">
            <div>
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-3 mb-6">Bagian Banner Hero</h3>

                <div className="space-y-6">
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-6">
                            {/* Desktop Hero BG */}
                            <div className="space-y-4">
                                <label className={labelStyle}>Latar Belakang Hero Desktop (Lanskap 21:9)</label>
                                <div className="relative aspect-video bg-slate-100 rounded overflow-hidden border-2 border-dashed border-slate-200 group">
                                    {heroBgPreview ? (
                                        <img src={heroBgPreview} className="w-full h-full object-cover" alt="Hero BG Desktop Preview" />
                                    ) : (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300">
                                            <PhotoIcon className="h-10 w-10 mb-2" />
                                            <span className="text-[10px] font-bold uppercase tracking-widest">Pilih Gambar Lanskap</span>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <span className="text-white text-[10px] font-bold uppercase tracking-[0.2em] border border-white/40 px-4 py-2">Ganti Gambar</span>
                                    </div>
                                    <ImageInputWithCrop
                                        className="absolute inset-0 z-10"
                                        aspectRatio={21/9}
                                        title="Potong Background Hero Desktop"
                                        onChange={(file) => {
                                            setData('hero_bg_file', file);
                                            if (file) setHeroBgPreview(URL.createObjectURL(file));
                                        }}
                                    />
                                </div>
                                {errors.hero_bg_file && (
                                    <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider">{errors.hero_bg_file}</p>
                                )}
                                <p className="text-[9px] text-slate-400 uppercase tracking-widest italic leading-relaxed">
                                    Format: JPG/PNG. Rekomendasi rasio lanskap 21:9 untuk layar desktop.
                                </p>
                            </div>

                            {/* Mobile Hero BG */}
                            <div className="space-y-4">
                                <label className={labelStyle}>Latar Belakang Hero Mobile (Potret 3:4)</label>
                                <div className="relative aspect-[3/4] max-w-[200px] bg-slate-100 rounded overflow-hidden border-2 border-dashed border-slate-200 group">
                                    {heroBgMobilePreview ? (
                                        <img src={heroBgMobilePreview} className="w-full h-full object-cover" alt="Hero BG Mobile Preview" />
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
                                        title="Potong Background Hero Mobile"
                                        onChange={(file) => {
                                            setData('hero_bg_mobile_file', file);
                                            if (file) setHeroBgMobilePreview(URL.createObjectURL(file));
                                        }}
                                    />
                                </div>
                                {errors.hero_bg_mobile_file && (
                                    <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider">{errors.hero_bg_mobile_file}</p>
                                )}
                                <p className="text-[9px] text-slate-400 uppercase tracking-widest italic leading-relaxed">
                                    Format: JPG/PNG. Rekomendasi rasio potret 3:4 untuk layar HP/ponsel.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                            <label className={labelStyle}>Tagline (Teks Emas Kecil)</label>
                            <input
                                type="text"
                                value={data.profil_hero_tagline}
                                onChange={e => setData('profil_hero_tagline', e.target.value)}
                                className={inputStyle}
                                placeholder="Mengenal Lebih Dekat"
                            />
                            {errors.profil_hero_tagline && <span className="text-[10px] text-rose-500 font-semibold">{errors.profil_hero_tagline}</span>}
                        </div>
                        <div className="space-y-1.5">
                            <label className={labelStyle}>Judul Utama Banner</label>
                            <input
                                type="text"
                                value={data.profil_hero_title}
                                onChange={e => setData('profil_hero_title', e.target.value)}
                                className={inputStyle}
                                placeholder="PROFIL YPDS AL-HIKMAH"
                            />
                            {errors.profil_hero_title && <span className="text-[10px] text-rose-500 font-semibold">{errors.profil_hero_title}</span>}
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className={labelStyle}>Deskripsi Singkat Banner</label>
                        <textarea
                            rows={3}
                            value={data.profil_hero_desc}
                            onChange={e => setData('profil_hero_desc', e.target.value)}
                            className={textareaStyle}
                            placeholder="Deskripsikan profil singkat yayasan di sini..."
                        />
                        {errors.profil_hero_desc && <span className="text-[10px] text-rose-500 font-semibold">{errors.profil_hero_desc}</span>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                            <label className={labelStyle}>Teks Tombol Kiri (Button 1)</label>
                            <input
                                type="text"
                                value={data.profil_hero_btn1}
                                onChange={e => setData('profil_hero_btn1', e.target.value)}
                                className={inputStyle}
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className={labelStyle}>Teks Tombol Kanan (Button 2)</label>
                            <input
                                type="text"
                                value={data.profil_hero_btn2}
                                onChange={e => setData('profil_hero_btn2', e.target.value)}
                                className={inputStyle}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-3 mb-6">Nilai Statistik Yayasan</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {[1, 2, 3, 4].map(num => (
                        <div key={num} className="bg-slate-50/50 p-5 border border-slate-200 rounded-[0.25rem] space-y-4">
                            <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                                <span className="w-1.5 h-1.5 bg-brand-gold rounded-full"></span>
                                <h4 className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Metrik Statistik {num}</h4>
                            </div>
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Nilai Angka (contoh: 25+ / 1500+)</label>
                                    <input
                                        type="text"
                                        value={data[`profil_stat${num}_value`]}
                                        onChange={e => setData(`profil_stat${num}_value`, e.target.value)}
                                        className={inputStyle}
                                    />
                                </div>
                                <div>
                                    <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Keterangan Label (contoh: Santri Mengabdi)</label>
                                    <input
                                        type="text"
                                        value={data[`profil_stat${num}_label`]}
                                        onChange={e => setData(`profil_stat${num}_label`, e.target.value)}
                                        className={inputStyle}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
