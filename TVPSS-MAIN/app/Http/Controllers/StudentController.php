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
        'ic_num' => 'required|regex:/^\d{6}-\d{2}-\d{4}$/', // IC number validation
    ]);

    // Store the IC number in the session or perform other actions
    session(['ic_num' => $validated['ic_num']]);

    // Redirect to the dashboard after successful login
    return redirect()->route('student.dashboard')->with('success', 'Log masuk berjaya.');
}

    // First index method for StudentPage
    public function index()
    {
        // Return the Inertia render for StudentPage
        return Inertia::render('5-Students/StudentPage');    
    }

    // Renamed second index method to applyCrew
    public function applyCrew()
    {
        // Return the Inertia render for ApplyCrew
        return Inertia::render('5-Students/ApplyCrew');    
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
