import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';

export default function Index() {
    return (
        <PublicLayout title="Profil Lembaga">
            <div className="bg-brand-secondary py-24 border-b border-brand-light">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-5xl font-semibold text-brand-primary tracking-tighter mb-4 uppercase">Profil YPDS Al-Hikmah</h1>
                    <p className="text-brand-accent max-w-2xl mx-auto uppercase tracking-widest font-semibold">Membangun Adab dan Ilmu Sejak Dini</p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-20">
                <div className="prose prose-slate lg:prose-xl mx-auto text-brand-primary">
                    <p className="lead text-brand-accent italic mb-12 border-l-4 border-brand-primary pl-6 py-2">
                        YPDS Al-Hikmah adalah lembaga pendidikan Islam yang berdedikasi untuk mencetak generasi yang cerdas secara intelektual dan kokoh secara spiritual.
                    </p>
                    <h2 className="text-3xl font-semibold mb-6">Tentang Kami</h2>
                    <p className="mb-8">
                        Berdiri di jantung Ambulu, Jember, lembaga kami telah menjadi rumah bagi ribuan siswa untuk menimba ilmu. Kami percaya bahwa pendidikan terbaik adalah yang menyeimbangkan antara kurikulum modern dan nilai-nilai luhur Islami.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-16">
                        <div className="bg-brand-secondary p-8 rounded-[0.25rem] border border-brand-light">
                            <h3 className="text-xl font-semibold mb-4">Metode Pendidikan</h3>
                            <p className="text-sm text-brand-accent">Pendekatan holistik yang mengintegrasikan sains, teknologi, dan ilmu agama dalam lingkungan yang kondusif.</p>
                        </div>
                        <div className="bg-brand-secondary p-8 rounded-[0.25rem] border border-brand-light">
                            <h3 className="text-xl font-semibold mb-4">Lingkungan Santri</h3>
                            <p className="text-sm text-brand-accent">Fasilitas asrama yang nyaman dan pembiasaan adab harian untuk membentuk karakter mulia.</p>
                        </div>
                    </div>
                    <p>
                        Kami berkomitmen untuk terus berinovasi dan memberikan pelayanan pendidikan terbaik bagi masyarakat, demi masa depan generasi penerus bangsa yang lebih baik.
                    </p>
                </div>
            </div>
        </PublicLayout>
    );
}


