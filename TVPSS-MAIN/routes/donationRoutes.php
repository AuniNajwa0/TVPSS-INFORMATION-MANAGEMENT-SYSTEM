<?php
use App\Http\Controllers\DonationController;
use Illuminate\Support\Facades\Route; 
use Inertia\Inertia;

Route::get('/donationHP', [DonationController::class, 'donationHP'])->name('donationHP');
Route::post('donate/receiptDonate', [DonationController::class, 'receiptDonate'])->name('receiptDonate');

Route::get('/schools', [SchoolController::class, 'getSchools']);