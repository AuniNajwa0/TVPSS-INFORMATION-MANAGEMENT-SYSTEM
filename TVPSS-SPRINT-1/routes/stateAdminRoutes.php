<?php

use App\Http\Controllers\StateAdminController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/dashboardState', function () {      
    return Inertia::render('2-StateAdmin/StateAdminDashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

/*Route::get('/StateAdminDashboard', function () {      
    return Inertia::render('2-StateAdmin/StateAdminDashboard');
})->middleware(['auth', 'verified'])->name('stateADashControl');

Route::get('/StateAdminDashboard', [StateAdminController::class, 'StateAdminDashboard'])
    ->middleware(['auth', 'verified'])->name('stateADashControl');*/
