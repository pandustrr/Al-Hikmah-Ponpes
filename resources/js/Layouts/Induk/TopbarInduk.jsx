import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Bars3Icon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

export default function TopbarInduk({ onMenuClick }) {
    const { auth } = usePage().props;

    return (
        <header className="h-14 bg-white border-b border-slate-200 fixed top-0 left-0 lg:left-56 right-0 z-40 px-4 md:px-6">
            <div className="h-full flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={onMenuClick}
                        className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                        <Bars3Icon className="h-5 w-5" />
                    </button>
                    <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hidden sm:block">
                        Super Admin Yayasan
                    </h2>
                </div>
                
                <div className="flex items-center gap-4 md:gap-5">
                    <div className="flex items-center gap-3">
                        <div className="text-right hidden sm:block">
                            <p className="text-xs font-bold text-brand-primary leading-none">
                                {auth.user.username}
                            </p>
                            <p className="text-[8px] font-extrabold text-brand-accent uppercase tracking-widest mt-1">
                                Super Admin
                            </p>
                        </div>
                        <div className="w-8 h-8 bg-brand-secondary/40 rounded-full flex items-center justify-center text-brand-primary text-xs font-bold border border-brand-accent/20">
                            {auth.user.username[0].toUpperCase()}
                        </div>
                    </div>
                    <Link 
                        href={route('logout')} 
                        method="post" as="button"
                        className="p-1.5 text-slate-400 hover:text-red-600 transition-colors"
                        title="Keluar"
                    >
                        <ArrowRightOnRectangleIcon className="h-4.5 w-4.5" />
                    </Link>
                </div>
            </div>
        </header>
    );
}
