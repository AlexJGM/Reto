<?php

namespace App\Http\Controllers;

use App\Models\cotizacion;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Date;

class cotizacionController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api');
    }
    
    
    public function datos() {
        $cotizaciones = cotizacion::all();
        return $cotizaciones;
    }

   
}