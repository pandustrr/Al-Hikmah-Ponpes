<?php

namespace App\Http\Controllers\IndukPage;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class KontakController extends Controller
{
    public function index()
    {
        $settings = \App\Models\SiteSetting::where('group', 'sosial_media')
            ->orWhere('key', 'portal_email_kontak')
            ->get()
            ->pluck('value', 'key');

        return Inertia::render('IndukPage/Kontak/Index', [
            'settings' => $settings
        ]);
    }
}
