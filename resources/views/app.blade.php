<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <?php
            // Parse dynamic page props passed by Inertia
            $berita = $page['props']['berita'] ?? null;
            $lembaga = $page['props']['lembaga'] ?? null;
            
            // 1. Title Selection
            if ($berita) {
                $metaTitle = ($berita['judul'] ?? 'Berita') . ' - Yayasan Al-Hikmah Ambulu';
            } elseif ($lembaga) {
                $metaTitle = ($lembaga['nama'] ?? 'Lembaga') . ' - Unit Pendidikan Al-Hikmah';
            } elseif (request()->is('profil')) {
                $metaTitle = 'Profil & Tentang Kami - Yayasan Al-Hikmah Ambulu';
            } elseif (request()->is('info-ppdb')) {
                $metaTitle = 'Informasi Pendaftaran PPDB - Yayasan Al-Hikmah Ambulu';
            } elseif (request()->is('fasilitas')) {
                $metaTitle = 'Fasilitas Yayasan & Sekolah - Yayasan Al-Hikmah Ambulu';
            } elseif (request()->is('kontak')) {
                $metaTitle = 'Hubungi Kami & Lokasi - Yayasan Al-Hikmah Ambulu';
            } else {
                $metaTitle = \App\Models\SiteSetting::get('news_portal_title', 'Yayasan Al-Hikmah Ambulu') . ' - Portal & Informasi';
            }
            
            // 2. Description Selection
            if ($berita) {
                $rawContent = strip_tags($berita['konten'] ?? '');
                $metaDescription = mb_strimwidth($rawContent, 0, 155, '...');
            } elseif ($lembaga) {
                $rawDesc = strip_tags($lembaga['deskripsi'] ?? '');
                $metaDescription = mb_strimwidth($rawDesc, 0, 155, '...');
            } elseif (request()->is('profil')) {
                $metaDescription = 'Mengenal Yayasan Al-Hikmah Ambulu, Jember. Harmoni tradisi pesantren dan inovasi pendidikan modern untuk mencetak generasi berilmu & beradab.';
            } elseif (request()->is('info-ppdb')) {
                $metaDescription = 'Panduan lengkap pendaftaran santri dan peserta didik baru (PPDB) Yayasan Al-Hikmah Ambulu. Informasi syarat, alur, dan jadwal pendaftaran.';
            } elseif (request()->is('fasilitas')) {
                $metaDescription = 'Lihat fasilitas lengkap pendukung belajar mengajar dan asrama di Yayasan Al-Hikmah Ambulu Jember.';
            } elseif (request()->is('kontak')) {
                $metaDescription = 'Hubungi kami via WhatsApp, email, atau kunjungi lokasi kampus terpadu Yayasan Al-Hikmah di Ambulu, Jember.';
            } else {
                $metaDescription = \App\Models\SiteSetting::get('seo_meta_description', 'Portal berita resmi Yayasan Al-Hikmah Ambulu. Dapatkan informasi terbaru seputar pendidikan, prestasi, dan kegiatan santri.');
            }
            
            // 3. Keywords Selection
            $metaKeywords = \App\Models\SiteSetting::get('seo_keywords', 'Al-Hikmah, Ambulu, pesantren, berita, pendidikan islam, jember');
            
            // 4. Image Selection
            if ($berita && !empty($berita['image_url'])) {
                $rawImage = $berita['image_url'];
            } elseif ($lembaga && !empty($lembaga['image_url'])) {
                $rawImage = $lembaga['image_url'];
            } else {
                $rawImage = \App\Models\SiteSetting::get('news_hero_bg', '/logo.png');
            }
            
            // Make image absolute
            if (filter_var($rawImage, FILTER_VALIDATE_URL)) {
                $metaImage = $rawImage;
            } else {
                $metaImage = url(ltrim($rawImage, '/'));
            }
            
            // 5. URL & Type
            $metaUrl = request()->url();
            $metaType = $berita ? 'article' : 'website';
        ?>

        <!-- SEO Dasar -->
        <title inertia>{{ $metaTitle }}</title>
        <meta name="description" content="{{ $metaDescription }}">
        <meta name="keywords" content="{{ $metaKeywords }}">
        <meta name="author" content="Yayasan Al-Hikmah Ambulu">

        <!-- Open Graph / Facebook / WhatsApp -->
        <meta property="og:type" content="{{ $metaType }}">
        <meta property="og:title" content="{{ $metaTitle }}">
        <meta property="og:description" content="{{ $metaDescription }}">
        <meta property="og:image" content="{{ $metaImage }}">
        <meta property="og:url" content="{{ $metaUrl }}">
        <meta property="og:site_name" content="Yayasan Al-Hikmah Ambulu">

        <!-- Twitter Card -->
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="{{ $metaTitle }}">
        <meta name="twitter:description" content="{{ $metaDescription }}">
        <meta name="twitter:image" content="{{ $metaImage }}">

        <!-- Schema.org JSON-LD (Structured Data) -->
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          "name": "Yayasan Al-Hikmah Ambulu",
          "url": "{{ url('/') }}",
          "logo": "{{ url('logo.png') }}",
          "sameAs": [
            "{{ \App\Models\SiteSetting::get('sosmed_facebook', '') }}",
            "{{ \App\Models\SiteSetting::get('sosmed_instagram', '') }}",
            "{{ \App\Models\SiteSetting::get('sosmed_youtube', '') }}"
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "{{ \App\Models\SiteSetting::get('sosmed_whatsapp', '') }}",
            "contactType": "customer service"
          },
          "subOrganization": [
            @foreach(\App\Models\Lembaga::all() as $l)
            {
              "@type": "School",
              "name": "{{ $l->nama }}",
              "url": "{{ url($l->slug) }}"
            }{{ !$loop->last ? ',' : '' }}
            @endforeach
          ]
        }
        </script>

        <!-- Favicon / Logo Utama -->
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
        <link rel="manifest" href="/site.webmanifest">
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet">

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
