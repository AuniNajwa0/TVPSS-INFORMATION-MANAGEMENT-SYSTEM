<?php

use App\Http\Controllers\StateAdminController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*Route::get('/dashboardState', function () {      
    return Inertia::render('2-StateAdmin/StateAdminDashboard');
})->middleware(['auth', 'verified'])->name('dashboardST');*/

Route::get('/dashboardState', fn() => Inertia::render('2-StateAdmin/StateAdminDashboard'))
    ->name('dashboardST');
