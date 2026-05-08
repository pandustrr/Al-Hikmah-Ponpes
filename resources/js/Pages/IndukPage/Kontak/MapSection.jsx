import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

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
                <ArrowTopRightOnSquareIcon className="h-4 w-4 stroke-[2.5px]" />
            </button>
        </div>
    );
}


