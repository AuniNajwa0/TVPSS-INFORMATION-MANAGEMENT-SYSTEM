<?php

use App\Http\Controllers\SchoolAdminController;
use Illuminate\Support\Facades\Route;  
use Inertia\Inertia;

/*Route::get('/dashboardSchool', function () {
    return Inertia::render('4-SchoolAdmin/SchoolAdminDashboard');
})->middleware(['auth', 'verified'])->name('dashboardSA');*/

Route::get('/dashboardSchool', fn() => Inertia::render('4-SchoolAdmin/SchoolAdminDashboard'))
    ->name('dashboardSA');

// Equipment Management
Route::resource('equipment', SchoolAdminController::class);
Route::get('/listEquipment', [SchoolAdminController::class, 'equipmentIndex'])->name('equipment.equipmentIndex');
Route::get('equipment/create', [SchoolAdminController::class, 'equipmentCreate'])->name('equipment.equipmentCreate');
Route::post('equipment', [SchoolAdminController::class, 'equipmentStore'])->name('equipment.equipmentStore');
Route::get('equipment/{id}', [SchoolAdminController::class, 'equipmentShow'])->name('equipment.equipmentShow');
Route::get('equipment/{id}/edit', [SchoolAdminController::class, 'equipmentEdit'])->name('equipment.equipmentEdit');
Route::put('equipment/{id}', [SchoolAdminController::class, 'equipmentUpdate'])->name('equipment.equipmentUpdate');
Route::delete('equipment/{id}', [SchoolAdminController::class, 'equipmentDestroy'])->name('equipment.equipmentDestroy');
Route::get('/status-options', [SchoolAdminController::class, 'getStatusOptions']);

//School Information
Route::get('/updateSchool', [SchoolAdminController::class, 'editSchool'])->name('school.edit');
Route::post('/update-school', [SchoolAdminController::class, 'updateSchool'])->name('school.update');

//TVPSS Version
Route::get('/updateSchoolTVPSSVersion', [SchoolAdminController::class, 'updateTVPSSVer1'])->name('tvpss1');
Route::post('/updateEditSchoolTVPSSVersion', [SchoolAdminController::class, 'editTVPSSVer1'])->name('tvpss1Edit');
Route::get('/updateSchoolTVPSSVersion2',[SchoolAdminController::class, 'updateTVPSSVer2'])->name('tvpss2');
Route::post('/updateEditSchoolTVPSSVersion2', [SchoolAdminController::class, 'editTVPSSVer2'])->name('tvpss2Edit');