<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentController;
use Inertia\Inertia;

// Define your student-related routes here
Route::get('/studentsPage', [StudentController::class, 'index']);

Route::get('/applyCrew', [StudentController::class, 'applyCrew']);

Route::get('/resultApply', [StudentController::class, 'resultApply']);

//Route::get('/studentsPage', fn() => Inertia::render('5-Students/StudentPage'))
    //->name('studentPg');


Route::get('/students/{id}', [StudentController::class, 'show']);
Route::post('/students', [StudentController::class, 'store']);
Route::put('/students/{id}', [StudentController::class, 'update']);
Route::delete('/students/{id}', [StudentController::class, 'destroy']);
