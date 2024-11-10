<?php

use App\Http\Controllers\PPDAdminController;
use Illuminate\Support\Facades\Route; 
use Inertia\Inertia;

Route::get('/dashboardPPD', function () {      
    return Inertia::render('3-PPDAdmin/PPDAdminDashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

/*Route::get('/PPDAdminDashboard', function () {      
    return Inertia::render('3-PPDAdmin/PPDAdminDashboard');
})->middleware(['auth', 'verified'])->name('ppdADashControl');

Route::get('/PPDAdminDashboard', [PPDAdminController::class, 'SchoolAdminDashboard'])
    ->middleware(['auth', 'verified'])->name('ppdADashControl');*/