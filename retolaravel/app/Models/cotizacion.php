<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class cotizacion extends Model
{
    use HasFactory;
    public $timestamps = false;

    protected $table = 'cotizacion_empresas';
    protected $fillable = ['id', 'nombres','valores', 'Fecha'];
}
