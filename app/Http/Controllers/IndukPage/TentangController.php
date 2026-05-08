<?php

namespace App\Http\Controllers\IndukPage;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class TentangController extends Controller
{
    public function profil()
    {
        return Inertia::render('IndukPage/Tentang/Profil');
    }

    public function visiMisi()
    {
        return Inertia::render('IndukPage/Tentang/VisiMisi');
    }

    public function sejarah()
    {
        return Inertia::render('IndukPage/Tentang/Sejarah');
    }
}
