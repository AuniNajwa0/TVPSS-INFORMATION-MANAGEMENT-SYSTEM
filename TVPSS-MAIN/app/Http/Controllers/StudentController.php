<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia; // Import the Inertia facade
use App\Models\Student;
use App\Models\Studcrew;

class StudentController extends Controller
{
    public function showLogin()
    {
        return Inertia::render('5-Students/Auth/LoginStudent');
    }
    public function login(Request $request)
    {
        $validated = $request->validate([
            'ic_num' => 'required|regex:/^\d{6}-\d{2}-\d{4}$/', // Example format: 000000-00-0000
        ]);

        // Optionally, check if the IC number exists in the database
        // $student = Student::where('ic_number', $validated['ic_number'])->first();
        // if (!$student) {
        //     return back()->withErrors(['ic_number' => 'IC number not found.']);
        // }

        // Store the IC number in the session or perform other actions
        session(['ic_num' => $validated['ic_num']]);

        // Redirect to the dashboard or desired route
        return redirect()->route('student.dashboard')->with('success', 'Log masuk berjaya.');
    }

    // First index method for StudentPage
    public function index()
    {
        // Return the Inertia render for StudentPage
        return Inertia::render('5-Students/StudentPage');
    }

    public function applyCrew()
    {
        $ic_num = session('ic_num'); // Retrieve the IC number from the session

        // Pass the IC number to the ApplyCrew page
        return Inertia::render('5-Students/ApplyCrew', [
            'ic_num' => $ic_num, // Pass the IC number to the view
        ]);
    }

    public function applyCrewSubmit(Request $request)
    {
        // Validate the incoming data
        $validated = $request->validate([
            'ic_num' => 'required|regex:/^\d{6}-\d{2}-\d{4}$/',
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'state' => 'required|string',
            'district' => 'required|string',
            'schoolName' => 'required|string',
            'jawatan' => 'required|string',
        ]);

        // Create a new student or update existing one
        $student = Student::create([
            'ic_num' => $validated['ic_num'],
            'name' => $validated['name'],
            'email' => $validated['email'],
            'state' => $validated['state'],
            'district' => $validated['district'],
            'schoolName' => $validated['schoolName'],// this will save the crew position
        ]);

        // Save the crew information in the Studcrew model
        Studcrew::create([
            'student_id' => $student->id,
            'jawatan' => $validated['jawatan'],
            // You can add additional fields here if needed
        ]);

        // Return a success message or redirect
        return redirect()->route('student.resultApply')->with('success', 'Permohonan Krew berjaya dihantar!');
    }

    public function resultApply()
    {
        // Return the Inertia render for ApplyCrew
        return Inertia::render('5-Students/ResultApply');
    }

    // Show method for viewing a student by ID
    public function show($id)
    {
        return "Show student with ID: " . $id;
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