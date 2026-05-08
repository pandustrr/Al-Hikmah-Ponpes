<?php

namespace App\Http\Controllers\LembagaPage;

use App\Http\Controllers\Controller;

use App\Models\Lembaga;
use App\Models\Prestasi;
use App\Models\Kegiatan;
use Inertia\Inertia;
use Illuminate\Http\Request;

class SchoolController extends Controller
{
    public function show($slug)
    {
        $lembaga = Lembaga::where('slug', $slug)->firstOrFail();
        
        $prestasi = Prestasi::where('lembaga_id', $lembaga->id)->latest()->get();
        $kegiatan = Kegiatan::where('lembaga_id', $lembaga->id)->latest()->get();

        return Inertia::render('LembagaPage/Home', [
            'lembaga' => $lembaga,
            'prestasi' => $prestasi,
            'kegiatan' => $kegiatan,
        ]);
    }

    public function adminLogin($lembaga_slug)
    {
        $lembaga = Lembaga::where('slug', $lembaga_slug)->firstOrFail();

        return Inertia::render('LembagaAdmin/Auth/Login', [
            'lembaga' => $lembaga
        ]);
    }
}




