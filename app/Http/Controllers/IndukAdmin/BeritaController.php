<?php

namespace App\Http\Controllers\IndukAdmin;

use App\Http\Controllers\Controller;
use App\Models\Berita;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BeritaController extends Controller
{
    public function index()
    {
        return Inertia::render('IndukAdmin/Berita/Index', [
            'berita' => Berita::latest()->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('IndukAdmin/Berita/Create');
    }

    public function store(Request $request)
    {
        // Logic will be added here
    }

    public function edit(Berita $berita)
    {
        return Inertia::render('IndukAdmin/Berita/Edit', [
            'berita' => $berita
        ]);
    }

    public function update(Request $request, Berita $berita)
    {
        // Logic will be added here
    }

    public function destroy(Berita $berita)
    {
        // Logic will be added here
    }
}
