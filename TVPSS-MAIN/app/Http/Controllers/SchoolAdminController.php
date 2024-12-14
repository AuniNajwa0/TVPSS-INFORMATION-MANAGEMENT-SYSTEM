<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests\Equipment\StoreEquipmentRequest;
use App\Http\Requests\Equipment\UpdateEquipmentRequest;
use Inertia\Inertia;
use App\Models\Equipment;
use App\Models\EqLocation;
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
        $eqLocation = EqLocation::all();
        
        return Inertia::render('4-SchoolAdmin/ManageEquipment/ListEquipment', [
            'equipment' => $equipment, 
            'eqLocation' => $eqLocation,
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
        $eqLocation = EqLocation::all();
        return Inertia::render('4-SchoolAdmin/ManageEquipment/UpdateEquipment', [
            'equipment' => $equipment,
            'eqLocation' => $eqLocation,
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

    public function equipmentDestroy(Equipment $equipment)
    {
        $equipment->delete();

        return redirect()->route('equipment.equipmentIndex')->with('success', 'Barang berjaya dipadam!');
    }

    public function deleteSelected(Request $request)
    {
        try {
            $ids = $request->input('ids');

            Equipment::whereIn('id', $ids)->delete();

            return redirect()->route('equipment.equipmentIndex')->with('success', 'Barang berjaya dipadam!');
        } catch (\Exception $e) {
            return back()->with('error', 'Ralat berlaku, sila cuba lagi.');
        }
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
            'schoolCode'    => 'required|string|max:255',
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

        $schoolInfo->schoolCode = $validated['schoolCode'];
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
            $file = $request->file('schoolLogo');
            $destinationPath = public_path('images/schoolLogo');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $file->move($destinationPath, $fileName);
            $schoolInfo->schoolLogo = 'images/schoolLogo/' . $fileName; 
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
            'schoolCode'    => 'required|string|max:255',
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

        $schoolInfo = SchoolInfo::first() ?? new SchoolInfo();

        $schoolInfo->schoolCode = $validated['schoolCode'];
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
            $file = $request->file('schoolLogo');
            $destinationPath = public_path('images/schoolLogo'); 
            $fileName = time() . '_' . $file->getClientOriginalName();
            $file->move($destinationPath, $fileName);
            $schoolInfo->schoolLogo = 'images/schoolLogo/' . $fileName; 
        }

        $schoolInfo->save();

        return redirect()->route('tvpss2')->with('success', 'School information updated successfully!');
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
            'version' => 'nullable|string|max:255',
            'agency1_name' => 'required|string|max:255',
            'agency1Manager_name' => 'nullable|string|max:255',
            'agency2_name' => 'nullable|string|max:255',
            'agency2Manager_name' => 'required|string|max:10',
            'recordEquipment' => 'required|string|max:100',
            'noPhone' => 'required|string|max:20',
            'greenScreen' => 'nullable|string|max:20',
            'tvpssLogo' => 'nullable|file|mimes:jpg,jpeg,png|max:2048',
        ]);

        $schoolInfo = SchoolInfo::first() ?? new SchoolInfo();

        $schoolInfo->agency1_name = $validated['agency1_name'];
        $schoolInfo->agency1Manager_name = $validated['agency1Manager_name'];
        $schoolInfo->agency2_name = $validated['agency2_name'];
        $schoolInfo->agency2Manager_name = $validated['agency2Manager_name'];
        $schoolInfo->recordEquipment = $validated['recordEquipment'];
        $schoolInfo->noPhone = $validated['noPhone'];
        $schoolInfo->greenScreen = $validated['greenScreen'];

        $schoolInfo->save();

        $schoolVersion = $schoolInfo->schoolVersion ?? new TVPSSVersion();
        $schoolVersion->version = $validated['version'] ?? null;
        $schoolVersion->schoolInfo()->associate($schoolInfo);

        if ($request->hasFile('tvpssLogo')) {
            $tvpssLogo = $request->file('tvpssLogo');

            $destinationPath = 'images/tvpssLogo';
            $fileName = time() . '_' . $tvpssLogo->getClientOriginalName();

            $tvpssLogo->move(public_path($destinationPath), $fileName);

            $schoolVersion->tvpssLogo = $destinationPath . '/' . $fileName;
        }

        $schoolVersion->save();

        return redirect()->route('tvpss2')->with('success', 'School information updated successfully!');
    }

    public function eqLocCreate(){
        return Inertia::render('4-SchoolAdmin/ManageEquipment/AddEqLoc');
    }

    public function eqLocStore(Request $request)
    {
        try {
            $validated = $request->validate([
                'eqLocName'    => 'required|string|max:255',
                'eqLocType'    => 'required|string|max:255',
            ]);

            EqLocation::create([
                'eqLocName' => $request->eqLocName,
                'eqLocType' => $request->eqLocType,
            ]);

            return redirect()->route('equipment.equipmentIndex')->with('success', 'Lokasi berjaya ditambah!');
        } catch (\Exception $e) {
            return back()->with('error', 'Ralat berlaku, sila cuba lagi.');
        }
    }

    public function eqLocShow(EqLocation $eqLocation)
    {
        return Inertia::render('4-SchoolAdmin/ManageEquipment/UpdateEqLoc', [
            'eqLocation' => $eqLocation,
        ]);
    }

    public function eqLocEdit(EqLocation $eqLocation)
    {
        return Inertia::render('4-SchoolAdmin/ManageEquipment/UpdateEqLoc', [
            'eqLocation' => $eqLocation,
        ]);
    }

    public function eqLocUpdate(Request $request, $id)
    {
        $eqLocation = EqLocation::findOrFail($id);
        
        try {
            $validated = $request->validate([
                'eqLocName'    => 'required|string|max:255',
                'eqLocType'    => 'required|string|max:255',
            ]);

            $eqLocation->update([
                'eqLocName' => $request->eqLocName,
                'eqLocType' => $request->eqLocType,
            ]);

            return redirect()->route('equipment.equipmentIndex')->with('success', 'Lokasi berjaya dikemaskini!');
        } catch (\Exception $e) {
            return back()->with('error', 'Ralat berlaku, sila cuba lagi.');
        }
    }

    public function eqLocDestroy(EqLocation $eqLocation)
    {
        $eqLocation->delete();

        return redirect()->route('equipment.equipmentIndex')->with('success', 'Barang berjaya dipadam!');
    }

}
