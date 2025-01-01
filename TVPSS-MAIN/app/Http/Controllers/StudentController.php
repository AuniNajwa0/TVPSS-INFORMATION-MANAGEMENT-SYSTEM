<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia; // Import the Inertia facade
use App\Models\Student;
use App\Models\Studcrew;
use Illuminate\Support\Facades\Auth;

class StudentController extends Controller
{
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
        ]);;    
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
            'ic_num' => 'requiredstring|max:12',
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

        // Redirect to resultApply with success message
        // return redirect()->route('student.resultApply', ['id' => $studcrew->id])
        //     ->with('success', 'Permohonan Krew berjaya dihantar!');
        return redirect()->route('student.dashboard');
    }

    public function resultApply($id)
    {
        $studcrew = Studcrew::with('student')->find($id);

    if (!$studcrew) {
        return redirect()->route('student.applyCrew')->with('error', 'Rekod krew tidak dijumpai.');
    }

    if (!$studcrew->student) {
        return redirect()->route('student.applyCrew')->with('error', 'Maklumat pelajar tidak dijumpai.');
    }

    return Inertia::render('5-Students/ResultApply', [
        'ic_num' => $studcrew->student->ic_num,
        'name' => $studcrew->student->name,
        'email' => $studcrew->student->email,
        'state' => $studcrew->student->state,
        'district' => $studcrew->student->district,
        'schoolName' => $studcrew->student->schoolName,
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
