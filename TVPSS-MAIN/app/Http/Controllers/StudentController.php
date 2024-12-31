<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia; // Import the Inertia facade

class StudentController extends Controller
{
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
