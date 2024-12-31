<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentController;
use Inertia\Inertia;

// Define your student-related routes here
Route::get('/studentsPage', [StudentController::class, 'index'])->name('student.dashboard');

Route::get('/applyCrew', [StudentController::class, 'applyCrew'])->name('student.applyCrew');
Route::post('/applyCrew', [StudentController::class, 'applyCrewSubmit'])->name('student.applyCrewSubmit');

Route::get('/resultApply', [StudentController::class, 'resultApply'])->name('student.resultApply');

//Route::get('/studentsPage', fn() => Inertia::render('5-Students/StudentPage'))
    //->name('studentPg');


Route::get('/students/{id}', [StudentController::class, 'show']);
Route::post('/students', [StudentController::class, 'store']);
Route::put('/students/{id}', [StudentController::class, 'update']);
Route::delete('/students/{id}', [StudentController::class, 'destroy']);
