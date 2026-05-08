import React from 'react';

export default function MapSection() {
    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-black text-brand-primary mb-8 uppercase tracking-tighter">Lokasi Kami</h2>
            <div className="aspect-video bg-brand-light border border-brand-light rounded-[0.25rem] overflow-hidden shadow-2xl relative">
                {/* Dummy Map Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center text-brand-accent font-bold uppercase tracking-widest text-center px-12">
                    [ Google Maps Interactive Frame ]
                </div>
                <img 
                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800" 
                    className="w-full h-full object-cover opacity-20"
                    alt="Map background"
                />
            </div>
            <button className="btn-primary w-full py-4 text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2">
                <span>Buka di Google Maps</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
            </button>
        </div>
    );
}


