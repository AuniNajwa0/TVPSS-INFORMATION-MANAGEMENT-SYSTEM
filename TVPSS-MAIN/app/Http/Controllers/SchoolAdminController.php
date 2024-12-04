<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests\Equipment\StoreEquipmentRequest;
use App\Http\Requests\Equipment\UpdateEquipmentRequest;
use Inertia\Inertia;
use App\Models\Equipment;
use App\Models\SchoolInfo;
use App\Models\TVPSSVersion;
use App\Enums\StatusEnum;
use App\Enums\greenScreenEnum;
use App\Enums\recordEquipmentEnum;


class SchoolAdminController extends Controller
{
    //Manage Equipment Starts
    public function equipmentIndex()
    {
        $equipment = Equipment::paginate(10);
        
        return Inertia::render('4-SchoolAdmin/ManageEquipment/ListEquipment', [
            'equipment' => $equipment, 
        ]);
    }

    public function equipmentCreate()
    {
        return Inertia::render('4-SchoolAdmin/ManageEquipment/AddEquipment');
    }

    public function equipmentStore(StoreEquipmentRequest $request)
    {
        try {
            $status = StatusEnum::from($request->status);

            Equipment::create([
                'name' => $request->name,
                'type' => $request->type,
                'location' => $request->location,
                'acquired_date' => $request->acquiredDate,
                'status' => $status->value,
            ]);

            return redirect()->route('equipment.equipmentIndex')->with('success', 'Barang berjaya ditambah!');
        } catch (\Exception $e) {
            return back()->with('error', 'Ralat berlaku, sila cuba lagi.');
        }
    }

    public function equipmentShow(Equipment $equipment)
    {
        return Inertia::render('4-SchoolAdmin/ManageEquipment/ShowEquipment', [
            'equipment' => $equipment,
        ]);
    }

    public function equipmentEdit(Equipment $equipment)
    {
        return Inertia::render('4-SchoolAdmin/ManageEquipment/UpdateEquipment', [
            'equipment' => $equipment,
        ]);
    }

    public function equipmentUpdate(UpdateEquipmentRequest $request, string $id)
    {
        $equipment = Equipment::findOrFail($id);
        
        $status = StatusEnum::from($request->status); 

        $equipment->update([
            'name' => $request->name,
            'type' => $request->type,
            'location' => $request->location,
            'acquired_date' => $request->acquiredDate,
            'status' => $status->value, 
        ]);

        return redirect()->route('equipment.equipmentIndex')->with('success', 'Barang berjaya dikemaskini!');
    }

    public function equipmentDestroy(string $id)
    {
        $equipment = Equipment::findOrFail($id);

        $equipment->delete();

        return redirect()->route('equipment.equipmentIndex')->with('success', 'Barang berjaya dipadam!');
    }

    public function getStatusOptions()
    {
        return response()->json([
            'status' => StatusEnum::getValues(),
        ]);
    }
    //Manage Equipment End

    //School Information Starts
    public function editSchool()
    {
        // Fetch the school info (assuming there's only one school record)
        $schoolInfo = SchoolInfo::first(); // Change this logic if you have multiple schools

        return inertia('4-SchoolAdmin/SchoolInformation/UpdateSchoolInformation', [
            'schoolInfo' => $schoolInfo
        ]);
    }

    public function updateSchool(Request $request)
    {
    // Validate the incoming request
    $validated = $request->validate([
        'schoolName'    => 'required|string|max:255',
        'schoolEmail'   => 'required|email|max:255',
        'schoolAddress1'=> 'nullable|string|max:255',
        'schoolAddress2'=> 'nullable|string|max:255',
        'postcode'      => 'required|string|max:10',
        'state'         => 'required|string|max:100',
        'noPhone'       => 'required|string|max:20',
        'noFax'         => 'nullable|string|max:20',
        'linkYoutube'   => 'nullable|url|max:255',
        'schoolLogo'    => 'nullable|file|mimes:jpg,jpeg,png|max:2048',
    ]);

    // Check if a school record exists, otherwise create a new one
    $schoolInfo = SchoolInfo::first(); // Adjust the query as per your requirements

    if (!$schoolInfo) {
        // No record exists, so create a new instance
        $schoolInfo = new SchoolInfo();
    }

    // Update the school information
    $schoolInfo->schoolName = $validated['schoolName'];
    $schoolInfo->schoolEmail = $validated['schoolEmail'];
    $schoolInfo->schoolAddress1 = $validated['schoolAddress1'] ?? null;
    $schoolInfo->schoolAddress2 = $validated['schoolAddress2'] ?? null;
    $schoolInfo->postcode = $validated['postcode'];
    $schoolInfo->state = $validated['state'];
    $schoolInfo->noPhone = $validated['noPhone'];
    $schoolInfo->noFax = $validated['noFax'] ?? null;
    $schoolInfo->linkYoutube = $validated['linkYoutube'] ?? null;

    // Handle file upload for the school logo
    if ($request->hasFile('schoolLogo')) {
        $path = $request->file('schoolLogo')->store('school_logos', 'public');
        $schoolInfo->schoolLogo = $path;
    }

    // Save the school information
    $schoolInfo->save();

    // Redirect back with a success message
    return back()->with('success', 'School information updated successfully!');
    }
    //School Information End

