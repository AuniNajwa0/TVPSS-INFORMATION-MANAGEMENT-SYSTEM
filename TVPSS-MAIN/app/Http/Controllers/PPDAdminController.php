<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SchoolInfo;
use Inertia\Inertia;

class PPDAdminController extends Controller
{
    public function tvpssInfoPPDIndex(Request $request)
    {
        $user = $request->user(); 

        if (!$user->district) {
            return Inertia::render('3-PPDAdmin/SchoolVersionStatus/listSchool', [
                'schools' => [],
                'message' => 'No schools found for your district.',
            ]);
        }

        $schools = SchoolInfo::where('district', $user->district)->get();

        return Inertia::render('3-PPDAdmin/SchoolVersionStatus/listSchool', [
            'schools' => $schools,
        ]);
    }

    public function tvpssInfoPPDEdit(string $id)
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
