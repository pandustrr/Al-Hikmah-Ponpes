import React, { useState } from 'react';
import ImageCropperModal from './ImageCropperModal';

export default function ImageInputWithCrop({ 
    onChange, 
    aspectRatio = null, 
    className = "", 
    title = "Potong Gambar",
    ...props
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tempImageSrc, setTempImageSrc] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setTempImageSrc(objectUrl);
            setIsModalOpen(true);
        }
        // Reset input value so the same file can be selected again if needed
        e.target.value = null;
    };

    const handleCrop = (croppedFile) => {
        setIsModalOpen(false);
        if (tempImageSrc && tempImageSrc.startsWith('blob:')) {
            URL.revokeObjectURL(tempImageSrc);
        }
        setTempImageSrc(null);
        onChange(croppedFile);
    };

    return (
        <>
            <input 
                type="file" 
                accept="image/*"
                className={`absolute inset-0 opacity-0 cursor-pointer ${className}`} 
                onChange={handleFileChange}
                {...props}
            />

            {isModalOpen && (
                <ImageCropperModal
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        setTempImageSrc(null);
                    }}
                    imageSrc={tempImageSrc}
                    onCrop={handleCrop}
                    aspectRatio={aspectRatio}
                    title={title}
                />
            )}
        </>
    );
}
