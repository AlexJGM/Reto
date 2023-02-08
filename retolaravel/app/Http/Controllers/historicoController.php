<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use App\Models\historico;


class historicoController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['historico']]);
    }

    function obtenerHistorico() {
        $historico = historico::all();
        return $historico;
    }

    function historico() {
        $empresas = ['Inditex', 'Santander', 'BBVA', 'Caixa', 'Cellnex', 'Repsol', 'Iberdrola', 'Ferrovial', 'Naturgy', 'Telefonica'];
        $fecha = Carbon::now()->subYear();

        $valoresIniciales = [];
        foreach($empresas as $empresa) {
            $valoresIniciales[$empresa] = rand(5, 15);
        }

        // Verifica si la tabla historico está vacía
        if (DB::table('historico')->count() == 0) {
            for($i = 0;$i < 365;$i++) {
                foreach($empresas as $empresa) {
                    $val = $valoresIniciales[$empresa] + rand(-10, 10) / 10;
                    $val = max($val, 0.5);
                    $valoresIniciales[$empresa] = $val;




                    DB::table('historico')->insert([
                        'nombres' => $empresa,
                        'valores' => $val,
                        'Fecha' => $fecha->toDateString(),
                    ]);
                }
                $fecha->addDay();
            }
            echo "Los datos se han insertado correctamente en la tabla historico.";


        }


        // Verifica si la tabla cotizacion_empresas está vacía
        if (DB::table('cotizacion_empresas')->count() == 0) {
            foreach($empresas as $empresa)  {
                $ultimoValor = DB::table('historico')
                    ->where('nombres', $empresa)
                    ->latest('fecha')
                    ->first()
                    ->valores;
               
                $nuevoValor = $ultimoValor + rand(-10, 10) / 10;
                $nuevoValor = max($nuevoValor, 0.5);
                       
                DB::table('cotizacion_empresas')->insert([
                    'nombres' => $empresa,
                    'valores' => $nuevoValor,
                    'Fecha' => Carbon::now()
                ]);
            }
            echo "Los datos se han insertado correctamente en la tabla cotizacion_empresas.";
        }            
    }
}