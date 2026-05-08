<?php

namespace App\Http\Controllers\LembagaAdmin;

use App\Http\Controllers\Controller;
use App\Models\Lembaga;
use Inertia\Inertia;
use Illuminate\Http\Request;

class TentangController extends Controller
{
    public function index($lembaga_slug)
    {
        $lembaga = Lembaga::where('slug', $lembaga_slug)->firstOrFail();
        
        return Inertia::render('LembagaAdmin/Tentang/Index', [
            'lembaga' => $lembaga
        ]);
    }
}
