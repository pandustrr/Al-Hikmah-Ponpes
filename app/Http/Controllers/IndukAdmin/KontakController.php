<?php

namespace App\Http\Controllers\IndukAdmin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class KontakController extends Controller
{
    public function index()
    {
        $settings = \App\Models\SiteSetting::where('group', 'sosial_media')
                        ->orWhere('key', 'portal_email_kontak')
                        ->get()
                        ->groupBy('group');

        return \Inertia\Inertia::render('IndukAdmin/Kontak/Index', [
            'settings' => $settings,
        ]);
    }
}
