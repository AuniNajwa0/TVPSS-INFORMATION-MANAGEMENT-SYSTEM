<?php
use App\Http\Controllers\DonationController;
use Illuminate\Support\Facades\Route; 
use Inertia\Inertia;

Route::get('/donationHP', [DonationController::class, 'donationHP'])->name('donationHP');
Route::get('donate/receiptDonate', [DonationController::class, 'receiptDonate'])->name('receiptDonate');
//Route::post('/updateEditSchoolTVPSSVersion', [SchoolAdminController::class, 'editTVPSSVer1'])->name('tvpss1Edit');