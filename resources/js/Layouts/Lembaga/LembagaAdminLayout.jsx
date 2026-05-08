import React, { useState } from 'react';
import SidebarLembaga from './SidebarLembaga';
import TopbarLembaga from './TopbarLembaga';
import { Head } from '@inertiajs/react';

export default function LembagaAdminLayout({ children, title, lembaga }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50">
            <Head title={title ? `${title} - Admin ${lembaga?.slug?.toUpperCase()}` : 'Admin Lembaga'} />
            
            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[55] lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <SidebarLembaga lembaga={lembaga} isOpen={isSidebarOpen} />
            <TopbarLembaga lembaga={lembaga} onMenuClick={() => setIsSidebarOpen(true)} />

            <main className="lg:pl-64 pt-20 transition-all duration-300">
                <div className="p-4 md:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
