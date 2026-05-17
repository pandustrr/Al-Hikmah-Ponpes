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
            // value bisa string atau file
        ]);

        foreach ($request->input('settings', []) as $index => $item) {
            $setting = SiteSetting::find($item['id']);
            
            if ($request->hasFile("settings.$index.value")) {
                $file = $request->file("settings.$index.value");
                $path = $file->store('settings', 'public');
                $setting->update(['value' => \Illuminate\Support\Facades\Storage::url($path)]);
            } else if (isset($item['value']) && is_string($item['value'])) {
                // Jangan timpa dengan string kosong jika sebelumnya adalah gambar dan user tidak mengubahnya
                // Tetapi jika form sengaja mengirim string kosong, kita update.
                $setting->update(['value' => $item['value']]);
            }
        }

        return redirect()->back()->with('success', 'Pengaturan berhasil diperbarui.');
    }
}
