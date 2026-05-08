import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';

export default function Alumni() {
    return (
        <PublicLayout title="Alumni">
            <div className="bg-brand-secondary py-24 border-b border-brand-light">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-5xl font-black text-brand-primary tracking-tighter mb-4 uppercase">Ikatan Alumni</h1>
                    <p className="text-brand-accent max-w-2xl mx-auto uppercase tracking-widest font-bold">Keluarga Besar YPDS Al-Hikmah</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {[
                        { name: 'Dr. Ahmad Fauzi', year: '2005', job: 'Dokter Spesialis', quote: 'Pendidikan di sini membentuk karakter saya menjadi pribadi yang disiplin.' },
                        { name: 'Siti Aminah, M.Pd', year: '2010', job: 'Dosen Pendidikan', quote: 'Nilai-nilai agama yang diajarkan sangat relevan di dunia profesional.' },
                        { name: 'Budi Santoso', year: '2015', job: 'Tech Entrepreneur', quote: 'Berawal dari laboratorium komputer sekolah, saya kini membangun startup.' },
                    ].map((alumni, i) => (
                        <div key={i} className="card-clean p-8 bg-white border border-brand-light shadow-sm">
                            <div className="flex items-center mb-6">
                                <div className="w-12 h-12 bg-brand-light rounded-full mr-4 flex items-center justify-center font-bold text-brand-primary">AL</div>
                                <div>
                                    <h3 className="font-bold text-brand-primary">{alumni.name}</h3>
                                    <p className="text-[10px] text-brand-accent uppercase font-bold tracking-widest">Lulusan {alumni.year}</p>
                                </div>
                            </div>
                            <p className="text-brand-accent text-sm italic mb-4">"{alumni.quote}"</p>
                            <p className="text-xs font-bold text-brand-primary uppercase tracking-widest">{alumni.job}</p>
                        </div>
                    ))}
                </div>
            </div>
        </PublicLayout>
    );
}


