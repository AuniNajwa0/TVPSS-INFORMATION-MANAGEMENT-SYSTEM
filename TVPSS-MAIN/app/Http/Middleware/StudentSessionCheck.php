<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class StudentSessionCheck
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle($request, Closure $next)
{
    // Custom authentication logic
    $student = Student::where('ic_num', $request->ic_num)->first();

    if ($student) {
        // Store student information in the session
        session(['ic_num' => $student->ic_num]);
        return $next($request);  // Proceed with the request
    }

    // If not authenticated, redirect to login
    return redirect()->route('student.login');
}


}
