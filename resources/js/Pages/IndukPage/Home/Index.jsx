import React, { useState, useEffect } from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import Hero from './Hero';
import AboutSummary from './AboutSummary';

import FasilitasShortcut from './FasilitasShortcut';
import PpdbCta from './PpdbCta';
import LembagaUpdates from './LembagaUpdates';
import BeritaYayasan from './BeritaYayasan';
import BeritaKategoriBottom from './BeritaKategoriBottom';
import Testimonials from './Testimonials';

export default function Welcome({ lembagas, heroBerita, beritaTerbaru, bottomNews, bottomNewsTitle, bottomNewsSlug, landingSettings, testimonials, announcements, announcementTitle, announcementSlug, articles, articleTitle, articleSlug }) {
    const [offsetY, setOffsetY] = useState(0);
    const handleScroll = () => setOffsetY(window.scrollY);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Intersection Observer for Section Reveal
    useEffect(() => {
        const observerOptions = {
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-active');
                }
            });
        }, observerOptions);

        const sections = document.querySelectorAll('.reveal-section');
        sections.forEach(section => observer.observe(section));

        return () => sections.forEach(section => observer.unobserve(section));
    }, []);

    return (
        <PublicLayout title="Beranda" navTheme="dark">
            <Hero offsetY={offsetY} berita={heroBerita} settings={landingSettings} />
            <AboutSummary 
                lembagas={lembagas} 
                settings={landingSettings} 
                announcements={announcements} 
                announcementTitle={announcementTitle}
                announcementSlug={announcementSlug}
                articles={articles} 
                articleTitle={articleTitle}
                articleSlug={articleSlug}
            />
            <Testimonials testimonials={testimonials} />
            <FasilitasShortcut />
            <LembagaUpdates lembagas={lembagas} />
            <PpdbCta settings={landingSettings} />
            <BeritaYayasan beritaTerbaru={beritaTerbaru} />
            <BeritaKategoriBottom bottomNews={bottomNews} bottomNewsTitle={bottomNewsTitle} bottomNewsSlug={bottomNewsSlug} />
        </PublicLayout>
    );
}


