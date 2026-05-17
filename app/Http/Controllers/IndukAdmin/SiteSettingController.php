<?php

namespace App\Http\Controllers\IndukAdmin;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SiteSettingController extends Controller
{
    public function index()
    {
        return Inertia::render('IndukAdmin/Settings/Index', [
            'settings' => SiteSetting::all()->groupBy('group'),
            'authUser' => Auth::user(),
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'settings' => 'required|array',
            'settings.*.id' => 'required|exists:site_settings,id',
        ]);

        foreach ($request->input('settings', []) as $index => $item) {
            $setting = SiteSetting::find($item['id']);
            
            if ($request->hasFile("settings.$index.value")) {
                $file = $request->file("settings.$index.value");
                $path = $file->store('settings', 'public');
                $setting->update(['value' => Storage::url($path)]);
            } else if (isset($item['value']) && is_string($item['value'])) {
                $setting->update(['value' => $item['value']]);
            }
        }

        return redirect()->back()->with('success', 'Pengaturan berhasil diperbarui.');
    }

    public function updateAccount(Request $request)
    {
        /** @var User $user */
        $user = User::find(Auth::id());
        
        $validated = $request->validate([
            'username' => 'required|string|alpha_dash|max:255|unique:users,username,' . $user->id,
            'current_password' => 'nullable|required_with:password|current_password',
            'password' => 'nullable|string|min:8|confirmed',
        ], [
            'username.unique' => 'Username ini sudah digunakan.',
            'current_password.current_password' => 'Password saat ini salah.',
            'password.confirmed' => 'Konfirmasi password baru tidak cocok.',
            'password.min' => 'Password baru minimal 8 karakter.',
        ]);

        $user->username = $validated['username'];

        if (!empty($validated['password'])) {
            $user->password = Hash::make($validated['password']);
        }

        $user->save();

        return redirect()->back()->with('success', 'Akun admin berhasil diperbarui.');
    }

    public function updateLoginBg(Request $request)
    {
        $request->validate([
            'login_bg_url' => 'nullable|string|max:2000',
            'login_bg_file' => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:5120', // max 5MB
        ]);

        $setting = SiteSetting::where('key', 'login_bg')->first();
        if (!$setting) {
            $setting = SiteSetting::create([
                'key' => 'login_bg',
                'label' => 'Gambar Background Halaman Login',
                'group' => 'site_settings',
                'type' => 'image',
            ]);
        }

        if ($request->hasFile('login_bg_file')) {
            $file = $request->file('login_bg_file');
            $path = $file->store('settings', 'public');
            $setting->update(['value' => Storage::url($path)]);
        } elseif ($request->filled('login_bg_url')) {
            $setting->update(['value' => $request->input('login_bg_url')]);
        }

        return redirect()->back()->with('success', 'Background halaman login berhasil diperbarui.');
    }
}
