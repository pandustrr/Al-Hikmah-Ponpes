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
}
