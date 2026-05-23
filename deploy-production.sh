#!/bin/bash
set -e

echo "=== Memulai Proses Deploy ke Production ==="

# 1. Mengaktifkan mode maintenance (jika diinginkan, silakan uncomment baris di bawah)
# echo "Mengaktifkan Mode Maintenance..."
# php artisan down || true

# 1. Ambil update terbaru dari Git
echo "Menarik update terbaru dari GitHub..."
git pull origin main

# 2. Update dependencies (Composer) tanpa package development
echo "Menginstall dependencies PHP (Production)..."
composer install --no-dev --optimize-autoloader

# 3. Install & Build Frontend Assets (React + Vite)
echo "Menginstall dependencies Node.js & build assets frontend..."
npm ci
npm run build

# 4. Bersihkan semua cache lama terlebih dahulu
echo "Membersihkan cache lama..."
php artisan optimize:clear

# 5. Optimasi Cache Laravel
echo "Memperbarui cache konfigurasi & routing..."
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache

# 6. Menjalankan Migrasi Database
echo "Menjalankan migrasi database..."
php artisan migrate --force

# 7. Membuat link storage jika belum ada
echo "Membuat tautan folder storage..."
php artisan storage:link || true

# 8. Menonaktifkan mode maintenance
# echo "Menonaktifkan Mode Maintenance (Website kembali Online)..."
# php artisan up

echo "=== Deploy Selesai dengan Sukses! ==="
