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
use Illuminate\Support\Facades\Log;

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
    /*public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        //return redirect()->intended(route('dashboard', absolute: false));

        $user = Auth::user();

        switch ($user->role) {
            case User::SUPER_ADMIN:
                return redirect()->intended(route('dashboard', absolute: false));
            case User::STATE_ADMIN:
                return redirect()->intended(route('stateADashControl', absolute: false));
            case User::PPD_ADMIN:
                return redirect()->intended(route('ppdADashControl', absolute: false));
            case User::SCHOOL_ADMIN:
                return redirect()->intended(route('schoolADashControl', absolute: false));
            default:
                return redirect()->route('login')->withErrors('Unauthorized');
        }
    }*/

    public function store(LoginRequest $request): RedirectResponse
    {
        // Authenticate the user
        $request->authenticate();

        // Regenerate session
        $request->session()->regenerate();

        // Get the authenticated user
        $user = Auth::user();

        // Log the user authentication event
        Log::info("User logged in", [
            'user_id' => $user->id,
            'role' => $user->role,
            'email' => $user->email,
        ]);

        // Redirect based on user role
        switch ($user->role) {
            case User::SUPER_ADMIN:
                Log::info("Redirecting Super Admin", ['user_id' => $user->id]);
                return redirect()->intended(route('dashboardSP', absolute: false));

            case User::STATE_ADMIN:
                Log::info("Redirecting State Admin", ['user_id' => $user->id]);
                return redirect()->intended(route('dashboardST', absolute: false));

            case User::PPD_ADMIN:
                Log::info("Redirecting PPD Admin", ['user_id' => $user->id]);
                return redirect()->intended(route('dashboardPP', absolute: false));

            case User::SCHOOL_ADMIN:
                Log::info("Redirecting School Admin", ['user_id' => $user->id]);
                return redirect()->intended(route('dashboardSA', absolute: false));

            default:
                Log::warning("Unauthorized access attempt", ['user_id' => $user->id]);
                return redirect()->route('login')->withErrors('Unauthorized');
        }
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
