import React from 'react';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function SejarahTab({
    data, setData,
    addTimeline, handleTimelineChange, triggerRemoveTimeline,
    labelStyle, inputStyle, textareaStyle,
}) {
    return (
        <div className="block space-y-8 animate-fade-in">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-3 mb-6">Linimasa Jejak Langkah</h3>

            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-1.5">
                        <label className={labelStyle}>Tagline Sejarah</label>
                        <input type="text" value={data.profil_sejarah_tagline} onChange={e => setData('profil_sejarah_tagline', e.target.value)} className={inputStyle} />
                    </div>
                    <div className="space-y-1.5">
                        <label className={labelStyle}>Judul Sejarah</label>
                        <input type="text" value={data.profil_sejarah_title} onChange={e => setData('profil_sejarah_title', e.target.value)} className={inputStyle} />
                    </div>
                    <div className="space-y-1.5">
                        <label className={labelStyle}>Deskripsi Sejarah Singkat</label>
                        <input type="text" value={data.profil_sejarah_desc} onChange={e => setData('profil_sejarah_desc', e.target.value)} className={inputStyle} />
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-primary">Poin Linimasa Perjalanan</label>
                        <button
                            type="button"
                            onClick={addTimeline}
                            className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-brand-primary bg-brand-primary/5 hover:bg-brand-primary hover:text-white border border-brand-primary/15 py-2 px-3 rounded-[0.25rem] transition-all"
                        >
                            <PlusIcon className="w-3.5 h-3.5" /> Tambah Momen Sejarah
                        </button>
                    </div>

                    <div className="space-y-4">
                        {data.profil_sejarah_timeline.map((item, index) => (
                            <div key={index} className="flex items-start gap-4 bg-slate-50/50 p-5 rounded-[0.25rem] border border-slate-200 group hover:border-slate-300 transition-all">
                                <div className="flex-1 space-y-4">
                                    <div className="grid grid-cols-4 gap-4">
                                        <div className="col-span-1 space-y-1.5">
                                            <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest">Tahun</label>
                                            <input
                                                type="text"
                                                value={item.year}
                                                onChange={(e) => handleTimelineChange(index, 'year', e.target.value)}
                                                className={inputStyle}
                                                placeholder="Mulai: 1995"
                                            />
                                        </div>
                                        <div className="col-span-3 space-y-1.5">
                                            <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest">Judul Momen Sejarah</label>
                                            <input
                                                type="text"
                                                value={item.title}
                                                onChange={(e) => handleTimelineChange(index, 'title', e.target.value)}
                                                className={inputStyle}
                                                placeholder="Peletakan Batu Pertama"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest">Penjelasan Ringkas Momen</label>
                                        <textarea
                                            rows={2}
                                            value={item.desc}
                                            onChange={(e) => handleTimelineChange(index, 'desc', e.target.value)}
                                            className={textareaStyle}
                                            placeholder="Jelaskan secara ringkas peristiwa sejarah ini..."
                                        />
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => triggerRemoveTimeline(index)}
                                    className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors mt-6 shrink-0"
                                    title="Hapus Momen"
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
