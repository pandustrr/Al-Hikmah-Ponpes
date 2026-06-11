import React, { useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Cropper } from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { XMarkIcon, CheckIcon, ArrowsPointingOutIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

export default function ImageCropperModal({ 
    isOpen, 
    onClose, 
    imageSrc, 
    onCrop, 
    aspectRatio = null,
    title = "Potong Gambar"
}) {
    const cropperRef = useRef(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleCrop = () => {
        setIsProcessing(true);
        const imageElement = cropperRef?.current;
        const cropper = imageElement?.cropper;

        if (typeof cropper !== 'undefined') {
            const getBlobFromCanvas = (canvas, quality = 0.95) => {
                return new Promise((resolve) => {
                    try {
                        canvas.toBlob((blob) => {
                            resolve(blob);
                        }, 'image/jpeg', quality);
                    } catch (e) {
                        resolve(null);
                    }
                });
            };

            const tryCrop = async () => {
                // Resolution fallbacks: 1920x1080 -> 1280x720 -> 800x600 -> default (no constraints)
                const sizes = [
                    { maxWidth: 1920, maxHeight: 1080, quality: 0.9 },
                    { maxWidth: 1280, maxHeight: 720, quality: 0.85 },
                    { maxWidth: 800, maxHeight: 600, quality: 0.8 }
                ];

                for (let size of sizes) {
                    try {
                        const canvas = cropper.getCroppedCanvas({
                            maxWidth: size.maxWidth,
                            maxHeight: size.maxHeight,
                            imageSmoothingEnabled: true,
                            imageSmoothingQuality: 'medium',
                        });

                        if (canvas) {
                            const blob = await getBlobFromCanvas(canvas, size.quality);
                            if (blob) {
                                let file;
                                try {
                                    file = new File([blob], "cropped_image.jpg", { type: "image/jpeg", lastModified: Date.now() });
                                } catch (e) {
                                    // Fallback for older browsers / iOS devices
                                    file = blob;
                                    file.name = "cropped_image.jpg";
                                    file.lastModifiedDate = new Date();
                                }
                                onCrop(file);
                                setIsProcessing(false);
                                return;
                            }
                        }
                    } catch (err) {
                        console.warn("Cropper failed for size:", size, err);
                    }
                }

                // Final ultimate fallback: Get canvas without any sizing constraints
                try {
                    const canvas = cropper.getCroppedCanvas();
                    if (canvas) {
                        const blob = await getBlobFromCanvas(canvas, 0.8);
                        if (blob) {
                            let file;
                            try {
                                file = new File([blob], "cropped_image.jpg", { type: "image/jpeg", lastModified: Date.now() });
                            } catch (e) {
                                file = blob;
                                file.name = "cropped_image.jpg";
                                file.lastModifiedDate = new Date();
                            }
                            onCrop(file);
                            setIsProcessing(false);
                            return;
                        }
                    }
                } catch (e) {
                    console.error("Cropper final fallback failed:", e);
                }

                setIsProcessing(false);
                alert("Gagal memproses gambar pada perangkat Anda. Silakan gunakan foto lain atau coba menggunakan browser lain.");
            };

            tryCrop();
        } else {
            setIsProcessing(false);
        }
    };

    const handleReset = () => {
        const imageElement = cropperRef?.current;
        const cropper = imageElement?.cropper;
        if (typeof cropper !== 'undefined') {
            cropper.reset();
        }
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-xl bg-white text-left align-middle shadow-2xl transition-all">
                                {/* Header */}
                                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center">
                                            <ArrowsPointingOutIcon className="h-4 w-4 text-brand-primary" />
                                        </div>
                                        <Dialog.Title as="h3" className="text-sm font-bold uppercase tracking-widest text-slate-800">
                                            {title}
                                        </Dialog.Title>
                                    </div>
                                    <button
                                        type="button"
                                        className="text-slate-400 hover:text-slate-600 transition-colors"
                                        onClick={onClose}
                                    >
                                        <XMarkIcon className="h-5 w-5" />
                                    </button>
                                </div>

                                {/* Cropper Container */}
                                <div className="p-2 sm:p-6 bg-slate-900 flex justify-center items-center h-[260px] xs:h-[320px] sm:h-[450px] w-full overflow-hidden">
                                    {imageSrc && (
                                        <Cropper
                                            src={imageSrc}
                                            style={{ height: "100%", width: "100%" }}
                                            initialAspectRatio={aspectRatio}
                                            aspectRatio={aspectRatio}
                                            guides={true}
                                            ref={cropperRef}
                                            viewMode={1}
                                            dragMode="move"
                                            background={false}
                                            responsive={true}
                                            autoCropArea={1}
                                            checkOrientation={false}
                                        />
                                    )}
                                </div>

                                {/* Footer Actions */}
                                <div className="px-4 sm:px-6 py-3 sm:py-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
                                    <button
                                        type="button"
                                        onClick={handleReset}
                                        className="flex items-center gap-2 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-brand-primary transition-colors self-start sm:self-auto"
                                    >
                                        <ArrowPathIcon className="h-4 w-4" /> Reset
                                    </button>
                                    
                                    <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                                        <button
                                            type="button"
                                            className="px-4 sm:px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest text-slate-600 hover:bg-slate-200 rounded transition-colors"
                                            onClick={onClose}
                                        >
                                            Batal
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleCrop}
                                            disabled={isProcessing}
                                            className="flex items-center gap-2 bg-brand-primary hover:bg-slate-900 text-white px-6 sm:px-8 py-2.5 rounded text-[10px] font-bold uppercase tracking-widest transition-all shadow-lg"
                                        >
                                            {isProcessing ? 'Memproses...' : <><CheckIcon className="h-4 w-4" /> Potong & Simpan</>}
                                        </button>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
