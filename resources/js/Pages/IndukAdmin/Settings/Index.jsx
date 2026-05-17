import React from 'react';
import IndukLayout from '@/Layouts/Induk/IndukLayout';
import { Head, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';

export default function Index({ settings }) {
    // Flatten settings for form state
    const initialSettings = [];
    Object.values(settings).forEach(group => {
        group.forEach(s => {
            initialSettings.push({ id: s.id, key: s.key, value: s.value || '', label: s.label, group: s.group });
        });
    });

    const { data, setData, put, processing, errors } = useForm({
        settings: initialSettings
    });

    const handleChange = (id, value) => {
        const newSettings = data.settings.map(s => 
            s.id === id ? { ...s, value } : s
        );
        setData('settings', newSettings);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('admin.settings.update'));
    };

    return (
        <IndukLayout>
            <Head title="Pengaturan Situs" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-8">
                            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-8 border-b-4 border-brand-primary inline-block">
                                Pengaturan Situs
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-12">
                                {Object.entries(settings).map(([group, groupSettings]) => (
                                    <div key={group} className="space-y-6">
                                        <h3 className="text-xs font-black uppercase tracking-[0.3em] text-brand-primary bg-brand-secondary/30 px-4 py-2 rounded">
                                            Grup: {group}
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {groupSettings.map((s) => {
                                                const formItem = data.settings.find(item => item.id === s.id);
                                                return (
                                                    <div key={s.id}>
                                                        <InputLabel htmlFor={s.key} value={s.label} className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2" />
                                                        <TextInput
                                                            id={s.key}
                                                            type="text"
                                                            className="mt-1 block w-full border-slate-200 focus:border-brand-primary focus:ring-brand-primary rounded-[0.25rem] text-sm font-bold"
                                                            value={formItem?.value || ''}
                                                            onChange={(e) => handleChange(s.id, e.target.value)}
                                                        />
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}

                                <div className="flex items-center justify-end pt-8 border-t border-slate-100">
                                    <PrimaryButton 
                                        disabled={processing}
                                        className="bg-brand-primary hover:bg-slate-900 text-white text-xs font-black uppercase tracking-widest px-10 py-4 transition-all rounded-[0.25rem] shadow-xl shadow-brand-primary/20"
                                    >
                                        {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </IndukLayout>
    );
}
