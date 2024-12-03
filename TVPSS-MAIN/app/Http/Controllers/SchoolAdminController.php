<?php

namespace App\Http\Controllers;

use App\Http\Requests\Equipment\StoreEquipmentRequest;
use App\Http\Requests\Equipment\UpdateEquipmentRequest;
use Inertia\Inertia;
use App\Models\Equipment;
use App\Enums\StatusEnum;

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
}
