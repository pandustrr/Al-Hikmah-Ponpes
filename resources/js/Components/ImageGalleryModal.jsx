import React, { useState, useEffect } from 'react';
import {
    XMarkIcon,
    ChevronLeftIcon,
    ChevronRightIcon
} from '@heroicons/react/24/outline';

export default function ImageGalleryModal({
    isOpen,
    onClose,
    title = '',
    category = '',
    description = '',
    mainImage = '',
    images = [] // Array of string URLs or objects containing { image_url, judul, deskripsi }
}) {
    const [activeIdx, setActiveIdx] = useState(0);

    // Prepare unified photos list
    const getNormalizedPhotos = () => {
        const list = [];
        if (mainImage) {
            list.push({
                image_url: mainImage,
                judul: title,
                deskripsi: description
            });
        }

        if (images && images.length > 0) {
            images.forEach((img, idx) => {
                if (typeof img === 'string') {
                    list.push({
                        image_url: img,
                        judul: `${title} - Foto ${idx + 1}`,
                        deskripsi: ''
                    });
                } else if (img && img.image_url) {
                    list.push({
                        image_url: img.image_url,
                        judul: img.judul || `${title} - Foto ${idx + 1}`,
                        deskripsi: img.deskripsi || ''
                    });
                }
            });
        }
        return list;
    };

    const photos = getNormalizedPhotos();

    // Reset active index when modal opens
    useEffect(() => {
        if (isOpen) {
            setActiveIdx(0);
        }
    }, [isOpen]);

    // Handle keydown events for desktop shortcuts
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isOpen) return;
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight' && photos.length > 1) handleNext();
            if (e.key === 'ArrowLeft' && photos.length > 1) handlePrev();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, activeIdx, photos]);

    if (!isOpen || photos.length === 0) return null;

    const handleNext = () => {
        setActiveIdx((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
    };

    const handlePrev = () => {
        setActiveIdx((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
    };

    const currentItem = photos[activeIdx];

    return (
        <div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6 bg-black/[0.08]"
            onClick={onClose}
        >
            {/* Modal Container (Split Layout, transparent backdrop overlay, premium shadow) */}
            <div
                className="bg-white w-full max-w-4xl rounded-[0.25rem] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] border border-slate-100 overflow-hidden flex flex-col md:flex-row max-h-[90vh] md:max-h-[80vh] animate-scale-in"
                onClick={(e) => e.stopPropagation()}
            >

                {/* Close Button Mobile Only */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-50 md:hidden w-8 h-8 bg-slate-900/80 text-white rounded-full flex items-center justify-center"
                >
                    <XMarkIcon className="h-4 w-4" />
                </button>

                {/* LEFT COLUMN: MAIN IMAGE (TOP) & GALLERY PHOTO THUMBNAILS (DIRECTLY BELOW IT) */}
                <div className="w-full md:w-[60%] flex flex-col bg-slate-950 border-r border-slate-100">

                    {/* Main Image Display */}
                    <div className="relative w-full aspect-video md:flex-1 md:h-0 select-none group/img bg-slate-900 flex items-center justify-center">
                        <img
                            src={currentItem.image_url}
                            alt={currentItem.judul}
                            className="w-full h-full object-cover"
                        />

                        {/* Navigation Arrows overlay */}
                        {photos.length > 1 && (
                            <>
                                <button
                                    onClick={handlePrev}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-950/50 hover:bg-brand-primary text-white flex items-center justify-center transition-colors md:opacity-0 group-hover/img:opacity-100 duration-300 shadow-md"
                                >
                                    <ChevronLeftIcon className="h-5 w-5" />
                                </button>
                                <button
                                    onClick={handleNext}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-950/50 hover:bg-brand-primary text-white flex items-center justify-center transition-colors md:opacity-0 group-hover/img:opacity-100 duration-300 shadow-md"
                                >
                                    <ChevronRightIcon className="h-5 w-5" />
                                </button>
                            </>
                        )}

                        {/* Photo counter overlay */}
                        {photos.length > 1 && (
                            <div className="absolute bottom-4 left-4 bg-slate-950/60 backdrop-blur-sm text-white px-2.5 py-1 rounded-[0.25rem] text-[10px] font-bold font-mono">
                                {activeIdx + 1} / {photos.length}
                            </div>
                        )}
                    </div>

                    {/* Gallery Photo Thumbnails (POSITIONED EXACTLY BELOW THE MAIN IMAGE) */}
                    <div className="bg-slate-50 border-t border-slate-100 p-4">
                        <span className="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-2">
                            Galeri Dokumentasi ({photos.length})
                        </span>

                        {/* Scroll horizontally on both mobile and desktop for an extremely clean vertical space saving */}
                        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                            {photos.map((photo, i) => (
                                <div
                                    key={i}
                                    onClick={() => setActiveIdx(i)}
                                    className={`relative aspect-square w-14 md:w-16 flex-shrink-0 rounded bg-white overflow-hidden cursor-pointer border-2 transition-all ${activeIdx === i
                                            ? 'border-brand-primary scale-95 shadow-sm'
                                            : 'border-transparent hover:border-slate-300'
                                        }`}
                                >
                                    <img
                                        src={photo.image_url}
                                        className="w-full h-full object-cover"
                                        alt={`Thumbnail ${i + 1}`}
                                    />
                                    {activeIdx === i && (
                                        <div className="absolute inset-0 bg-brand-primary/10 flex items-center justify-center" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* RIGHT COLUMN: DETAILED DESCRIPTION AND TYPOGRAPHY */}
                <div className="w-full md:w-[40%] flex flex-col p-6 md:p-8 justify-between bg-white overflow-y-auto">

                    {/* Header: Close Button (Desktop Only) */}
                    <div className="hidden md:flex justify-end mb-4">
                        <button
                            onClick={onClose}
                            className="text-slate-400 hover:text-slate-950 transition-colors w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100"
                        >
                            <XMarkIcon className="h-4 w-4" />
                        </button>
                    </div>

                    {/* Description & Metadata */}
                    <div className="flex-1 space-y-4">
                        <div>
                            {category && (
                                <span className="bg-brand-primary/10 text-brand-primary text-[8px] font-bold uppercase tracking-widest px-2.5 py-1 rounded">
                                    {category}
                                </span>
                            )}
                            <h3 className="text-lg md:text-xl font-bold text-slate-900 uppercase tracking-tight mt-3">
                                {currentItem.judul || title}
                            </h3>
                        </div>

                        <div className="border-t border-slate-100 pt-3">
                            <p className="text-slate-500 text-xs md:text-sm leading-relaxed max-h-[220px] overflow-y-auto pr-1">
                                "{currentItem.deskripsi || description || 'Tidak ada deskripsi tambahan.'}"
                            </p>
                        </div>
                    </div>

                </div>

            </div>

            {/* Custom Animations Inline Styles */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .animate-scale-in {
                    animation: scaleIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                .scrollbar-none::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-none {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                @keyframes scaleIn {
                    from { opacity: 0; transform: scale(0.96); }
                    to { opacity: 1; transform: scale(1); }
                }
            `}} />
        </div>
    );
}
