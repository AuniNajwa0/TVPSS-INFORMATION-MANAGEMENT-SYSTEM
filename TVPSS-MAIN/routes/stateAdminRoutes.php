<?php

use App\Http\Controllers\StateAdminController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*Route::get('/dashboardState', function () {
    return Inertia::render('2-StateAdmin/StateAdminDashboard');
})->middleware(['auth', 'verified'])->name('dashboardST');*/

Route::get('/dashboardState', fn() => Inertia::render('2-StateAdmin/StateAdminDashboard'))
    ->name('dashboardST');

// CERTIFICATE MANAGEMENT
Route::get('/certificate-Template-List', [StateAdminController::class, 'certList'])->name('certList');
Route::get('/certificateTemplateUploadForm', [StateAdminController::class, 'uploadCertForm'])->name('uploadCertForm');
Route::post('/certificate-templates', [StateAdminController::class, 'uploadTemplate'])->name('uploadTemplate');
Route::get('/certificate-templates', [StateAdminController::class, 'getTemplates']);
Route::get('/certificate-templates/{id}', [StateAdminController::class, 'getTemplate']);
Route::put('/certificate-templates/{id}', [StateAdminController::class, 'updateTemplate']);
Route::get('/certificate-templates/{id}/edit', [StateAdminController::class, 'editTemplate'])->name('certificate-templates.edit');
Route::get('/listRequestCertificate',  fn() => Inertia::render('2-StateAdmin/StudentCertificate/CertificateRequestList'))->name('dashboardST');
Route::get('/listGenerateCertificate',  fn() => Inertia::render('2-StateAdmin/StudentCertificate/CertificateGenerateList'))->name('dashboardST');
Route::get('/generateCertificate',  fn() => Inertia::render('2-StateAdmin/StudentCertificate/GenerateCertificate'))->name('dashboardST');

// TVPSS VERSION UPDATE
Route::get('/tvpssInfo', [StateAdminController::class, 'tvpssInfoIndex'])->name('schoolInfo.tvpssInfoIndex');
Route::get('/stateAdmin/schools', [StateAdminController::class, 'tvpssInfoIndex'])->name('schoolInfo.tvpssInfoIndex');
Route::get('/stateAdmin/school/{schoolCode}/edit', [StateAdminController::class, 'tvpssInfoView'])->name('schoolInfo.tvpssInfoView');


