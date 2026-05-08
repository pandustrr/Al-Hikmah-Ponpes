import React from 'react';

export default function ContactInfo() {
    return (
        <div className="space-y-12">
            <section>
                <h2 className="text-3xl font-black text-brand-primary mb-8 uppercase tracking-tighter">Informasi Kontak</h2>
                <div className="space-y-6">
                    <div className="flex items-start">
                        <div className="w-10 h-10 bg-brand-secondary rounded-full flex items-center justify-center mr-4 flex-shrink-0 border border-brand-light">📍</div>
                        <div>
                            <h3 className="font-bold text-brand-primary">Alamat</h3>
                            <p className="text-brand-accent text-sm">Jl. Raya Ambulu No. 123, Ambulu, Jember, Jawa Timur 68172</p>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <div className="w-10 h-10 bg-brand-secondary rounded-full flex items-center justify-center mr-4 flex-shrink-0 border border-brand-light">📞</div>
                        <div>
                            <h3 className="font-bold text-brand-primary">Telepon</h3>
                            <p className="text-brand-accent text-sm">(0331) 123456 / 0812-3456-7890</p>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <div className="w-10 h-10 bg-brand-secondary rounded-full flex items-center justify-center mr-4 flex-shrink-0 border border-brand-light">✉️</div>
                        <div>
                            <h3 className="font-bold text-brand-primary">Email</h3>
                            <p className="text-brand-accent text-sm">info@alhikmahypds.sch.id</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-brand-secondary p-8 rounded-[0.25rem] border border-brand-light shadow-sm">
                <h2 className="text-xl font-bold text-brand-primary mb-6 uppercase">Jam Operasional</h2>
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <p className="text-brand-accent">Senin - Kamis:</p>
                    <p className="text-brand-primary font-bold">07:00 - 15:00</p>
                    <p className="text-brand-accent">Jumat:</p>
                    <p className="text-brand-primary font-bold">07:00 - 11:00</p>
                    <p className="text-brand-accent">Sabtu:</p>
                    <p className="text-brand-primary font-bold">07:00 - 13:00</p>
                </div>
            </section>
        </div>
    );
}


