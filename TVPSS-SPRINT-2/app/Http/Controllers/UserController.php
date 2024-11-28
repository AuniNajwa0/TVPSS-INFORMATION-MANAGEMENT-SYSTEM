<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Requests\StoreUserRequest;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    public function index()
    {
        $role = request()->get('role', ''); 
        $rowsPerPage = request()->get('rowsPerPage', 10); 

        $usersQuery = User::query();

        if ($role !== '') {
            $usersQuery->where('role', $role);
        }

        $users = $usersQuery->paginate($rowsPerPage);

        return Inertia::render('1-SuperAdmin/UserManagement/ListUser', [
            'users' => $users,
            'pagination' => [
                'current_page' => $users->currentPage(),
                'last_page' => $users->lastPage(),
                'per_page' => $users->perPage(),
                'total' => $users->total(),
            ],
            'selectedRole' => $role,  
        ]);
    }

    public function create()
    {
        return Inertia::render('1-SuperAdmin/UserManagement/addUser');
    }

    public function store(StoreUserRequest $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'role' => 'required|integer|in:' . User::SUPER_ADMIN . ',' . User::STATE_ADMIN . ',' . User::PPD_ADMIN . ',' . User::SCHOOL_ADMIN,
            'state' => 'required|string|max:255',
            'district' => 'required|string|max:255',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $role = (int) $validated['role'];  

        User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'role' => $role,
            'state' => $validated['state'],
            'district' => $validated['district'],
            'password' => Hash::make($validated['password']),
        ]);

        return redirect()->route('users.index')->with('success', 'Pengguna berjaya ditambah.');
    }

    public function show(User $user)
    {
        return Inertia::render('1-SuperAdmin/UserManagement/ShowUser', [
            'user' => $user,
        ]);
    }

    public function edit(User $user)
    {
        $roles = [
            ['id' => User::SUPER_ADMIN, 'name' => 'Super Admin'],
            ['id' => User::STATE_ADMIN, 'name' => 'State Admin'],
            ['id' => User::PPD_ADMIN, 'name' => 'PPD Admin'],
            ['id' => User::SCHOOL_ADMIN, 'name' => 'School Admin'],
        ];

        return Inertia::render('1-SuperAdmin/UserManagement/UpdateUser', [
            'user' => $user,
            'roles' => $roles, 
        ]);
    }

    public function update(UpdateUserRequest $request, $userId)
    {
        // Find the user by ID
        $user = User::findOrFail($userId);

        // Log the incoming data
        Log::info('Updating user:', $request->all());

        // Validate incoming data
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'role' => 'required|integer|in:' . User::SUPER_ADMIN . ',' . User::STATE_ADMIN . ',' . User::PPD_ADMIN . ',' . User::SCHOOL_ADMIN,
            'state' => 'required|string|max:255',
            'district' => 'required|string|max:255',
            'password' => 'nullable|string|min:8|confirmed',  // Password is optional
        ]);

        // Check if role is valid
        Log::info('Validated data:', $validated);

        // Update the user data
        $user->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'role' => $validated['role'],
            'state' => $validated['state'],
            'district' => $validated['district'],
            'password' => $validated['password'] ? Hash::make($validated['password']) : $user->password,
        ]);

        // Log after update
        Log::info('User updated:', $user->toArray());

        // Return a success message
        return redirect()->route('users.index')->with('success', 'Pengguna berjaya dikemaskini.');
    }

    public function destroy(User $user)
    {
        $user->delete();

        return redirect()->route('users.index')->with('success', 'Pengguna berjaya dipadam.');
    }

    public function getUserRoleCounts()
    {
        $stateAdminCount = User::where('role', User::STATE_ADMIN)->count();
        $ppdAdminCount = User::where('role', User::PPD_ADMIN)->count();
        $schoolAdminCount = User::where('role', User::SCHOOL_ADMIN)->count();

        return response()->json([
            'state_admin' => $stateAdminCount,
            'ppd_admin' => $ppdAdminCount,
            'school_admin' => $schoolAdminCount,
        ]);
    }

    public function getActiveUserCounts30Minutes()
    {
        $stateAdminCount = User::where('role', User::STATE_ADMIN)
            ->where('last_login_at', '>=', now()->subMinutes(30))
            ->count();

        $ppdAdminCount = User::where('role', User::PPD_ADMIN)
            ->where('last_login_at', '>=', now()->subMinutes(30))
            ->count();

        $schoolAdminCount = User::where('role', User::SCHOOL_ADMIN)
            ->where('last_login_at', '>=', now()->subMinutes(30))
            ->count();

        return response()->json([
            'state_admin_30_minutes' => $stateAdminCount,
            'ppd_admin_30_minutes' => $ppdAdminCount,
            'school_admin_30_minutes' => $schoolAdminCount,
        ]);
    }
}
