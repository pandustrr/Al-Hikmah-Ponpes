<?php

namespace App\Http\Controllers\IndukAdmin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class InfoPPDBController extends Controller
{
    public function index()
    {
        return Inertia::render('IndukAdmin/InfoPPDB/Index');
    }
}
