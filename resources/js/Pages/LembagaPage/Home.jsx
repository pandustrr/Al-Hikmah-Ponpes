import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import HeroSection from './Partials/HeroSection';
import StatsBar from './Partials/StatsBar';
import RunningTextBanner from './Partials/RunningTextBanner';
import StickyNewsHighlight from './Partials/StickyNewsHighlight';
import ProfilSection from './Partials/ProfilSection';
import TenagaPendidikSection from './Partials/TenagaPendidikSection';
import KeunggulanSection from './Partials/KeunggulanSection';
import BeritaKegiatanSection from './Partials/BeritaKegiatanSection';
import FasilitasSection from './Partials/FasilitasSection';
import CtaSection from './Partials/CtaSection';

export default function Show({ 
    lembaga, 
    prestasi = [], 
    kegiatan = [], 
    beritas = [], 
    stickyBerita = null,
    announcements = [],
    articles = [],
    pengajars = [],
    fasilitas = []
}) {
    return (
        <PublicLayout title={lembaga.nama} navTheme="dark" isLembaga={true}>

            <HeroSection lembaga={lembaga} />
            <StatsBar lembaga={lembaga} />
            <RunningTextBanner text={lembaga.running_text} />
            <StickyNewsHighlight stickyBerita={stickyBerita} />
            <ProfilSection lembaga={lembaga} prestasi={prestasi} articles={articles} />
            <TenagaPendidikSection pengajars={pengajars} />
            <KeunggulanSection lembaga={lembaga} />
            <BeritaKegiatanSection beritas={beritas} prestasi={prestasi} />
            <FasilitasSection lembaga={lembaga} fasilitas={fasilitas} />
            <CtaSection lembaga={lembaga} />

            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(15px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.8s ease-out forwards;
                }
                .delay-100 { animation-delay: 0.1s; }
                .delay-200 { animation-delay: 0.2s; }
                .delay-300 { animation-delay: 0.3s; }
            `}} />
        </PublicLayout>
    );
}
