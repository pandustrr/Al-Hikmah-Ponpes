import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { useForm, Head } from '@inertiajs/react';

export default function Login({ lembaga }) {
    const { data, setData, post, processing, errors } = useForm({
        username: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('lembaga.admin.login', { lembaga_slug: lembaga.slug }));
    };

    return (
        <PublicLayout isAuth={true} title={`Login Admin ${lembaga.nama}`}>
            <div className="text-center mb-8">
                <div className="inline-block px-3 py-1 bg-brand-secondary border border-sage-light mb-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-accent">{lembaga.slug.toUpperCase()} ACCESS</span>
                </div>
                <h3 className="text-2xl font-black text-brand-primary tracking-tighter uppercase leading-tight">Admin {lembaga.nama}</h3>
                <p className="mt-2 text-[11px] text-brand-accent uppercase font-bold tracking-widest">Portal Kelola Lembaga</p>
            </div>

            <form className="space-y-5" onSubmit={submit}>
                <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-brand-primary mb-2">Username</label>
                    <input 
                        type="text" 
                        value={data.username}
                        onChange={e => setData('username', e.target.value)}
                        className="block w-full px-4 py-3 border border-slate-200 text-brand-primary text-sm focus:ring-2 focus:ring-brand-primary/10 focus:border-brand-primary outline-none transition-all rounded-[0.25rem] bg-slate-50" 
                        placeholder="Masukkan username"
                    />
                    {errors.username && <p className="text-red-500 text-[10px] mt-1 font-bold uppercase tracking-wide">{errors.username}</p>}
                </div>
                <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-brand-primary mb-2">Security Key</label>
                    <input 
                        type="password" 
                        value={data.password}
                        onChange={e => setData('password', e.target.value)}
                        className="block w-full px-4 py-3 border border-slate-200 text-brand-primary text-sm focus:ring-2 focus:ring-brand-primary/10 focus:border-brand-primary outline-none transition-all rounded-[0.25rem] bg-slate-50" 
                        placeholder="••••••••"
                    />
                    {errors.password && <p className="text-red-500 text-[10px] mt-1 font-bold uppercase tracking-wide">{errors.password}</p>}
                </div>

                <div className="pt-2">
                    <button 
                        type="submit" 
                        disabled={processing}
                        className="w-full bg-brand-primary text-white py-4 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-slate-900 transition-all rounded-[0.25rem] shadow-lg shadow-brand-primary/20"
                    >
                        {processing ? 'Authenticating...' : 'Enter Admin Panel'}
                    </button>
                </div>
            </form>
        </PublicLayout>
    );
}




