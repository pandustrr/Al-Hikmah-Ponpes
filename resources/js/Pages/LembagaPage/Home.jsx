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
import PpdbSection from './Partials/PpdbSection';
import CtaSection from './Partials/CtaSection';
import HomeVideo from './Partials/HomeVideo';

export default function Show({ 
    lembaga, 
    prestasi = [], 
    kegiatan = [], 
    beritas = [], 
    stickyBerita = null,
    sidebarSections = [],
    sidebarBeritas = [],
    sidebarCategoryName = '',
    pengajars = [],
    fasilitas = [],
    ppdbInfo = null
}) {
    return (
        <PublicLayout title={lembaga.nama} navTheme="dark" isLembaga={true}>

            <HeroSection lembaga={lembaga} />
            <StatsBar lembaga={lembaga} />
            <RunningTextBanner text={lembaga.running_text} />
            <StickyNewsHighlight stickyBerita={stickyBerita} />
            <ProfilSection 
                lembaga={lembaga} 
                sidebarSections={sidebarSections}
                sidebarBeritas={sidebarBeritas} 
                sidebarCategoryName={sidebarCategoryName} 
            />
            <TenagaPendidikSection pengajars={pengajars} lembaga={lembaga} />
            <KeunggulanSection lembaga={lembaga} />
            <HomeVideo lembaga={lembaga} />
            <BeritaKegiatanSection beritas={beritas} prestasi={prestasi} lembaga={lembaga} />
            <PpdbSection lembaga={lembaga} ppdbInfo={ppdbInfo} />
            <FasilitasSection lembaga={lembaga} fasilitas={fasilitas} />
            <CtaSection lembaga={lembaga} ppdbInfo={ppdbInfo} />

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
