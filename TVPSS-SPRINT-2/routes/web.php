<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SuperAdminController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

//Route::redirect('/','/dashboard');

Route::middleware(['auth','verified'])->group(function(){
    require __DIR__.'/schoolAdminRoutes.php';
    require __DIR__.'/ppdAdminRoutes.php';
    require __DIR__.'/stateAdminRoutes.php'; 
    require __DIR__.'/superAdminRoutes.php'; 
});

Route::get('/studentLogin', function () {
    return Inertia::render('5-Students/Auth/Login');
});

// profile
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});



require __DIR__.'/auth.php'; 