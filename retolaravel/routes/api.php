<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\cotizacionController;
use App\Http\Controllers\historicoController;


Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login')->name('login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');

});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//Route::post('login',[AuthController::class,'login'])->name('login');

Route::controller(cotizacionController::class)->group(function (){
    Route::get('datos', 'datos');
});

Route::controller(historicoController::class)->group(function (){
    Route::get('obtenerHistorico', 'obtenerHistorico');
    Route::get('historico', 'historico');
});



//Route::get('datos', [cotizacionController::class, 'datos']);

