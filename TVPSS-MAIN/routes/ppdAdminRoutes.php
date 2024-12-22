<?php

use App\Http\Controllers\PPDAdminController;
use Illuminate\Support\Facades\Route; 
use Inertia\Inertia;

Route::get('/dashboardPPD', fn() => Inertia::render('3-PPDAdmin/PPDAdminDashboard'))->name('dashboardPP');

// TVPSS VERSION (LIST OF SCHOOL)
Route::get('/tvpssInfoPPDList', [PPDAdminController::class, 'tvpssInfoPPDList'])->name('schoolInfo.tvpssInfoPPDList');
Route::get('/tvpssInfoPPD/{schoolCode}/edit', [PPDAdminController::class, 'tvpssInfoPPDView'])->name('schoolInfo.tvpssInfoPPDView');

