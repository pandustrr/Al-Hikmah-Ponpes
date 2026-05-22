#!/bin/bash
set -e

echo "=== Memulai Proses Deploy ke Production ==="

# 1. Mengaktifkan mode maintenance (jika diinginkan, silakan uncomment baris di bawah)
# echo "Mengaktifkan Mode Maintenance..."
# php artisan down || true

# 2. Update dependencies (Composer) tanpa package development
echo "Menginstall dependencies PHP (Production)..."
composer install --no-dev --optimize-autoloader

# 3. Optimasi Cache Laravel
echo "Membersihkan dan memperbarui cache konfigurasi & routing..."
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache

# 4. Menjalankan Migrasi Database
echo "Menjalankan migrasi database..."
php artisan migrate --force

# 5. Membuat link storage jika belum ada
echo "Membuat tautan folder storage..."
php artisan storage:link || true

# 6. Menonaktifkan mode maintenance
# echo "Menonaktifkan Mode Maintenance (Website kembali Online)..."
# php artisan up

echo "=== Deploy Selesai dengan Sukses! ==="
