<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SchoolInfo;
use Inertia\Inertia;

class PPDAdminController extends Controller
{
    public function tvpssInfoIndex()
    {
        $schoolInfo = SchoolInfo::first(); 
        
        return Inertia::render('3-PPDAdmin/SchoolVersionStatus/listSchool', [
            'schoolInfo' => $schoolInfo, 
        ]);
    }

    public function tvpssInfoEdit(string $id)
    {
        return Inertia::render('3-PPDAdmin/SchoolVersionStatus/listSchool');
    }

    public function update(Request $request, string $id)
    {
        //
    }

    public function destroy(string $id)
    {
        //
    }
}
