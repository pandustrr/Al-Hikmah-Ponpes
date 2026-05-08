import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function TopbarInduk({ onMenuClick }) {
    const { auth } = usePage().props;

    return (
        <header className="h-20 bg-white border-b border-slate-200 fixed top-0 left-0 lg:left-64 right-0 z-40 px-4 md:px-8">
            <div className="h-full flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={onMenuClick}
                        className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest hidden sm:block">Pusat Yayasan</h2>
                </div>
                <div className="flex items-center gap-4 md:gap-6">
                    <div className="flex items-center gap-3">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-black text-slate-900 leading-none">{auth.user.name}</p>
                            <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mt-1">Super Admin</p>
                        </div>
                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-black">
                            {auth.user.username[0].toUpperCase()}
                        </div>
                    </div>
                    <Link 
                        href={route('logout')} 
                        method="post" as="button"
                        className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                    </Link>
                </div>
            </div>
        </header>
    );
}
