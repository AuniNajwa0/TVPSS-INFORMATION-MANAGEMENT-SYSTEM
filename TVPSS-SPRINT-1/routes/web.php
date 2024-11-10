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

// Route::get('/studentLogin', [StudentController::class, 'studentLogin']);
Route::get('/studentLogin', function () {
    return Inertia::render('5-Students/Auth/Login');
});

// Dashboard
Route::get('/dashboard', function () {      
    return Inertia::render('1-SuperAdmin/SuperAdminDashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/dashboardState', function () {      
    return Inertia::render('2-StateAdmin/StateAdminDashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/dashboardPPD', function () {      
    return Inertia::render('3-PPDAdmin/PPDAdminDashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/dashboardSchool', function () {      
    return Inertia::render('4-SchoolAdmin/SchoolAdminDashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


// profile
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::get('/listUser', function () {
    return Inertia::render('1-SuperAdmin/UserManagement/ListUser');
});

require __DIR__.'/auth.php';