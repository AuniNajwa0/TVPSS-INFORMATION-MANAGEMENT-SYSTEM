<?php
use App\Http\Controllers\DonationController;
use Illuminate\Support\Facades\Route; 
use Inertia\Inertia;

Route::get('/donationHP', [DonationController::class, 'donationHP'])->name('donationHP');
Route::get('/schools', [DonationController::class, 'getSchools']);
Route::post('donate/donation', [DonationController::class, 'donation'])->name('donation');
//Route::post('donate/receiptDonate', [DonationController::class, 'receiptDonate'])->name('receiptDonate');

