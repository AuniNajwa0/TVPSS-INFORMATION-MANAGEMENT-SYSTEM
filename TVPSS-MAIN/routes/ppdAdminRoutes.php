<?php

use App\Http\Controllers\PPDAdminController;
use Illuminate\Support\Facades\Route; 
use Inertia\Inertia;

/*Route::get('/dashboardPPD', function () {      
    return Inertia::render('3-PPDAdmin/PPDAdminDashboard');
})->middleware(['auth', 'verified'])->name('dashboardPP');*/

Route::get('/dashboardPPD', fn() => Inertia::render('3-PPDAdmin/PPDAdminDashboard'))
    ->name('dashboardPP');

// TVPSS VERSION (LIST OF SCHOOL)
Route::get('/tvpssInfo', [PPDAdminController::class, 'tvpssInfoIndex'])->name('schoolInfo.tvpssInfoIndex');
Route::get('/tvpssInfo/{tvpssInfo}/edit', [PPDAdminController::class, 'tvpssInfoEdit'])->name('tvpssInfoEdit');
