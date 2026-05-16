<?php

namespace App\Http\Controllers\IndukPage;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class InfoPPDBController extends Controller
{
    public function index()
    {
        $ppdbInfos = \App\Models\PpdbInfo::with('lembaga')->where('is_active', true)->get();
        $lembagas = \App\Models\Lembaga::all();
        $faqs = \App\Models\Faq::where('is_active', true)->orderBy('order', 'asc')->get();

        $settings = \App\Models\LandingSetting::where('group', 'ppdb')->get()->pluck('value', 'key');

        return Inertia::render('IndukPage/InfoPPDB/Index', [
            'ppdbInfos' => $ppdbInfos,
            'lembagas' => $lembagas,
            'faqs' => $faqs,
            'settings' => $settings,
        ]);
    }
}
