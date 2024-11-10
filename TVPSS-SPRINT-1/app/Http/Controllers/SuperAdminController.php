<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SuperAdminController extends Controller
{
    // list.user

    public function listUser()
    {
        return Inertia::render('1-SuperAdmin/UserManagement/ListUser');
    }
}
 