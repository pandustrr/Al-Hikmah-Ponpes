# Panduan & Rencana Implementasi Suite SEO & Optimasi Sosial Media Premium
## Yayasan Al-Hikmah Ambulu

Dokumen ini menjelaskan strategi teknis terperinci untuk mengimplementasikan optimasi mesin pencari (SEO) tingkat lanjut, optimasi berbagi media sosial (Open Graph), dan pemicu **Google Sitelinks** (agar unit-unit pendidikan seperti SD, SMP, SMK, dll. muncul otomatis di bawah hasil pencarian utama Google).

---

## 1. Konsep Dasar "Sitelinks Google" & Cara Memicunya
Tampilan sub-halaman terstruktur (seperti bagian **SD**, **SMP**, **SMK**, dll. di bawah hasil pencarian utama) disebut **Google Sitelinks**. 
* **Algoritma Otomatis**: Google menentukan sitelinks sepenuhnya menggunakan sistem algoritma pencarian mereka. Webmaster tidak bisa "memaksa" atau mengklik tombol untuk langsung memunculkannya.
* **Faktor Pemicu Utama**: Google hanya menampilkan sitelinks jika struktur data situs sangat jelas, memiliki hierarki navigasi yang mudah dipetakan, dan terbukti memiliki reputasi internal linking yang kuat.

Kita akan menggunakan **4 pilar pemicu utama** untuk memastikan Google mendeteksi dan menampilkan sitelinks unit pendidikan Al-Hikmah secara otomatis:

```
[Sitelinks Google Otomatis]
 ├── 1. Hierarki Menu & Navigasi Bersih (Menu 'Tingkat Pendidikan' di Header & Footer)
 ├── 2. Schema.org Structured Data JSON-LD (Deklarasi Unit Sekolah Terstruktur)
 ├── 3. Real-time XML Sitemap (Peta Jalan Lengkap untuk Googlebot)
 └── 4. Descriptive Anchor Texts & Links (Anchor text jelas: 'SD NU 22', 'SMP Unggulan')
```

---

## 2. Detail Implementasi 5 Kriteria SEO Modern

### Kriteria 1 & 2: Automatic Meta Tags & Social Media Open Graph (Prerendered Server-Side)
> **PENTING (Mengapa Prerendered Server-Side Sangat Vital?):**
> Crawler seperti **WhatsApp, Facebook, dan Instagram** adalah scraper sederhana yang **tidak mengeksekusi JavaScript**. Jika Meta/Open Graph hanya diletakkan di React (Inertia `<Head>`), WhatsApp preview **tidak akan pernah muncul**! 
> Kita harus merender meta tags secara dinamis langsung dari **Laravel Blade (`app.blade.php`)** saat server mengirimkan response pertama.

#### Struktur Logika dalam `app.blade.php`:
```php
<?php
    // Ambil instansi data jika sedang di halaman detail Berita atau Lembaga
    $berita = $page['props']['berita'] ?? null;
    $lembaga = $page['props']['lembaga'] ?? null;
    
    // 1. Tentukan Judul Unik (Meta Title & OG Title)
    if ($berita) {
        $metaTitle = $berita['judul'] . ' - Portal Berita Al-Hikmah';
    } elseif ($lembaga) {
        $metaTitle = $lembaga['nama'] . ' - Unit Pendidikan Al-Hikmah';
    } else {
        $metaTitle = \App\Models\SiteSetting::get('news_portal_title', 'Al-Hikmah News') . ' - Portal Berita & Informasi';
    }
    
    // 2. Tentukan Deskripsi Unik (Meta Description & OG Description)
    if ($berita) {
        $metaDescription = strip_tags($berita['konten']);
        $metaDescription = mb_strimwidth($metaDescription, 0, 155, '...');
    } elseif ($lembaga) {
        $metaDescription = strip_tags($lembaga['deskripsi']);
        $metaDescription = mb_strimwidth($metaDescription, 0, 155, '...');
    } else {
        $metaDescription = \App\Models\SiteSetting::get('portal_deskripsi', 'Pusat Informasi & Kabar Terkini Al-Hikmah Ambulu');
    }
    
    // 3. Tentukan Gambar Utama (OG Image)
    if ($berita && !empty($berita['image_url'])) {
        $metaImage = url($berita['image_url']);
    } elseif ($lembaga && !empty($lembaga['image_url'])) {
        $metaImage = url($lembaga['image_url']);
    } else {
        $defaultBg = \App\Models\SiteSetting::get('news_hero_bg', '/logo.png');
        $metaImage = filter_var($defaultBg, FILTER_VALIDATE_URL) ? $defaultBg : url($defaultBg);
    }
    
    // 4. URL & Type
    $metaUrl = request()->url();
    $metaType = $berita ? 'article' : 'website';
?>
```

