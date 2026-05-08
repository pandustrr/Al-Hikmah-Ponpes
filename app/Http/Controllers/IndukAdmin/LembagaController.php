<?php

namespace App\Http\Controllers\IndukAdmin;

use App\Http\Controllers\Controller;
use App\Models\Lembaga;
use Inertia\Inertia;

class LembagaController extends Controller
{
    public function index()
    {
        return Inertia::render('IndukAdmin/Lembaga/Index', [
            'lembagas' => Lembaga::all()
        ]);
    }
}
