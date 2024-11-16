<?php

use App\Http\Controllers\SchoolAdminController;
use Illuminate\Support\Facades\Route;  
use Inertia\Inertia;

Route::get('/dashboardSchool', function () {      
    return Inertia::render('4-SchoolAdmin/SchoolAdminDashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/updateSchool', function () {      
    return Inertia::render('4-SchoolAdmin/SchoolInformation/UpdateSchoolInformation');
});

Route::get('/updateSchoolTVPSSVersion', function () {      
    return Inertia::render('4-SchoolAdmin/SchoolInformation/UpdateSchoolVersionStatus');
});

Route::get('/updateSchoolTVPSSVersion2', function () {      
    return Inertia::render('4-SchoolAdmin/SchoolInformation/UpdateSchoolVersionStatus2');
});

/*Route::get('/SchoolAdminDashboard', function () {
    return Inertia::render('1-SchoolAdmin/SchoolAdminDashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/SchoolAdminDashboard', [SchoolAdminController::class, 'SchoolAdminDashboard'])
    ->middleware(['auth', 'verified'])->name('schoolADashControl');*/