    //Update TVPSS Version Starts
    public function updateTVPSSVer1()
    {
        // Retrieve the first school info record along with its associated version data
        $schoolInfo = SchoolInfo::with('schoolVersion')->first();// Update as necessary if there's more than one record

        // Check if school info exists
        if (!$schoolInfo) {
            return back()->with('error', 'No school information found.');
        }

        return inertia('4-SchoolAdmin/SchoolInformation/UpdateSchoolTVPSSVersion', [
            'schoolInfo' => $schoolInfo,
            'schoolVersion' => $schoolInfo->schoolVersion, // Pass the associated schoolVersion
        ]);
    }


    public function editTVPSSVer1(Request $request)
    {
        // Validate the incoming request
        $validated = $request->validate([
            'schoolName'    => 'required|string|max:255',
            'schoolEmail'   => 'required|email|max:255',
            'schoolAddress1'=> 'nullable|string|max:255',
            'schoolAddress2'=> 'nullable|string|max:255',
            'postcode'      => 'required|string|max:10',
            'state'         => 'required|string|max:100',
            'noPhone'       => 'required|string|max:20',
            'noFax'         => 'nullable|string|max:20',
            'linkYoutube'   => 'nullable|url|max:255',
            'schoolLogo'    => 'nullable|file|mimes:jpg,jpeg,png|max:2048',
        ]);

        // Check if a school record exists, otherwise create a new one
        $schoolInfo = SchoolInfo::first(); // Adjust the query as per your requirements

        if (!$schoolInfo) {
            $schoolInfo = new SchoolInfo();
        }

        // Update the school information
        $schoolInfo->schoolName = $validated['schoolName'];
        $schoolInfo->schoolEmail = $validated['schoolEmail'];
        $schoolInfo->schoolAddress1 = $validated['schoolAddress1'] ?? null;
        $schoolInfo->schoolAddress2 = $validated['schoolAddress2'] ?? null;
        $schoolInfo->postcode = $validated['postcode'];
        $schoolInfo->state = $validated['state'];
        $schoolInfo->noPhone = $validated['noPhone'];
        $schoolInfo->noFax = $validated['noFax'] ?? null;
        $schoolInfo->linkYoutube = $validated['linkYoutube'] ?? null;

        // Handle file upload for the school logo
        if ($request->hasFile('schoolLogo')) {
            $path = $request->file('schoolLogo')->store('school_logos', 'public');
            $schoolInfo->schoolLogo = $path;
        }

        // Save the school information
        $schoolInfo->save();

        // Redirect back with a success message
        return redirect()->route('tvpss1')->with('success', 'School information updated successfully!');
    }

    public function updateTVPSSVer2()
    {
        $schoolInfo = SchoolInfo::with('schoolVersion')->first();

        return inertia('4-SchoolAdmin/SchoolInformation/UpdateSchoolTVPSSVersion2', [
            'schoolInfo' => $schoolInfo,
            'schoolVersion' => $schoolInfo->schoolVersion,
        ]);
    }

    public function editTVPSSVer2(Request $request)
    {
        // Validate the incoming request
        $validated = $request->validate([
            'version'    => 'nullable|string|max:255',
            'agency1_name'   => 'required|string|max:255',
            'agency1Manager_name'=> 'nullable|string|max:255',
            'agency2_name'=> 'nullable|string|max:255',
            'agency2Manager_name'=> 'required|string|max:10',
            'recordEquipment' => 'required|string|max:100',
            'noPhone' => 'required|string|max:20',
            'greenScreen' => 'nullable|string|max:20',
            'schoolLogo'    => 'nullable|file|mimes:jpg,jpeg,png|max:2048',
        ]);

        // Retrieve the school information and its version
        $schoolInfo = SchoolInfo::first(); // Adjust this query if needed to retrieve a specific school

        if (!$schoolInfo) {
            $schoolInfo = new SchoolInfo(); // Create a new school record if it doesn't exist
        }

        // Update the school information
        $schoolInfo->agency1_name = $validated['agency1_name'];
        $schoolInfo->agency1Manager_name = $validated['agency1Manager_name'];
        $schoolInfo->agency2_name = $validated['agency2_name'];
        $schoolInfo->agency2Manager_name = $validated['agency2Manager_name'];
        $schoolInfo->recordEquipment = $validated['recordEquipment'];
        $schoolInfo->noPhone = $validated['noPhone'];
        $schoolInfo->greenScreen = $validated['greenScreen'];

        // Handle file upload for the school logo
        if ($request->hasFile('schoolLogo')) {
            $path = $request->file('schoolLogo')->store('school_logos', 'public');
            $schoolInfo->schoolLogo = $path;
        } elseif ($validated['schoolLogo'] === null) {
            $schoolInfo->schoolLogo = null; // Ensure it is cleared if no file is uploaded
        }

        // Save the school information
        $schoolInfo->save();

        // If there's an associated schoolVersion, update it; otherwise, create a new one
        $schoolVersion = $schoolInfo->schoolVersion ?? new TVPSSVersion;

        $schoolVersion->version = $validated['version'] ?? null;
        $schoolVersion->schoolInfo()->associate($schoolInfo); // Ensure the relation is set

        $schoolVersion->save();

        return redirect()->route('tvpss2')->with('success', 'School information updated successfully!');
    }

}
