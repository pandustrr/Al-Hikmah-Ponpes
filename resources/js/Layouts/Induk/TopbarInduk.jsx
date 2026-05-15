import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Bars3Icon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

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
                        <Bars3Icon className="h-6 w-6" />
                    </button>
                    <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-widest hidden sm:block">Pusat Yayasan</h2>
                </div>
                <div className="flex items-center gap-4 md:gap-6">
                    <div className="flex items-center gap-3">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-semibold text-brand-primary leading-none">{auth.user.name}</p>
                            <p className="text-[10px] font-semibold text-brand-accent uppercase tracking-widest mt-1">Super Admin</p>
                        </div>
                        <div className="w-10 h-10 bg-brand-secondary rounded-full flex items-center justify-center text-brand-primary font-semibold border border-brand-accent/20">
                            {auth.user.username[0].toUpperCase()}
                        </div>
                    </div>
                    <Link 
                        href={route('logout')} 
                        method="post" as="button"
                        className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                    >
                        <ArrowRightOnRectangleIcon className="h-5 w-5" />
                    </Link>
                </div>
            </div>
        </header>
    );
}
