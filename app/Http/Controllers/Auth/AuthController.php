<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function show()
    {
        return Inertia::render('Auth/Login');
    }

    public function store(LoginRequest $request)
    {
        $request->authenticate();
        $request->session()->regenerate();
        return redirect()->intended('/dashboard');
    }
}
