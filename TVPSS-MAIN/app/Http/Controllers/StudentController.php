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
        ]);

        return Inertia::render('5-Students/ResultApply', [
            'student' => $student, // Pass the student data to the view
        ]);
    }

    public function resultApply()
    {
        // Assuming you have a way to get the logged-in student's IC number
        $ic_num = auth()->user()->ic_num; // Adjust this line based on your authentication logic

        // Retrieve all applications for the logged-in student
        $applications = Studcrew::with('student')
            ->whereHas('student', function ($query) use ($ic_num) {
                $query->where('ic_num', $ic_num);
            })
            ->get();

        if ($applications->isEmpty()) {
            return redirect()->route('student.applyCrew')->with('error', 'Tiada permohonan dijumpai.');
        }

        return Inertia::render('5-Students/ResultApply', [
            'applications' => $applications, // Pass the applications to the view
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
