<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

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

    public function receiptDonate()
    {
        // Sample data - replace this with actual data retrieval logic
        $paymentData = [
            'nama' => 'Puteri Izzah Insyirah',
            'kadPengenalan' => '030103142345',
            'email' => 'puteriizzahinsyirah@moe.edu.my',
            'noTelefon' => '0123456789',
            'negeri' => 'Selangor',
            'daerah' => 'Gombak',
            'sekolah' => 'SMK Selayang Tinggi',
            'paymentMethod' => 'Bank Transfer',
            'amaun' => 100.00
        ];

        return Inertia::render('Donation/receiptPage', [
            'paymentData' => $paymentData,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
