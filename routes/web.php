<?php

use App\Http\Controllers\Auth\AuthController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home', [
        'user' => 'Developer',
    ]);
});

Route::get('/login', function () {
    return Inertia::render('Auth/Login');
})->name('login');
Route::post('/login', [AuthController::class, 'store']);

Route::middleware('auth:sanctum')->prefix('dashboard')->name('dashboard.')->group(function () {
    Route::get('/', function () {
        return Inertia::render('Dashboard/Dashboard');
    })->name('index');

    Route::get('/coa', function () {
        return Inertia::render('CoA/CoA');
    })->name('coa');

    Route::get('/jurnalUmum', function () {
        return Inertia::render('JurnalUmum/JurnalUmum');
    })->name('jurnalUmum');
});
