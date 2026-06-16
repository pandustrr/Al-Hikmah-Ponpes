import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import { 
    MapPinIcon, 
    PhoneIcon, 
    EnvelopeIcon,
    ClockIcon,
    ArrowTopRightOnSquareIcon,
    AcademicCapIcon
} from '@heroicons/react/24/outline';

// SVG Icons for Social Media
const InstagramIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
    </svg>
);

const FacebookIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
    </svg>
);

const YoutubeIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
    </svg>
);

const TiktokIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
);

export default function Index({ settings = {}, lembagas = [] }) {
    
    // Formatting WhatsApp link
    const waNumber = settings.sosmed_whatsapp || '6281234567890';
    const cleanWaNumber = waNumber.replace(/[^0-9]/g, '');
    const waLink = `https://wa.me/${cleanWaNumber}`;

    const socialLinks = [
        { name: 'Instagram', url: settings.sosmed_instagram, icon: InstagramIcon, color: 'hover:bg-pink-600' },
        { name: 'Facebook', url: settings.sosmed_facebook, icon: FacebookIcon, color: 'hover:bg-blue-600' },
        { name: 'YouTube', url: settings.sosmed_youtube, icon: YoutubeIcon, color: 'hover:bg-red-600' },
        { name: 'TikTok', url: settings.sosmed_tiktok, icon: TiktokIcon, color: 'hover:bg-black' },
    ].filter(s => s.url);

    return (
        <PublicLayout title="Kontak & Maps" navTheme="dark">
            
            {/* HERO SECTION */}
            <div className="relative min-h-[48vh] md:min-h-[50vh] flex items-center pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-brand-primary">
                {/* Background Layer */}
                <div className="absolute inset-0 z-0">
                    {/* Desktop Background */}
                    <img 
                        src={settings.contact_hero_bg || "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=1600"} 
                        alt="Hero BG Desktop" 
                        className="hidden md:block w-full h-full object-cover opacity-55 scale-105"
                    />
                    {/* Mobile Background */}
                    <img 
                        src={settings.contact_hero_bg_mobile || settings.contact_hero_bg || "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=1600"} 
                        alt="Hero BG Mobile" 
                        className="block md:hidden w-full h-full object-cover opacity-55 scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/45 via-transparent to-brand-primary/75"></div>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/az-subtle.png')] opacity-10"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full text-center">
                    <div className="inline-flex items-center gap-2 mb-4">
                        <span className="h-[2px] w-6 md:w-8 bg-brand-secondary"></span>
                        <span className="text-brand-secondary text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em]">
                            Pusat Informasi
                        </span>
                        <span className="h-[2px] w-6 md:w-8 bg-brand-secondary"></span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif font-semibold text-white tracking-tight uppercase leading-[1.1] mb-6">
                        Kontak & Lokasi
                    </h1>
                    <p className="text-sm md:text-base text-white/70 leading-relaxed font-light max-w-2xl mx-auto">
                        Kami selalu terbuka untuk komunikasi. Hubungi kami untuk pertanyaan seputar pendaftaran, program pendidikan, maupun informasi lainnya.
                    </p>
                </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-16 md:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
                    
                    {/* LEFT COL: CONTACT INFO */}
                    <div className="lg:col-span-5 space-y-12">
                        
                        {/* Direct Contacts */}
                        <section className="space-y-6">
                            <h2 className="text-2xl font-serif font-bold text-slate-900 tracking-tight uppercase mb-8 flex items-center gap-4">
                                <span className="w-8 h-1 bg-brand-primary rounded-full"></span>
                                Hubungi Kami
                            </h2>
                            
                            <div className="grid gap-4">
                                {/* Email */}
                                <a 
                                    href={`mailto:${settings.portal_email_kontak || 'info@alhikmah.com'}`}
                                    className="group flex items-start gap-5 p-5 bg-white border border-slate-200/60 rounded-[0.5rem] shadow-sm hover:shadow-md hover:border-brand-primary/30 transition-all"
                                >
                                    <div className="w-12 h-12 bg-brand-primary/5 group-hover:bg-brand-primary group-hover:text-white text-brand-primary rounded-full flex items-center justify-center shrink-0 transition-colors">
                                        <EnvelopeIcon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Email Resmi</h3>
                                        <p className="text-base font-semibold text-slate-800 group-hover:text-brand-primary transition-colors">
                                            {settings.portal_email_kontak || 'info@alhikmah.com'}
                                        </p>
                                    </div>
                                </a>

                                {/* WhatsApp */}
                                <a 
                                    href={waLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-start gap-5 p-5 bg-white border border-slate-200/60 rounded-[0.5rem] shadow-sm hover:shadow-md hover:border-[#25D366]/50 transition-all"
                                >
                                    <div className="w-12 h-12 bg-[#25D366]/10 group-hover:bg-[#25D366] group-hover:text-white text-[#25D366] rounded-full flex items-center justify-center shrink-0 transition-colors">
                                        <PhoneIcon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">WhatsApp Center</h3>
                                        <p className="text-base font-semibold text-slate-800 group-hover:text-[#25D366] transition-colors">
                                            +{waNumber}
                                        </p>
                                    </div>
                                </a>

                                {/* Address */}
                                <div className="group flex items-start gap-5 p-5 bg-white border border-slate-200/60 rounded-[0.5rem] shadow-sm">
                                    <div className="w-12 h-12 bg-brand-primary/5 text-brand-primary rounded-full flex items-center justify-center shrink-0">
                                        <MapPinIcon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Alamat Utama</h3>
                                        <p className="text-sm font-medium text-slate-600 leading-relaxed whitespace-pre-line">
                                            {settings.contact_alamat || 'Jl. Raya Ambulu No. 123, Ambulu, Jember, Jawa Timur 68172'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Social Media Links */}
                        {socialLinks.length > 0 && (
                            <section>
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Media Sosial Resmi</h3>
                                <div className="flex flex-wrap gap-3">
                                    {socialLinks.map((social, idx) => (
                                        <a 
                                            key={idx}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`w-12 h-12 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-600 ${social.color} hover:text-white hover:border-transparent transition-all shadow-sm hover:shadow-lg`}
                                            title={`Kunjungi ${social.name} Kami`}
                                        >
                                            <social.icon />
                                        </a>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* RIGHT COL: GOOGLE MAPS */}
                    <div className="lg:col-span-7 h-full">
                        <div className="sticky top-24 bg-white p-2 sm:p-4 border border-slate-200/60 rounded-[0.5rem] shadow-xl">
                            <div className="aspect-square md:aspect-video lg:aspect-[4/3] w-full rounded-[0.25rem] overflow-hidden bg-slate-100 relative group">
                                {/* Interactive Iframe Map */}
                                <iframe 
                                    src={settings.contact_google_maps_iframe || "https://maps.google.com/maps?q=Pondok%20Pesantren%20Al-Hikmah%20Jember&t=&z=15&ie=UTF8&iwloc=&output=embed"} 
                                    width="100%" 
                                    height="100%" 
                                    style={{ border: 0 }} 
                                    allowFullScreen="" 
                                    loading="lazy" 
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="absolute inset-0 z-10 grayscale-[20%] contrast-125 opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                                ></iframe>

                                {/* Fallback loading state (visible briefly before iframe loads) */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 z-0 bg-slate-100">
                                    <MapPinIcon className="w-10 h-10 mb-2 animate-bounce text-brand-primary" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">Memuat Peta...</span>
                                </div>
                            </div>

                            <a 
                                href={settings.contact_google_maps_link || "https://share.google/euTzI1NffkXkx7PEa"} 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-4 w-full bg-brand-primary text-white py-4 px-6 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] rounded-[0.25rem] hover:bg-slate-900 transition-all shadow-md flex items-center justify-center gap-3 group"
                            >
                                Buka Aplikasi Google Maps
                                <ArrowTopRightOnSquareIcon className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </a>
                        </div>
                    </div>

                </div>

                {/* Educational Units WhatsApp Contacts Section */}
                {lembagas && lembagas.length > 0 && (
                    <div className="mt-20 border-t border-slate-100 pt-16">
                        <div className="text-center max-w-3xl mx-auto mb-12">
                            <div className="inline-flex items-center gap-2 mb-4">
                                <span className="h-[2px] w-6 bg-brand-primary"></span>
                                <span className="text-brand-primary text-[10px] font-black uppercase tracking-[0.4em]">Kontak Unit Pendidikan</span>
                                <span className="h-[2px] w-6 bg-brand-primary"></span>
                            </div>
                            <h2 className="text-3xl font-serif font-semibold text-slate-900 tracking-tight uppercase">
                                WhatsApp Masing-Masing Unit
                            </h2>
                            <p className="text-slate-500 text-sm mt-3">
                                Silakan hubungi nomor WhatsApp resmi dari masing-masing unit pendidikan formal kami di bawah ini untuk konsultasi, informasi pendaftaran, atau administrasi sekolah.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {lembagas.map((lembaga) => {
                                const contactNumber = lembaga.ppdb_info?.contact_number || '';
                                const contactPersons = lembaga.ppdb_info?.contact_persons || [];
                                
                                if (!contactNumber && contactPersons.length === 0) return null;

                                // Clean formatting for international link
                                const cleanNumber = contactNumber.replace(/[^0-9]/g, '');
                                const formattedNumber = cleanNumber.startsWith('0') ? '62' + cleanNumber.substring(1) : cleanNumber;
                                const waLink = `https://wa.me/${formattedNumber}`;

                                return (
                                    <div 
                                        key={lembaga.id}
                                        className="bg-white border border-slate-200/60 hover:border-brand-primary/30 rounded-[0.5rem] p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group h-full"
                                    >
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3">
                                                {lembaga.ikon_url ? (
                                                    <div className="w-10 h-10 p-1.5 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-center shrink-0">
                                                        <img src={lembaga.ikon_url} alt={lembaga.nama} className="w-full h-full object-contain" />
                                                    </div>
                                                ) : (
                                                    <div className="w-10 h-10 bg-brand-primary/5 text-brand-primary rounded-lg flex items-center justify-center shrink-0">
                                                        <AcademicCapIcon className="w-5 h-5" />
                                                    </div>
                                                )}
                                                <div>
                                                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Unit Formal</h3>
                                                    <h4 className="text-sm font-semibold text-slate-800 line-clamp-1 group-hover:text-brand-primary transition-colors">{lembaga.nama}</h4>
                                                </div>
                                            </div>
                                            
                                            <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-3">
                                                {lembaga.summary || `Layanan informasi pendaftaran dan administrasi santri untuk ${lembaga.nama}.`}
                                            </p>
                                        </div>

                                        <div className="mt-6 space-y-4">
                                            {/* WhatsApp Utama */}
                                            {contactNumber && (
                                                <div className="space-y-2">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">WhatsApp Utama</span>
                                                        {lembaga.ppdb_info?.contact_name && (
                                                            <span className="text-[9px] font-medium text-slate-500 block">a.n. {lembaga.ppdb_info.contact_name}</span>
                                                        )}
                                                    </div>
                                                    <a 
                                                        href={waLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="w-full bg-[#25D366]/10 hover:bg-[#25D366] text-[#25D366] hover:text-white py-3 px-4 text-[10px] font-bold uppercase tracking-widest rounded-[0.25rem] transition-all flex items-center justify-center gap-2 group/btn shadow-sm"
                                                    >
                                                        <PhoneIcon className="w-4 h-4 shrink-0" />
                                                        +{formattedNumber}
                                                    </a>
                                                </div>
                                            )}

                                            {/* Kontak Tambahan */}
                                            {contactPersons.length > 0 && (
                                                <div className="space-y-2 pt-4 border-t border-slate-100">
                                                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Narahubung Lainnya</span>
                                                    <div className="grid gap-2">
                                                        {contactPersons.map((person, pIdx) => {
                                                            const cleanPNumber = person.number.replace(/[^0-9]/g, '');
                                                            const formattedPNumber = cleanPNumber.startsWith('0') ? '62' + cleanPNumber.substring(1) : cleanPNumber;
                                                            const pWaLink = `https://wa.me/${formattedPNumber}`;
                                                            return (
                                                                <a 
                                                                    key={pIdx}
                                                                    href={pWaLink}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="flex items-center justify-between p-2.5 bg-slate-50/50 hover:bg-emerald-50/40 border border-slate-100 hover:border-emerald-250/20 rounded-[0.25rem] transition-all group/person"
                                                                >
                                                                    <div className="min-w-0">
                                                                        <p className="text-[10px] font-semibold text-slate-700 truncate">{person.name}</p>
                                                                        <p className="text-[9px] text-slate-400 font-mono">+{formattedPNumber}</p>
                                                                    </div>
                                                                    <span className="text-[8px] font-extrabold text-[#25D366] uppercase tracking-widest group-hover/person:translate-x-0.5 transition-transform flex items-center gap-0.5 shrink-0">
                                                                        Chat <span className="text-[10px] font-black">→</span>
                                                                    </span>
                                                                </a>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                .animate-fade-in {
                    animation: fadeIn 0.6s ease-out forwards;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}} />
        </PublicLayout>
    );
}


