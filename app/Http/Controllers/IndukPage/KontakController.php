<?php

namespace App\Http\Controllers\IndukPage;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class KontakController extends Controller
{
    public function index()
    {
        return Inertia::render('IndukPage/Kontak/Index');
    }
}
