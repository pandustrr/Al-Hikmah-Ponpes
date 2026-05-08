<?php

namespace App\Http\Controllers\IndukPage;

use App\Http\Controllers\Controller;

use App\Models\Fasilitas;
use Inertia\Inertia;
use Illuminate\Http\Request;

class FasilitasController extends Controller
{
    public function index()
    {
        return Inertia::render('IndukPage/Fasilitas/Index', [
            'fasilitas' => Fasilitas::all(),
        ]);
    }
}




