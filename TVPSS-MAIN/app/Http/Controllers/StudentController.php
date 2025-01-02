<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia; // Import the Inertia facade
use App\Models\Student;
use App\Models\Studcrew;
use Illuminate\Support\Facades\Auth;
use App\Http\Middleware\StudentSessionCheck;

class StudentController extends Controller
{
    // public function __construct()
    // {
    //     $this->middleware(StudentSessionCheck::class)->only(['index', 'applyCrew']);
    // }

    public function showLogin()
    {
        return Inertia::render('5-Students/Auth/LoginStudent');
    }

    public function login(Request $request)
    {
        $request->validate([
            'ic_num' => 'required|string|max:12',
        ]);
        $student = Student::where('ic_num', $request->input('ic_num'))->first();
    
        if (!$student) {
            return response()->json(['ic_num' => 'Student not found.'], 422);
        }
        session(['ic_num' => $student->ic_num]);
    
        return redirect()->route('student.dashboard');
    }

    // First index method for StudentPage
    public function index()
    {
        $ic_num = session('ic_num');
        $student = Student::where('ic_num', $ic_num)->first();
        
        return Inertia::render('5-Students/StudentPage', [
            'student' => $student, // Pass the student data to the view
        ]);
    }

    public function applyCrew()
    {
        $ic_num = session('ic_num');

        // Retrieve the student data based on IC number
        $student = Student::where('ic_num', $ic_num)->first();

        if (!$student) {
            return redirect()->route('student.dashboard')->with('error', 'Pelajar tidak dijumpai.');
        }

        return Inertia::render('5-Students/ApplyCrew', [
            'student' => $student, // Pass the student data to the view
        ]);
    }

    public function applyCrewSubmit(Request $request)
    {
        // Validate the incoming data
        $validated = $request->validate([
            'ic_num' => 'required|string|max:12',
            'jawatan' => 'required|string',
        ]);

        // Retrieve the student based on IC number
        $student = Student::where('ic_num', $validated['ic_num'])->first();

        if (!$student) {
            return redirect()->route('student.applyCrew')->with('error', 'Pelajar tidak dijumpai.');
        }

        // Save the crew application data
        $studcrew = Studcrew::create([
            'student_id' => $student->id,
            'jawatan' => $validated['jawatan'],
            'status' => 'Permohonan Belum Diproses',
        ]);

        return Inertia::render('5-Students/ResultApply', [
            'student' => $student, // Pass the student data to the view
        ]);
    }

    public function resultApply()
    {
        // Retrieve the IC number from the session
        $ic_num = session('ic_num');

        // Retrieve the student record using the IC number
        $student = Student::where('ic_num', $ic_num)->first();

        if (!$student) {
            return redirect()->route('student.applyCrew')->with('error', 'Student not found.');
        }

        // Retrieve all applications associated with the student
        $applications = Studcrew::where('student_id', $student->id)
            ->with('student:id,name') // Eager load student data
            ->get();

        if ($applications->isEmpty()) {
            return redirect()->route('student.applyCrew')->with('error', 'No applications found.');
        }

        // Pass the applications to the view
        return Inertia::render('5-Students/ResultApply', [
            'applications' => $applications,
        ]);
    }

    // Store method for creating a new student
    public function store(Request $request)
    {
        return "Store a new student";
    }

    // Update method for updating a student by ID
    public function update(Request $request, $id)
    {
        return "Update student with ID: " . $id;
    }

    // Destroy method for deleting a student by ID
    public function destroy($id)
    {
        return "Delete student with ID: " . $id;
    }
}
