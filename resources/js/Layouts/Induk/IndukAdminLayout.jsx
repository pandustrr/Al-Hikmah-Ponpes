import React, { useState } from 'react';
import SidebarInduk from './SidebarInduk';
import TopbarInduk from './TopbarInduk';
import { Head } from '@inertiajs/react';

export default function IndukAdminLayout({ children, title }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50">
            <Head title={title ? `${title} - Admin Induk` : 'Admin Induk'} />
            
            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[55] lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <SidebarInduk isOpen={isSidebarOpen} />
            <TopbarInduk onMenuClick={() => setIsSidebarOpen(true)} />

            <main className={`transition-all duration-300 pt-14 ${isSidebarOpen ? 'lg:pl-56' : 'lg:pl-56'}`}>
                <div className="p-4 md:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
