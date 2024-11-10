<?php

use App\Http\Controllers\SuperAdminController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/dashboardSuper', function () {      
    return Inertia::render('1-SuperAdmin/SuperAdminDashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

/*Route::get('/SuperAdminDashboard', function () {      
    return Inertia::render('1-SuperAdmin/SuperAdminDashboard');
})->middleware(['auth', 'verified'])->name('superADashControl');

Route::get('/SuperAdminDashboard', [SuperAdminController::class, 'SuperAdminDashboard'])
    ->middleware(['auth', 'verified'])->name('superADashControl');*/

Route::get('/listUser', function () {
    return Inertia::render('1-SuperAdmin/UserManagement/ListUser');
});
