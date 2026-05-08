<?php

namespace App\Http\Controllers\IndukAdmin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class FasilitasController extends Controller
{
    public function index()
    {
        return Inertia::render('IndukAdmin/Fasilitas/Index');
    }
}
