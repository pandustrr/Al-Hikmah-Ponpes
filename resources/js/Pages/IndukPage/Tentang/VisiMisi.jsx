import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';

export default function VisiMisi() {
    return (
        <PublicLayout title="Visi & Misi" navTheme="dark">
            <div className="bg-brand-primary py-32 text-center relative overflow-hidden">
                <div className="absolute inset-0">
                    <img 
                        src="https://images.unsplash.com/photo-1544867305-27d5be7fa83c?auto=format&fit=crop&q=80&w=2000" 
                        alt="Header BG" 
                        className="w-full h-full object-cover opacity-20 grayscale"
                    />
                    <div className="absolute inset-0 bg-brand-primary/60"></div>
                </div>
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <h1 className="text-5xl font-semibold text-white tracking-tighter mb-4 uppercase">Visi & Misi</h1>
                    <p className="text-brand-secondary font-medium tracking-widest uppercase">Arah dan Tujuan Pendidikan Kami</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    <div className="bg-brand-secondary p-12 rounded-[0.25rem] border border-brand-light shadow-sm">
                        <h2 className="text-3xl font-semibold text-brand-primary mb-8 uppercase border-b-2 border-brand-primary w-fit pb-2">Visi</h2>
                        <p className="text-xl text-brand-accent leading-relaxed italic">
                            "Menjadi lembaga pendidikan Islam terkemuka yang melahirkan generasi beradab, berilmu, dan bermanfaat bagi semesta alam."
                        </p>
                    </div>
                    <div>
                        <h2 className="text-3xl font-semibold text-brand-primary mb-8 uppercase border-b-2 border-brand-primary w-fit pb-2">Misi</h2>
                        <ul className="space-y-6">
                            {[
                                'Menyelenggarakan pendidikan berbasis adab dan akhlak mulia.',
                                'Mengembangkan potensi intelektual melalui kurikulum yang integratif.',
                                'Membekali siswa dengan keterampilan abad 21 dan jiwa kewirausahaan.',
                                'Membangun lingkungan yayasan yang modern, bersih, dan asri.',
                                'Menjalin kemitraan strategis dengan berbagai lembaga tingkat nasional dan internasional.'
                            ].map((misi, i) => (
                                <li key={i} className="flex items-start">
                                    <span className="w-8 h-8 bg-brand-primary text-white flex-shrink-0 rounded-full flex items-center justify-center font-semibold text-xs mr-4">{i + 1}</span>
                                    <p className="text-brand-primary font-medium">{misi}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}


