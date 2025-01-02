<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentController;
use Inertia\Inertia;
use App\Models\Student;
use App\Http\Middleware\StudentSessionCheck;

// Define your student-related routes here
Route::middleware([StudentSessionCheck::class])->group(function () {
    Route::get('/studentPage', [StudentController::class, 'index'])->name('student.dashboard');
    Route::get('/applyCrew', [StudentController::class, 'applyCrew'])->name('student.applyCrew');
    Route::post('/applyCrew', [StudentController::class, 'applyCrewSubmit'])->name('student.applyCrewSubmit');
});

// Route::get('/applyCrew', function () {
//     // Replace with your custom logic to fetch the logged-in student
//     $student = Student::where('ic_num', session('ic_num'))->first(); // Example of using session to store ic_num
//     return Inertia::render('ApplyCrew', [
//         'student' => $student,
//     ]);
// })->name('student.applyCrew');

// Route::post('/applyCrew', [StudentController::class, 'applyCrewSubmit'])->name('student.applyCrewSubmit');

//Route::get('/student/resultApply/{id}', [StudentController::class, 'resultApply'])->name('student.resultApply');

//Route::get('/studentsPage', fn() => Inertia::render('5-Students/StudentPage'))
    //->name('studentPg');


// Toksah mung nak guna route hok ni, aku hok milih jaley aku
/*Route::get('/students/{id}', [StudentController::class, 'show']);
Route::post('/students', [StudentController::class, 'store']);
Route::put('/students/{id}', [StudentController::class, 'update']);
Route::delete('/students/{id}', [StudentController::class, 'destroy']);*/
