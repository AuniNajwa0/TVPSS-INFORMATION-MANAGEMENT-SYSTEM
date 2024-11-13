<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
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
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        return redirect()->intended(route('dashboard', absolute: false));

        /*$user = Auth::user();

        switch ($user->role) {
            case User::SUPER_ADMIN:
                return redirect()->intended(route('superADashControl', absolute: false));
            case User::STATE_ADMIN:
                return redirect()->intended(route('stateADashControl', absolute: false));
            case User::PPD_ADMIN:
                return redirect()->intended(route('ppdADashControl', absolute: false));
            case User::SCHOOL_ADMIN:
                return redirect()->intended(route('schoolADashControl', absolute: false));
            default:
                return redirect()->route('login')->withErrors('Unauthorized');
        }*/
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
