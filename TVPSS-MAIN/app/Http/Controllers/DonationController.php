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

    public function receiptDonate(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string',
            'phone' => 'required|string',
            'ic_num' => 'required|string|max:12',
            'amaun' => 'required|string',
        ]);

        return Inertia::render('Donation/receiptPage', [
            'paymentData' => $paymentData,
        ]);
    }

}
