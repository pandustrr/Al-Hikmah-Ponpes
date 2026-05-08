<?php

namespace App\Http\Controllers\LembagaAdmin\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\Lembaga;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create($lembaga_slug): Response
    {
        $lembaga = Lembaga::where('slug', $lembaga_slug)->firstOrFail();

        return Inertia::render('LembagaAdmin/Auth/Login', [
            'lembaga' => $lembaga,
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request, $lembaga_slug): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        $user = Auth::user();

        if ($user->role === 'lembaga_admin' && $user->lembaga && $user->lembaga->slug === $lembaga_slug) {
            return redirect()->route('lembaga.admin.dashboard', ['lembaga_slug' => $lembaga_slug]);
        }

        // If user logged in but doesn't belong to this lembaga, logout or redirect
        if ($user->role === 'super_admin') {
             return redirect()->route('admin.dashboard');
        }

        return redirect()->route('home');
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
