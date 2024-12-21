<?php

use App\Http\Controllers\PPDAdminController;
use Illuminate\Support\Facades\Route; 
use Inertia\Inertia;

Route::get('/dashboardPPD', fn() => Inertia::render('3-PPDAdmin/PPDAdminDashboard'))->name('dashboardPP');

// TVPSS VERSION (LIST OF SCHOOL)
Route::get('/tvpssInfoPPD', [PPDAdminController::class, 'tvpssInfoPPDIndex'])->name('schoolInfo.tvpssInfoPPDIndex');
Route::get('/tvpssInfoPPD/{tvpssInfoPPD}/edit', [PPDAdminController::class, 'tvpssInfoPPDEdit'])->name('tvpssInfoPPDEdit');
