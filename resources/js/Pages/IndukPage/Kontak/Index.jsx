import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import ContactInfo from './ContactInfo';
import MapSection from './MapSection';

export default function Index() {
    return (
        <PublicLayout title="Kontak & Maps">
            <div className="bg-brand-primary py-24 text-center">
                <div className="max-w-7xl mx-auto px-4">
                    <h1 className="text-5xl font-semibold text-white tracking-tighter mb-4 uppercase">Kontak & Lokasi</h1>
                    <p className="text-brand-secondary font-medium tracking-widest uppercase">Hubungi Kami Kapan Saja</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                    <ContactInfo />
                    <MapSection />
                </div>
            </div>
        </PublicLayout>
    );
}


