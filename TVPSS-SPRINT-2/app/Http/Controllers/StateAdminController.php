<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class StateAdminController extends Controller
{
    //
    public function dashboardState()
    {
        return Inertia::render('2-StateAdmin/StateAdminDashboard');
    }
}
