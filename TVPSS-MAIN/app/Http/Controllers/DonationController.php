<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Donations;
use App\Models\SchoolInfo;
use Illuminate\Http\Request;

class DonationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function donationHP()
    {
        return Inertia::render('Donation/donateHP');
    }

    public function receiptDonate(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string',
            'phone' => 'required|string',
            'ic_num' => 'required|string|max:12',
            'amaun' => 'required|numeric',
            'negeri' => 'required|string',
            'daerah' => 'required|string',
            'schoolName' => 'required|string',
        ]);

        // Save donation data
        $donation = Donations::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'ic_num' => $validated['ic_num'],
            'amaun' => $validated['amaun'],
            'school_id' => $this->getSchoolId($validated['negeri'], $validated['daerah'], $validated['schoolName']),
        ]);

        // Retrieve school names based on selected negeri and daerah
        $schools = SchoolInfo::where('state', $validated['negeri'])
            ->where('district', $validated['daerah'])
            ->pluck('schoolName');

        return Inertia::render('Donation/receiptPage', [
            'paymentData' => $donation,
            'schools' => $schools,
        ]);
    }

    public function getSchools(Request $request)
    {
        $state = $request->query('state');
        $district = $request->query('district');
        
        return SchoolInfo::where('state', $state)
            ->where('district', $district)
            ->get();
    }
}
