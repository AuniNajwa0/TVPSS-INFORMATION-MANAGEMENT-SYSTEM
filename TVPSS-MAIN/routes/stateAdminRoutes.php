<?php

use App\Http\Controllers\StateAdminController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*Route::get('/dashboardState', function () {      
    return Inertia::render('2-StateAdmin/StateAdminDashboard');
})->middleware(['auth', 'verified'])->name('dashboardST');*/

Route::get('/dashboardState', fn() => Inertia::render('2-StateAdmin/StateAdminDashboard'))
    ->name('dashboardST');

Route::get('/certificate-Template-List', [StateAdminController::class, 'certList'])->name('certList');

Route::get('/certificateTemplateUploadForm', [StateAdminController::class, 'uploadCertForm'])->name('uploadCertForm');

Route::post('/certificate-templates', [StateAdminController::class, 'uploadTemplate'])->name('uploadTemplate');
Route::get('/certificate-templates', [StateAdminController::class, 'getTemplates']);
Route::get('/certificate-templates/{id}', [StateAdminController::class, 'getTemplate']);
Route::put('/certificate-templates/{id}', [StateAdminController::class, 'updateTemplate']);

