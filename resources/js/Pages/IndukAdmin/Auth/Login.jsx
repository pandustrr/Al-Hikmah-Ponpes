import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { useForm, Head } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        username: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <PublicLayout isAuth={true} title="Login Admin Yayasan">
            <div className="text-center mb-8">
                <h3 className="text-2xl font-semibold text-slate-900 tracking-tighter uppercase leading-tight">Yayasan Al-Hikmah</h3>
                <p className="mt-2 text-[11px] text-slate-400 uppercase font-semibold tracking-widest">Portal Pusat Yayasan</p>
            </div>

            <form className="space-y-5" onSubmit={submit}>
                <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-900 mb-2">Username</label>
                    <input
                        type="text"
                        value={data.username}
                        onChange={e => setData('username', e.target.value)}
                        className="block w-full px-4 py-3 border border-slate-200 text-slate-900 text-sm focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all rounded-[0.25rem] bg-slate-50"
                        placeholder="Admin Username"
                    />
                    {errors.username && <p className="text-red-500 text-[10px] mt-1 font-semibold uppercase tracking-wide">{errors.username}</p>}
                </div>
                <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-900 mb-2">Password</label>
                    <input
                        type="password"
                        value={data.password}
                        onChange={e => setData('password', e.target.value)}
                        className="block w-full px-4 py-3 border border-slate-200 text-slate-900 text-sm focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all rounded-[0.25rem] bg-slate-50"
                        placeholder="••••••••"
                    />
                    {errors.password && <p className="text-red-500 text-[10px] mt-1 font-semibold uppercase tracking-wide">{errors.password}</p>}
                </div>

                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-slate-900 text-white py-4 text-[10px] font-semibold uppercase tracking-[0.3em] hover:bg-indigo-600 transition-all rounded-[0.25rem] shadow-lg"
                    >
                        {processing ? 'Authenticating...' : 'Login Ke Pusat'}
                    </button>
                </div>
            </form>
        </PublicLayout>
    );
}
