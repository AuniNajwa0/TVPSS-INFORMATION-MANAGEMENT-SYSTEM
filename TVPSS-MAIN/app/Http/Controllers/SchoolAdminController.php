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
                'acquired_date' => $request->acquired_date,
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

    public function equipmentUpdate(UpdateEquipmentRequest $request, $id)
    {
        $equipment = Equipment::findOrFail($id);
        
        $status = StatusEnum::from($request->status); 

        $equipment->update([
            'name' => $request->name,
            'type' => $request->type,
            'location' => $request->location,
            'acquired_date' => $request->acquired_date,
            'status' => $status->value, 
        ]);

        return redirect()->route('equipment.equipmentIndex')->with('success', 'Barang berjaya dikemaskini!');
    }

    /*public function equipmentDestroy(string $id)
    {
        $equipment = Equipment::findOrFail($id);

        $equipment->delete();

        return redirect()->route('equipment.equipmentIndex')->with('success', 'Barang berjaya dipadam!');
    }*/

    public function equipmentDestroy(Equipment $equipment){
        $equipment->delete();

        return redirect()->route('equipment.equipmentIndex')->with('success', 'Barang berjaya dipadam!');
    }

    public function getStatusOptions()
    {
        return response()->json([
            'status' => StatusEnum::getValues(),
        ]);
    }

    public function editSchool()
    {
        $schoolInfo = SchoolInfo::first(); 

        return inertia('4-SchoolAdmin/SchoolInformation/UpdateSchoolInformation', [
            'schoolInfo' => $schoolInfo
        ]);
    }

    public function updateSchool(Request $request)
    {
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

    $schoolInfo = SchoolInfo::first();

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

    if ($request->hasFile('schoolLogo')) {
        $path = $request->file('schoolLogo')->store('school_logos', 'public');
        $schoolInfo->schoolLogo = $path;
    }

    $schoolInfo->save();

    return back()->with('success', 'School information updated successfully!');
    }

    public function updateTVPSSVer1()
    {
        $schoolInfo = SchoolInfo::with('schoolVersion')->first();

        if (!$schoolInfo) {
            return back()->with('error', 'No school information found.');
        }

        return inertia('4-SchoolAdmin/SchoolInformation/UpdateSchoolTVPSSVersion', [
            'schoolInfo' => $schoolInfo,
            'schoolVersion' => $schoolInfo->schoolVersion,
        ]);
    }


    public function editTVPSSVer1(Request $request)
    {
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

        $schoolInfo = SchoolInfo::first(); 

        if (!$schoolInfo) {
            $schoolInfo = new SchoolInfo();
        }

        $schoolInfo->schoolName = $validated['schoolName'];
        $schoolInfo->schoolEmail = $validated['schoolEmail'];
        $schoolInfo->schoolAddress1 = $validated['schoolAddress1'] ?? null;
        $schoolInfo->schoolAddress2 = $validated['schoolAddress2'] ?? null;
        $schoolInfo->postcode = $validated['postcode'];
        $schoolInfo->state = $validated['state'];
        $schoolInfo->noPhone = $validated['noPhone'];
        $schoolInfo->noFax = $validated['noFax'] ?? null;
        $schoolInfo->linkYoutube = $validated['linkYoutube'] ?? null;

        if ($request->hasFile('schoolLogo')) {
            $path = $request->file('schoolLogo')->store('school_logos', 'public');
            $schoolInfo->schoolLogo = $path;
        }

        $schoolInfo->save();

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

        $schoolInfo = SchoolInfo::first(); 

        if (!$schoolInfo) {
            $schoolInfo = new SchoolInfo(); 
        }

        $schoolInfo->agency1_name = $validated['agency1_name'];
        $schoolInfo->agency1Manager_name = $validated['agency1Manager_name'];
        $schoolInfo->agency2_name = $validated['agency2_name'];
        $schoolInfo->agency2Manager_name = $validated['agency2Manager_name'];
        $schoolInfo->recordEquipment = $validated['recordEquipment'];
        $schoolInfo->noPhone = $validated['noPhone'];
        $schoolInfo->greenScreen = $validated['greenScreen'];

        if ($request->hasFile('schoolLogo')) {
            $path = $request->file('schoolLogo')->store('school_logos', 'public');
            $schoolInfo->schoolLogo = $path;
        } elseif ($validated['schoolLogo'] === null) {
            $schoolInfo->schoolLogo = null; 
        }

        $schoolInfo->save();

        $schoolVersion = $schoolInfo->schoolVersion ?? new TVPSSVersion;

        $schoolVersion->version = $validated['version'] ?? null;
        $schoolVersion->schoolInfo()->associate($schoolInfo); 

        $schoolVersion->save();

        return redirect()->route('tvpss2')->with('success', 'School information updated successfully!');
    }

}
