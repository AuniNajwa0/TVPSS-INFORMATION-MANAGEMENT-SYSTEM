<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route for Dashboard
/*Route::get('/dashboardSuper', function () {
    return Inertia::render('1-SuperAdmin/SuperAdminDashboard');
})->name('dashboard');*/

Route::get('/dashboardSuper', fn() => Inertia::render('1-SuperAdmin/SuperAdminDashboard'))
    ->name('dashboard');

Route::resource('users', UserController::class);

// List users
Route::get('/listUsers', [UserController::class, 'index'])->name('users.index');

Route::get('/addUser', function () {
    return Inertia::render('1-SuperAdmin/UserManagement/AddUser');
})->name('users.create');

Route::get('/updateUser/{id}', [UserController::class, 'edit'])->name('users.edit');

Route::post('/users', [UserController::class, 'store'])->name('users.store');

Route::put('/users/{id}', [UserController::class, 'update'])->name('users.update');

Route::delete('/users/{id}', [UserController::class, 'destroy'])->name('users.destroy');

Route::get('/profileSuperAdmin', function () {
    return Inertia::render('1-SuperAdmin/UserProfile/Edit');
})->name('superadmin.profile');