Dengan logika ini, tag di bawah ini akan dirender sempurna di `<head>`:
```html
<!-- SEO Dasar -->
<title>{{ $metaTitle }}</title>
<meta name="description" content="{{ $metaDescription }}">

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
```

---

### Kriteria 3: Friendly URL (Slug)
* Sistem kita sudah menggunakan routing modern berbasis **slug ramah SEO** (misalnya: `/berita/pendaftaran-santri-baru-2026` dan `/{slug}` untuk unit pendidikan).
* Saat Admin membuat berita atau halaman baru, sistem secara otomatis mengonversi judul menjadi slug unik menggunakan helper `Str::slug()`. Jika ada slug yang kembar, sistem otomatis membubuhkan akhiran angka acak yang elegan untuk menghindari crash database.

---

### Kriteria 4: Automatic Sitemap (`sitemap.xml`)
Sitemap dinamis akan dibuat di route `/sitemap.xml` yang langsung merender file XML real-time dari database. Robot Google akan selalu membaca roadmap terbaru setiap kali ada berita atau sekolah baru yang dirilis.

#### Halaman yang Terindeks Otomatis di Sitemap:
1. **Halaman Statis Utama** (Priority 1.0):
   * `/` (Home)
   * `/profil` (Tentang)
   * `/info-ppdb` (Informasi PPDB)
   * `/kontak` (Kontak)
   * `/fasilitas` (Fasilitas Umum)
2. **Halaman Lembaga/Unit Pendidikan** (Priority 0.9):
   * `/sd-nu-22-full-day-al-hikmah`
   * `/smp-unggulan-al-hikmah`
   * `/smk-al-hikmah-jember`
   * `/madin-al-hikmah-jember`
3. **Halaman Berita Utama & Detail Berita** (Priority 0.8):
   * `/berita` (Index Berita)
   * `/berita/{slug}` (Seluruh berita aktif di database)

---

### Kriteria 5: Image Alt Optimization & Schema Structured Data
* **Alt Teks Gambar Otomatis**: Semua tag `<img>` publik akan kita pastikan memiliki atribut `alt` yang terisi secara otomatis menggunakan judul berita atau nama unit bersangkutan (misalnya `alt={berita.judul}`), menghindari atribut kosong yang sangat dibenci oleh algoritma pencarian Gambar Google.
* **Schema.org JSON-LD**: Kita tambahkan deklarasi JSON-LD berikut ke header untuk mempermudah Google mengelompokkan sitelinks unit:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Yayasan Al-Hikmah Ambulu",
  "url": "{{ url('/') }}",
  "logo": "{{ url('/logo.png') }}",
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
      "url": "{{ url('/' . $l->slug) }}"
    }{{ !$loop->last ? ',' : '' }}
    @endforeach
  ]
}
</script>
```

---

## 3. Langkah Eksekusi Rencana
1. **Perbarui [app.blade.php](file:///e:/Pandu-Projek/Freelance/PondokanAmbulu/resources/views/app.blade.php)**: Masukkan blok logika parser PHP untuk mengekstrak meta data di tingkat server sebelum tag `@inertiaHead` dirender.
2. **Buat Controller & Route Sitemap**:
   * Definisikan route `Route::get('/sitemap.xml', ...)` di [web.php](file:///e:/Pandu-Projek/Freelance/PondokanAmbulu/routes/web.php).
   * Buat method `sitemap` di controller publik yang menghasilkan response XML dengan header `Content-Type: text/xml`.
3. **Optimasi Tag `<img>` di React Pages**:
   * Periksa file public React seperti [Index.jsx](file:///e:/Pandu-Projek/Freelance/PondokanAmbulu/resources/js/Pages/IndukPage/Berita/Index.jsx) dan [Show.jsx](file:///e:/Pandu-Projek/Freelance/PondokanAmbulu/resources/js/Pages/IndukPage/Berita/Show.jsx) untuk menyematkan deskripsi `alt` gambar otomatis.
