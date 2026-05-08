<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureLembagaAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();
        
        // Super admin bypass
        if ($user->role === 'super_admin') {
            return $next($request);
        }

        // Get lembaga slug from route
        $lembagaSlug = $request->route('lembaga_slug');
        
        if ($user->role === 'lembaga_admin' && $user->lembaga && $user->lembaga->slug === $lembagaSlug) {
            return $next($request);
        }

        abort(403, 'Anda tidak memiliki akses ke area admin lembaga ini.');
    }
}
