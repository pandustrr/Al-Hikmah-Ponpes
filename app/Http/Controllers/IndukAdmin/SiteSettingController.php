<?php

namespace App\Http\Controllers\IndukAdmin;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SiteSettingController extends Controller
{
    public function index()
    {
        return Inertia::render('IndukAdmin/Settings/Index', [
            'settings' => SiteSetting::all()->groupBy('group'),
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'settings' => 'required|array',
            'settings.*.id' => 'required|exists:site_settings,id',
            'settings.*.value' => 'nullable|string',
        ]);

        foreach ($validated['settings'] as $item) {
            SiteSetting::where('id', $item['id'])->update(['value' => $item['value']]);
        }

        return redirect()->back()->with('success', 'Pengaturan berhasil diperbarui.');
    }
}
