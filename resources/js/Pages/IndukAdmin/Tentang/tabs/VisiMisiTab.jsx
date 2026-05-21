import React from 'react';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function VisiMisiTab({
    data, setData,
    addMisi, handleMisiChange, triggerRemoveMisi,
    labelStyle, inputStyle, textareaStyle,
}) {
    return (
        <div className="block space-y-8 animate-fade-in">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-3 mb-6">Pernyataan Visi &amp; Misi Yayasan</h3>

            <div className="space-y-6">
                {/* Section Header Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 bg-slate-50/70 rounded-[0.25rem] border border-slate-200">
                    <div className="space-y-1.5">
                        <label className={labelStyle}>Tagline Section (kecil di atas judul)</label>
                        <input
                            type="text"
                            value={data.profil_visi_tagline}
                            onChange={e => setData('profil_visi_tagline', e.target.value)}
                            className={inputStyle}
                            placeholder="Arah & Tujuan"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className={labelStyle}>Judul Utama Section</label>
                        <input
                            type="text"
                            value={data.profil_visi_title}
                            onChange={e => setData('profil_visi_title', e.target.value)}
                            className={inputStyle}
                            placeholder="Visi & Misi Lembaga"
                        />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-primary mb-2">Pernyataan Visi Utama</label>
                    <textarea
                        rows={4}
                        value={data.profil_visi_text}
                        onChange={e => setData('profil_visi_text', e.target.value)}
                        className="w-full text-xs text-slate-800 bg-white border border-slate-200 rounded-[0.25rem] py-3.5 px-4 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/20 hover:border-slate-300 transition-all outline-none font-serif leading-relaxed italic font-semibold"
                        placeholder="Menjadi yayasan..."
                    />
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-primary">Daftar Misi Operasional</label>
                        <button
                            type="button"
                            onClick={addMisi}
                            className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-brand-primary bg-brand-primary/5 hover:bg-brand-primary hover:text-white border border-brand-primary/15 py-2 px-3 rounded-[0.25rem] transition-all"
                        >
                            <PlusIcon className="w-3.5 h-3.5" /> Tambah Misi Baru
                        </button>
                    </div>

                    <div className="space-y-3">
                        {data.profil_misi_list.map((misi, index) => (
                            <div key={index} className="flex items-start gap-3 bg-slate-50/50 p-4 rounded-[0.25rem] border border-slate-200 group hover:border-slate-300 transition-all">
                                <div className="w-6 h-6 rounded-full bg-brand-primary/10 text-brand-primary flex flex-col items-center justify-center font-bold text-[10px] shrink-0 mt-1 shadow-sm">
                                    {index + 1}
                                </div>
                                <textarea
                                    rows={2}
                                    value={misi}
                                    onChange={(e) => handleMisiChange(index, e.target.value)}
                                    className={textareaStyle}
                                    placeholder="Tuliskan misi operasional secara konkret..."
                                />
                                <button
                                    type="button"
                                    onClick={() => triggerRemoveMisi(index)}
                                    className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors mt-0.5 shrink-0"
                                    title="Hapus Misi"
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
