import React, { useState, useEffect } from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import Hero from './Hero';
import AboutSummary from './AboutSummary';
import LembagaSection from './LembagaSection';
import FasilitasShortcut from './FasilitasShortcut';
import PpdbCta from './PpdbCta';
import LembagaUpdates from './LembagaUpdates';
import BeritaYayasan from './BeritaYayasan';
import UpcomingEvents from './UpcomingEvents';
import AlumniTestimonials from './AlumniTestimonials';

export default function Welcome({ lembagas, beritaTerbaru }) {
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
            <Hero offsetY={offsetY} />
            <AboutSummary lembagas={lembagas} />
            <FasilitasShortcut />
            <LembagaUpdates lembagas={lembagas} />
            <PpdbCta />
            <BeritaYayasan beritaTerbaru={beritaTerbaru} />
            <UpcomingEvents />
            <AlumniTestimonials />
        </PublicLayout>
    );
}


