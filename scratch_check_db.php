<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Berita;

$beritas = Berita::all();
foreach ($beritas as $berita) {
    echo "ID: {$berita->id} | Judul: {$berita->judul} | Image: {$berita->image_url}\n";
}
