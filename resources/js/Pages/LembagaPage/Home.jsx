import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { 
    UserGroupIcon, 
    BookOpenIcon, 
    AcademicCapIcon, 
    SparklesIcon,
} from '@heroicons/react/24/outline';
import { Head } from '@inertiajs/react';

// Partials
import HeroUnit from './Partials/HeroUnit';
import StatsUnit from './Partials/StatsUnit';
import VisiMisiUnit from './Partials/VisiMisiUnit';
import KeunggulanUnit from './Partials/KeunggulanUnit';
import PengajarUnit from './Partials/PengajarUnit';
import FasilitasUnit from './Partials/FasilitasUnit';
import BeritaUnit from './Partials/BeritaUnit';
import CTAUnit from './Partials/CTAUnit';

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
    // Stats with balanced sizing
    const stats = [
        { label: 'Siswa Aktif', value: '450+', icon: UserGroupIcon },
        { label: 'Tenaga Pengajar', value: pengajars.length > 0 ? `${pengajars.length}+` : '25+', icon: AcademicCapIcon },
        { label: 'Fasilitas Unggulan', value: fasilitas.length > 0 ? `${fasilitas.length}+` : '12+', icon: BookOpenIcon },
        { label: 'Prestasi Juara', value: prestasi.length > 0 ? `${prestasi.length}+` : '30+', icon: SparklesIcon },
    ];

    return (
        <PublicLayout title={lembaga.nama}>
            <Head>
                <meta name="description" content={lembaga.summary || `Profil Resmi ${lembaga.nama} Al-Hikmah Jember.`} />
            </Head>

            <HeroUnit lembaga={lembaga} />

            <StatsUnit lembaga={lembaga} stats={stats} />

            <VisiMisiUnit lembaga={lembaga} />

            <KeunggulanUnit lembaga={lembaga} />

            <PengajarUnit pengajars={pengajars} />

            <FasilitasUnit lembaga={lembaga} fasilitas={fasilitas} />

            <BeritaUnit beritas={beritas} prestasi={prestasi} />

            <CTAUnit lembaga={lembaga} />

            {/* Custom Animations & Base Styles */}
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes ticker {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-ticker-slow {
                    animation: ticker 60s linear infinite;
                    display: inline-block;
                }
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(15px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.8s ease-out forwards;
                }
                .delay-100 { animation-delay: 100ms; }
                .delay-200 { animation-delay: 200ms; }
                .delay-300 { animation-delay: 300ms; }
                @keyframes slow-zoom {
                    from { transform: scale(1.05); }
                    to { transform: scale(1.15); }
                }
                .animate-slow-zoom {
                    animation: slow-zoom 20s ease-in-out infinite alternate;
                }
                .font-serif {
                    font-family: 'Playfair Display', serif;
                }
                .card-clean {
                    border-radius: 0.25rem;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
            `}} />
        </PublicLayout>
    );
}
